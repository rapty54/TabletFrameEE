$(function () {
	//main tab
	$('#contTeach .tabCon').hide();
	$("#contTeach .tabCon:first").show();
	$('.tabGrade li').click(function () {
		$('.tabGrade li').removeClass("on").css("width","126px");
		$(this).addClass("on").css("width","193px");
		$('#contTeach .tabCon').hide();
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).show();
	});
	
	//main Popup
	$('.popBtn').click(function () {
		$('.dim').show();
		$('#popupGuide').show();
	});
	$('.btnClose').click(function () {
		$(this).parents('#popupGuide').hide();
		$('.dim').hide();
	});
	
	//nav tab
	// $('.tab1>li a').click(function () {
	// 	if($(this).hasClass('open')) {
	// 		$(this).removeClass('open');
	// 		$(this).children('button').removeClass('navTabUp').addClass('navTabDown');
	// 		$(this).next('.tab2').hide();
	// 	} else {
	// 		$(this).addClass('open');
	// 		$(this).children('button').removeClass('navTabDown').addClass('navTabUp');
	// 		$(this).next('.tab2').show();
	// 	}
	// });

	//PopUp
	$('.btnInst').click(function () {
		$('.dim').show();
		$('.popInst').parents('#popupSub').show();
	});
	$('.btnAct').click(function () {
		$('.dim').show();
		$('.popAct').parents('#popupSub').show();
	});
	$('.btnClose').click(function () {
		$(this).parents('#popupSub').hide();
		$('.dim').hide();
	});
});