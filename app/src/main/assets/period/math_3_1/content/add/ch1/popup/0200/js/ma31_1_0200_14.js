'use strict';

COMMONLIBRARY.createNs('pages');

COMMONLIBRARY.pages = (function () {
  var click = {
    x: 0,
    y: 0
  };
  var init = function(){

    var params = {
      start: function(event) {
        click.x = event.clientX;
        click.y = event.clientY;
      },

      // Callback fired on rotation start.
      drag: function(event, ui) {
        var original = ui.originalPosition;
        var scale = COMMONLIBRARY.view.scale;
        console.log(event.clientY +":"+ click.y +":"+ original.top);
        // jQuery will simply use the same object we alter here
        ui.position = {
          left: (event.clientX - click.x + original.left )/scale ,
          top:  (event.clientY - click.y + original.top)/scale
        };
      },
      // Callback fired during rotation.
      rotate: function(event, ui) {
        console.log(ui.angle.current);
      },
      // Callback fired on rotation end.
      stop: function(event, ui) {
      },
      transforms: {
        translate: '(50%, 50%)',
        scale: '(0.5)'
        //any other transforms
      }
    };
    // $('.box').resizable().rotatable().draggable();

    $('#target3').rotatable(params).draggable(params);

    // scaleDraggable();
  };
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
          left: (event.clientX - click.x + original.left ) ,
          top:  (event.clientY - click.y + original.top)
        };

      }

    });
  };



  return {
    init: init
  };

})();
