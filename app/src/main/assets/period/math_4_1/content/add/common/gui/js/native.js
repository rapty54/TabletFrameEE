
//인터페이스 기본
var main = {};

function command(command, url, callback) {
	var json = {
		command: command,
		url: btoa(url),
		callback: callback
	};
	window.external.callviewer(JSON.stringify(json));
}

main.callviewer = command;

function strcallback(value) {
	console.log(value);
}

var curIndex = 0;
var curSubIndex = 0;
var lastIndex = 0;
var lastPage;
var curPage;
var curTOCIndex;
var curTOCSubIndex;
var position = 0; //tocTable x좌표
var positionDiff = 150; //한번에 이동하는 위치
var tocAniTime = 200; //슬라이드 애니메이션 타임
var tocData;
var resizeTimer = null;

$(window).resize( function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		headerResize();
	}, 20);
	rePositionDrawPopup();
});

//전체화면 변경 시 이벤트
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function (e) {
	console.log("window width : " + window.innerWidth);
	console.log("screen width : " + screen.width);
	console.log("window width : " + window.innerHeight);
	console.log("screen width : " + screen.height);
	//do something;
	if ((window.fullScreen) ||
		(window.innerWidth == screen.width && window.innerHeight == screen.height)) {
		setFullscreen(true);
	} else {
		setFullscreen(false);
	}
});

function rePositionDrawPopup() {
	if ($("#drawPopup").is(":visible")) {
		var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let popupWidth = $(".drawWrite ").width();
		let popupHeight = $(".drawWrite ").height();
		let popupTop = parseInt($(".drawWrite").css("top"));
		let popupLeft = parseInt($(".drawWrite").css("left"));

		if (popupHeight + popupTop > windowH) {
			let top = windowH - popupHeight - 10;

			if (top < 0) {
				top = 0;
			}

			$(".drawWrite").css("top", top);
		}

		if (popupWidth + popupLeft > windowW) {
			let left = windowW - popupWidth - 10;

			if (top < 0) {
				top = 0;
			}

			$(".drawWrite").css("left", left);
		}
	}
}

function escapeFullScreen() {
	if ($('#ifContent').contents().find('body').hasClass("fullscreen")) {
		contentsFrame = document.getElementById('ifContent');
		contentsWindow = contentsFrame.contentWindow || contentsFrame.contentDocument;

		buttonId = contentsWindow.document.querySelector('[id^="videoFullscreen"]').id;
		contentsWindow.document.getElementById(buttonId).click();
	}
}

function setFullscreen(value) {
	command('fullScreen', value, '');
}

//차시 타이틀 세팅
function setTitleHeader(value) {
	$("#ifHeader").contents().find(".title").attr("title", decodeURIComponent(value));
	$("#ifHeader").contents().find(".title").html(decodeURIComponent(value));
}

//페이지구성 변경으로 인해 얘는 이제 안쓴다..
function setTitle(value) {
	$(".title").html(decodeURIComponent(value));
}

function setPage(page, lastpage, tocIndex, tocSubIndex) {
	if (page == 1) {
		$("#left").prop("disabled", true);
	} else
		$("#left").prop("disabled", false);
	if (page == lastpage) {
		$("#right").prop("disabled", true);
	} else
		$("#right").prop("disabled", false);
	$("#curPage").text(page);
	$("#totalPage").text(lastpage);
	$(".tocItem").removeClass("on");
	$($(".tocItem")[tocIndex]).addClass("on");
	curTOCIndex = tocIndex;
	curTOCSubIndex = tocSubIndex;
	curPage = page;
	lastPage = lastpage;
	position = -($($(".tocItem")[tocIndex]).offset().left + $(".tocTable").offset().left + positionDiff);

	var offset = $($(".tocItem")[tocIndex]).offset().left - $($(".tocItem")[0]).offset().left;

	var width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();
	if (offset > width)
		offset = width;
	if (position > width)
		position = width;
	if (position < -(offset))
		position = -(offset);
	$(".tocTable").css("transform", "translateX(" + parseInt(position) + "px)");
	if (position >= 0) {
		$(".tocBtnLeft").prop("disabled", true);
	} else {
		$(".tocBtnLeft").prop("disabled", false);
	}
	$(".tocBtnRight").prop("disabled", false);
	width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();
	if (position <= -width) {
		$(".tocBtnRight").prop("disabled", true);
	} else
		$(".tocBtnRight").prop("disabled", false);
	//$(".tocBtnLeft").prop("disabled", false);
}


