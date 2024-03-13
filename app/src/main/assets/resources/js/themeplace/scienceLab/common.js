$(function () {
	//main tab
	$('.tabCon:first').show();
	$('.tabCon #tabBox1').show();
	
	$('.tabGrade li').hover(function () {
		$('.tabGrade li').removeClass("tabOn");
		$(this).addClass("tabOn");
		$('.tabCon').hide();
		var activeTab1 = $(this).attr("rel");
		$("#" + activeTab1).show();
		$('.tabClass li').removeClass("tabOn");
		$('.tabClass li:first-child').addClass("tabOn");
		$('section .tabTxtBox:first-child').show();
	});
	
	$('.tabClass li').hover(function () {
		$('.tabClass li').removeClass("tabOn");
		$(this).addClass("tabOn");
		$('.tabTxtBox').hide();
		var activeTab2 = $(this).attr("rel");
		$("#" + activeTab2).show();
	});
	
	//sub nav tab
	// $('.navWrap .tab1>li a').click(function () {
	//
	// 	$('.navWrap .tab1 .tab2').hide();
	// 	$('.navWrap .tab1>li a').removeClass('on');
	// 	console.log($(this));
	// 	console.log($(this).hasClass('on'));
	//
	// 	if($('#gradeText').hasClass('on') === true) {
	// 		$(this).removeClass('on');
	// 		$(this).next('.tab2').hide();
	// 	} else {
	// 		$(this).addClass('on');
	// 		$(this).next('.tab2').show();
	// 	}
	// });
	//
	//
	//Popup
	$('.guide').click(function () {
		$('.dim').show();
		$('#popupGuide').show();
	});
	$('.btnClose').click(function () {
		$(this).parents('#popupGuide').hide();
		$('.dim').hide();
	});
	
	//Popup
	$('.intro').click(function () {
		$('.dim').show();
		$('#popupTeacher').show();
	});
	$('.btnClose').click(function () {
		$(this).parents('#popupTeacher').hide();
		$('.dim').hide();
	});
});