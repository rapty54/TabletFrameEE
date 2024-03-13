var WIN_BASE_WIDTH = 1024;
var WIN_BASE_HEIGHT = 542;
var WIN_MIN_WIDTH = 300;
var WIN_MIN_HEIGHT = 200;
var WIN_MIN_HEIGHT2 = 350;
var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
var base_X = (screen.availWidth / 2) - (WIN_BASE_WIDTH / 2);
var base_Y = (window.screen.height / 2) - (WIN_BASE_HEIGHT / 2);

if (window.screenLeft < 0) {
    base_X += window.screen.width * -1;
} else if (window.screenLeft > window.screen.width) {
    base_X += window.screenLeft;
}

$(function () {
    $(document).on("click", "input,textarea", function (e) {
        var $this = $(this)
            .one('mouseup.mouseupSelect', function () {
                $this.select();
                return false;
            })
            .one('mousedown', function () {
                $this.off('mouseup.mouseupSelect');
            })
            .select();

    });

});

function twolength(n) {
    return (n < 10 ? '0' : '') + n
}

function threelength(n) {
    if (n < 10) return '00' + n;
    else if (n < 100) return '0' + n;
    else return '' + n;
}

function check_length(len, target) {
    if ($(target).val().length > len) {
        $(target).val($(target).val().substr(0, len));
    }
}

function check_max(max, target) {
    $(target).val($(target).val().replace(/[^0-9]/g, ''));
    if (Number($(target).val()) > max) {
        $(target).val(max);
    }
}

function check_min(min, target) {
    $(target).val($(target).val().replace(/[^0-9]/g, ''));
    if (Number($(target).val()) < min) {
        $(target).val('');
    }
}