function headerResize() {
	var headerContents = $("#ifHeader").contents();
	// btnWrap 의 영역보다 작게 단원명 설정
	headerContents.find(".text, .title").css( "maxWidth", headerContents.find("#header").width() - headerContents.find(".btnWrap").width() - 20);
}

//컨텐츠영역 iframe 로딩
function setContent(value, page, lastPageInfo, index, subindex, tocIndex, tocSubIndex) {
	var data = JSON.parse(decodeString(value));
	var headerContents = $("#ifHeader").contents();

	if (data.PDFPage.length == 1) {
		headerContents.find("#eBookPage").text(data.PDFPage[0]);
	} else if (data.PDFPage.length > 1) {
		headerContents.find("#eBookPage").text(data.PDFPage[0] + "~" + data.PDFPage[data.PDFPage.length - 1]);
	}

	if (data.PDFSubPage == null) {
		headerContents.find("#page2").hide();
	} else {
		headerContents.find("#page2").show();
		if (data.PDFSubPage.length == 1) {
			headerContents.find("#eBookSubPage").text(data.PDFSubPage[0]);
		} else if (data.PDFSubPage.length > 1) {
			headerContents.find("#eBookSubPage").text(data.PDFSubPage[0] + "~" + data.PDFSubPage[data.PDFSubPage.length - 1]);
		}
	}
	// btnWrap 의 영역보다 작게 단원명 설정
	headerResize();

	//깜빡임을 줄이기 위해..
	var frame = $('#ifContent').clone();
	$(frame).css('visibility', "hidden");
	$(frame).attr("id", "ifContent_copy");
	$("#wrap").append(frame);
	$(frame).on("load", function () {
		$(this).css('visibility', "");
		$('#ifContent').remove();
		$(this).attr('id', "ifContent");

		var files = data.url.split("/");
		var tmp_dataKey = "" + files[files.length - 1];
		waitForWebfonts(['Binggrae', 'NanumGothic', 'NanumMyeongjo'], function() {
			$("#drawPopup").drawPopup('drawSnapshot', tmp_dataKey);	
		});
	});
	$(frame).attr('src', urlEncoding(data.url));

	if ($("#unitSelect").length > 0) {
		$(".unitTitle").removeClass('on');
		var toc = tocData[curIndex].subclass[curSubIndex].TOC;
		var selecttoc = toc[tocIndex].subtitle[tocSubIndex];
		for (var i = 0; i < toc.length; ++i) {
			for (var j = 0; j < toc[i].subtitle.length; ++j) {
				if (page >= toc[i].subtitle[j].Page) {
					selecttoc = toc[i].subtitle[j].Page;
				}
			}

		}
		$("#unit_" + selecttoc).addClass('on');
	}

	curPage = page;
	curIndex = index;
	curSubIndex = subindex;
	lastPage = lastPageInfo;
}

function urlEncoding(url) {
	return encodeURIComponent(url).replace(/%2F/gi, "/").replace(/%3A/gi, ":")
}

function decodeString(str) {

	if (str.indexOf("+") > 0) {
		return decodeURIComponent(decodeURI(str).replace(/\+/g, " "));
	} else {
		return decodeURIComponent(decodeURI(str));
	}
}

