'use strict';

var B = (function(){
	var
	$win = $(window),
	$doc = $(document),
	$docel = $(document.documentElement),
	$body,
	$wrapper,
	$header,
	$container,
	$content,
	$footer,
	$nav,
	$lnb,
	bgMask,
	$visual,
	winwidth= $win.width(),
	winheight = $win.height(),
	ismobile = (typeof window.orientation !== 'undefined') ? true : false,
	sizechange = !ismobile ? "resize" : "orientationchange",
	issafari = ( navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 ) ? true : false;
	
	var getInternetExplorerVersion = function(){
		var rv = -1;
	    if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null)
	            rv = parseFloat(RegExp.$1);
	    }
	    return rv;
	},
	ver =  getInternetExplorerVersion();
	
	
	var mainCommon = {
		visualHover : function(){
			var btnGroup = $('.nav'),
			btn = btnGroup.find('a'),
			visualBox = btnGroup.next('.visual'),
			m = visualBox.find('.index'),
			list = visualBox.find('ol > li');
			
			btn.on({
				'mouseenter' : hover
			});
			$content.on('mouseleave',leave);
			
			
			function hover(e){
				var self = $(this),
				idx = btn.index(self);
				
				m.hide();
				list.hide().eq(idx).show();
			}
			
			function leave(e){
				list.hide();
				m.show();
			}
		}
	}
	
	var ieFunc = {
		gnbHover : function(){
			
		}
	}
	
	var commonFunc = {
		contResizing : function(){
			return;
			var winheight = $win.height(),
			resizeCont = winheight - $header.height() - $footer.height();
			
			if($('body.main').length > 0){
				if(resizeCont > $content.height()){
					$container.css("height",resizeCont - 2);
				}else{
					$container.css("height",$content.height());
				}
			}else if($('.sub').length > 0){			
				if(resizeCont > $('.detail').height() + 196){
					$container.css("height",resizeCont - 2);
				}else{
					$container.removeAttr("style");
				}
			}
		},
		
		lnbResizing : function(){
			var winheight = $win.height(),
			resizeCont = winheight - $header.height() - $footer.height();
			
			if($('.sub').length > 0){
				if($lnb.height() > $('.detail').height()){
					$('.detail').css('height',$lnb.height());
				}else{
					$lnb.css('height',$('.detail').height() + 116);
				}
			}
		},
		
		placeHolder : function(){
			$('input[placeholder]').each(function(){
			    $('input[placeholder]').each(function(){
				    var input = $(this),
					placeholder =  input.attr('placeholder');
					
				    input.val(placeholder);
					if(input.hasClass('pw')){
					}
					
				    input.focus(function(){
				        if(input.val() == input.attr('placeholder')){
				            input.val('');
				        };
				    });
				 
				    input.blur(function(){
				        if(input.val() == ''|| input.val() == input.attr('placeholder')){
				            input.val(input.attr('placeholder'));
				        };
				    });
				});
			});
		},
		
		gnbSizing : function(){
			var wrap = $nav.find('nav > ul > li.on'),
			depBox = wrap.find('.secondD'),
			anchors = depBox.find('a');
			
			if(depBox.find('.ie_justify').length > 0 || $nav.find('nav > ul > li').index('.on') == 0){			
				wrap.css('position','static');
				depBox.css({
					'left' : 0,
					'top' : 50
				});
				return;
			}
			
			if(anchors.length == 1){
				depBox.css({
					'top' : 50,
					'width' : 300,
					'margin-left' : -125
				});
			}else if(anchors.length == 2){
				depBox.css({
					'top' : 50,
					'width' : 300,
					'margin-left' : -135
				});
			}else if(anchors.length == 4){
				
				depBox.css({
					'top' : 50,
					'width' : 700,
					'margin-left' : -340
				});
				
			}else if(anchors.length == 8){
				
				depBox.css({
					'top' : 50,
					'width' : 900,
					'margin-left' : -435
				});
			}
		}
	}
	
	function mainFunc(){
		if($('body.main').length <= 0) return;
		mainCommon.visualHover();
	}
	
	function onscroll(){
	}
	
	function onresize(e) {
		commonFunc.contResizing();
	}
	
	function onload(){
		commonFunc.contResizing();
		commonFunc.lnbResizing();
	}
	
	function iechecker() {
		var ua = navigator.userAgent.toLowerCase();
		var version = 11;
		var classNames = "";

		if( ua.indexOf( 'msie' ) !== -1 || ua.indexOf( 'trident' ) !== -1 ) {

			ua = /msie ([0-9]{1,}[\.0-9]{0,})/.exec( ua );

			if( ua ) {
				version = parseInt( ua[ 1 ] );
				classNames += ' is-ie';
				classNames += ' ie' + version;
				for( var i = version + 1; i <= 11; i++ ) {
					classNames +=  ' lt-ie' + i;
				}

				$("html").addClass(classNames);
			}
		}

		if (navigator.appName === 'Netscape') {
			var ua = navigator.userAgent;
			var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) !== null){
				version = parseFloat( RegExp.$1 );
				$("html").addClass(" is-ie" + " ie" + version + " lt-ie" + (version + 1));
			}
		}
		
		if(issafari){
			$("html").addClass("ios");
		}else{
			$("html").addClass("chrome");
		}
	}

	function msie(){
		if(ver <= 9 && ver != -1){
			commonFunc.placeHolder();
		}
	}
	
	return {
		initialize : function(){
			$body = $(document.body);
			$wrapper = $('#wrap');
			$header = $('#header');
			$container = $('#container');
			$content = $('.content');
			$footer = $('#footer');
			$nav = $('#nav');
			$lnb = $('.lnb');
			bgMask = $('.maskBg');
			
			iechecker();
			msie();
			mainFunc();
			
			//common
			$win.load(onload).scroll(onscroll).on(sizechange, onresize);
		}
	}
})();



$(function(){
	B.initialize();
});


function moveChildContent(cateCd) {

	//[RMS-5307]:[개발] 테마관 로그인 해제 (김태형: 2020-04-07)
	/*
	if(LOGIN_ID == ''){
    	
		bgLayerH();
		
		
		popDim('layerLogin');
		
        return;
    }
	else {

	}*/

	location.href = "/themeplace/child/subContent.do?cateCd=" + cateCd;
}