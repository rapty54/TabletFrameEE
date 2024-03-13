$(document).ready(function () {
	onChangeYear(maxYear);
	if ($(".screenView").length > 0) {
		$($(".screenView")[0]).show();
		$($("#theme-list").children("li")[0]).addClass("on");
	}

	// 앵커태그 이동
	$('.list-themeWebzine > li > a').on('click', function(e) {
		e.preventDefault();
		var locationEl = $(this).attr('href');
		var elTop = $(locationEl).offset().top;
		var fixHeaderH = 54;

		if(!$('.header').hasClass('fix')) {
			elTop = elTop - fixHeaderH;
		}

		$('html, body').animate({
			'scrollTop': elTop - fixHeaderH
		}, 500);
	});
});

function modifyMember() {
	location.href = "/my/info/check?goURL=" + location.pathname + location.search;
}

function themePopup() {
	$('.themePopup, .themePopup > div').show();
	new Swiper('.themeSlider', {
		autoHeight : true,
		slidesPerView: 8,
		spaceBetween: 4,
		pagination: false,
		navigation: {
			nextEl: '#selNext',
			prevEl: '#selPrev',
		},
		loop: false,
		allowTouchMove: false
	});
}

function goPrev() {
	if (targetYear != maxYear) {
		onChangeYear(targetYear + 1);
	}
}

function goNext() {
	if (targetYear != minYear) {
		onChangeYear(targetYear - 1);
	}
}

function createDetail(obj, cnt) {
	$(".screenView").hide();
	$("#" + cnt).show();
	$(".list-themeWebzine li").removeClass("on");
	$("#" + obj).addClass("on")
}

function onChangeYear(val) {

	$.ajax({
		type: "POST",
		url: "/creative/subject/theme/year.html",
		cache: false,
		async: true,
		dataType: "html",
		data: {searchTypeCd2: val},
		success: function (data) {
			selectedReset(val);
			$('#itemList').html(data);
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});

	function selectedReset(val) {
		$('.yearList').removeClass('selected');
		$('#val_' + val).addClass('selected');
		targetYear = Number(val);
	}
}