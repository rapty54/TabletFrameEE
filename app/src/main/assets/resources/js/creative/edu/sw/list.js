$(document).ready(function (){
			//리스트 조회하기
			getList();
			
			// 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
			PaginationHandler.render({
				$target: $('#create')
			});
			
			$('#create').on('click','.detailPage',function(){
				var page  = $('#create').find('input[name=number]').val();
				if (SessionUtils.isLogin()) {
					location.href = "/creative/edu/sw/detail?boardId=" + $(this).data('seq')+"&page="+page;
				}
			});
			
			// 선생님 소개 클릭 이벤트
			$('#btn-teacher-about-layer').bind('click', function() {
				Layer.openLayer({
					url: '/creative/edu/sw/teacher/about.popup',
					callback: function(_$div) {
						var $samPop = $('body .sam_pop');
						var $wrap = $samPop.find('.sam_info_wrap');
						if ($samPop.outerHeight() < 800) {
							$wrap.css('padding', '40px');
						} else {
							$wrap.css('padding', '40px 22px 40px 40px');
						}
					}
				});
			});
		});
	
		
		//카테고리 변경
		function getList() {
			var page = $('input[name=page]').val() ==  null ? '' : $('input[name=page]').val();
			$("#page").val(page);
			$("#boardManageId").val(boardManageId);
			$tabConts = $('#create');
			Ajax.execute({
				url: '/creative/edu/sw/content.html',
				data: $("#dataForm").serialize(),
				type: 'get',
				dataType: 'html',
				success: function(html) {
					$tabConts.empty();
					$tabConts.append($(html));
				}
			});
		}
		
		function start() {
			alert("준비중입니다.");	
		}