//섹션 버튼 생성
function setToc(value, curindex, subindex) {
	if (curindex) {
		curIndex = curindex;
	}

	if (subindex) {
		curSubIndex = subindex;
	}

	console.log(value);
	var val = decodeString(value);
	var data = JSON.parse(val);
	var html = "";

	for (var i = 0; i < data.length; ++i) {
		html += '<button type="button" class="tocItem " id="' + data[i].Page + '"><div class="btnTop"></div><div style="display:flex;width:max-content;"><div class="btnLeft"></div><div class="btnContent"><span>' + data[i].Text + '</span></div><div class="btnRight"></div></div></button>';
	}

	var winsize = $("#footer").outerWidth() - $("#toc").outerWidth(true) - $("#menu").outerWidth() - $(".tocLeft").outerWidth() - $(".tocRight").outerWidth() - 30;
	$(".tocWindow").css("max-width", winsize + "px");
	$(".tocTable").html(html);
	$(".tocItem").on('click', function () {
		var jsondata = {
			"contentIndex": curIndex,
			"subIndex": curSubIndex,
			"page": this.id
		};
		command('changePage', JSON.stringify(jsondata), 'pagemoved');
	});
	setEventTocItem();
}

//섹션 이동
function prevToc() {
	var width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();
	if (position >= 0) {
		$(".tocBtnLeft").prop("disabled", true);
		return;
	}
	var startposition = position;
	position += positionDiff;
	if (position >= 0)
		position = 0;
	var target = document.querySelector('.tocTable');

	target.animate([{
			"transform": 'translateX(' + startposition + 'px)'
		},
		{
			"transform": 'translateX(' + position + 'px)'
		}
	], tocAniTime);

	$(".tocTable").css("transform", "translateX(" + parseInt(position) + "px)");
	if (position >= 0) {
		$(".tocBtnLeft").prop("disabled", true);
	} else {
		$(".tocBtnLeft").prop("disabled", false);
	}
	if (position <= -width) {
		$(".tocBtnRight").prop("disabled", true);
	} else
		$(".tocBtnRight").prop("disabled", false);
	//	$(".tocBtnRight").prop("disabled", false);

}

function nextToc() {
	var width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();
	if (position <= -width) {
		$(".tocBtnRight").prop("disabled", true);
		return;
	}
	var startposition = position;
	position -= positionDiff;
	if (position < -width)
		position = -width;
	var target = document.querySelector('.tocTable');

	target.animate([{
			"transform": 'translateX(' + startposition + 'px)'
		},
		{
			"transform": 'translateX(' + position + 'px)'
		}
	], tocAniTime);


	$(".tocTable").css("transform", "translateX(" + parseInt(position) + "px)");
	if (position <= -width) {
		$(".tocBtnRight").prop("disabled", true);
	} else
		$(".tocBtnRight").prop("disabled", false);
	if (position >= 0) {
		$(".tocBtnLeft").prop("disabled", true);
	} else {
		$(".tocBtnLeft").prop("disabled", false);
	}
	//$(".tocBtnLeft").prop("disabled", false);
}


//섹션버튼에 이벤트 걸기
function setEventTocItem() {
	$(".tocItem").on("click", function () {
		$(".tocItem").removeClass("on");
		$(this).addClass("on");
	});

	$(".tocTable").on("resize", function () {
		setTOCBtnState();
	});
	$(window).on("resize", function () {
		setTOCBtnState();
	});
	setTOCBtnState();
}

