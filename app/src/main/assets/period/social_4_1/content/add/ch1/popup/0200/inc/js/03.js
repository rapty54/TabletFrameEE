var aniCon;
var videoCon;
var fileName = 'dummy'; // 영상, 자막 파일명

$(window).on('load',function(){
	var cnt;
	bgColorChange("#000000");
    $('.contents').eq(0).show();
    // contentScript(0, $('.contents').eq(0));
    var aniTime = [4000, 3000];
    aniCon = new aniContents($('.contents').eq(0), false);
    aniCon.init();
    aniCon.allSound(aniTime, true); 
});


aniContents = function(wrap, _type){
	var self = this;
	this.wrap = wrap;
    this.myTimer;

	this.init = function(){
        if(self.wrap.find('.sound_btn').length > 0){
            self.wrap.find('.sound_btn').remove();
        }

        var tmpHtml = "";
        tmpHtml += '<div class="ca"></div>';
        tmpHtml += '<div class="item"><div class="close"></div></div>';
        self.wrap.find('.ani').html(tmpHtml);
        self.wrap.find('.ani').removeClass("animotion");

		self.wrap.find('.item').hide();
		self.wrap.find('.ani').off('click').on('click',function(e){
            var $this = $(this);
			e.stopPropagation();
            if(!_type){
                self.wrap.find('.item').hide();
                self.wrap.find('.ani').removeClass("animotion");
            }
			$(this).find('.item').show();
			ado_stop();
			effectAdo('click');
			if($(this).attr('data-ado')){
                var ado = $(this).attr('data-ado');
				contentAdo(ado);
                $(this).addClass("animotion");

                $('#' + ado).on('ended', function(){
                    $this.removeClass("animotion");
                })
			}
		});

		self.wrap.find('.close').off('click').on('click',function(e){
			e.stopPropagation();

			ado_stop();
			effectAdo('click');

            $(this).parent().hide();
            $(this).parent().parent().removeClass("animotion");

//            if(!_type){
//                self.wrap.find('.item').hide();
//                self.wrap.find('.ani').removeClass("animotion");
//            }else{
//                $(this).parent().hide();
//                $(this).parent().parent().removeClass("animotion");
//            }
		});
	}

    this.allSound = function(_times, _status){
        var html = '<div class="sound_btn"></div>';
        self.wrap.append(html);
        self.wrap.addClass('soundAll');
        clearTimeout(self.myTimer);

        self.wrap.find('.sound_btn').off().on('click', function(){
            ado_stop();
            clearTimeout(self.myTimer);
            if($(this).hasClass('re')){
                effectAdo('click');
                self.wrap.find('.ani').removeClass("animotion");
                self.wrap.find('.ani .item').hide();
                $(this).removeClass('re');
            }else{
                self.wrap.find('.ani').removeClass("animotion");
                self.wrap.find('.ani .item').hide();
                $(this).addClass('re');

                self.wrap.find('.ani').eq(0).addClass("animotion");
                self.wrap.find('.ani').eq(0).find('.item').show();
                if(self.wrap.find('.ani').eq(0).attr("data-ado")){
                    var ado = self.wrap.find('.ani').eq(0).attr("data-ado");
                    contentAdo(ado);

                }
                self.customTimer(1, _times, _status);
                if(_times[0] == 0){
                    effectAdo('click');
                }
            }
        });

        self.wrap.find('.close').bind('click',function(e){
			clearTimeout(self.myTimer);
//            self.wrap.find('.sound_btn').removeClass('re');

            if(self.wrap.find(".animotion").length == 0){
                self.wrap.find('.sound_btn').removeClass('re');
            }
		});

        self.wrap.find('.ani').bind('click',function(e){
            clearTimeout(self.myTimer);

            var totAni = _times.length;
            if(!_type){

            }else{
                if(totAni == self.wrap.find(".animotion").length){
                    self.wrap.find('.sound_btn').addClass('re');
                }
            }
		});
    }

    this.customTimer = function(_cnt, _times,  _status){
        var cnt = _cnt;
        clearTimeout(self.myTimer);
        self.myTimer = setTimeout(function(){
            if(_status){

                self.wrap.find('.ani').eq(cnt-1).removeClass("animotion");
                self.wrap.find('.ani').eq(cnt).addClass("animotion");
                self.wrap.find('.ani').eq(cnt).find('.item').show();
            }else{
                self.wrap.find('.ani').removeClass("animotion");
                self.wrap.find('.ani .item').hide();

                self.wrap.find('.ani').eq(cnt).addClass("animotion");
                self.wrap.find('.ani').eq(cnt).find('.item').show();
            }

            if(self.wrap.css("display") != "none"){
                if(self.wrap.find('.ani').eq(cnt).attr("data-ado")){
                    var ado = self.wrap.find('.ani').eq(cnt).attr("data-ado");
                    contentAdo(ado);

                    $('#' + ado).on('ended', function(){
                        self.wrap.find('.ani').eq(cnt).removeClass("animotion");
                    })
                }

                if(_cnt < (_times.length - 1)){
                    _cnt = _cnt + 1;
                    self.customTimer(_cnt, _times, _status);
                }else{
                    self.myTimer = setTimeout(function(){
                        self.wrap.find('.sound_btn').addClass('re');
                    }, _times[_times.length - 1]);
                }
            }
        }, _times[_cnt-1]);
    }
}







