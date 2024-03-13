var clock_sound = new Audio("./tools/sound/timer_clock.mp3");
$(function(){
    var diff = 0;
    var time = 0;
    var timer_id = 0;
    var millisecond = 0;
    var num = 1;
    var max_num = 50;
    var start_time = new Date();
    var minX = window.screen.width - WIN_MIN_WIDTH - 10 + dualScreenLeft;
    var minY = window.screen.height - WIN_MIN_HEIGHT2 - 70 + dualScreenTop;
    var maxX = (window.screen.width / 2) - (WIN_BASE_WIDTH / 2);
    var maxY = (window.screen.height / 2) - (WIN_BASE_HEIGHT / 2);

    $("#btn_start").on("click", function(event) {
        if($(this).hasClass('stop')){
            clearInterval(timer_id);
            $(this).removeClass('stop');
        } else {
            $(this).addClass('stop');
            start_time = new Date();
            start_time.setSeconds(start_time.getSeconds() - time);
            timer_id = setInterval( function() {
                play_sound();
                diff = new Date().getTime() - start_time.getTime();
                time = Math.round(diff / 1000);
                display_time();
            }, 1000 );
        }
    });
    $("#btn_record").on("click", function(event) {
        if(num <= max_num ){
            var record = $('.record_list_sample li').eq(0).clone();
            var record_diff = new Date().getTime() - start_time.getTime();
            var record_mils = record_diff%1000;
            if($(btn_start).hasClass('stop')){
                millisecond = record_mils;
            }
            var record_str = twolength(parseInt(time / 60)) + ":" + twolength(parseInt(time % 60)) + "." + threelength(millisecond);
            $('.record_list').prepend(record);
            $(record).find('.num').text(twolength(num++));
            $(record).find('.record').text(record_str);
        }else {
            $('#timerSetPopup').show();
        }
    });
    $(document).on('click','.btn_delete',function(){
        $(this).closest("li").remove();
    });
    $("#btn_init").on("click", function(event) {
        time = 0;
        millisecond = 0;
        num = 1;
        display_time();
        clearInterval(timer_id);
        $("#btn_start").removeClass('stop');
        $('.record_list li').remove();
    });
	function resizeTo(width, height, x, y){
		var data={width:width, height:height, left:x, top:y};
		command("resizeWindow", JSON.stringify(data), "");
		window.resizeTo(width,height);
        window.moveTo(x, y);
	}
    $("#btn_resize").on("click", function(event) {
        resizeTo(WIN_MIN_WIDTH,WIN_MIN_HEIGHT2, minX, minY);
    });
    $("#btn_resize_min").on("click", function(event) {
        resizeTo(WIN_BASE_WIDTH,WIN_BASE_HEIGHT, maxX, maxY);
    });
    $("#btn_sound").on("click", function(event) {
        if($(this).hasClass("off")){
            $(this).removeClass("off")
        } else {
            $(this).addClass("off")
        }
    });

    function display_time(){
        var m = parseInt(time / 60);
        var s = parseInt(time % 60);
        $('#minute').val(twolength(m));
        $('#second').val(twolength(s));
    }
    function play_sound(){
        if(!$("#btn_sound").hasClass("off")){
            if (clock_sound.paused) {
                clock_sound.play();
            }else{
                clock_sound.pause();
                clock_sound.currentTime = 0
                clock_sound.play();
            }
        }
    }
});


//인터페이스 기본
var main = {}; function command(command, url, callback) { var json = { command: command, url: btoa(url), callback: callback }; window.external.callviewer(JSON.stringify(json)); } main.callviewer = command;
function strcallback(value) {
    console.log(value);
}