//섹션 좌우버튼의 enable/disable 상태 계산
function setTOCBtnState() {
	var tocWindowWidth = $("#footer").outerWidth() - $("#toc").outerWidth(true) - $("#menu").outerWidth() - $(".tocLeft ").outerWidth() - $(".tocRight ").outerWidth() - 30;
	$(".tocWindow").css("max-width", tocWindowWidth + "px");
	numberPattern = /-?\d+\.?\d*/g;

	if (position >= 0) {
		$(".tocBtnLeft").prop("disabled", true);
	} else {
		$(".tocBtnLeft").prop("disabled", false);
	}

	if (tocWindowWidth - ($(".tocTable").outerWidth() + position) > 0) {
		var dif = tocWindowWidth - ($(".tocTable").outerWidth() + position) - 20;
		position += dif;

		if (position > 0)
			position = 0;
		if (-position < ($(".tocTable").get(0).scrollWidth - $(".tocWindow").width())) {
			position = -($(".tocTable").get(0).scrollWidth - $(".tocWindow").width());
		}

		$(".tocTable").css("transform", "translateX(" + parseInt(position) + "px)");
		$(".tocBtnRight").prop("disabled", true);

		if (position >= 0){
			$(".tocBtnLeft").prop("disabled", true);
		} else {
			$(".tocBtnLeft").prop("disabled", false);
		}
	} else {
		$(".tocBtnRight").prop("disabled", false);

		if (curTOCIndex > 0) {
			position = -($($(".tocItem")[curTOCIndex]).offset().left + $(".tocTable").offset().left + positionDiff);
			var offset = $($(".tocItem")[curTOCIndex]).offset().left - $($(".tocItem")[0]).offset().left;
			var width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width()
			;
			if (offset > width) {
				offset = width;
			}

			if (position > width) {
				position = width;
			}

			if (position < -(offset)) {
				position = -(offset);
			}

			$(".tocTable").css("transform", "translateX(" + parseInt(position) + "px)");
			$(".tocBtnRight").prop("disabled", false);
			width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();

			if (position <= -width) {
				$(".tocBtnRight").prop("disabled", true);
			} else {
				$(".tocBtnRight").prop("disabled", false);
			}

			if (position == 0) {
				$(".tocBtnLeft").prop("disabled", true);
			} else {
				$(".tocBtnLeft").prop("disabled", false);
			}
		}
	}

	if ((tocWindowWidth - 30) - $(".tocTable").outerWidth() < 0) {
		$(".tocBtnLeft").removeClass('hide');
		$(".tocBtnRight").removeClass('hide');
	} else {
		$(".tocBtnLeft").addClass('hide');
		$(".tocBtnRight").addClass('hide');
	}

	tocWindowWidth = $("#footer").outerWidth() - $("#toc").outerWidth(true) - $("#menu").outerWidth() - $(".tocLeft").outerWidth() - $(".tocRight").outerWidth() - 30;
	$(".tocWindow").css("max-width", tocWindowWidth + "px");
}

function getProgCallback(data, content, current, last) {
	curIndex = parseInt(content);
	curSubIndex = parseInt(current);
	lastIndex = parseInt(last) - 1;
	var list = JSON.parse(data);
	if ($("#progressContainer").is(":hidden")) {
		$("#progressContainer").ProgressManagement("show");
	}
	$("#progressContainer").ProgressManagement("setTable", list);
}

function openProg(data) {
	command("getProg", '', "getProgCallback");
}

function allcheck() {

	$("input:checkbox[name='progcheck']").prop('checked', $("#allcheck2").prop('checked'));
}

function addProg() {
	var addPopup = "<div class=\"pop-wrap\" id='addProgpopup' ><dl><dt class=\"pop-header\"><div>진도 저장</div> <div class='closeBtn' onclick='closeadd()'>X</div> </dt><dd class=\"pop-box\">";
	addPopup += "<input type='number' id='cls'></input> 반";
	addPopup += "<button type='button' onclick='addnow()'>현재 차시 저장</button><button type='button' onclick='nextnow()' ";
	if (curSubIndex == lastIndex) {
		addPopup += "disabled ";
	}

	addPopup += ">다음 차시 저장</button>";
	addPopup += "</dd></dl></div>"
	$(addPopup).dialog({
		modal: true,
		open: function () {
			$($(".ui-widget-overlay").get($(".ui-widget-overlay").length - 1)).css("background", "transparent");
		}
	});

}

function enable() {

	$(".ui-widget-overlay ").remove();

}
var disableCallback;

function disable(isAddClickEvent = true) {
	if ($(".ui-widget-overlay ").length <= 0) {
		var layer = $('<div class="ui-widget-overlay ui-front" style="z-index: 15;"></div>');
		$("body").append(layer);

		if (isAddClickEvent) {
			$(".ui-widget-overlay").off('click').on('click', function () {
				if ($("#footer").length > 0) {
					command('enable', 'disableCallback', '');
				} else {
					if (disableCallback) {
						disableCallback();
					}
				}
			});
		}
	}

}

function insertProgCallback() {
	command("getProg", '', "getProgCallback");
	if (!$("#addProgress").is("hidden")) {
		$("#addProgress").AddProgress("hide");
	}
}

function deleteProgCallback() {
	command("getProg", '', "getProgCallback");
}

