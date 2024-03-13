$(function () {

	// 집필진 소개
	$('#btn-researchers-layer-open').bind('click', function() {
		// 팝업창 호출
		Layer.openLayer({
			url: '/class/alive/edutech/staffIntroEdu.popup',
			callback: function() {
			}
		});
	});


});

function downloadPopup(contentId){
	if (SessionUtils.isLogin(window.location.href)) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				// 새창으로 다운로드 호출
				Popup.openFileDownloadDext(contentId);
			}
		});
	}
}

function starPlayerPlay(e, url){
	if (!window.globals.login) {
		alert("로그인이 필요한 서비스입니다.");
		if (StringUtils.isNotEmpty("/class/alive/edutech/list")) {
			location.href = '/member/login?goURL=' + "/class/alive/edutech/list";
		} else {
			location.href = '/member/login';
		}
		return false;
	} else {
		// GA 처리
		var title = $(e).parent('.lst').prev().prev().prev().children('.tl').text();
		gtag('event', '온라인 교실 생존비법', {
			'event_category' : '수업혁신',
			'event_label' : title,
			'value': 1
		});
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				Popup.openViewerStarplayer(url);
			}
		});
	}
}

function ocswTeacherPopup(){
	$('.ocsw-teacher-popup').parent('div').show();
	$('.ocsw-teacher-popup + .dimmed').show();
}


var t,n;
window.hcNy={},t=jQuery,(n={}).ojj={
	INIT:function(){
		this.TEFT(),
			this.TSCRL(),
			this.TCLICK(),
			this.POPUP()
	},
	TEFT:function(){
		var n=$(window).scrollTop();
		$(".hc_200609 .conts");
		n>=$(".online_class_survive_way .ocsw_func").offset().top-54+$(".online_class_survive_way .ocsw_func").outerHeight()+-0-$(".online_class_survive_way .ocsw_func .inner").outerHeight()?$(".online_class_survive_way .ocsw_func").addClass("is-active"):$(".online_class_survive_way .ocsw_func").removeClass("is-active")
	},
	TSCRL:function(){
		var n=this;
		t(window).on("scroll",function(){
				n.TEFT()
			}
		)},
	TCLICK:function(){
		var headerH=$(".header").outerHeight();
		var n=$(".online_class_survive_way");
		var tblTop=$(".ocsw_tbl")[0].offsetTop;
		var tblHead=$(".ocsw_tbl>thead").outerHeight();
		n.find(".ocsw_func a").on("click",function(){
			var s=$(this),
				o=s.attr("id").replace("f_","");
			return s.index()>0?(n.find(".ocsw_tbl tbody tr").css("display","none"),n.find(".ocsw_tbl tbody tr."+o).css("display","")):n.find(".ocsw_tbl tbody tr").css("display",""),n.find(".ocsw_func a").removeClass("on"),s.addClass("on"),$(window).scrollTop((headerH+tblTop)-(tblHead+115)),!1
		})
	},
	POPUP:function(){
		var n=$(".sub_conts2020"),
			s=$(".ocsw-teacher-popup"),
			o=$(".dimmed");
		n.find(".ocsw_top a").click(function(){
			return s.parent().show(),o.show(),s.css({top:$(window).scrollTop()}),!1
		}),
			s.find(".close").click(function(){
				return s.parent().hide(),o.hide(),!1
			})
	}
},
	hcNy=n.ojj,$.when($.Deferred(function(n){
	$(n.resolve)
}))
	.done(function(){
		hcNy.INIT()
	});

function popOpen(url){
	/*
	요청사항 [RMS-8247] :[개발]수업연구소 이북 클릭시 교사인증 체크 요청
	교사인증 체크로직 추가
	2021-08-17 김인수
	 */
	// 새창으로 팝업
	if (SessionUtils.isLogin(window.location.href)) {
		SessionUtils.confirmValidMember(function(valid) {
			if (valid) {
				var win = window.open(url, '_blank');
				win.focus();
			}
		});
	}
}