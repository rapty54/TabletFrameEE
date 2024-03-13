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
function setTitleHeader(value) {
	$("#ifHeader").contents().find(".title").html(decodeURIComponent(value));
}
function setTitle(value) {
	$(".title").html(decodeURIComponent(value));
}
function setPage(curpage, lastpage, tocIndex, tocSubIndex) {
	$("#curPage").text(curpage);
	$("#totalPage").text(lastpage);
	$(".tocItem.item1").removeClass("on");
	$($(".tocItem.item1")[tocIndex]).addClass("on");
}
function setContent(value) {
	var data = JSON.parse(decodeString(value));
	if (data.PDFPage.length == 1) {
		$("#ifHeader").contents().find("#ebookpage").text(data.PDFPage[0]);
	}
	else if (data.PDFPage.length > 1) {
		$("#ifHeader").contents().find("#ebookpage").text(data.PDFPage[0] + "~" + data.PDFPage[data.PDFPage.length - 1]);
	}
	$('#ifContent').attr('src', data.url);

	/*	var iframe =document.createElement('iframe');
		$("body").append(iframe);
		$(iframe).css("visibility", "hidden");
		$(iframe).attr("frameborder", "0");
		$(iframe).attr("marginheight", "0");
		$(iframe).attr("scrolling", "");
		$(iframe).attr("style", "width:100%; height:100%");
			
		iframe.onload = function(){
			
			$("#ifContent").remove();
			$(iframe).css("visibility", "");
			iframe.id="ifContent";
			outerScale();
		};
		iframe.src = url;*/

}
function decodeString(str) {
	if (str.indexOf("+") > 0) {
		return decodeURIComponent(decodeURI(str).replace(/\+/g, " "));
	} else {
		return decodeURIComponent(decodeURI(str));
	}
}

function setToc(value) {
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
		command('page', this.id, '');
	});
	setEventTocItem();
}
var position = 0;
function prevToc() {

	if (position >= 0)
		return;
	var startposition = position;
	position += 150;
	var target = document.querySelector('.tocTable');


	target.animate([
		{ "transform": 'translateX(' + startposition + 'px)' },
		{ "transform": 'translateX(' + position + 'px)' }
	], 200);

	$(".tocTable").css("transform", "translateX(" + position + "px)");
}
function nextToc() {
	var width = $(".tocTable").get(0).scrollWidth - $(".tocWindow").width();
	if (position <= -width)
		return;
	var startposition = position;
	position -= 150;
	var target = document.querySelector('.tocTable');

	target.animate([
		{ "transform": 'translateX(' + startposition + 'px)' },
		{ "transform": 'translateX(' + position + 'px)' }
	], 200);

	$(".tocTable").css("transform", "translateX(" + position + "px)");
}

function setFullscreen(value) {
	command('fullScreen', value, '');
}
function setEventTocItem() {
	$(".tocItem.item1").on("click", function () {
		$(".tocItem.item1").removeClass("on");
		$(this).addClass("on");
	});
}