function addnow() {
	command("insertNowProg", $('#cls').val(), "insertProgCallback");
}

function nextnow() {
	command("insertNextProg", $('#cls').val(), "insertProgCallback");
}

function goProgCallback() {
	$("#progressContainer").ProgressManagement("hide");
	$("#layer01").remove();
	command("enable", '', "");
}

function goProg(clsIndex, subIndex) {
	var data = {
		index: clsIndex,
		subIndex: subIndex,
	};
	command("goProg", JSON.stringify(data), "goProgCallback");
}

function closeadd() {
	$("#addProgpopup").remove();
}

function delProg() {
	var arry = [];
	$("input:checkbox[name='progcheck']:checked").each(function (i, data) {
		arry.push($(data).attr('data'));
	});
	command("delProg", JSON.stringify(arry), "deleteProgCallback");

}

function ppt_drawing() {
	$("#classTool").ClassTool("hide");
	menuHide();
	setTimeout(function () {
		$("#drawPopup").drawPopup('show');
        $(".drawing-canvas-container").css({
            "pointer-events":"all",
        });
        $(".drawing-canvas-container-outer").css({
            "pointer-events": "all"
        });
		parent.DRAWING_MODE = 0;
	}, 50);
}

function printCanvas(value, cap) {
	var img = new Image();
	img.onload = function () {
		try {
			if (parent.DRAWING_MODE == 0) {
				$("#drawing").get(0).getContext("2d").drawImage(img, 0, 0);
				if (cap == 1)
					$("#drawing").get(0).getContext("2d").clearRect(0, 0, $("#drawing").width() - 3, $("#drawing").height() - 3);
			} else if (parent.DRAWING_MODE == 1) {
				$("#crop_over").get(0).getContext("2d").drawImage(img, 0, 0);
			}
		} catch(e) {
			console.error(e);
		}
	};
	img.src = value;
}

function menuShow() {}

function menuHide() {
}

function showStudyPanel(left) {
	let $classTool = $("#classTool");

	if (!$classTool.is(":visible")) {
		$classTool.ClassTool("show");
	} else {
		$classTool.ClassTool("hide");
	}

	$(".inner.classTool").css({
		left: left + "px",
	});
}

function relocateStudyPanel(left) {
	let $classTool = $("#classTool");
	if ($classTool.is(":visible")) {
		$(".inner.classTool").css({
			left: left + "px",
		});
		return;
	}
}

function closeAllSelect(elmnt) {
	/*a function that will close all select boxes in the document, except the current select box:*/
	var x, y, i, xl, yl, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}

function closeToc() {
	$(".btnTocList").remove();
	command("enable", '', "");
	enable();
}

