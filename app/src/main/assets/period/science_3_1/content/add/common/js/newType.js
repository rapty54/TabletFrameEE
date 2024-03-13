var newType = {
	//정답음
	correctSound: function () {
		AudioPlayer.play("../../../common/media/correct_b.mp3");
	},

	//오답음
	wrongSound: function () {
		AudioPlayer.play("../../../common/media/wrong_b.mp3");
	},

	//디버그 모드인경우 g_floatEl의 드래그 설정
	setActivityElDebug: function () {
		$('.floatEl')
			.draggable({
				cancel: false,
				stop: function () { // 드래그 종료시 실행
					console.log($(this).attr("class") + " / top:" + Math.round(parseInt($(this).css("top"))) + "px; left:" + Math.round(parseInt($(this).css("left"))) + "px;")
				}
			});
	},

	/*
	 * ********** 퀴즈타입 : 블랭크입력, 확인하기, 다시풀기, 정오반응
	 * */
	blankQuiz: function () {
		//정오반응 버튼 클릭 시
		$(".nt_btnAnswer").on("click    ", function () {
			var correctAnswer = $(this).parents(".nt_answerWrap").find(".nt_answer").attr("data-answer");
			var inputAnswer = $(this).parents(".nt_answerWrap").find(".nt_answerInput").val();

			if (correctAnswer == inputAnswer) {
				//정답인경우
				AudioPlayer.play("../../../common/media/correct_b.mp3");
				$(this).parents(".nt_answerWrap").find(".nt_answerInput").hide();
				$(this).parents(".nt_answerWrap").find(".nt_answer").show();
				$(this).parents(".nt_answerWrap").find(".nt_answer").css("opacity", 0);
				$(this).parents(".nt_answerWrap").find(".nt_answer").animate({
					opacity: 1
				}, 300, "linear");

				$(this).parents(".nt_answerWrap").find(".nt_btnAnswer").hide();

				$(this).parents(".nt_answerWrap").find(".nt_correctMark").show();

				$(".nt_btnReset").prop("disabled", false);
			} else {
				//오답인경우
				AudioPlayer.play("../../../common/media/wrong_b.mp3");
			}
		});

		//다시풀기 버튼 클릭 시
		$(".nt_btnReset").on("click", function () {
			$(".nt_answerInput").val("");
			$(".nt_btnAnswer").show();
			$(".nt_answer").hide();
			$(".nt_answerInput").show();

			$(".nt_correctMark").hide();

			AudioPlayer.play("../../../common/media/popup_b.mp3");

			$(".nt_btnReset").prop("disabled", true);
		});

		//확인하기 버튼 클릭 시
		$(".nt_btnConfirm").on("click", function () {
			$(".nt_answerInput").hide();
			$(".nt_answer").show();
			$(".nt_answer").css("opacity", 0);
			$(".nt_answer").animate({
				opacity: 1
			}, 300, "linear");

			$(".nt_btnAnswer").hide();
			$(".nt_correctMark").hide();

			AudioPlayer.play("../../../common/media/popup_b.mp3");

			$(".nt_btnReset").prop("disabled", false);
		});
	},


	/*
	 * ********** 퀴즈타입 : 객관식 퀴즈
	 * */
	multipleChoiceQuiz: function () {
		$(".nt_choiceList li").on("click", function () {
			if ($(this).hasClass("correct") == true) {
				//정답인경우
				AudioPlayer.play("../../../common/media/correct_b.mp3");

				$(this).addClass("on");
				$(this).find(".nt_correctMark").show();
			} else {
				//오답인경우
				AudioPlayer.play("../../../common/media/wrong_b.mp3");
			}
		});
	},

	initMultipleChoiceQuiz: function () {
		$(".nt_choiceList li").removeClass("on");
		$(".nt_choiceList li .nt_correctMark").hide();
	},

	/*
	 * ********** 퀴즈타입 : 양자택일
	 * */
	alternativeQuiz: function () {
		//버튼 클릭 시
		$(".nt_alternativeWrap .nt_btnAnswer").on("click", function () {
			if ($(this).parents(".text").hasClass("correct") == true) {
				//정답인 경우
				AudioPlayer.play("../../../common/media/correct_b.mp3");
				$(this).parents(".nt_alternativeWrap").addClass("complete");

				$(".nt_btnReset").prop("disabled", false);
			} else {
				//오답인 경우
				AudioPlayer.play("../../../common/media/wrong_b.mp3");
			}
		});


		//다시풀기 버튼 클릭 시
		$(".nt_btnReset").on("click", function () {
			$(".nt_alternativeWrap").removeClass("complete");

			AudioPlayer.play("../../../common/media/popup_b.mp3");

			$(".nt_btnReset").prop("disabled", true);
		});

		//확인하기 버튼 클릭 시
		$(".nt_btnConfirm").on("click", function () {
			$(".nt_alternativeWrap").addClass("complete");

			AudioPlayer.play("../../../common/media/popup_b.mp3");

			$(".nt_btnReset").prop("disabled", false);
		});
	},


	/*
	 * ********** 퀴즈타입 : 선긋기
	 * */
	lineDrawDragObj: null,
	lineDrawDropObj: null,

	lineDrawNumAnswer: "",
	completeCnt: 0, //--add
	lineDrawQuiz: function (_numAnswer) {

		newType.lineDrawNumAnswer = _numAnswer;
		newType.completeCnt = 0; //--add

		//확인하기 버튼
		$(".nt_btnConfirm").on("click", function () {
			newType.completeCnt = newType.lineDrawNumAnswer; //--add
			COMMONLIBRARY.tools.clickAudio(); //--add
			$(this).prop("disabled", true); //--add

			newType.lineDrawDragObj = null;
			newType.lineDrawDropObj = null;

			$(".nt_lineDragArea .dragItem").each(function () {
				var matchId = $(this).attr("data-match-id");
				$(this).css("top", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("top"));
				$(this).css("left", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("left"));
			});

			newType.setDragLinePos();

			$(".nt_btnReset").prop("disabled", false);
		});

		//다시풀기 버튼
		$(".nt_btnReset").on("click", function () {
			newType.completeCnt = 0; //--add
			COMMONLIBRARY.tools.clickAudio(); //--add
			newType.initLineDraw(); //--add

			$(".nt_btnReset").prop("disabled", true);

			$(".nt_btnConfirm").prop("disabled", false); //--add
		});


		//드래그객체 원래 포지션 저장
		$(".nt_lineDragArea .dragItem").each(function () {
			$(this).attr("data-top", $(this).css("top"));
			$(this).attr("data-left", $(this).css("left"));
		});

		//라인요소 위치설정
		$(".nt_lineWrap line").each(function (index) {
			$(this).attr("x1", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("left")) + 15);
			$(this).attr("y1", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("top")) + 15);

			$(this).attr("x2", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("left")) + 15);
			$(this).attr("y2", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("top")) + 15);
		});


		//드래그 설정
		var click = {
			x: 0,
			y: 0
		};

		$('.nt_lineDragArea .dragItem').draggable({

			start: function (event) {
				click.x = event.clientX;
				click.y = event.clientY;
			},

			drag: function (event, ui) {
				newType.lineDrawDragObj = $(this);

				// scale에따른 드래그 오차 조정
				var zoom = COMMONLIBRARY.view.scale;

				var original = ui.originalPosition;

				// jQuery will simply use the same object we alter here
				ui.position = {
					left: (event.clientX - click.x + original.left) / zoom,
					top: (event.clientY - click.y + original.top) / zoom
				};

				newType.setDragLinePos();

			},

			stop: function () {
				newType.checkLineDrawAnswer();
			}

		});
		$(".nt_lineDragArea .dropItem").droppable({
			drop: function (event, ui) {
				newType.lineDrawDropObj = $(this);
			},
			over: function (event, ui) {

			},
			out: function (event, ui) {

			}
		});
	},
	// --add
	lineDrawQuiz2: function (_numAnswer) {
		newType.lineDrawNumAnswer = _numAnswer;
		newType.completeCnt = 0;

		// 확인하기 클릭
		$(".nt_btnConfirm").on("click", function () {
			newType.completeCnt = newType.lineDrawNumAnswer;
			$(this).prop("disabled", true);

			newType.lineDrawDragObj = null;
			newType.lineDrawDropObj = null;

			var state = false;

			$(".nt_lineDragArea .dragItem").each(function () {
				var matchId = $(this).attr("data-match-id");
				var dropId = $(this).attr("data-drop");

				if (matchId !== dropId) {
					state = false;
					return false;
				}
				state = true;
			});

			$('.nt_lineWrap').addClass('com');

			// 입력 없는 경우
//			if ($('.nt_lineDragArea .dropItem.on').length < newType.lineDrawNumAnswer) {
			if ($('.nt_lineDragArea .dropItem.on').length == 0) {
				COMMONLIBRARY.tools.correctAudio();
				$(".nt_lineDragArea .dragItem").each(function () {
					var matchId = $(this).attr("data-match-id");
					$(this).css("top", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("top"));
					$(this).css("left", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("left"));
				})

				$('.nt_lineDragArea .dropItem').addClass('on');

				newType.setDragLinePos();

			} else {
				// 정답
				if (state) {
					COMMONLIBRARY.tools.correctAudio();

				} else { // 오답
					COMMONLIBRARY.tools.wrongAudio();
					$(".nt_lineDragArea .dragItem").each(function () {
						var matchId = $(this).attr("data-match-id");
						$(this).css("top", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("top"));
						$(this).css("left", $(".nt_lineDragArea .dropItem[data-match-id=" + matchId + "]").css("left"));
					})
					newType.setDragLinePos();

				}
			}

			$(".nt_btnReset").prop("disabled", false);
		});

		//다시풀기 클릭
		$(".nt_btnReset").on("click", function () {
			if($('.nt_lineDragArea .dropItem.on').length === 0) return false;

			newType.completeCnt = 0;
			ado_stop();
			COMMONLIBRARY.tools.clickAudio();
			newType.initLineDraw();

			$(".nt_btnReset").prop("disabled", true);
			$(".nt_btnConfirm").prop("disabled", false);
			$('.nt_lineWrap').removeClass('com');
			$('.nt_lineDragArea .dropItem').removeClass('on');
			$('.nt_lineDragArea .dragItem').removeClass('on').removeAttr('data-drop');
		});


		//드래그객체 원래 포지션 저장
		$(".nt_lineDragArea .dragItem").each(function () {
			$(this).attr("data-top", $(this).css("top"));
			$(this).attr("data-left", $(this).css("left"));
		});

		//라인요소 위치설정
		$(".nt_lineWrap line").each(function (index) {
			$(this).attr("x1", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("left")) + 15);
			$(this).attr("y1", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("top")) + 15);

			$(this).attr("x2", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("left")) + 15);
			$(this).attr("y2", parseInt($('.nt_lineDragArea .dragItem').eq(index).css("top")) + 15);
		});


		//드래그 설정
		var click = {
			x: 0,
			y: 0
		};

		// 선잇기
		$('.nt_lineDragArea .dragItem').draggable({
			start: function (event) {
				click.x = event.clientX;
				click.y = event.clientY;
			},

			drag: function (event, ui) {
				newType.lineDrawDragObj = $(this);

				// scale에따른 드래그 오차 조정
				var zoom = COMMONLIBRARY.view.scale;

				var original = ui.originalPosition;

				ui.position = {
					left: (event.clientX - click.x + original.left) / zoom,
					top: (event.clientY - click.y + original.top) / zoom
				};

				newType.setDragLinePos();

			},

			stop: function () {
				newType.checkLineDrawAnswer2();
			}

		});

		// 드롭
		$(".nt_lineDragArea .dropItem").droppable({
			drop: function (event, ui) {
				newType.lineDrawDropObj = $(this);
			},
			over: function (event, ui) {

			},
			out: function (event, ui) {

			}
		});
	},

	// -- add
	lineDrawQuiz2Reset: function () {
		newType.completeCnt = 0;
		newType.initLineDraw();

		$(".nt_btnReset").prop("disabled", false);
		$(".nt_btnConfirm").prop("disabled", false);
		$('.nt_lineWrap').removeClass('com');
		$('.nt_lineDragArea .dropItem').removeClass('on');
	},

	setDragLinePos: function () {
		$(".nt_lineWrap line").each(function (index) {
			var matchId = $(this).attr("data-match-id");
			$(this).attr("x2", parseInt($('.nt_lineDragArea .dragItem[data-match-id=' + matchId + ']').css("left")) + 15);
			$(this).attr("y2", parseInt($('.nt_lineDragArea .dragItem[data-match-id=' + matchId + ']').css("top")) + 15);
		});
	},

	checkLineDrawAnswer: function () {
		//       	var completeCnt = 0;

		if (newType.lineDrawDropObj != null) {
			if (newType.lineDrawDragObj.attr("data-match-id") == newType.lineDrawDropObj.attr("data-match-id")) {
				newType.correctSound();

				newType.lineDrawDragObj.css("top", newType.lineDrawDropObj.css("top"));
				newType.lineDrawDragObj.css("left", newType.lineDrawDropObj.css("left"));

				$(".nt_btnReset").prop("disabled", false);

				newType.completeCnt++;

			} else {
				newType.wrongSound();

				newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
				newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
			}
		} else {
			newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
			newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
		}

		newType.setDragLinePos();

		//라인을 모두 이은경우
		if (newType.lineDrawNumAnswer == newType.completeCnt) {
			$(".nt_btnConfirm").prop("disabled", true); //--add
		}


	},

	//--add
	checkLineDrawAnswer2: function () {
		if (newType.lineDrawDropObj != null && !newType.lineDrawDropObj.hasClass('on')) {
			COMMONLIBRARY.tools.clickAudio();
			newType.lineDrawDragObj.css("top", newType.lineDrawDropObj.css("top"));
			newType.lineDrawDragObj.css("left", newType.lineDrawDropObj.css("left"));
			$(".nt_btnReset").prop("disabled", false);
			newType.completeCnt++;

			newType.lineDrawDragObj.attr('data-drop', newType.lineDrawDropObj.attr('data-match-id'));
			newType.lineDrawDropObj.addClass('on');

		} else {
			newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
			newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
		}

		newType.setDragLinePos();

		// 라인을 모두 이은경우
		if (newType.lineDrawNumAnswer == newType.completeCnt) {

		}

		//        if(newType.lineDrawDropObj != null){
		//            if(newType.lineDrawDragObj.attr("data-match-id") == newType.lineDrawDropObj.attr("data-match-id")){
		//                newType.correctSound();
		//
		//                newType.lineDrawDragObj.css("top", newType.lineDrawDropObj.css("top"));
		//                newType.lineDrawDragObj.css("left", newType.lineDrawDropObj.css("left"));
		//
		//                $(".nt_btnReset").prop("disabled", false);
		//
		//                newType.completeCnt++;
		//
		//            }else{
		//                newType.wrongSound();
		//
		//                newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
		//                newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
		//            }
		//        }else{
		//            newType.lineDrawDragObj.css("top", newType.lineDrawDragObj.attr("data-top"));
		//            newType.lineDrawDragObj.css("left", newType.lineDrawDragObj.attr("data-left"));
		//        }
		//
		//        newType.setDragLinePos();

		//라인을 모두 이은경우
		//        if(newType.lineDrawNumAnswer == newType.completeCnt){
		//			$(".nt_btnConfirm").prop("disabled", true);	//--add
		//        }


	},


	initLineDraw: function () {
		newType.lineDrawDragObj = null;
		newType.lineDrawDropObj = null;

		$(".nt_lineDragArea .dragItem").each(function () {
			$(this).css("top", $(this).attr("data-top"));
			$(this).css("left", $(this).attr("data-left"));
		});

		newType.setDragLinePos();
	}

}
