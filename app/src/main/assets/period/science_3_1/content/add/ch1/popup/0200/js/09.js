var clCon, pageCon1, toggleCon1, toggleCon2;
$(document).ready(function() {
	clCon = new clickCon($('.clkArea'));
	clCon.init();

	toggleCon1 = new toggleContents($('.page1, .page2, .page3, .page4'));
	toggleCon1.init();

	toggleCon2 = new toggleContents($('.page5'));
	toggleCon2.init();

	pageCon1 = new pageingContents($('.pop1 .pageWrap'));
	pageCon1.init();

	// 플러스버튼 클릭(초기화, 페이지이동)
	$('.btns button').on('click', function() {
		var idx = $(this).index();
		pageCon1.pageMove(idx);
	})

	// 네이게이션 관련 버튼 클릭 - 초기화
	$('.pageing .dot, .prev, .next, .btn-close').on('click', function() {
		toggleCon1.reset();
		toggleCon2.reset();
		// $('.answer-wrap').find('.off, .hide, .on').removeClass('off hide on')
	})

});

clickCon = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.box = wrap.find('.bxArea div')
	this.btn = wrap.find('.cir_btn')
	this.count = 0;

	this.init = function () {

		self.btn.on('click', function () {
			$(this).hasClass('re') ? self.reset() : self.boxFunc(self.count)
			COMMONLIBRARY.tools.clickAudio();
		})
	}

	this.boxFunc = function (c) {
		// self.wrap.addClass('start')
		var obj = self.box.eq(c);
		if(obj.length > 0){
			obj.siblings('.on').removeClass('on').addClass('com')
			obj.addClass('on')
			self.btn.attr('data-count', c)
			self.count ++;
			if(self.count === self.box.length) self.btn.addClass('re')
		}
	}

	this.reset = function () {
		self.count = 0;
		// self.wrap.removeClass('start')
		self.box.removeClass('on com')
		self.btn.removeClass('re')
		self.btn.removeAttr('data-count')
	}

}