function showToc(value, content, subClass, page) {
	if ($(".btnTocList").length > 0) {
		$(".btnTocList").remove();
		return;
	}

	disableCallback = function () {
		if ($("#footer").length > 0) {
			command('enable', 'disableCallback', '');
		} else
			closeToc();
	}
	disable();
	curIndex = curTOCIndex =parseInt(content);
	curSubIndex = curTOCSubIndex = parseInt(subClass);
	value = JSON.parse(decodeString(value));
	tocData = value;
	var html = '<div id="popFull" class="btnTocList"><div class="inner viewerIndex shadow"><div class="top"><span class="tit">학습 목차</span><button class="btnPopClose" onclick="closeToc()">팝업닫기</button><div class="selectBox"><div id="chapterSelect" class="custom-select">';
	html += "<select><option value>단원</option>";

	for (var i = 0; i < value.length; ++i) {
		let title = value[i].Title;
		html += '<option value="' + i + '" ';

		if (title.width() > 0) {
			html += ` title="${title} "`;
		}

		if (i == parseInt(content)) {
			html += "selected";
		}

		html += '>';
		html += value[i].Title + '</option>';
	}

	html += '</select></div><div id="unitSelect" class="custom-select"><select><option value>차시</option>';

	for (var i = 0; i < value[parseInt(content)].subclass.length; ++i) {
		let title = value[parseInt(content)].subclass[i].Title;
		html += '<option value="' + i + '" ';

		if (title.width() > 0) {
			html += ` title="${title} "`;
		}

		if (i == parseInt(subClass))
			html += "selected";

		html += '>';
		html += value[parseInt(content)].subclass[i].Title + '</option>';
	}

	html += '</select></div></div></div>';
	html += '<div class="content" ><ul class="viewerIndexMenu scrollStyle">';
	html += setTocList(value[parseInt(content)].subclass[parseInt(subClass)].TOC) + '</ul></div></div></div></div>';
	$("#wrap").append(html);
	var x, i, j, l, ll, selElmnt, a, b, c;
	/*look for any elements with the class "custom-select":*/
	x = document.getElementsByClassName("custom-select");
	l = x.length;
	var curcontent;

	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		let maxWidth = $(selElmnt).width() * 0.7
		/*for each element, create a new DIV that will act as the selected item:*/
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		let innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		a.setAttribute("title", innerHTML);
		a.innerHTML = innerHTML;
		x[i].appendChild(a);
		/*for each element, create a new DIV that will contain the option list:*/
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide scrollStyle");

		for (j = 1; j < ll; j++) {
			/*for each option in the original select element,
			create a new DIV that will act as an option item:*/
			c = document.createElement("DIV");
			let innerHTML = selElmnt.options[j].innerHTML;
			c.setAttribute("title", innerHTML);
			c.innerHTML = innerHTML;
			c.addEventListener("click", function (e) {
				/*when an item is clicked, update the original select box,
				and the selected item:*/
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;

				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						$(s[i]).prop("selected", true);
						h.innerHTML = this.innerHTML;
						h.setAttribute("title", this.innerHTML);
						y = this.parentNode.getElementsByClassName("same-as-selected");
						yl = y.length;

						for (k = 0; k < yl; k++) {
							y[k].removeAttribute("class");
						}

						this.setAttribute("class", "same-as-selected");
						curTOCIndex = parseInt($("#chapterSelect option:selected").val());
						curTOCSubIndex = parseInt($("#unitSelect option:selected").val());

						if (this.parentNode.parentNode.id == "chapterSelect") {
							var unithtml = '<option value>차시</option>';
							var unitinnerhtml = "";
							$("#unitSelect .select-items").html("");

							for (var i = 0; i < value[curTOCIndex].subclass.length; ++i) {
								unithtml += '<option value="' + i + '" ';

								if (i == curTOCSubIndex) {
									unithtml += "selected";
                                }

								unithtml += '>';
								unithtml += value[curTOCIndex].subclass[i].Title + '</option>';
								var c2 = document.createElement("DIV");
								c2.innerHTML = value[curTOCIndex].subclass[i].Title;
								c2.setAttribute("title", c2.innerHTML);
								c2.addEventListener("click", function () {
									var y, i, k, s, h, sl, yl;
									s = this.parentNode.parentNode.getElementsByTagName("select")[0];
									sl = s.length;
									h = this.parentNode.previousSibling;

									for (i = 0; i < sl; i++) {
										if (s.options[i].innerHTML == this.innerHTML) {
											s.selectedIndex = i;
											$(s[i]).prop("selected", true);
											h.innerHTML = this.innerHTML;
											h.setAttribute("title", h.innerHTML);
											y = this.parentNode.getElementsByClassName("same-as-selected");
											yl = y.length;

											for (k = 0; k < yl; k++) {
												y[k].removeAttribute("class");
											}

											this.setAttribute("class", "same-as-selected");
											curTOCIndex = parseInt($("#chapterSelect option:selected").val());
											curTOCSubIndex = parseInt($("#unitSelect option:selected").val());

											if (this.parentNode.parentNode.id == "chapterSelect") {
												break;
											}

											var jsondata = {
												"contentIndex": curTOCIndex,
												"subIndex": curTOCSubIndex
											};
											$(".viewerIndexMenu").html(setTocList(tocData[curTOCIndex].subclass[curTOCSubIndex].TOC));
											break;
										}
									}

									h.click();
								});

								$("#unitSelect .select-items").append(c2);
							}

							curTOCSubIndex = 0;
							$("#unitSelect .select-selected").html(value[curTOCIndex].subclass[curTOCSubIndex].Title);
							$("#unitSelect select").html(unithtml);
							$(".viewerIndexMenu").html(setTocList(tocData[curTOCIndex].subclass[curTOCSubIndex].TOC));
							break;
						}

						var jsondata = {
							"contentIndex": curTOCIndex,
							"subIndex": curTOCSubIndex
						};
						$(".viewerIndexMenu").html(setTocList(tocData[curTOCIndex].subclass[curTOCSubIndex].TOC));
						break;
					}
				}

				h.click();
			});
			b.appendChild(c);

			if (x[i].id == "chapterSelect") {
				if (b.children.length == parseInt(content) + 1) {
					curcontent = c;
				}
			} else {
				if (b.children.length == parseInt(subClass) + 1) {
					curcontent = c;
				}
			}
		}

		x[i].appendChild(b);
		curcontent.click();
		a.addEventListener("click", function (e) {
			/*when the select box is clicked, close any other select boxes,
			and open/close the current select box:*/
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}
}

