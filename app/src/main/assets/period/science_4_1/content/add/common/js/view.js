'use strict';

COMMONLIBRARY.createNs('view');

COMMONLIBRARY.view = (function () {
  
  return {
    scaleValueX: 1,
    scaleValueY: 1,
    scale: 1,

    setScale: function () {
      //  return;
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

        let helpW = $(parent.document.body).find('.inner.help.shadow').width() / 2 || 0;
        let helpH = (743 + $(parent.document.body).find(".inner.help .top").height()) / 2 || 0;
        $(parent.document.body).find('.inner.help.shadow').css({
          'transform'         : 'scale(' + _scale + ',' + _scale + ')',
          '-ms-transform'     : 'scale(' + _scale + ',' + _scale + ');',
          '-webkit-transform' : 'scale(' + _scale + ',' + _scale + ');',
          'margin-left'       : '-' + helpW + 'px',
          'margin-top'        : '-' + helpH + 'px',
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
    }
  };

})();
