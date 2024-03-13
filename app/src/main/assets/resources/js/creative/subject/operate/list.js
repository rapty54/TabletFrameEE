var firstSearchDate = ''; // 이벤트가 없는날은 당일이 될수없음 이벤트가 존재하는 미래로 설정함.
var firstSearchMm = ''; //8월31일의 경우 이벤트가 없음 -> 9월달로 조회해야함

$(document).ready(function(){
	//달력 설정
	datePickerSet('','');
	setTimeout(function() {
		selectDataDtl('', firstSearchDate,'');
	}, 500);

});



function selectDataDtl(obj, dateText, target){
	var month = '';
	var day = '';
	if (dateText != ''){
		month = dateText.substring(5,7);
		day = dateText.substring(8,10);
	}else {
		month = $(obj).val().substring(5,7);
		day = $(obj).val().substring(8,10);
	}
	Ajax.execute({
		data : {
			'month' : month,
			'day' : day
		},
		dataType : "html",
		type : "get",
		url: "/creative/subject/operate/daydata/list.html",
		success: function(data) {
			$('#currentDay').empty();
			$('#currentDay').append(data);
			selectDataDtlList(month, day);

			//obj 클래스 add
			$('#saveDate').val(parseInt(month)+'-'+parseInt(day));
			if (target != ''){
				$('td').removeClass('ui-datepicker-current-day');
				$(target).parent().addClass('ui-datepicker-current-day');
			}
		}
	});
}

