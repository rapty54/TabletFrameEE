//수업 도우미 CDN 업로드 경로
const ClassHelperURL = "https://dn.vivasam.com/api/class"

if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
        i = matches.length;
        while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

$(function() {
    var btn = document.querySelectorAll(".popup_container .btn.close");

    for (var i=0; i<btn.length; i++) {
        btn[i].addEventListener("click", darkScreenCloseExitFullscreen);
    }
    //document.getElementsByClassName("dark_container")[0].addEventListener("click", darkScreenCloseExitFullscreen);
});

function openParams(type, naviOpen) {
    var width = 1280;
    var height = 677;

    const agent = navigator.userAgent.toLowerCase();
    var browser;

    if (/safari/.test(agent) && !/chrome/.test(agent)) {
        browser = "safari";
        height = 706;
    }
    else if(/edg/.test(agent)) {
        browser = "edge";
    }

    var left = Math.ceil((window.screen.width - width)/2);
    var top = Math.ceil((window.screen.height - height)/2);

    // dual monitor
    if (window.screen.availLeft > 0) {
        left += (window.screen.availLeft);
    }

    var options = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",resizable=yes,scrollbars=no";
    var naviOpenValue = 0;
    if (!naviOpen) {
    	naviOpenValue = 1;
    }
    var newWindow = window.open(ClassHelperURL + "/index.html?type=" + type + "&navOpen=" + naviOpenValue, "dafault", options);
    newWindow.focus();
}

function darkScreen() {
    /*
    var darkContainer = document.querySelectorAll(".dark_container")[0];
    darkContainer.classList.add("show");
    changeFullscreen(darkContainer);
    */
    window.open(ClassHelperURL + '/darkscreen.html','화면 가리기','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
}

function darkScreenCloseExitFullscreen(e) {
    var target = e.currentTarget;
    var popup = target.closest(".popup_container");
    popup.classList.remove("show");

    if (popup.classList.contains("full")) {
        exitFullscreen();
    }
}

function openAttention() {
    var src = "neon_emotion.mp4"
    window.open(ClassHelperURL + '/attention.html?src=' + src + '','주목','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

function changeFullscreen(container) {
    if (container.requestFullscreen) container.requestFullscreen();
    else if (container.msRequestFullscreen) container.msRequestFullscreen();
    else if (container.mozRequestFullScreen) container.mozRequestFullScreen();
    else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
}
