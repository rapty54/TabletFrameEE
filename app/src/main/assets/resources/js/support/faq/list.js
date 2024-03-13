$(function () {
	$('.faq_question').click(function () {
		if (!$(this).hasClass('on')) {
			$('.faq_question').next().stop().slideUp(200);
			$('.faq_question').next().find('.answer_wrap').stop().slideUp(200);
			$('.faq_question').removeClass('on');
			$(this).next().stop().slideDown(200);
			$(this).next().find('.answer_wrap').stop().slideDown(200);
			$(this).addClass('on');
		} else if ($(this).hasClass('on')) {
			$(this).next().stop().slideUp(200);
			$(this).next().find('.answer_wrap').stop().slideUp(200);
			$(this).removeClass('on');
		}
	});

	// 분류 변경시 조회 1
	$("#schLvlCds0").on('change',function() {
		$("#dataForm").submit();
	});

	// 분류 변경시 조회 2
	$("#schLvlCds1").on('change',function() {
		$("#dataForm").submit();
	});
});

$(window).load(function() {
	// 상세 내용 펼침 및 스크롤 이동
	if(faqId != null && faqId != '') {
		var target = $('#faq_' + faqId);
		$('.faq_question').next().stop().slideUp(200);
		$('.faq_question').next().find('.answer_wrap').stop().slideUp(200);
		$('.faq_question').removeClass('on');
		$(target).next().stop().slideDown(200);
		$(target).next().find('.answer_wrap').stop().slideDown(200);
		$(target).addClass('on');

		var targetTop = $(target).offset().top;
		$('html, body').animate({scrollTop : targetTop});
		//$('html, body').scrollTop(targetTop);
	}
});

// //분류 변경시 조회 1
// function selectListDiv1(data){
// 	$('#schLvlCd').val(data);
// 	$('#dataForm').submit();
// }
// //분류 변경시 조회 2
// function selectListDiv2(data){
// 	$('#schFaqCd').val(data);
// 	$('#dataForm').submit();
// }