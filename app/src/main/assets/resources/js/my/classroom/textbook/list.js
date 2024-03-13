$(function(){
	// 교과서 설정하기 레이어 오픈
	$('.btn-setting-layer-open').bind('click', function() {
		//초중고 아닌 경우 alert 처리
		if(window.globals.elementaryByMemberInfo || window.globals.middleHighByMemberInfo) {
			//일반팝업으로 변경
			Popup.openWindow({
				url: '/my/classroom/textbook/setting2.popup',
				width: 718,
				height: 773,
				name: 'textbookSettingPopup',
				callback: function ($div) {
					//팝업 종료시 내교과서 목록 새로고침
					var timer = setInterval(function () {
						if ($div.closed) {
							clearInterval(timer);
							location.reload();
						}
					}, 500);
				}
			});
		}else{
			alert("초중고 학교에 소속된 회원만 설정 가능합니다.\n회원정보수정 페이지에서 소속을 수정하시거나,\n소속 변경이 안되시면 고객센터로 문의바랍니다.");
		}

		// 과거에 사용한 레이어 팝업
		/*
		Layer.openLayer({
			url: '/my/classroom/textbook/setting.popup',
			data : $(".search-form").serialize(),
			callback: function($div) {
				// 스크롤 적용
				$div.find('.mCustomScrollbar').mCustomScrollbar();
				// 학년 select2 적용
				Select2Binder.bind($div);
				// 학년 선택 이벤트
				$div.find('select[name=grade]').bind('change', function () {
					if ($(this).val().length == 0) {
						$div.find('table tbody tr.data-tr').show();
					} else {
						$div.find('table tbody tr.data-tr').hide();

						var data = $div.find('select[name=grade] option:selected').data();
						$div.find('table tbody tr.data-tr[data-grade="' + $(this).val() + '"]').show();
						$div.find('table tbody tr.data-tr[data-grade-term="' + data.gradeTerm + '"]').show();
					}
				});
				// 학교급, 교육과정 선택 이벤트
				$div.find('input[name=mdValue]').bind('click', function () {
					Ajax.execute({
						type: 'get',
						url: '/my/classroom/textbook/setting/subject/list.html',
						data: $div.find('form').serialize(),
						dataType: 'html',
						success: function (html) {
							$div.find('.data-subject').html(html);
						}
					});
				});

				$div.find('input[name=schoolLvl]').bind('change', function () {
					Ajax.execute({
						type: 'get',
						url: '/my/classroom/textbook/setting/subject/search.json',
						data: $(".search-form").serialize(),
						success: function (result) {
							Ajax.execute({
								type: 'get',
								url: '/my/classroom/textbook/setting/subject/list.html',
								data: $div.find('form').serialize(),
								dataType: 'html',
								success: function (html) {
									$div.find('.data-subject').html(html);
								}
							});

							var html = "";
							var subjectList = result.response;
							$(".data-tr").remove();
							$.each (subjectList, function (index, subject) {
								var tr = "<tr class='data-tr' data-subject='" + subject.subject + "'>";
								tr += "<td class='date'>" + subject.mdValue + "</td>";
								tr += "<td class='subject'>" + subject.labSubject + "</td>";
								tr += "<td class='text_book'>";
								tr += "<div class='img_wrap'>";
								tr += "<a href='javascript:void(0);' class='btn-textbook-link'>";
								tr += "<img src='https://dn.vivasam.com" + subject.thumbnailPath + "' alt='" + subject.codeName + "' class='mCS_img_loaded'>" ;
								tr += "</a>";
								tr += "</div>";
								tr += "</td>";
								tr += "<td class='tit'>";
								tr += "<a href='javascript:void(0);' class='btn-textbook-link'>" + subject.codeName + "</a></td>";
								tr += "<td>";
								tr += "<input type='checkbox' id='codelist-id-" + subject.codelistId + "' name='codelistIds' value='" + subject.codelistId + "'>";
								tr += "<label for='codelist-id-" + subject.codelistId + "'></label>";
								tr += "</td>";
								tr += "</tr>";

								html += tr;
							});

							$('table tbody').append(html);
						}
					});
				});

				// 교과 이미지, 제목 선택 이벤트
				$div.on('click', 'a.btn-textbook-link', function () {
					// 체크박스 강제 클릭 이벤트
					$(this).closest('tr').find('input[name=codelistIds]').trigger('click');
				});
				// 교과 선택 이벤트
				$div.on('click', 'input[name=subjects]', function () {
					$div.find('table tbody tr.data-tr').hide();
					// 선택된 과목만..
					$div.find('input[name=subjects]:checked').each(function () {
						if ($(this).val().indexOf(",")) {	// 고등 집합 교과 처리
							var values = $(this).val().split(",");
							for (var i = 0; i < values.length; i++) {
								$div.find('table tbody tr.data-tr[data-subject="' + values[i] + '"]').show();
							}
						} else {
							$div.find('table tbody tr.data-tr[data-subject="' + $(this).val() + '"]').show();
						}
						console.info($(this).val());
					});
				});
				// 저장 이벤트
				$div.find('.btn-save').bind('click', function () {
					var items = [];
					// 선택된 항목만 반복
					$div.find('input[name=codelistIds]:checked').each(function () {
						items.push({educourseId:$(this).val()});
					});
					var data = {
						items: items
					};
					// 저장
					Ajax.execute({
						type: 'post',
						url: '/my/classroom/textbook/setting/save.json',
						data: JSON.stringify(data),
						dataType: 'json',
						contentType: 'application/json',
						success: function (response) {
							alert('설정 완료되었습니다.');
							// 레이어 삭제
							// $div.remove();
							location.reload();
						}
					});
				});

				// 초등
				// if (window.globals.elementary) {
				// 	// 학년 선택 강제 이벤트 발생
				// 	$div.find('select[name=grade]').trigger('change');
				// }
				// // 중고등
				// if (window.globals.middleHigh) {
				// 	// 최초 최근 교육과정으로 교과 정보 가져오게..
				// 	$div.find('input[name=mdValue]:first').prop('checked', true);
				// 	$div.find('input[name=mdValue]:first').trigger('click');
				// }

				// 위 코드를 회원정보에 따라 실행되게 변경
				// by 정명균(유니위즈)

				// 초등
				if (window.globals.member.schCode==='ES') {
					// 학년 선택 강제 이벤트 발생
					$div.find('select[name=grade]').trigger('change');
				}

				// 중고등
				if (window.globals.member.schCode==='MS') {
					// 최초 최근 교육과정으로 교과 정보 가져오게..
					// $("#school-id1").prop('checked', true);
					$div.find('input[name=mdValue]:first').prop('checked', true);
					$div.find('input[name=mdValue]:first').trigger('click');
				} else if (window.globals.member.schCode==='HS') {
					// 최초 최근 교육과정으로 교과 정보 가져오게..
					// $("#school-id2").prop('checked', true);
					$div.find('input[name=mdValue]:first').prop('checked', true);
					$div.find('input[name=mdValue]:first').trigger('click');
				}

			}
		});
		*/

	});
	// 삭제 버튼
	$('#my_book_list .btn_del').bind('click', function() {
		if (!confirm('정말 삭제하시겠습니까?')) {
			return false;
		}
		var data = $(this).data();
		// 저장
		Ajax.execute({
			type: 'post',
			url: '/my/classroom/textbook/delete.json',
			data: {
				educourseId: data.educourseId
			},
			dataType: 'json',
			success: function(response) {
				alert('삭제가 완료되었습니다.');
				location.reload();
			}
		});
	});
	// 변경 버튼
	$('.btn-change').bind('click', function() {
		if (textbookInfo.levelCode == null) {
			alert('회원정보수정에서 학교급을 설정해 주세요.');
			return false;
		}
		$(this).hide();
		$(this).closest('.subjects').find('.change-item').show();
		$(this).closest('.subjects').find('.display-item').hide();
	});
	// 변경 버튼
	$('.btn-subject-save').bind('click', function() {
		// 저장
		Ajax.execute({
			type: 'post',
			url: '/my/classroom/textbook/subject/update.json',
			data: {
				main: $(this).data().main,
				mainSubject: $('select[name=mainSubject]').val(),
				secondSubject: $('select[name=secondSubject]').val(),
			},
			dataType: 'json',
			success: function(response) {
				alert('교과 정보가 변경되었습니다.');
				location.reload();
			}
		});
	});
});