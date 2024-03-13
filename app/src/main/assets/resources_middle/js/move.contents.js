
/***********************************************
* moveContents
************************************************/
(function($) {

	$.fn.moveContents = function(options){
		return this.each(function(){
			var opts = $.extend({}, $.fn.moveContents.defaults, options || {});
			options = options || {};
			var $cont = $(this);																			//이동컨텐츠 전체 element
			var $contEventEl = opts.iconFlag? $cont.find(opts.eventEl) : null;		//클릭이벤트 element
			var $contEventCon = $cont.find(opts.conEl);										//실제 변경컨텐츠 element
			var $contConCnt = $contEventCon.length;											//변경컨텐츠갯수
			var $contSelIndex = opts.defaultIndex;												//현재선택된 컨텐츠의 index값
			var $contTimer;																				//오토플레이 시간변수
			var $btnPrev = $cont.find(opts.btnPrev);											//이전버튼
			var $btnNext = $cont.find(opts.btnNext);											//다음버튼
			var $btnPlay = $cont.find(opts.btnPlay);											//사용자컨트롤 플레이버튼
			var $btnStop = $cont.find(opts.btnStop);											//사용자컨트롤 정지버튼
			var $moveMode = true;																		//오토플레이 slide시 자동변경 방향
			var $playMode = true;																		//사용자 컨트롤러에 의한 애니메이션 상태
			var $oldSelIndex;																				//선택된 컨텐츠 이전 선택 index값
			var $iconMode;																				//아이콘클릭이벤트일때만 true

			if(opts.slideValue){
				var $slideValue = opts.slideValue;
			}
			else{
				if(opts.slideFor=="left" || opts.slideFor=="right") var $slideValue = $contEventCon.eq(0).outerWidth();
				else var $slideValue = $contEventCon.eq(0).outerHeight();
			}

			if(opts.addContain) $cont.addClass(opts.addContain);

			/*********************************************************
			//컨텐츠갯수가 복수일때 이벤트 설정(하나일때는 아이콘 버튼 미출력)
			**********************************************************/
			if($contConCnt>1){

				/* 디스플레이 초기화 - effect : slide */
				if(opts.effect=="slide"){
					$contEventCon.each(function(){
						var new_position = newPosition($(this));
						switch(opts.slideFor)
						{
							case "right":
							$(this).css({"right":new_position});
							break;

							case "top":
							$(this).css({"top":new_position});
							break;

							case "bottom":
							$(this).css({"bottom":new_position});
							break;

							default:
							$(this).css({"left":new_position});
							break;
						}

						if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
					});

				/* 디스플레이 초기화 - effect : circle  */
				}else if(opts.effect=="circle"){
					$contEventCon.eq(0).addClass("on");
					var viewSize = opts.circleSide;
					var $sideDeps = Math.floor(($contConCnt+2)/3);

					$cont.css("width",$contEventCon.eq(0).outerWidth()+(($contConCnt-1)*viewSize));

					//출력사이즈 정보
					var $circle_info = new Array();

					$circle_info[0] = new Array();
					$circle_info[0]["width"] = $contEventCon.eq(0).width();
					$circle_info[0]["height"] = $contEventCon.eq(0).height();
					$circle_info[0]["left"] = opts.circleSide*$sideDeps;
					$circle_info[0]["top"] = 0;
					$circle_info[0]["z-index"] = $contEventCon.eq(0).css("z-index");

					for(i=1;i<=$sideDeps;i++){
						$circle_info[i] = new Array();
						$circle_info[i]["width"] = $circle_info[i-1]["width"]*opts.circleRatio;
						$circle_info[i]["height"] = $circle_info[i-1]["height"]*opts.circleRatio;
						$circle_info[i]["top"] = ($circle_info[0]["height"]-$circle_info[i]["height"])/2;
						$circle_info[i]["left_prev"] = $circle_info[0]["left"]-viewSize*i;
						$circle_info[i]["left_next"] = $circle_info[0]["left"]+$circle_info[0]["width"]-($circle_info[i]["width"]-viewSize*i);

						//깊이별 컨텐츠 가로사이즈 = 상위deps 가로사이즈 * 축소비율
						//깊이별 컨텐츠 세로사이즈 = 상위deps 세로사이즈 * 축소비율
						//깊이별 컨텐츠 Top 좌표 = (최상위컨텐츠 높이값 - 자기자신 높이값) /2
						//깊이별 좌측 컨텐츠 Left 좌표  = 상위컨텐츠 좌측좌표값 - (좌측 보여지는 영역 가로사이즈 * deps)
						//깊이별 우측 컨텐츠 Left 좌표  = 최상위컨텐츠 좌측좌표값 + 최상위컨텐츠 가로사이즈 - (자기자신 전체가로사이즈 - 우측 보여지는 영역 가로사이즈)
					}
					moveAni_circle();

					$contEventCon.bind("click",function(){
						$contSelIndex = $contEventCon.index($(this));
						moveAni_circle();
					});

				/* 디스플레이 초기화 - effect : accordion */
				}else if(opts.effect=="accordion"){
					var $accordionMax = opts.accordionMax?opts.accordionMax:$contEventCon.eq(0).outerWidth();
					$cont.css("width",($contConCnt-1)*opts.accordionMin+$accordionMax);
					$contEventCon.bind(opts.conEvent,function(){
						$contSelIndex = $contEventCon.index($(this));
						moveAni_accordion();
					});

					if(opts.autoPlay && opts.conEvent=="mouseover"){
						$contEventCon.hover(function(){
							clearTimeout($contTimer);
						},function(){
							$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
						});
					}
					moveAni_accordion();

				/* 디스플레이 초기화 - effect : show , fade */
				}else{
					$cont.each(function(){
						$contEventCon.hide();
						$contEventCon.eq($contSelIndex).show();
						if($contEventEl) $contEventEl.eq($contSelIndex).addClass(opts.onClass);
					});
				}

				/* 아이콘버튼 디스플레이 */
				if(opts.iconFlag) displayIcon();

				/* 이동버튼(이전,다음) 디스플레이 및 이벤트설정*/
				if(opts.btnFlag){
					moveContentsBtn();
					if($contConCnt>opts.slideView){
						$btnNext.bind("click",function(){
							if(!$(this).hasClass(opts.btnNextOff))moveIndexPlus();
							//<<<<<<
							//alert('next')

							// 다음 버튼을 클릭하면 클릭하기 전에 선택된 항목의 다음 항목이 선택된 상태로 바뀌게 된다
							// 이러한 상태에서 li 태그의 클래스가 on이 된 것을 찾아서 그것을 클릭한 이벤트 효과를 나타낸다
							$("#menu_ul > li").each(function(){
								if($(this).hasClass("on")){
									$(this).find("a").trigger("click");
								}
							});
						});
						$btnPrev.bind("click",function(){
							if(!$(this).hasClass(opts.btnPrevOff)) moveIndexMinus();
							//<<<<<<
							//alert('prev')

							// 이전 버튼을 클릭하면 클릭하기 전에 선택된 항목의 이전 항목이 선택된 상태로 바뀌게 된다
							// 이러한 상태에서 li 태그의 클래스가 on이 된 것을 찾아서 그것을 클릭한 이벤트 효과를 나타낸다
							$("#menu_ul > li").each(function(){
								if($(this).hasClass("on")){
									$(this).find("a").trigger("click");
								}
							});
						});
					}
				}else{
					$btnPrev.hide();
					$btnNext.hide();
				}

				/* $contEventEl 이벤트설정 */
				if(opts.iconFlag){
					$contEventEl.bind(opts.iconFlagEvent,function(){
						$moveMode = $contEventEl.index($(this))-$contSelIndex>0? true : false;
						$iconMode=true;
						$oldSelIndex = $contSelIndex;
						$contSelIndex = $contEventEl.index($(this));
						moveContentsAnimation();
						return opts.eventReturn;
					});
				}else{
					if($contEventEl) $contEventEl.hide();
				}

				/* 오토플레이 이벤트 설정(컨텐츠 오버시 오토플레이 일시멈춤) */
				$contEventCon.hover(function(){
					clearTimeout($contTimer);
				},function(){
					if($playMode && opts.autoPlay) callAnimation();
				});

				/* delayTimer에 의한 자동애니메시션 설정*/
				if($playMode && opts.autoPlay) setTimeout(callAnimation,opts.delayTimer);

				/* 플레이 컨트롤러 설정 */
				if(opts.controlFlag){
					$btnPlay.bind("click",function(){
						$playMode = true;
						$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
					});
					$btnStop.bind("click",function(){
						$playMode = false;
						clearTimeout($contTimer);
					});
				}

				/* 콜백함수설정 */
				if(opts.conCallBack){
					$contEventCon.bind("click",function(){
						$contEventCon.removeClass("sel");
						$(this).addClass("sel");
						opts.conCallBack();
					});
				}
			}else{
//					$contEventEl.hide();
				$btnPrev.hide();
				$btnNext.hide();
			}

			/********************************************************
			//다음컨텐츠보기
			********************************************************/
			function moveIndexPlus(){
				$moveMode = true;
				$oldSelIndex = $contSelIndex;
				$contSelIndex++;
				if($contSelIndex>$contConCnt-1) $contSelIndex=0;
				moveContentsAnimation();
			}

			/*********************************************************
			//이전컨텐츠보기
			*********************************************************/
			function moveIndexMinus(){
				$moveMode = false;
				$oldSelIndex = $contSelIndex;
				$contSelIndex--;
				if($contSelIndex<0) $contSelIndex = $contConCnt-1;
				moveContentsAnimation();
			}

			/*********************************************************
			//오토플레이 호출 함수
			*********************************************************/
			function callAnimation(){
				clearTimeout($contTimer);
				$contTimer = setTimeout(moveIndexPlus,opts.changeTimer);
			}

			/*********************************************************
			//아이콘버튼 디스플레이함수
			*********************************************************/
			function displayIcon(){
				$contEventCon.each(function(){
					if($contEventCon.index($(this))!=$contSelIndex){
						$contEventEl.eq($contEventCon.index($(this))).removeClass(opts.onClass);
						if(opts.onImage){
							$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_on", "_off");});
						}
					}else{
						$contEventEl.eq($contEventCon.index($(this))).addClass(opts.onClass);
						if(opts.onImage){
							$contEventEl.eq($contEventCon.index($(this))).find('img').attr('src', function() {return $(this).attr("src").replace("_off", "_on");});
						};
					}
				});
			}

			/*********************************************************
			//버튼 디스플레이 설정 함수
			*********************************************************/
			function moveContentsBtn(){
				if(opts.btnFlagDisabled){
					if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.addClass(opts.btnPrevOff);
					else $btnPrev.removeClass(opts.btnPrevOff);

					if($contSelIndex+opts.slideView>=$contConCnt && !opts.btnFlagAll) $btnNext.addClass(opts.btnNextOff);
					else $btnNext.removeClass(opts.btnNextOff);
				}else{
					if($contSelIndex<1 && !opts.btnFlagAll) $btnPrev.hide();
					else $btnPrev.show();

					if($contSelIndex>=$contConCnt-1 && !opts.btnFlagAll) $btnNext.hide();
					else $btnNext.show();
				}
			}

			/*********************************************************
			//선택된 index에 따른 새 위치값 계산
			*********************************************************/
			function newPosition(obj){
				var value = $contEventCon.index(obj) - $contSelIndex;
				if(opts.slideRepeat && !$iconMode){
					if($moveMode){
						if(value>=opts.slideView) value = value - $contConCnt;
						if(value<-1) value = value + $contConCnt;
					}else{
						if(value>opts.slideView) value = value - $contConCnt;
						if(value<=(-1)*($contConCnt-opts.slideView)) value = value + $contConCnt;
					}
				}
				value = value * $slideValue;
				return value;
			}

			/*********************************************************
			//Animation - effect : show일때
			*********************************************************/
			function moveAni_show(){
				$contEventCon.each(function(){

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					if($contEventCon.index($(this))!=$contSelIndex) $(this).hide();
					else $(this).show();
				});
			}

			/*********************************************************
			//Animation -effect : fade일때
			*********************************************************/
			function moveAni_fade(){
				$contEventCon.each(function(){

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					if($contEventCon.index($(this))!=$contSelIndex) $(this).fadeOut(opts.aniTimer);
					else $(this).fadeIn(opts.aniTimer);
				});
			}

			/*********************************************************
			//Animation - effect : slide일때
			*********************************************************/
			function moveAni_slide(){

				/* 슬라이드반복설정일때 애니메이션 효과를 위한 시작위치 재설정 */
				if(opts.slideRepeat){
					$contEventCon.each(function(){
						var value = Number($(this).css(opts.slideFor).replace("px",""))/$slideValue;
						if($moveMode){
							if(value<0) value = value + $contConCnt;
						}
						else{
							if(value>=opts.slideView) value = value - $contConCnt;
						}
						value = value*$slideValue;
						$(this).css(opts.slideFor,value);
					});
				}

				/* 새위치설정 */
				$contEventCon.each(function(){

					var new_position = newPosition($(this));

					if($contSelIndex==$contEventCon.index($(this))) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);

					switch(opts.slideFor)
					{
						case "right":
						$(this).stop().animate({"right":new_position}, opts.aniTimer, opts.easing);
						break;

						case "top":
						$(this).stop().animate({"top":new_position}, opts.aniTimer, opts.easing);
						break;

						case "bottom":
						$(this).stop().animate({"bottom":new_position}, opts.aniTimer, opts.easing);
						break;

						default:
						$(this).stop().animate({"left":new_position}, opts.aniTimer, opts.easing);
						break;
					}
				});
			}

			/*********************************************************
			//Animation - effect : circle일때
			*********************************************************/
			function moveAni_circle(){
				$contEventCon.eq($contSelIndex)
					.addClass("on")
					.css("z-index",$circle_info[0]["z-index"])
					.animate({
						"opacity" : 1,
						"left" : $circle_info[0]["left"],
						"top" : $circle_info[0]["top"],
						"width" : $circle_info[0]["width"],
						"height" : $circle_info[0]["height"]
					}, opts.aniTimer, opts.easing);
				for(i=1;i<=$sideDeps;i++){
					prevIndex = $contSelIndex-i;
					if(prevIndex<0) prevIndex = prevIndex+$contConCnt;

					nextIndex = $contSelIndex+i;
					if(nextIndex>=$contConCnt) nextIndex = nextIndex-$contConCnt;

					var newIndex = $circle_info[0]["z-index"]-(i*2);
					if($moveMode){
						var newIndex_prev = newIndex-1;
						var newIndex_next = newIndex-2;
					}else{
						var newIndex_prev = newIndex-2;
						var newIndex_next = newIndex-1;
					}

					$contEventCon.eq(prevIndex)
						.removeClass("on")
						.css("z-index",newIndex_prev)
						.animate({
							"opacity" : opts.circleOpacity,
							"left" : $circle_info[i]["left_prev"],
							"top" : $circle_info[i]["top"],
							"width" : $circle_info[i]["width"],
							"height" : $circle_info[i]["height"]
						}, opts.aniTimer, opts.easing);

					$contEventCon.eq(nextIndex)
						.removeClass("on")
						.css("z-index",newIndex_next)
						.animate({
							"opacity" : opts.circleOpacity,
							"left" : $circle_info[i]["left_next"],
							"top" : $circle_info[i]["top"],
							"width" : $circle_info[i]["width"],
							"height" : $circle_info[i]["height"]
						}, opts.aniTimer, opts.easing);
				}
			}

			/*********************************************************
			//Animation - effect : accordion일때
			*********************************************************/
			function moveAni_accordion(){
				$contEventCon.each(function(){
					var new_position = opts.accordionMin*$contEventCon.index($(this));
					if($contSelIndex<$contEventCon.index($(this))) new_position = new_position + ($accordionMax-opts.accordionMin);

					$(this).stop(true).animate({
						"left" : new_position
					}, opts.aniTimer, opts.easing);

					if($contEventCon.index($(this))==$contSelIndex) $(this).addClass(opts.onClass);
					else $(this).removeClass(opts.onClass);
				});
			}

			/*********************************************************
			//컨텐츠 디스플레이 함수
			*********************************************************/
			function moveContentsAnimation(){

				clearTimeout($contTimer);

				switch(opts.effect)
				{
					case "fade":
					moveAni_fade();
					break;

					case "slide":
					moveAni_slide();
					break;

					case "circle":
					moveAni_circle();
					break;

					case "accordion":
					moveAni_accordion();
					break;

					default:
					moveAni_show();
					break;
				}

				//아이콘버튼 재설정
				if(opts.iconFlag) displayIcon();

				//이동버튼출력 재설정
				if(opts.btnFlag) moveContentsBtn();

				//오토플레이 재설정
				if(opts.autoPlay && $playMode) callAnimation();

				//콜백함수
				if(opts.changeCallBack) opts.changeCallBack();

				$iconMode = false;
			}
		});
	};

	$.fn.moveContents.defaults = {
		eventEl : ">ul a",
		conEl : ">div",
		defaultIndex : 0,
		addContain : null,
		onClass : "on",
		onImage : false,
		iconFlag : true,
		iconFlagEvent : "click",
		btnFlag : false,
		btnFlagAll : false,
		btnFlagDisabled : false,
		btnPrev : ".btn-prev",
		btnNext : ".btn-next",
		btnPrevOff : "btn-prev-off",
		btnNextOff : "btn-next-off",
		autoPlay : false,
		delayTimer : 0,
		changeTimer : 2000,
		controlFlag : false,
		btnPlay : ".btn-play",
		btnStop : ".btn-stop",
		effect : "show",
		easing : "linear",
		aniTimer : 600,
		slideFor : "left",
		slideValue : null,
		slideView : 1,
		slideRepeat : false,
		circleRatio : 0.8,
		circleSide : 20,
		circleOpacity : 0.9,
		accordionMin : 50,
		accordionMax : null,
		conEvent : "click",
		changeCallBack : null,
		conCallBack : null,
		eventReturn : false
	};

})(jQuery);
