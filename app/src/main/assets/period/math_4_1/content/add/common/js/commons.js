'use strict';

COMMONLIBRARY.createNs('commons');

COMMONLIBRARY.commons = (function () {
  var click = {
    x: 0,
    y: 0
  };
  var init = function(){
    scaleDraggable();
    zoominClick();
  }
  var scaleDraggable = function(){
    $('.scaleDraggable').draggable({

      start: function(event) {
        click.x = event.clientX;
        click.y = event.clientY;
      },

      drag: function(event, ui) {

        var original = ui.originalPosition;
        var scale = COMMONLIBRARY.view.scale;
        // jQuery will simply use the same object we alter here
        ui.position = {
          left: (event.clientX - click.x + original.left) / scale,
          top:  (event.clientY - click.y + original.top ) / scale
        };

      }

    });
  };
  var zoominClick = function(zoomClass){
    $('.zoominClick').click(function() {
      $(zoomClass).animate({width: "28%"}, 'slow');
    });
  };


  return {
    init: init,
    zoominClick:zoominClick
  };

})();
