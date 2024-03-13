'use strict';

document.addEventListener('DOMContentLoaded', function () {
	var view = COMMONLIBRARY.view;
	var tools = COMMONLIBRARY.tools;

	view.setScale();
	view.initDeco();
	view.setDeco();
	tools.methodTab();
	tools.effectBox();
	tools.slider();
	tools.popLayer();
	tools.mathForm();
	tools.popBtn();
	tools.oxQuiz();
	tools.aniReload();
	tools.formVert();
	tools.drawTool();

	COMMON_METHOD_VIDEO();

	$("body").addClass("dev");
	
	$('[data-component]').on('getScaleChange', function() {
		view.setScale();
	});
});



window.addEventListener('resize', COMMONLIBRARY.view.setScale);


window.addEventListener('resize', COMMONLIBRARY.view.setButtonPos);
window.addEventListener('load', COMMONLIBRARY.view.setSlidBtnPos);