//달력 설정
function datePickerSet(inYyyy, inMm){
		var yyyy = inYyyy;
		var mm = '';
		var temp = parseInt(inMm);
		if (temp < 10){
			mm = '0' + temp;
		}
		else {
			mm = inMm;
		}
		Ajax.execute({
			url: '/creative/subject/operate/daydata/year/month/count.json',
			type: 'get',
			async: true,
			data: {
				issueYyyy: yyyy,
				issueMm: mm,
				today : _today
			},
			dataType: 'json',
			success: function(data) {
				var dayList = data.response;
				yyyy = dayList[0]['searchYy'];
				mm = dayList[0]['searchMm'];
				firstSearchMm = dayList[0]['searchMm'];

				var isCheckDay = $('#saveDate').val();
				var tempYy = parseInt(yyyy);
				var tempMm = parseInt(mm);
				firstSearchMm = tempMm;

				var nextYy = '';
				var preYy = '';
				var nextMm = '';
				var preMm = '';

				if((tempMm +1) > 12) {
					nextYy = tempYy+1;
					nextMm = 1;
				}else {
					nextYy = tempYy;
					nextMm = tempMm+1;
				}
				if((tempMm -1) < 1) {
					preYy = tempYy-1;
					preMm = 12;
				}else {
					preYy = tempYy;
					preMm = tempMm-1;
				}

				var addHtml =
				  ' <button id="issueChannelPopup" onclick="javascript:allViewContents()">전체 보기</button>'
				 +' <div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"'
				 +'   style="display: block;">'
				 +'   <div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">'
				 +'     <a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="Prev"'
				 +'    onclick="javascript:datePickerSet('+"'"+preYy+"','"+preMm+"'"+')" >'
				 +'     <span class="ui-icon ui-icon-circle-triangle-w">Prev</span>'
				 +'   </a>'
				 +'   <a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="Next" '
				 +'    onclick="javascript:datePickerSet('+"'"+nextYy+"','"+nextMm+"'"+')" >'
				 +'     <span class="ui-icon ui-icon-circle-triangle-e" >Next</span>'
				 +'   </a>'
				 +'   <div class="ui-datepicker-title">'
				 +'     <span class="ui-datepicker-month">'+mm+'</span>&nbsp;'
				 +'     <span class="ui-datepicker-year">'+yyyy+'</span>'
				 +'   </div> '
				 +' </div>'
				 +' <table class="ui-datepicker-calendar">'
				 +' <thead>'
				 +' <tr>'
				 +'   <th scope="col" class="ui-datepicker-week-end">'
				 +'     <span title="Sunday">SUN</span>'
				 +'   </th> '
				 +'   <th scope="col">'
				 +'     <span title="Monday">MON</span>'
				 +'   </th>'
				 +'   <th scope="col">'
				 +'     <span title="Tuesday">TUE</span>'
				 +'   </th>'
				 +'   <th scope="col">'
				 +'     <span title="Wednesday">WED</span>'
				 +'   </th>'
				 +'   <th scope="col">'
				 +'     <span title="Thursday">THU</span>'
				 +'   </th>'
				 +'   <th scope="col">'
				 +'     <span title="Friday">FRI</span>'
				 +'   </th>'
				 +'   <th scope="col" class="ui-datepicker-week-end">'
				 +'     <span title="Saturday">SAT</span>'
				 +'   </th>'
				 +' </tr>'
				 +' </thead>'
				 +' <tbody>'

				for(var i = 0 ; i < dayList.length ; i++) {
					var temp = dayList[i]['day'];
					var forDay = '';
					if (temp < 10) {
						forDay = '0' + temp;
					}
					else {
						forDay = temp;
					}

					//주 시작일
					if (dayList[i]['dayMon'] == '1'){
						addHtml+='<tr>';
					}

					// 일자 출력
					if (dayList[i]['showYn'] == 'Y'){
						//선택한 일자 기억을 위한 변수
						var addStyle = '';
						var holiday = isHoliday(yyyy, mm, forDay, false, false);
						addStyle = holiday ? 'ui-datepicker-holiday-day' : '';

						if (isCheckDay == ''){
							if (firstSearchDate == ''){
								//이벤트 당일 처리
								if (dayList[i]['today'] == 'Y' && dayList[i]['issueDd'] == dayList[i]['day']){
									addStyle = dayList[i]['today'] == 'Y' ? 'ui-datepicker-current-day' : '';
									var temp = dayList[i]['day'];
									firstSearchDate = yyyy+'-'+mm+'-'+ (temp < 10 ? '0'+temp : temp );
								}

							}
						}
						else if (isCheckDay != ''){
							var isMonth = isCheckDay.split("-");
							if(dayList[i]['issueDd'] == isMonth[1] && dayList[i]['month'] == isMonth[0]){
								addStyle = 'ui-datepicker-current-day';
							}
						}
						//주 시작일 마무리 디자인 다르게 먹임
						if (dayList[i]['dayMon'] == '1' || dayList[i]['dayMon'] == '7'){
							addHtml+= ' <td class= "ui-datepicker-week-end  '+addStyle + '" data-handler="selectDay" data-event="click" data-month='+mm+' data-year='+yyyy+'>';
						}
						else { //평일
							addHtml+=' <td class="'+addStyle + '" data-handler="selectDay" data-event="click" data-month="'+mm+'" data-year="'+yyyy+'">';
						}

						//날자 클릭 시 이벤트 발생
						if(dayList[i]['issueDd'] == dayList[i]['day']){
							addHtml+=' <a class="ui-state-default" href="javascript:void(0);" onclick="javascript:selectDataDtl('+"'' , '"+yyyy+"-"+mm+"-"+forDay+"'"+',this);" >'
											 + forDay+'</a>';
						}else {
							addHtml+=' <a class="ui-state-default" style="border-bottom:none;">'+forDay+'</a>';
						}

						addHtml+=' </td>'

					} else { //보여주지 않기 (공백)
						addHtml+=' <td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>';
					}
					//주토요일 닫기
					if (dayList[i]['dayMon'] == '7'){
						addHtml+='</tr>';
					}
				}
				//마지막 주 공백 일자
				addHtml+=' </tbody>'
				addHtml+=' </table>'
				addHtml+=' </div>';
				$('#datepicker').empty();
				$('#datepicker').append(addHtml);

				//월 조회 후 today가 이벤트가 없는 경우 다음 월을 조회함
				if (firstSearchDate == '') {
					var searchMm = '';
					if (firstSearchMm < 10){
						firstSearchMm = firstSearchMm+1;
						searchMm = firstSearchMm >= 10 ? firstSearchMm : '0'+ firstSearchMm;
					}
					datePickerSet('', searchMm);
				}
			}
		});
}

