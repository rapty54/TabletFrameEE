// Z:\WEP\타회사_2016_제안샘플\visang\03. math\03\01\01
// mat31_101_04.html
// 통합교과용 zoom 컨텐츠
var mapContentsInt = function (wrap, width, height, btn, scaleMin, scaleMax) {

    var self = this;

    this.wrap = wrap;
    this.width = width;
    this.height = height;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.btn = btn;

    this.init = function () {
        this.wrap.html('');
        this.makeHtml();
        this.mapMove(this.map);

        this.map.css(self.wrap.css('background'));

        this.mapbtn.find('.text').html(self.scale * 100 + '%');
        this.mapbtn.find('.plus').on('click', function () {
            self.scaleUp();
        });

        this.mapbtn.find('.minus').on('click', function () {
			if(self.scale <= scaleMin) return false;
			
            self.scaleDown();
        });

        if (this.btn) {
            self.map.find('.innerbtn').on('click', function () {
                effectAdo('click');
                self.map.toggleClass('on');
            });
        }
    };

    this.makeHtml = function () {
        var html = '<div class="mapWrap">' +
            '<div class="mapbtn">' +
            '<div class="btn plus"></div>' +
            '<div class="text"></div>' +
            '<div class="btn minus"></div>' +
            '</div>' +
            '<div class="mapbox">' +
            '<div class="map"></div>' +
            '</div>' +
            '</div>';
        self.wrap.append(html);
        self.mapwrap = self.wrap.find('.mapWrap');
        self.map = self.wrap.find('.map');
        self.mapbtn = self.wrap.find('.mapbtn');

        self.mapwrap.css({
            'width': self.width + 'px',
            'height': self.height + 'px',
        });

        if (self.btn) {
            self.map.append('<div class="innerbtn"></div>');
        }
    };

    this.scaleUp = function () {
		if(scaleMax == undefined){
			scaleMax = 2.0;
		}
		
        if (self.scale < scaleMax) {
            effectAdo('click');
            self.scale += 0.2;
            self.scale = Number(Number(String(self.scale)).toFixed(1));
            var n = Math.round(self.scale * 100);
            self.mapbtn.find('.text').html(n + '%');

            self.map.css({
                'transform': 'scale(' + self.scale + ') translate(0px, 0px)',
                'transition': 'transform 0.3s'
            });

            self.translateX = 0;
            self.translateY = 0;
        }

        if (self.scale >= 1 + 0.2) {
            self.map.css('cursor', 'pointer');
            self.map.css({
                'transform': 'scale(' + self.scale + ') translate(' + self.translateX + 'px, ' + self.translateY + 'px)',
                'transition': 'transform 0.3s'
            });
        }
    };

    this.scaleDown = function () {
        if (self.scale > 0.2) {
            effectAdo('click');
            self.scale -= 0.2;
            self.scale = Number(Number(String(self.scale)).toFixed(1));
            self.map.css('transform', 'scale(' + self.scale + ')');
            var n = Math.round(self.scale * 100);
            self.mapbtn.find('.text').html(n + '%');

            self.map.css({
                'transform': 'scale(' + self.scale + ') translate(' + self.translateX + 'px, ' + self.translateY + 'px)',
                'transition': 'transform 0.3s'
            });
        }

        if (self.scale <= 1) {
            self.map.css('cursor', 'auto');
            self.map.css({
                'transform': 'scale(' + self.scale + ') translate(0px, 0px)',
                'transition': 'transform 0.3s'
            });
            self.translateX = 0;
            self.translateY = 0;
        }
    };

    this.mapMove = function (el) {
        var moving = false;
        var oX, oY, mapX, mapY;

        el.on('mousedown', function (e) {
            if (self.scale > 1) {
                moving = true;
                oX = e.pageX - self.translateX;
                oY = e.pageY - self.translateY;
            }
        });

        el.on('mousemove', function (e) {
            if (moving) {
                mapX = -(oX - e.pageX);
                mapY = -(oY - e.pageY);

                self.translateX = mapX;
                self.translateY = mapY;
                self.map.css({
                    'transform': 'scale(' + self.scale + ') translate(' + mapX + 'px, ' + mapY + 'px)',
                    'transition': 'transform 0s'
                });
                //self.map.find('.finger, .obj').addClass('movedis dis');
                self.map.find('*').addClass('movedis dis');
            }
        });

        el.on('mouseup', function (e) {
            if (moving) {
                self.translateX = mapX;
                self.translateY = mapY;
                moving = false;
                self.map.find('.movedis').removeClass('movedis dis');
            }
        });
        el.on('mouseleave', function (e) {
            if (moving) {
                moving = false;
                self.map.find('.movedis').removeClass('movedis dis');
            }
        });
    };

    this.reset = function () {
        self.scale = 1;
        self.mapbtn.find('.text').html(self.scale * 100 + '%');
        self.map.css('cursor', 'auto');
        self.map.css({
            'transform': 'scale(' + self.scale + ') translate(0px, 0px)',
            'transition': 'transform 0.0s'
        });
        self.translateX = 0;
        self.translateY = 0;
    };
};