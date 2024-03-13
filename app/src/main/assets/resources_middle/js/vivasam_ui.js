        (function($) {
            $.fn.spin = function(opts) {
                var presets = {
                    "main": { lines: 13, length: 16, width: 4, radius: 17, rotate: 0, trail: 76, speed: 0.7 },
                    "small": { lines: 8, length: 4, width: 3, radius: 5 },
                    "large": { lines: 10, length: 8, width: 4, radius: 8 }
                };
                if (Spinner) {
                    return this.each(function() {
                        var $this = $(this),
                            data = $this.data();

                        if (data.spinner) {
                            data.spinner.stop();
                            delete data.spinner;
                        }
                        if (opts !== false) {
                            if (typeof opts === "string") {
                                if (opts in presets) {
                                    opts = presets[opts];
                                } else {
                                    opts = {};
                                }
                            }
                            data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
                        }
                    });
                } else {
                    throw "Spinner class not available.";
                }
            };
        })(jQuery);
        
      //스크롤 바텀
        function scroll_bottom(v, t, d){
        	var y = $(document).height();
        	setTimeout(function() {
              $('html,body').stop().delay(d).animate({scrollTop : y - v},t);
        	});
			redrawfooter();
        }
        
        function scroll_more(v, t, d) {
        	var position = $(window).scrollTop(); 
        	setTimeout(function() {
                $('html,body').stop().delay(d).animate({scrollTop : position + v},t);
          	});
			redrawfooter();
        }
        
        function scroll_fixed(v, t, d) {
        	setTimeout(function() {
                $('html,body').stop().delay(d).animate({scrollTop : v},t);
          	});
			redrawfooter();
        }