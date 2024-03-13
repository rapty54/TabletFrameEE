var time = 0;
var timer_pie = $('#timer_pie').length;
var timer_analog = $('#timer_analog').length;
var clock_sound = new Audio("./tools/sound/timer_clock.mp3");
var end_alarm_sound = new Audio("./tools/sound/timer_warning.mp3");
var end_sound = new Audio("./tools/sound/timer_end.mp3");

function display_time() {
    var m = parseInt(time / 60);
    var s = parseInt(time % 60);
    $('#minute').val(twolength(m));
    $('#second').val(twolength(s));
    if (timer_pie) {
        drag_deg(time * 0.1);
    } else if (timer_analog) {
        display_analog_target();
    }
}
$(function () {
    var max_m = 99;
    if (timer_pie) {
        max_m = 60;
    }
    var max_s = 59;
    var timer_id = 0;
    var target_time = new Date();
    var max_time = max_m * 60 + 59;
    if (timer_pie) {
        max_time = max_m * 60;
    }
    var play = false;
    var min_height = WIN_MIN_HEIGHT;
    if (timer_pie || timer_analog) {
        min_height = WIN_MIN_HEIGHT2;
    }
    var minX = window.screen.width - WIN_MIN_WIDTH - 10 + dualScreenLeft;
    var minY = window.screen.height - min_height - 70 + dualScreenTop;
    var maxX = (window.screen.width / 2) - (WIN_BASE_WIDTH / 2);
    var maxY = (window.screen.height / 2) - (WIN_BASE_HEIGHT / 2);

    $("#btn_30s").on("click", function (event) {
        add_s(30);
    });
    $("#btn_1m").on("click", function (event) {
        add_m(1);
    });
    $("#btn_3m").on("click", function (event) {
        add_m(3);
    });
    $("#btn_5m").on("click", function (event) {
        add_m(5);
    });
    $("#btn_start").on("click", function (event) {
        if ($(this).hasClass('stop')) {
            clearInterval(timer_id);
            $(this).removeClass('stop');
            if (!timer_pie) {
                $("input[id=minute]").removeAttr("readonly");
                $("input[id=second]").removeAttr("readonly");
            }
        } else {
            if (time == 0) {
                $('#timerSetPopup').show();
            } else {
                started();
                timer_id = setInterval(function () {
                    play_sound();
                    var diff = target_time.getTime() - new Date().getTime();
                    if (time > 0) {
                        time = Math.round(diff / 1000);
                        display_time();
                        if (time == 0) {
                            done();
                        }
                    }
                }, 1000);
            }
        }
    });
    $("#btn_init").on("click", function (event) {
        init_time();
    });

    function resizeTo(width, height, x, y) {
        var data = {
            width: width,
            height: height,
            left: x,
            top: y
        };
        command("resizeWindow", JSON.stringify(data), "");
        window.resizeTo(width, height);
        window.moveTo(x, y);
    }
    $("#btn_resize").on("click", function (event) {
        if (window.innerWidth > WIN_MIN_WIDTH) {
            resizeTo(WIN_MIN_WIDTH, min_height, minX, minY);

        } else {
            resizeTo(WIN_BASE_WIDTH, WIN_BASE_HEIGHT, maxX, maxY);

        }
    });
    $("#btn_sound").on("click", function (event) {
        if ($(this).hasClass("off")) {
            $('#chk1').prop("checked", true);
            $('#chk2').prop("checked", true);
            $('#chk3').prop("checked", true);
            $(this).removeClass("off")
        } else {
            $('#chk1').prop("checked", false);
            $('#chk2').prop("checked", false);
            $('#chk3').prop("checked", false);
            $(this).addClass("off")
        }
    });
    $("input:checkbox[name='chk_sound']").on("change", function (event) {
        var sound = false;
        $('input:checkbox[name="chk_sound"]').each(function () {
            if (this.checked) {
                sound = true;
            }
        });
        if (sound) {
            $("#btn_sound").removeClass("off");
        } else {
            $("#btn_sound").addClass("off");
        }
    });
    $(document).on("keypress keyup mouseup", "input[id=minute]", function () {
        check_length(2, this);
        check_max(max_m, this);
        make_time();
    });
    $(document).on("keypress keyup mouseup", "input[id=second]", function () {
        check_length(2, this);
        check_max(max_s, this);
        make_time();
    });
    $(document).on("keyup mouseup", "input[id=input_msg]", function () {
        $('#box_msg').text($(this).val());
    });
    $(document).on("blur", "input[id=input_msg]", function () {
        if ($(this).val() == '') {
            $(this).val($(this).data('default'));
            $('#box_msg').text($(this).data('default'));
        }
    });

    function init_time() {
        time = 0;
        display_time();
        clearInterval(timer_id);
        $("#btn_start").removeClass('stop');
        if (timer_pie) {
            $(".half .fill").eq(0).css({
                transform: "rotate(0deg)"
            });
            $(".half .fill").eq(1).css({
                transform: "rotate(0deg)"
            });
        } else if (timer_analog) {
            $("#sec_r").hide();
            $("#min_r").hide();
            $("#hour_r").hide();
            $("#arc").hide();
            $("#arc2").hide();
        }
        if (!timer_pie) {
            $("input[id=minute]").removeAttr("readonly");
            $("input[id=second]").removeAttr("readonly");
        }
    }

    function add_m(minute) {
        if (time + minute * 60 <= max_time) {
            time = time + minute * 60;
        }
        make_target_time();
        display_time();
    }

    function add_s(second) {
        if (time + second <= max_time) {
            time = time + second;
        }
        make_target_time();
        display_time();
    }

    function make_time() {
        var m = Number($('#minute').val());
        var s = Number($('#second').val());
        time = m * 60 + s;
        make_target_time();
    }

    function started() {
        $("#btn_start").addClass('stop');
        if (timer_analog) {
            display_analog_target();
        }
        make_target_time();
        $("input[id=minute]").attr("readonly", "readonly");
        $("input[id=second]").attr("readonly", "readonly");
        $("#sec_r").show();
        $("#min_r").show();
        $("#hour_r").show();
        $("#arc").show();
    }

    function check_init() {
        var m = Number($('#minute').val());
        var s = Number($('#second').val());
        if (m == 0 && s == 0) {
            return true;
        } else {
            return false;
        }
    }

    function done() {
        clearInterval(timer_id);
        $('#timerTimerEndPopup').show();
        init_time();
    }

    function make_target_time() {
        target_time = new Date();
        target_time.setSeconds(target_time.getSeconds() + time);
    }

    function play_sound() {
        if ($("input:checkbox[id='chk1']").is(":checked") && time > 1) {
            if (clock_sound.paused) {
                clock_sound.play();
            } else {
                clock_sound.pause();
                clock_sound.currentTime = 0
                clock_sound.play();
            }
        }
        if ($("input:checkbox[id='chk2']").is(":checked")) {
            if (time == 11) {
                end_alarm_sound.play();
            }
        }
        if ($("input:checkbox[id='chk3']").is(":checked")) {
            if (time == 1) {
                end_sound.play();
            }
        }
    }

    window.addEventListener('resize', function (e) {
        if (e.target.innerWidth <= 300) {
            if (e.srcElement.innerWidth == 1024) {
                maxX = window.screenX;
                maxY = window.screenY;
            }
            if (timer_analog) {
                resize_arc(174);
            } else if (timer_pie) {
                resize_arc(205, 205);
                resize_svg(206, 206, 60);
            }
        } else {
            if (timer_analog) {
                resize_arc(717);
            } else if (timer_pie) {
                resize_arc(756, 756);
                resize_svg(756, 756, 250);
            }
        }
    });
});

//인터페이스 기본
var main = {};

function command(command, url, callback) {
    var json = {
        command: command,
        url: btoa(url),
        callback: callback
    };
    window.external.callviewer(JSON.stringify(json));
}
main.callviewer = command;

function strcallback(value) {
    console.log(value);
}