// 일자 선택
function selectDataDtlList(month, day){
	Ajax.execute({
		data : {
			'month' : month,
			'day' : day
		},
		dataType : "html",
		type : "post",
		url: "/creative/subject/operate/daydata/listdtl.json",
		success: function(data) {
				$('.contentsArea').empty();
				$('.contentsArea').append(data);
				$('.contentsArea a').on('click',function(e){
					e.stopPropagation(); // 이벤트 차단
				});

				if (_eventId != '') {
					pageDtlListMove(_eventId, '');
				}
		}
	});
}

//전체 보기 데이터 조회
function allViewContents(month)
{
	if (month == undefined) {
		month = '';
	}

	if (month == ''){
		month = $('#getMonth').val();
	}
	var url = '/creative/subject/operate/view.popup?month='+month;
	Layer.openLayer({
		url: url,
		callback: function($div) {
			jQuery('#issueChannelAll').show();
			viewList();
		}
	});
}

//월 별 이슈 사항 조회(전체보기)
function viewList(month){
	if (month == undefined) {
		month = '';
	}
	if (month == ''){
		month = $('#getMonth').val();
	}

	$('.cntTabArea1 ul li ').each(function (index, item) {
		$(this).removeClass('on');
	});
	$('#m'+month).addClass('on');

	Ajax.execute({
		data : {
			'month' : month
		},
		dataType : "html",
		type : "post",
		url: "/creative/subject/operate/view/list.html",
		success: function(data) {
			$('.monthcontent').empty();
			$('.monthcontent').append(data);

			$('#issueChannelAll .monthcontent li a').mouseover(function(){
				$(this).siblings('.ic_arrow').css('display','inline-block');
			})
			$('#issueChannelAll .monthcontent li a').mouseleave(function(){
				$(this).siblings('.ic_arrow').css('display','none');
			})
		}
	});
}

//전체 보기 팝업에서 컨텐츠 클릭 시 이동
function getViewNewNew(isuid, mmdd, issueDate)
{
	//달력 일자 재설정
	$('#issueChannelAll').remove();
	var date = mmdd.split('.');
	$('#saveDate').val(parseInt(date[0])+'-'+parseInt(date[1]));
	console.log(data[0]);
	datePickerSet('', date[0]);
	_eventId = isuid;
	setTimeout(function() {
		selectDataDtl('', 'yyyy-'+mmdd, '');
	}, 500);
	//pageDtlListMove(isuid, '');
}
//목록 메뉴에서 컨텐츠 클릭 시 이동
function pageDtlListMove(isuid, mmdd){
	var offset = $("#subTitle" + isuid).offset();
	if (typeof offset != 'undefined') {
		$('html, body').animate({scrollTop : offset.top - 150}, 400);
	}
}

//담기
function insertFolderChk(data){
	Layer.openFolderMain({
		menu: window.globals.menu,
		type: 'CREATIVE',
		parameter: {
			code2: data,
		}
	});
}

//파일 다운로드
function fileDownload(data, downyn){
	if (!SessionUtils.isLogin(window.location.href, '자료 다운로드는 개인정보 입력 후 가능합니다. 자료는 \'학교 및 교육기관의 수업\' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다.')) {
	}
	else {
		//alert('다운로드하시는 자료는 \'학교 및 교육기관의 수업\' 목적을 위해서만 한정하여 사용되도록 저작권법의 보호를 받고 있습니다. 수업 외의 먹적으로 사용되지 않도록 주의 부탁드립니다.');
		Popup.openFileDownloadDext(data, downyn);
	}
}

// 미리보기 (사진, 영상)
function viewDataContents(obj){
	var data1 = $(obj).data("contentId");
	var data2 = $(obj).data("contentGubun");
	Popup.openViewerMain(data1, data2);
}

// 미리보기(썸네일 클릭 시)
function divDataContents(obj) {
	var data = $(obj).data();
	Popup.openViewerMain(data.contentId,  data.contentGubun);
}