
$(function () {
    var iframes = document.getElementsByTagName("iframe");
    if (iframes && iframes.length > 0) {
        //iframes[0].src = iframes[0].src + location.hash;
        iframes[0].src = iframes[0].dataset["source"] + (location.hash || "");
    }
	var btnMenu = document.querySelector("#btn-mobile-menu");
	if (btnMenu) {
		btnMenu.addEventListener("click", function (evt) {
			var snb = document.querySelector(".snb");
			var isVisible = snb.className.indexOf(" visible") >= 0;
			if (!snb) return;
			if (isVisible) {
				snb.className = "snb";
			} else {
				snb.className = "snb visible";
			}
		}, false);
	}

	if (window.addEventListener) {
	    window.addEventListener("message", function (evt) {
            // 디스크에서 로드하는 경우 http/https 대신 null/가 들어온다.
	        var idx = evt.data.indexOf("null/");
	        document.location.href = idx < 0 ? evt.data : "file:///" + evt.data.substring(5);
		}, false);
	}
	prettyPrint();
});