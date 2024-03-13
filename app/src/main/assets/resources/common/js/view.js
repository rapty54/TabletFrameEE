'use strict';

COMMONLIBRARY.createNs('view');

COMMONLIBRARY.view = (function () {

  return {
    scaleValueX: 1,
    scaleValueY: 1,
    scale: 1,

    setScale: function () {
      //return;
      //getScale
      var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      var wrapEl = document.getElementById('wrap');
      var _scaleValueX = windowW / wrapEl.clientWidth;
      var _scaleValueY = windowH / wrapEl.clientHeight;
      var _scale = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY;

      this.scaleValueX = _scaleValueX;
      this.scaleValueY = _scaleValueY;
      this.scale = _scale;
      $(".scale-value").val(_scale);
      var transform = 'transform: scale(' + _scale + ',' + _scale + ');' +
          '-ms-transform: scale(' + _scale + ',' + _scale + ');' +
          '-webkit-transform: scale(' + _scale + ',' + _scale + ');' ;

      //wrapEl setScale
      var left = windowW / 2 - (wrapEl.clientWidth / 2) * _scale + 'px';
      var top = windowH / 2 - (wrapEl.clientHeight / 2 ) * _scale + 'px';
      wrapEl.setAttribute('style', transform +
          'transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;'+
          'left:' + left + ';' +
          'top:' + top );

      var sendEvent = jQuery.Event('scaleChange', {
        elWrap: wrapEl,
        windowW: windowW,
        windowH: windowH,
        scaleValueX: _scaleValueX,
        scaleValueY: _scaleValueY,
        elScale: _scale,
        elLeft: parseInt(left, 10) || 0,
        elTop: parseInt(top, 10) || 0
      });
      $('[data-component]').trigger(sendEvent);
      var canvasTop = windowH / 2 - (wrapEl.clientHeight / 2 ) * _scale + 60;

      /* PC Viewer Function
      if(parent.document.body) {      
        $(parent.document.body).find(".drawing-canvas-container").css({
          'transform': 'scale(' + _scale + ',' + _scale + ')',
          '-ms-transform': 'scale(' + _scale + ',' + _scale + ');',
          '-webkit-transform': 'scale(' + _scale + ',' + _scale + ');',
          'transform-origin': '0% 0%',
          '-ms-transform-origin': '0% 0%',
          '-webkit-transform-origin': '0% 0%',
          'left':left,
          'top': canvasTop
        });
      } */
    },

    initDeco: function (){
      return;
      var decoNode = $("#deco");
      if(!decoNode.length){
        return;
      }
      var img = document.createElement( "img" );
      img.src = "./common/img/bg_deco.png";
      img.id = "bodyBG";

      decoNode.append(img);
    },

    setDeco: function (){
      return;
      var decoNode = $("#deco");
      if(!decoNode.length){
        return;
      }

      //getScale
      var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      var wrapEl = document.getElementById('wrap');
      var _scaleValueX = windowW / wrapEl.clientWidth;
      var _scaleValueY = windowH / wrapEl.clientHeight;
      var _scale = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY;


      var transform = 'transform: scale(' + _scale + ',' + _scale + ');' +
          '-ms-transform: scale(' + _scale + ',' + _scale + ');' +
          '-webkit-transform: scale(' + _scale + ',' + _scale + ');' ;

      //bodyBG setScale
      if(decoNode){
        var left = windowW / 2 - (decoNode.clientWidth / 2) * _scale + 'px';
        decoNode.setAttribute('style', transform +
            'transform-origin: 0% 100%; -ms-transform-origin: 0% 100%; -webkit-transform-origin: 0% 100%;'+
            'left:' + left + ';'  );
      }
    },


    setSlidBtnPos : function (){
        //현재 슬라이드를 구함.
        var slide = $('.slide.on').get(0);
        if (!slide) {
          return;
        }

        //슬라이드의 타입을 구함
        var slideType = $(slide).data('type');
        var slideBtnPrev = $('.sliderWrap .btnPrev');
        var slideBtnNext = $('.sliderWrap .btnNext');
        switch (slideType) {
          case 'core' :

            var inner1 = document.getElementById('inner1');
            var hei = inner1.clientHeight ;
            $(".sliderWrap").height(hei);
            break;
            
          case 'solution' :
            var cornerArea = document.getElementById('cornerArea');
            var cHei = 0;
            if(cornerArea){
              cHei = cornerArea.clientHeight;
            }

            var inner1 = document.getElementById('inner1');
            var hei = inner1.clientHeight - cHei;
            $(".sliderWrap").height(hei);
            slideBtnPrev.css('marginTop',(cHei/2)*(-1)+'px');
            slideBtnNext.css('marginTop',(cHei/2)*(-1)+'px');
            break;

            
          case 'solutionType2' :
            var cornerArea = document.getElementById('cornerArea');
            var cHei = 0;
            if(cornerArea){
              cHei = cornerArea.clientHeight;
            }

            var topArea = document.getElementById('topArea');
            var tHei = 0;
            if(topArea){
              tHei = topArea.clientHeight;
            }

            var inner1 = document.getElementById('inner1');
            var hei = inner1.clientHeight - tHei - cHei;
            $(".sliderWrap").height(hei);
            slideBtnPrev.css('marginTop',((cHei+tHei)/2)*(-1)+'px');
            slideBtnNext.css('marginTop',((cHei+tHei)/2)*(-1)+'px');
            break;

          default:
            var cornerArea = document.getElementById('cornerArea');
            var cHei = 0;
            if(cornerArea){
              cHei = cornerArea.clientHeight;
            }

            var topArea = document.getElementById('topArea');
            var tHei = 0;
            if(topArea){
              tHei = topArea.clientHeight;
            }

            var inner1 = document.getElementById('inner1');
            var hei = inner1.clientHeight - tHei - cHei;
            $(".sliderWrap").height(hei);
            slideBtnPrev.css('marginTop',((cHei+tHei)/2)*(-1)+'px');
            slideBtnNext.css('marginTop',((cHei+tHei)/2)*(-1)+'px');
            break;
        }

    }
  };

})();
