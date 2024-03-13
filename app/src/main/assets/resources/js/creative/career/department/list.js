$(function () {
	var rootDetail2Cd = $('input[name=rootDetail2Cd]').val();
	var rootSeq =$('input[name=rootSeq]').val();
	var sortType ="";
	var isFirst = true;

	$('.allClass_tab li a').click(function(){
		$('.allClass_tab li').removeClass('on');
		$(this).parent().addClass('on');
	});

	$('.clickInitial').on('click', function () {
		$('input[name=text1]').val($(this).data('text'));
		if (typeof $(this).next('li').data('text') == "undefined") {
			$('input[name=text2]').val("W");
		} else {
			$('input[name=text2]').val($(this).next('li').data('text'));
		}
		getDepartmentPopupList();

	});

	//페이징시 &type=search 파라메터 초기화 시켜줘야됨..
	$('body').on('click', '.paging a', function(e) {
		var url = $(this).attr('href');

		if (url.indexOf("&type=search") >1) {
			var url2 = url.replace("&type=search","&type=");
			$(this).attr('href', url2);
		}

		if (url.indexOf("&type=popup") >1) {
			var url2 = url.replace("&type=popup","&type=");
			$(this).attr('href', url2);
		}
	});

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#department')
	});




	$('#department').on('click','.departmentDetail',function(){

		var data = $(this).data();
		$("#department").find("li").removeClass("on");
		var dls = "#dept_list_" + data.ceadivseq;
		$(dls).parent("li").addClass("on");

		$('input[name=rootDetail2Cd]').val(data.detail2cd);
		$('input[name=rootSeq]').val(data.ceadivseq);
		getDepartmentDetail();

	});

	var departmentTap = function() {


		var $tab = $(".department_wrap .department_tab");
		var $tabTxt = $(".department_wrap .department_tab_txt");
		var idx = 0;
		var rootDetail2Cd = $('input[name=rootDetail2Cd]').val();

		$tab.find('a').each(function() {

			if ($(this).data('code') == rootDetail2Cd) {
				$(this).parent("li").addClass("on");
				idx = $(this).parent("li").index();
				if ((idx+1)%2 == 0)
				{
					$tab.addClass("on");
				}else {
					$tab.removeClass("on");
				}

				$tabTxt.find("p").hide();
				$tabTxt.find("p").eq(idx).show();
				$("#dpm_title").text($(this).text() + "계열");
			} else {
				$(this).parent("li").removeClass("on");
			}

		});
		$tab.find("a").click(function(){
			$('input[name=type]').val("");
			$tab.find("li").removeClass("on");
			$(this).parent("li").addClass("on");
			idx = $(this).parent("li").index();
			console.log("$(this).data('code') : ", $(this).data('code'));
			$('input[name=rootDetail2Cd]').val($(this).data('code'));

			if ((idx+1)%2 == 0)
			{
				$tab.addClass("on");
			}else {
				$tab.removeClass("on");
			}

			$tabTxt.find("p").hide();
			$tabTxt.find("p").eq(idx).show();

			$('input[name=page2]').val(1);
			getDepartmentList();
			$("#dpm_title").text($(this).text() + "계열");
			return false;
		});
	}


	departmentTap();


	if (rootDetail2Cd == "" && rootSeq == "") {
		var randomTab = "#tab0" + (Math.floor(Math.random() * 7)+1);
		$(randomTab).find("a").trigger('click');
		//$('#department').find('.departmentDetail').eq(0).trigger('click');

	} else {
		getDepartmentList();
		getDepartmentDetail();

	}


	$('#popup').on('click','.departmentDetail',function(){

		var data = $(this).data();
		$("#popup").find("li").removeClass("on");
		var dls = "#dept_list_" + data.ceadivseq;
		$(dls).parent("li").addClass("on");

		$('input[name=rootDetail2Cd]').val(data.detail2cd);
		$('input[name=rootSeq]').val(data.ceadivseq);
		getDepartmentDetail();
		$('.view_allClass_pop').removeClass('on');

		var $tab = $(".department_wrap .department_tab");
		$tab.find('a').each(function(){
			if (data.detail2cd == $(this).data('code')) {
				$(this).parent("li").addClass("on");
				$("#dpm_title").text($(this).text() + "계열");
				$("input[name=type]").val("popup");
				getDepartmentList();

				var dls = "#dept_list_" + data.ceadivseq;
				$('#department').find(dls).parent("li").addClass("on");

			} else {
				$(this).parent("li").removeClass("on");
			}
		});




	});


});

function allClassPop(){
	if($('input[name=text1]').val()===''){
		$('input[name=text1]').val('ㄱ');
		$('input[name=text2]').val('ㄴ');
	}
	getDepartmentPopupList();
	$('.view_allClass_pop').toggleClass('on');
}


function checkSortType(val){
	$('input[name=page2]').val(1);
	$('input[name=sortType]').val(val);
	getDepartmentList();
}



function getDepartmentList() {

	var type = $('input[name=type]').val();
	var $tabConts = null;
	$tabConts = $('#department');
	Ajax.execute({
		url: '/creative/career/department/info/list',
		data: {
			ceaDivDetail2Cd :$('input[name=rootDetail2Cd]').val() ==  null ? '' : $('input[name=rootDetail2Cd]').val(),
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val(),
			sortType : $('input[name=sortType]').val() ==  null ? '' : $('input[name=sortType]').val(),
			ceaDivSeq : $('input[name=rootSeq]').val() ==  null ? '' : $('input[name=rootSeq]').val(),
			type : $('input[name=type]').val() ==  null ? '' : $('input[name=type]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));

			if (type != 'popup' &&  type != 'search') {
				$('#department').find('.departmentDetail').eq(0).trigger('click');
			}

			if (type == 'search') {

				var ceadivseq = $('input[name=rootSeq]').val();

				var dls = "#dept_list_" + ceadivseq;
				$(dls).parent("li").addClass("on");
			}

			if (type == 'popup') {
				var ceadivseq = $('input[name=rootSeq]').val();
				var dls = "#dept_list_" + ceadivseq;
				$(dls).parent("li").addClass("on");
			}
		}
	});
};


function getDepartmentDetail() {

	var $tabConts = null;
	$tabConts = $('#departmentDetail');
	Ajax.execute({
		url: '/creative/career/department/info/detail',
		data: {
			ceaDivDetail2Cd :$('input[name=rootDetail2Cd]').val() ==  null ? '' : $('input[name=rootDetail2Cd]').val(),
			ceaDivSeq : $('input[name=rootSeq]').val() ==  null ? '' : $('input[name=rootSeq]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			//console.log("html : ", html);
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
};



function getDepartmentPopupList() {


	var $tabConts = null;
	$tabConts = $('#popup');
	Ajax.execute({
		url: '/creative/career/department/info/popup',
		data: {
			text1 :$('input[name=text1]').val() ==  null ? 'ㄱ' : $('input[name=text1]').val(),
			text2 : $('input[name=text2]').val() ==  null ? 'ㄴ' : $('input[name=text2]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
};