function closeSelectItems() {
	$(".select-selected").removeClass("select-arrow-active");
	$(".select-items").addClass("select-hide");
}

function pagemove(number, value) {
	closeSelectItems();
	curIndex = curTOCIndex;
	curSubIndex = curTOCSubIndex;
	var jsondata = {
		"contentIndex": curIndex,
		"subIndex": curSubIndex,
		"page": number
	};
	command("changePage", JSON.stringify(jsondata), '');
	$('.unitTitle').removeClass('on');
	$("#" + value).addClass('on');
}

function setTocList(toc) {
	var html = "";
	for (var i = 0; i < toc.length; ++i) {
		html += '<li><div class="unitType">' + toc[i].Text + '</div>';
		for (var j = 0; j < toc[i].subtitle.length; ++j) {
			let text = toc[i].subtitle[j].Text;
			html += '<div';
			html += ' id="unit_' + toc[i].subtitle[j].Page + '"';
			html += ` title="${text}" `
			html += ' class="unitTitle ';

			if (curIndex == curTOCIndex && curSubIndex == curTOCSubIndex && parseInt(toc[i].subtitle[j].Page) == curPage) {
				html += 'on';
			}

			html += '" onclick="pagemove(' + toc[i].subtitle[j].Page + ', this.id)" >' + toc[i].subtitle[j].Text + '</div>';
		}
		html += '</li>';
	}
	return html;
}

$(document).ready(function () {
	// $(".toolsWrap .btnOpen").click(function(){
	// 	$(".toolsWrap").addClass("open");
	// });

	// if($( ".viewTooltip" )){

	// 	$( ".viewTooltip" ).tooltip({
	/*position: {   my: "left top",
at: "left top",
of: ".viewTooltip" },
	classes: {"ui-tooltip": "bubble"}*/
	// 	});
	// }


});

String.prototype.width = function (font) {
	var f = font || '16px Noto Sans KR',
		o = $('<div></div>')
		.text(this)
		.css({
			'position': 'absolute',
			'float': 'left',
			'white-space': 'nowrap',
			'visibility': 'hidden',
			'font': f
		})
		.appendTo($('body')),
		w = o.width();

	o.remove();

	return w;
}

function loadInstallDialogTemplate(path) {
	$(document).load(path, function (resp, status, xhr) {
		if (status == "success" && xhr.status == 200)
			$("#progressContainer").InstallDialog({
				templete: resp
			});
		else {
			console.log("something wrong happend!");
		}
	});
}

//header로부터 툴팁메시지 전달
window.addEventListener('message', function (event) {
	var d = event.data;

	if (d.from == 'child') {
		if (d.type == 'show') {
			showTooltip(d.obj, d.txt, d.xpos, d.postype);
		} else if (d.type == 'hide') {
			hideTooltip(d.obj);
		}
	}
});

//툴팁보여주기
function showTooltip(obj, txt, xpos, postype) {
	$(obj).text(txt);
	$(obj).css("left", xpos);
	$(obj).addClass(postype + " on");
}

//툴팁가리기
function hideTooltip(obj) {
	$(obj).removeClass("on");
}
