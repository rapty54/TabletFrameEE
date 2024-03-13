'use strict';

COMMONLIBRARY.createNs('view');

COMMONLIBRARY.view = (function () {

  return {
    scaleValueX: 1,
    scaleValueY: 1,
    scale: 1,

    setScale: function () {
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

    }
  };

})();

'use strict';


document.addEventListener('DOMContentLoaded', function () {
  var view = COMMONLIBRARY.view;

  view.setScale();
});

window.addEventListener('resize', COMMONLIBRARY.view.setScale);
