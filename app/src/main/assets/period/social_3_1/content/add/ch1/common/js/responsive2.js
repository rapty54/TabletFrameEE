
'use strict';

var FORTEACHERCD = FORTEACHERCD || {};

FORTEACHERCD.responsive = (function () {
	var responsive = {
		baseContainerSize : {
			width : 1920,
			height : 1080,
			zoom : 0
		},
		currentContainerSize : {
			containerWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			containerHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		},
		setScaleElement : function (targetElement, adjust) {
		    var bgContainer = document.querySelector('#container'),
		   		zoomVertical = this.currentContainerSize.containerHeight / targetElement.clientHeight,
				zoomHorizontal = this.currentContainerSize.containerWidth / targetElement.clientWidth;

			var	zoomVerticalBg = (this.currentContainerSize.containerHeight / bgContainer.clientHeight) * 1.0;
			var	zoomHorizontalBg = (this.currentContainerSize.containerWidth / bgContainer.clientWidth) * 1.0;

			if (targetElement.clientWidth * zoomVertical > this.currentContainerSize.containerWidth) {
				this.setTransformCSS(targetElement, zoomHorizontal);
				targetElement.style.top = ((this.currentContainerSize.containerHeight - (targetElement.clientHeight * zoomHorizontal)) / 2)  + 'px';
				this.baseContainerSize.zoom = zoomHorizontal;

				this.setTransformCSS(bgContainer, zoomHorizontalBg);
				bgContainer.style.top = ((this.currentContainerSize.containerHeight - (bgContainer.clientHeight * zoomHorizontalBg)) / 2)  + 'px';
				bgContainer.style.backgroundSize = "132.6% auto";

			} else {

				this.setTransformCSS(targetElement, zoomVertical);
				targetElement.style.left = ((this.currentContainerSize.containerWidth - (targetElement.clientWidth * zoomVertical)) / 2)  + 'px';
				this.baseContainerSize.zoom = zoomVertical;

				this.setTransformCSS(bgContainer, zoomVerticalBg);
				bgContainer.style.left = ((this.currentContainerSize.containerWidth - (bgContainer.clientWidth * zoomVerticalBg)) / 2)  + 'px';
				bgContainer.style.backgroundSize = "auto 156%";
			}
		},
		setTransformCSS : function (targetElement, zoomRate) {
			targetElement.style.transform = 'scale(' + zoomRate + ',' + zoomRate + ')';
			targetElement.style.transformOrigin = '0% 0%';
			targetElement.style.top = 0;
			targetElement.style.left = 0;
		}
	};

	return responsive;
})();

var isMobile,downEvent,moveEvent,upEvent,clickEvent;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobile = true;

	downEvent = "touchstart";
	moveEvent = "touchmove";
	upEvent = "touchend";
	clickEvent = "tap";
} else {
	isMobile = false;

	downEvent = "mousedown";
	moveEvent = "mousemove";
	upEvent = "mouseup";
	clickEvent = "click"
}
