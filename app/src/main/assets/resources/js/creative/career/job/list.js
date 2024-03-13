$(function () {
	getJobList();

	//소팅(최신순, 인기순, 좋아요순)
	$('#holland_select').on('change',function(){
		$('input[name=page2]').val(1);
		$('input[name=ceaDivDetail2Cd]').val($(this).val());
		getJobList();

	});

	//소팅(최신순, 인기순, 좋아요순)
	$('#holland_select_type').on('change',function(){
		$('input[name=page2]').val(1);
		$('input[name=ceaDivDetail3Cd]').val($(this).val());
		getJobList();

	});

	//소팅(최신순, 인기순, 좋아요순)
	$('#seatchBtn').on('click',function(){
		$('input[name=page2]').val(1);
		$('input[name=searchKeyword]').val();
		getJobList();

	});

	// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
	PaginationHandler.render({
		$target: $('#jobContent')
	});


/*	$('#jobContent').on('click','.pageNext',function(){
		$('input[name=page2]').val($(this).data('number'));
		getJobList();

	});*/

	$('#jobContent').on('click','.detailPage',function(){
		console.log("$(this).data('number') : ", $(this).data('seq'))
		var page  = $('#jobContent').find('input[name=number]').val();
		var ceaDivDetail2Cd  = $('input[name=ceaDivDetail2Cd]').val();
		location.href = "/creative/career/job/detail?ceaDivSeq=" + $(this).data('seq')+"&page="+page+"&ceaDivDetail2Cd="+ceaDivDetail2Cd;

	});

	// 2021-12-20 직업 영상 신규 자료 업데이트 팝업
	if (StorageUtils.isOpened('JOB-UPDATE-CLOSE')) {
		Layer.openLayer({
			url: '/creative/career/job/job-data-update.popup',
			callback: function ($div) {
				// 다시 보지 않기
				$div.find('input[name=display]').bind('click', function () {
					if ($(this).prop('checked')) {
						// 일자만 저장
						StorageUtils.setValueDate('JOB-UPDATE-CLOSE');
					} else {
						StorageUtils.remove('JOB-UPDATE-CLOSE');
					}
				});
				$div.find('.popup_close').bind('click', function () {
					$div.remove();
				});
			}
		});
	}
});

function hollandPop(){
	$('.holland_pop, .holland_pop > div').show();
};

function getJobList() {

	console.log("ceaDivDetail2Cd : ", $('input[name=ceaDivDetail2Cd]').val())
	var $tabConts = null;
	$tabConts = $('#jobContent');
	Ajax.execute({
		url: '/creative/career/job/info/list',
		data: {
			ceaDivDetail2Cd :$('input[name=ceaDivDetail2Cd]').val() ==  null ? '' : $('input[name=ceaDivDetail2Cd]').val(),
			ceaDivDetail3Cd : $('input[name=ceaDivDetail3Cd]').val() ==  null ? '' : $('input[name=ceaDivDetail3Cd]').val(),
			searchKeyword : $('input[name=searchKeyword]').val() ==  null ? '' : $('input[name=searchKeyword]').val(),
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val()
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
};
