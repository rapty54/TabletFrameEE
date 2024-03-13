var introContents;
var objectiveContents;
var writeContents;
var clickContents;
var pageingContents;
var tabContents;
var popupContents;
var scrollContents;
var dragContents;
var oxContents;
var oxListContents;
var quizContents;
var lineQuizContents;
var dolbalContents;
var aniContents;
var helpContents;
var mapContents;
var cardturnContents;
var starContents
var stampContents;
var turnClickContents;
var mapContents;
var colorList = [
	'#FDBB38',
	'#F8CADB',
	'#A9CE0D',
	'#5FCBD6',
	'#B6A3CE',
	'#A8A8A8'
];

function bgColorChange(color){
//	$('#container').css('background-color',color);
	$('#wrap').css('background-color',color);
}

bgColorChange('black')

function makeMask(){
	$('#container').append('<div class="mask"></div>');
	$('#container .mask').css({
		'width': '100%',
		'height': '100%',
		'background-color': 'rgba(0,0,0,0.7)'
	});
}

function removeMask(){
	$('.mask').remove();
}

function effectAdo(effect) {
	if(effect == 'anschk_x'){
    	var n = Math.floor(Math.random() * 6 + 1);
    	effect = 'wrong' + n;
	}

	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="../../common/media/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	ado_stop();
	if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	$(ado)[0].play();
}

function contentAdo(effect){
    var ado = '#' + effect;
    if($(ado).length == 0){
    	var html = '<audio id="'+effect+'" src="inc/media/mp3/'+effect+'.mp3" type="audio/mp3"></audio>';
    	$('#wrap').append(html);
    }
    ado_stop();
    if($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
    $(ado)[0].play();
}

function toggleAdo(effect){
    var ado = '#' + effect;
    if($(ado).length == 0){
    	var html = '<audio id="'+effect+'" src="inc/media/mp3/'+effect+'.mp3" type="audio/mp3"></audio>';
    	$('#wrap').append(html);
    }
    
    ado_stop();
    if($(ado)[0].ended){
        $(ado)[0].currentTime = 0;
    }
    
    if($(ado)[0].currentTime > 0){
        $(ado)[0].pause();
        $(ado)[0].currentTime = 0;
    }else{
        $(ado)[0].play();
    }
}

function ado_stop(){
    $('audio').each(function(){
        $(this)[0].pause();
    });
}

function cho_hangul(str) {
  cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  result = "";
  for(i=0;i<str.length;i++) {
    code = str.charCodeAt(i)-44032;
    if(code>-1 && code<11172) result += cho[Math.floor(code/588)];
    else result += str.charAt(i);
  }
  return result;
}

function setVidoTab(_num, _page, _vidoCon, _vidoTime){
    if(_page.find('.vido_btn').length > 0){
        _page.find('.vido_btn').remove();
    }
    
    var html = '';
    for(var i=0; i<_num; i++){
        html += '<div class="vido_btn" data-num="'+i+'"></div>';
    }
    _page.prepend(html);
    _page.find('.vido_btn').eq(0).addClass('active');
    
    _page.find('.vido_btn').off().on('click', function(){
        var myN = parseInt($(this).attr("data-num"), 10);
        
        _page.find('.vido_btn').removeClass('active');
        $(this).addClass('active');
        
        var min = parseInt(_vidoTime[myN].split(":")[0], 10) * 60;
        var sec = parseInt(_vidoTime[myN].split(":")[1], 10);
        var moveTime = min + sec;

        _vidoCon.video[0].currentTime = moveTime;
        _vidoCon.play();
    })
}

function flickItems(_this, _cnt, _type){
    var aniCnt = 1;
    var $this = _this;
    
    $this.stop();
    roopfunction();
    function roopfunction(){
        $this.delay(500).animate({opacity: '0'}, 100).delay(500).animate({opacity: '1'}, 100, function(){
            if(_cnt == 0){
                roopfunction();
            }else if(aniCnt < _cnt){
                roopfunction();
                aniCnt++;
            }else{
                if(_type == "hide"){
                    $this.delay(500).animate({opacity: '0'}, 100);
                }
            }
        });
    }
}

function miniController(_page, _vidoCon){
    var miniPop;
    var myHtml = "";
    myHtml += '<div class="miniControllerGroup">';
    myHtml += '<div class="miniController">';
    myHtml += '<div class="mini_play"></div>';
    myHtml += '<div class="mini_popbtn"></div>';
    myHtml += '</div>';
    myHtml += '<div class="mini_popup"><div class="mini_close"></div></div>';
    myHtml += '</div>';
    if(_page.find(".miniControllerGroup").length > 0) _page.find(".miniControllerGroup").remove();
    _page.append(myHtml);
    _vidoCon.wrap.addClass('miniVideo');
    var _this = _page.find(".miniControllerGroup");
    
    _this.find(".mini_play").off().on('click', function(){
        var myBtn = $(this);
        
        if(myBtn.hasClass("off")){
            myBtn.removeClass("off");
            _vidoCon.stop();
        }else{
            myBtn.addClass("off");
            _vidoCon.play();
        }
        
        _vidoCon.video.on('ended', function(){
            myBtn.removeClass("off");
        });
        
        _vidoCon.video.on('pause', function(){
            myBtn.removeClass("off");
        });
    });
    
    _this.find(".mini_popbtn").off().on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            makeMask();
            effectAdo('click');
            _this.find('.mini_popup').show();
        }
    })
    
    _this.find('.mini_close').off().on('click', function(){
        removeMask();
        effectAdo('click');
        _this.find('.mini_popup').hide();
        _this.find(".mini_popbtn").removeClass('active');
    });
}

objectiveContents = function(wrap){
    var self = this;
	this.wrap = wrap;
    this.timer;
    
    this.init = function(){
        if(this.wrap.find('.tobtn').length > 0){
			this.wrap.find('.to').remove();
			this.wrap.find('.tobtn').remove();
		}
        
        self.makeArea();
        
        this.wrap.find('.tobtn').off().on('click',function(){
            $(this).hide();
            self.wrap.find('.to').show().addClass('motion');
            var time = self.wrap.find('.to').css('animation-duration');
            time = time.replace('s','');
            time = Number(time) * 1000;
            effectAdo('click');
            effectAdo('count');
            timer = setTimeout(function(){
                self.wrap.find('.tobtn').show();
                self.wrap.find('.to').hide().removeClass('motion');
            },time+2000)
        });
    }
    
    this.makeArea = function(){
        var html = '';
        html += '<div class="to"></div>';
        html += '<div class="tobtn"></div>';
        this.wrap.append(html);
    }
}

writeContents = function(wrap){
    var self = this;
	this.wrap = wrap;
    this.timer;
    
    this.init = function(){
        if(this.wrap.find('.tobtn').length > 0){
			this.wrap.find('textarea').remove();
			this.wrap.find('.to').remove();
			this.wrap.find('.tobtn').remove();
		}
        
        self.makeArea();
        
        this.wrap.find('.tobtn').off().on('click',function(){
            $(this).hide();
            self.wrap.find('.to').show().addClass('motion');
            var time = self.wrap.find('.to').css('animation-duration');
            time = time.replace('s','');
            time = Number(time) * 1000;
            effectAdo('click');
            effectAdo('count');
            timer = setTimeout(function(){
                self.wrap.find('.tobtn').show();
                self.wrap.find('.to').hide().removeClass('motion');
            },time+2000)
        });
        
        this.wrap.find('textarea').val('');

        this.wrap.find('textarea').focus(function(){
            $(this).css('background','none');
            $(this).attr('placeholder', '');
        });

        this.wrap.find('textarea').blur(function(){
            var txtval = $(this).val();
            if(txtval.trim() != ""){
                $(this).css('background','none');
            }else{
                $(this).css({
                    'background' : 'url(../../common/images/aniitem/icon.png) 0px 16px no-repeat',
                    'background-size': '77px 82px'
                });
                $(this).attr('placeholder', '      직접 써 보세요.')
            }
        })
    }
    
    this.makeArea = function(){
        var html = '';
        html += '<textarea id="Textbox" class="writePage textarea" placeholder="      직접 써 보세요."></textarea>';
        html += '<div class="to"></div>';
        html += '<div class="tobtn"></div>';
        this.wrap.append(html);
    }
}

clickContents = function(items,wrap,set){
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
    this.set = set;
	this.openItemNum = 0;
	this.items = '';
	this.sItems = '';
	this.ansbtn = '';
	this.init = function(){
		this.openItemNum = 0;

		if(this.wrap.find('.clickItem').length > 0){
			this.wrap.find('.clickContent').remove();
		}
        
		if(self.clickItems > 1){
			this.makeWrap();
			this.makeItem();
			this.makeBtn();

			this.items.on('click',function(e){
                e.stopPropagation();
				if($(this).css('opacity') == '0'){
					$(this).css('opacity','1');
					self.openItemNum --;
				}else{
					$(this).css('opacity','0');
					self.openItemNum ++;
				}

				effectAdo('click');
				if(self.openItemNum == self.clickItems){
					self.ansbtn.addClass('re');
				}else{
					self.ansbtn.removeClass('re');
				}
			});

			this.ansbtn.on('click',function(){
				effectAdo('click');
				if($(this).hasClass('re')){
					self.items.css('opacity','1');
					self.openItemNum = 0;
					self.ansbtn.removeClass('re');
                    if(self.itemwrap.find('.showItem').length > 0){
                        self.itemwrap.find('.showItem').hide();
                    }
				}else{
					self.items.css('opacity','0');
					self.ansbtn.addClass('re');
					self.openItemNum = self.clickItems;
                    if(self.itemwrap.find('.showItem').length > 0){
                        self.itemwrap.find('.showItem').show();
                    }
				}
			});
		}else{
			this.makeWrap();
			this.makeItem();

			this.items.on('click',function(e){
                e.stopPropagation();
				effectAdo('click');
				if($(this).css('opacity') == '0'){
					$(this).css('opacity','1');
					self.openItemNum --;
				}else{
					$(this).css('opacity','0');
					self.openItemNum ++;
				}
			});
		}

	}

	this.makeWrap = function(){
		var html = '<div class="clickContent"></div>';
		this.wrap.append(html);
		this.itemwrap = this.wrap.find('.clickContent');
	};

	this.makeItem = function(){
		var html = '';
		for(var i = 0;i< this.clickItems;i++){
			html += '<div class="clickItem clickItem'+(i+1)+'"></div>'
		}
		this.itemwrap.append(html);
		this.items = this.itemwrap.find('.clickItem');

        if(this.set == 1){
            this.items.addClass('ex');  
        }else{
            this.items.addClass('qu');
        } 
	};

	this.makeBtn = function(){
		var html = '<div class="ansbtn"></div>'
		this.itemwrap.append(html);
		this.ansbtn = this.itemwrap.find('.ansbtn');
	};
    
    this.showitem = function(){
        var tmpHtml = "";
        tmpHtml += '<div class="showItemGroup">';
        for(var i = 0;i< this.clickItems;i++){
			tmpHtml += '<div class="showItem" data-num="'+i+'"></div>'
		}
        tmpHtml += '</div>';
        this.itemwrap.append(tmpHtml);
        this.sItem = this.itemwrap.find('.showItem');
        self.sItem.hide();
        
        this.items.bind('click', function(){
            if($(this).css('opacity') == '0'){
                self.sItem.eq($(this).index()).show();
                self.sItem.eq($(this).index()).addClass('active');
            }else{
                self.sItem.eq($(this).index()).hide();
                self.sItem.eq($(this).index()).removeClass('active');
            }
        });
    }
    
    this.setAnsBtn = function(_sound){
        var sound = _sound == undefined ? 'click' : _sound;
        self.wrap.find('.clickContent').append('<div class="ansbtn '+sound+'"></div>');
        
        self.wrap.find('.clickItem').bind('click', function(){
            if($(this).css('opacity') == 0){
                effectAdo(sound);
            }else{
                effectAdo('click');
            }
            
            if(self.openItemNum == self.clickItems){
                self.wrap.find('.clickContent .ansbtn').addClass('re');
            }else{
                self.wrap.find('.clickContent .ansbtn').removeClass('re');
            }
        })

        this.ansbtn = self.wrap.find('.ansbtn');
        this.ansbtn.off().on('click', function(){
            var myItems = self.wrap.find('.clickItem');
            if($(this).hasClass('re')){
                effectAdo('click');
                myItems.css('opacity','1');
                $(this).removeClass('re');
                self.openItemNum = 0;
                if(self.itemwrap.find('.showItem').length > 0){
                    self.itemwrap.find('.showItem').hide();
                }
            }else{
                effectAdo(sound);
                myItems.css('opacity','0');
                $(this).addClass('re');
                self.openItemNum = self.clickItems;
                if(self.itemwrap.find('.showItem').length > 0){
                    self.itemwrap.find('.showItem').show();
                }
            }
        })
    }
    
    this.cho = function(_text, _type){
        var myItems = _text;
//        if(self.wrap.find('.ansbtn').length == 0){
//            self.wrap.find('.clickContent').append('<div class="cho_ansbtn"></div>');
//            self.wrap.find('.clickContent').append('<div class="ansbtn"></div>');
//        }else{
//            self.wrap.find('.clickContent').append('<div class="cho_ansbtn"></div>');
//        }
        
        self.items.each(function(i){
            if(_type == 1){
                self.wrap.find('.clickContent').addClass("cho_1");
                
                var myTmpArr = cho_hangul(myItems[i]).split("");
                var myTmpHtml = "<ul>";
                for(var i=0; i<myTmpArr.length; i++){
                    myTmpHtml += '<li>'+myTmpArr[i]+'</li>';
                }
                myTmpHtml += '</ul>';
                $(this).html(myTmpHtml);
            }else{
                self.wrap.find('.clickContent').addClass("cho_2");
                
                $(this).html('<span>'+cho_hangul(myItems[i])+'</span>');
            }
        });
        
        self.wrap.find('.clickItem').bind('click', function(){
            if($(this).css('opacity') == 0){
//                effectAdo('anschk_o');
                effectAdo('click');
            }else{
                effectAdo('click');
//                $(this).removeClass("view_cho");
            }
            if(self.openItemNum == self.clickItems){
                self.wrap.find('.ansbtn').addClass('re');
                self.wrap.find('.cho_ansbtn').addClass('ans');
//                self.wrap.find('.cho_ansbtn').removeClass('re');
            }else{
                self.wrap.find('.ansbtn').removeClass('re');
                self.wrap.find('.cho_ansbtn').removeClass('ans');
            }
        })
        
        self.wrap.find('.cho_ansbtn').off().on('click', function(){
            if(!$(this).hasClass('ans')){
                effectAdo('click');
                if($(this).hasClass('re')){
                    $(this).removeClass("re");
                    self.wrap.find('.clickItem').removeClass("view_cho");
                }else{
                    $(this).addClass("re");
                    self.wrap.find('.clickItem').addClass("view_cho");
                }
            }
        });
        
        self.wrap.find('.ansbtn').off().on('click', function(){
            var myItems = self.wrap.find('.clickItem');
            if($(this).hasClass('re')){
                effectAdo('click');
                myItems.css('opacity','1');
                $(this).removeClass('re');
                self.wrap.find('.cho_ansbtn').removeClass('ans');
                self.wrap.find('.cho_ansbtn').removeClass("re");
                self.wrap.find('.clickItem').removeClass("view_cho");
                self.openItemNum = 0;
            }else{
                effectAdo('click');
//                effectAdo('anschk_o');
                myItems.css('opacity','0');
                $(this).addClass('re');
                self.wrap.find('.cho_ansbtn').addClass('ans');
                self.openItemNum = self.clickItems;
            }
        });
    }

	this.zIndex = function(_target, _tn){
        _tn = _tn == undefined ? "1" : _tn;
        
        self.wrap.find('.clickItem').css({zIndex: 10});
        _target.css({zIndex: 1});
        
        self.wrap.find('.clickItem'+_tn).bind('click', function(){
            if($(this).css('opacity') == 0){
                $(this).css({zIndex: 1});
                _target.css({zIndex: 10});
            }else{
                $(this).css({zIndex: 10});
                _target.css({zIndex: 1});
            }
        })
        
        self.wrap.find('.ansbtn').bind('click', function(){
            if($(this).hasClass('re')){
                self.wrap.find('.clickItem').css({zIndex: 1});
                _target.css({zIndex: 10});
            }else{
                self.wrap.find('.clickItem').css({zIndex: 10});
                _target.css({zIndex: 1});
            }
        })
    }
    
    this.step = function(_type){
        this.items.each(function(idx){
            if(idx != 0){
                $(this).addClass('off');
                if(_type == "toggle") $(this).hide();
            }
        })

        this.items.bind('click', function(){
            if($(this).css('opacity') == 0){
                $(this).addClass('off');
                $(this).next().removeClass('off');
                if(_type == "toggle") $(this).next().show();
            }else{
                if(_type == "toggle"){
                    self.items.hide();
                    var myIdx = $(this).index();
                    self.items.each(function(idx){
                        if(idx <= myIdx){
                            $(this).show();
                        }
                    })
                }
            }
        })
        
        if(this.ansbtn.length > 0){
            this.ansbtn.bind('click', function(){
                if($(this).hasClass('re')){
                    self.items.addClass('off');
                    if(_type == "toggle") self.items.show();
                }else{
                    self.items.each(function(idx){
                        if(idx != 0){
                            $(this).addClass('off');
                            if(_type == "toggle") $(this).hide();
                        }else{
                            $(this).removeClass('off');
                        }
                    })
                };
            })
        }
    }
}

pageingContents = function(wrap){
	var self = this;
	this.wrap = wrap;
    this.page = wrap.find('.page');
	this.pageNum = wrap.find('.page').length;
	this.currentPage = 0;
	this.next,this.prev,this.navi,this.dot

	this.init = function(){
		self.wrap.find('.navigation').remove();
		self.currentPage = 0;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(0).show();
		self.makeNavi();

		self.next.on('click',function(){
			self.nextClick($(this));
		});

		self.prev.on('click',function(){
			self.prevClick($(this));
		});

		self.dot.each(function(){
			$(this).on('click',function(){
				if($(this).hasClass('on')) return false;
				var p = $(this).index();
				self.currentPage = p;
				self.pageMove(self.currentPage);
			});
		});
	}

	this.makeNavi = function(){
		var html = '<div class="navigation"></div>';
		self.wrap.append(html);
		self.navi = self.wrap.find('.navigation');
		var prev = '<div class="prev dis"></div>';
		var next = '<div class="next"></div>'
		var pageing = '<div class="pageing"></div>';
		self.navi.append(prev + next + pageing);
		var dot = '<div class="dot"></div>';
		for(var i = 0; i < self.pageNum; i++){
			self.navi.find('.pageing').append(dot);
		}
		self.navi.find('.pageing .dot').eq(0).addClass('on');
		self.navi.find('.pageing').css('width',(59*self.pageNum)+32 +'px');
		self.next = self.navi.find('.next');
		self.prev = self.navi.find('.prev');
		self.dot = self.navi.find('.pageing .dot');
	}

	this.nextClick = function(el){
		if(el.hasClass('dis')) return false;
		self.currentPage = self.currentPage + 1;
		self.pageMove(self.currentPage);
	}

	this.prevClick = function(el){
		if(el.hasClass('dis')) return false;
		self.currentPage = self.currentPage - 1;
		self.pageMove(self.currentPage);
	}

	this.pageMove = function(page){
		self.currentPage = page;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(page).show();
		self.navi.find('.pageing .dot').removeClass('on');
		self.navi.find('.pageing .dot').eq(page).addClass('on');
        clearTimeout(rootTimer);

		effectAdo('click');
		self.wrap.find('.dis').removeClass('dis');
		if(page == 0){
			self.prev.addClass('dis');
		}else if(page+1 == self.pageNum){
			self.next.addClass('dis');
		}
	};
    
    this.setPopUp = function(_cont, _tN){
        _cont.find(".btn").off().on('click', function(){
            var myN = _tN == undefined ? 0 : _tN;
            makeMask();
            effectAdo('click');
            if($('.pop'+myN).length > 0){
                $('.pop'+myN).show();
            }else{
                $('.pop').show();
            }
            
            var p = $(this).attr("data-num");
            if(p == undefined || p == ""){
                p = 0;
            }
            self.currentPage = parseInt(p, 10);
            self.pageMove(self.currentPage);
            
            if(typeof(videoCon) != 'undefined'){videoCon.stop()};
        });
        
        $('.pop .close').off().on('click', function(){
            removeMask();
            effectAdo('click');
            $(this).parent().hide();
            clearTimeout(rootTimer);
        });
    }
}

tabContents = function(cnt, wrap){
    var self = this;
	this.wrap = wrap;
    this.cnt = cnt;
    this.tab;
    this.currentTab = 0;
    
    this.init = function(){
        if(self.wrap.find('.tabWrap').length > 0){
            self.wrap.find('.tabWrap').remove();
        }
        
        self.makeArea();
        self.wrap.find('.tabWrap .tab[data-num="0"]').show();
        self.wrap.find('.tabWrap .tab_btn[data-num="0"]').addClass('active');

        self.wrap.find('.tabWrap .tab_btn').off().on('click', function(){
            var myN = $(this).attr("data-num");
            if(!$(this).hasClass('active')){
                effectAdo('click');
                self.wrap.find('.tabWrap .tab_btn').removeClass('active');
                $(this).addClass('active');
                self.wrap.find('.tabWrap .tab').hide();
                self.wrap.find('.tabWrap .tab[data-num="'+myN+'"]').show();
                self.currentTab = parseInt(myN, 10);
                clearTimeout(rootTimer);
            }
        })
    }
    
    this.makeArea = function(){
        var html = '';
        html += '<div class="tabWrap">';
        for(var i=0; i<self.cnt; i++){
            html += '<div class="tab" data-num="'+i+'"></div>';
        }
        html += '<div class="tab_navi">';
        for(var j=0; j<self.cnt; j++){
            html += '<div class="tab_btn" data-num="'+j+'"></div>';
        }
        html += '</div></div>';
        self.wrap.append(html);
        self.tab = self.wrap.find('.tab');
    }
}

scrollContents = function(wrap, _pos){
    var self = this;
    this.wrap = wrap;
    this.scroll;
    var pos = _pos;
    
    this.init = function(){
        if(self.wrap.find('.scrollGroup').length > 0){
            self.wrap.find('.scrollGroup').remove();
        }
        
        self.makeArea();
        
        self.scroll.mCustomScrollbar({
            theme: "rounded-dark"
        });
    }
    
    this.makeArea = function(){
        var html = '';
        html += '<div class="scrollGroup '+pos+'">';
        html += '<div class="item"></div>';
        html += '</div>';
        self.wrap.append(html);
        self.scroll = self.wrap.find('.scrollGroup');
    }
}

popupContents = function(wrap, cnt){
    var self = this;
    this.wrap = wrap;
    
    this.init = function(){
        self.wrap.find('.popup_btn').remove();
        self.wrap.find('.popup').remove();
        self.makeArea();
        
        self.wrap.find('.popup_btn').off().on('click',function(){
			var myN = $(this).attr("data-num");
            makeMask();
            effectAdo('click');
            self.wrap.find('.popup').show();
            self.wrap.find('.popup').attr("data-num", myN);
            
            if(typeof(videoCon) != 'undefined'){videoCon.stop()};
		});
        
        self.wrap.find('.popup .close').off().on('click',function(){
            removeMask();
            effectAdo('click');
            self.wrap.find('.popup').hide();
            self.wrap.find('.popup').attr("data-num", "");
            
            clearTimeout(rootTimer);
		});
    }
    
    this.makeArea = function(){
        var html = '';
        for(var i=0; i<cnt; i++){
            html += '<div class="popup_btn" data-num="'+i+'"></div>';
        }
		self.wrap.append(html);
        
        html = '';
        html += '<div class="popup">';
        html += '<div class="close"></div>';
        html += '</div>';
        self.wrap.append(html);
    }
}

dragContents = function (wrap, set, option) {
    var self = this;
    this.wrap = wrap;
    this.dragItems = set;
    this.dragArea, this.dropArea, this.txtArea, this.dragItem, this.dropItem, this.ans;
    this.dragObj = set.drag;
    this.dropObj = set.drop;
    var chkAns = false;
    
    this.random = "1"; //랜덤정답 "1": 정오답, "2": 정답 없는 랜덤정답, "3": 정답 있는 랜덤정답
    this.answer; //정답, 오답 (콜백함수: true, false)
    this.clickAnsbtn; //정답버튼 클릭 (콜백함수 : true:정답보기, false:다시하기)
    var clones = false;
    
    if(option != undefined){
        this.clickAnsbtn = option.clickAnsbtn;
        this.answer = option.answer;
        this.random = option.random;
        clones = option.clones;
    }

    this.init = function () {
        if (self.wrap.find('.dragContents').length > 0) {
            self.wrap.find('.dragContents').remove();
        }

        self.makeArea();
        self.makeObj();
        self.addDrag();
        self.addDrop();
        self.makeBtn();

        this.ansbtn.on('click', function () {
            if ($(this).hasClass('re')) {
                effectAdo('click');
                self.init();
                self.dropItem.attr('data-num', '');
                if(typeof(self.clickAnsbtn) == 'function') {
                    self.clickAnsbtn(false);
                }
            } else {
                $(this).addClass('re')
                effectAdo('anschk_o');
                
                self.dropArea.each(function (i) {
                    $(this).find('.dropCode').each(function (idx) {
                        $(this).addClass("ans")
                        if(self.random == "3"){
                            $(this).html('<span>'+self.dropObj[idx]+'</span>');
                        }else{
                            $(this).html(self.dropObj[idx]);
                        }
                    });
                    
                    for(var k=0; k<set.drop.length; k++){
                        self.dragItem.each(function (j) {
                            if(set.drop[k] == $(this).html()){
                                if($(this).parent().hasClass('realDrag')){
                                    $(this).css('visibility', 'hidden');
                                }
                            }
                        });
                    }
                    self.dragItem.draggable('destroy');
                })
                if(typeof(self.clickAnsbtn) == 'function') {
                    self.clickAnsbtn(true);
                }
            };
        });
    }

    this.makeArea = function () {
        var html = '<div class="dragContents"><div class="item"></div>' +
            '<div class="dropArea">' +
            '<div class="conObj"></div>' +
            '<div class="txtArea"></div>' +
            '<div class="dropObj"></div>' +
            '</div>' +
            '<div class="dragArea realDrag"></div></div>';

        self.wrap.append(html);
        
        if(clones){
            self.wrap.find('.item').append('<div class="dragArea"></div>');
        }
        
        self.dragArea = self.wrap.find('.dragArea');
        self.dropArea = self.wrap.find('.dropObj');
        self.txtArea = self.wrap.find('.txtArea');
    }

    this.makeObj = function () {
        for (var a = 0; a < self.dragObj.length; a++) {
            var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
            self.dragArea.append(dragDiv);
        }

        for (var b = 0; b < self.dropObj.length; b++) {
            var dropDiv = '<div class="dropCode"></div>'
            self.dropArea.append(dropDiv);
        }
    }

    this.addDrag = function () {
        self.dragItem = self.dragArea.find('.dragItem');

        self.dragItem.draggable({
            cursor: 'pointer',
            revert: true,
            start: function (e, obj) {
                var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                obj.position.top = Math.round(obj.position.top / factor);
                obj.position.left = Math.round(obj.position.left / factor);
                isRec = $(this);
                $(this).parent().css("zIndex", 10);
                $(this).css("zIndex", 10);
            },
            drag: function (e, obj) {
                var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                obj.position.top = Math.round(obj.position.top / factor);
                obj.position.left = Math.round(obj.position.left / factor);
                chkAns = false;
            },
            stop: function (e, obj) {
                $(this).parent().css("zIndex", 1);
                $(this).css("zIndex", 1);
            }
        });
    }

    this.addDrop = function () {
        self.dropItem = self.dropArea.find('.dropCode');

        self.dropItem.droppable({
            accept: self.dragItem,
            over: function (e, obj) {
                var $item = $(obj);
                var $this = $(this);
            },
            drop: function (e, obj) {
                var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                obj.position.top = Math.round(obj.position.top / factor);
                obj.position.left = Math.round(obj.position.left / factor);
                var $item = $(obj);
                var $this = $(this);
                var drag_ans = isRec.html();
                var drop_ans = self.dropObj[$this.index()];

                if(self.random == "1"){
                    if (drop_ans == drag_ans) {
                        $this.html(drag_ans);
                        $this.addClass('ans');
                        isRec.css('visibility', 'hidden');
                        effectAdo('anschk_o');
                        chkAns = true;
                        if(typeof(self.answer) == 'function') {
                            self.answer(chkAns);
                        }
                        
                        if (self.dropItem.length == self.dropArea.find('.ans').length) {
                            self.dragItem.draggable('destroy')
                            self.ansbtn.addClass('re');
                        }
                    } else {
                        effectAdo('anschk_x');
//                        isRec.draggable({
//                            revert:function(){
//                                if(chkAns){
//                                    effectAdo('anschk_o');
//                                }else{
//                                    effectAdo('anschk_x');
//                                    if(typeof(self.answer) == 'function') {
//                                        self.answer(chkAns);
//                                    }
//                                }
//                                return true;
//                            }
//                        })
                    }
                }else if(self.random == "2"){
                    $this.html(drag_ans);
                    $this.addClass('ans');
                    $this.attr('data-num', drag_ans);
                    isRec.css('visibility', 'hidden');
                    effectAdo('anschk_o');
                    chkAns = true;
                    if(typeof(self.answer) == 'function') {
                        self.answer(chkAns);
                    }

                    if (self.dropItem.length == self.dropArea.find('.ans').length) {
                        self.dragItem.draggable('destroy')
                        self.ansbtn.addClass('re');
                    }
                }else if(self.random == "3"){
                    for(var k=0; k<set.drop.length; k++){
                        if(set.drop[k] == drag_ans){
                            $this.html("<span>"+drag_ans+"</span>");
                            $this.addClass('ans');
                            isRec.css('visibility', 'hidden');
                            effectAdo('anschk_o');
                            if (self.dropItem.length == self.dropArea.find('.ans').length) {
                                self.dragItem.draggable('destroy');
                                self.ansbtn.addClass('re');
                            }
                            return;
                        }else{
//                            isRec.draggable({
//                                revert: true
//                            });
                            effectAdo('anschk_x');
                        }
                    }
                }
            }
        });
    }
    
    this.makeBtn = function () {
        var html = '<div class="ansbtn"></div>'
        self.wrap.find('.dragContents').append(html);
        self.ansbtn = this.wrap.find('.ansbtn');
    };
}

oxContents = function(wrap, ans){
	var self = this;
	this.wrap = wrap;
    this.ans = ans;

	this.init = function(){
		if(self.wrap.find('.oxquiz').length > 0){
            self.wrap.find('.oxquiz').remove();
        }

        self.makeHtml();
		self.wrap.find('.ox').removeClass('dis cor');

		self.wrap.find('.ox').off().on('click', function(){
			if($(this).hasClass('dis') || $(this).hasClass('cor')){
				return false;
			}else{
				self.quizResult($(this));
			}
		});

		self.wrap.find('.ansbtn').off().on('click', function(){
			if($(this).hasClass('re')){
                effectAdo('click');
				$(this).removeClass('re');
				oxCon.wrap.find('.ox[data-cor=true]').removeClass('cor');
                oxCon.wrap.find('.ox[data-cor=false]').removeClass('dis');
			}else{
                effectAdo('anschk_o');
				$(this).addClass('re');
				self.wrap.find('.ox[data-cor=true]').addClass('cor');
				self.wrap.find('.ox[data-cor=false]').addClass('dis');	
			}
		});
	}
    
    this.makeHtml = function(){
        var oclass = self.ans == "O" ? "true" : "false";
        var xclass = self.ans == "X" ? "true" : "false";
        var tmpHtml = "";
        tmpHtml += '<div class="oxquiz">';
        tmpHtml += '<div class="ox o_item" data-cor="'+oclass+'"></div>';
        tmpHtml += '<div class="ox x_item" data-cor="'+xclass+'"></div>';
        tmpHtml += '<div class="ansbtn"></div>';
        tmpHtml += '</div>';
        self.wrap.append(tmpHtml);
    }

	this.quizResult = function(elem){
		var elem = elem;
		if(elem.attr('data-cor') == 'true'){
			elem.addClass('cor');
			elem.siblings().addClass('dis');
			effectAdo('anschk_o');
            self.wrap.find('.oxquiz .ansbtn').addClass('re');
		}else{
			effectAdo('anschk_x');
		}
	}
}

oxListContents = function(wrap, ansitem){
	var self = this;
	this.wrap = wrap;
    this.items = ansitem.length;
    this.ansitem = ansitem;
    var cnt;

	this.init = function(){
        if(self.wrap.find('.oxWrap').length > 0){
            self.wrap.find('.oxWrap').remove();
            self.wrap.find('.ansbtn').remove();
        }
        self.makeOX();
        cnt = 0;
        
		self.wrap.find('.ox').unbind('click').click(function(){
			if($(this).hasClass('dis') || $(this).hasClass('cor')){
				return false;
			}else{
                self.quizResult($(this));
			}
		});

		self.wrap.find('.ansbtn').unbind('click').click(function(){
			if($(this).hasClass('re')){
                effectAdo('click');
				$(this).removeClass('re');
				self.init();
			}else{
                effectAdo('anschk_o');
				$(this).addClass('re');
				self.wrap.find('.ox[data-cor=true]').addClass('cor');
				self.wrap.find('.ox[data-cor=false]').addClass('dis');	
			}
		});
	}
    
    this.makeOX = function(){
        var html = '';
        html += '<div class="oxWrap">';
        for(var k=0; k<this.items; k++){
            html += '<div class="oxquiz ox'+(k+1)+'"></div>';
        }
        html += '<div class="ansbtn"></div>';
        html += '</div>';
        self.wrap.append(html);
        
        
        for(var i=0; i<this.items; i++){
            var oxHtml;
            if(this.ansitem[i] == "O"){
                oxHtml = '<div class="ox o_item" data-cor="true"></div><div class="ox x_item" data-cor="false"></div>';
            }else if(this.ansitem[i] == "X"){
                oxHtml = '<div class="ox o_item" data-cor="false"></div><div class="ox x_item" data-cor="true"></div>';
            }
            self.wrap.find('.oxquiz').eq(i).append(oxHtml);
        }
    }

	this.quizResult = function(elem){
		var elem = elem;
        
		if(elem.attr('data-cor') == 'true'){
			elem.addClass('cor');
			elem.siblings().addClass('dis');
			effectAdo('anschk_o');
            cnt++;
            if(cnt == this.items){
                self.wrap.find('.ansbtn').addClass('re');
            }
		}else{
			effectAdo('anschk_x');
		}
	}
}

quizContents = function(wrap, items){
    var self = this;
    this.wrap = wrap;
    this.expObj = items.exp;
    this.ansObj = items.ans;
    
    this.init = function(){
        self.wrap.find('.quizGroup').remove();
        self.wrap.find('.ansbtn').remove();
        
        self.makeQuiz();
        
        var cN = 0;
        var ans = true;
        this.items.on("click", function(){
            if (!self.wrap.find('.quizGroup').hasClass('ended')) {
                if (!$(this).hasClass('on')) {
                    var myAns = $(this).index();
                    var ans = false;
                    for(var i=0; i<self.ansObj.length; i++){
                        var ansN = parseInt(self.ansObj[i], 10) - 1;
                        if (myAns == ansN) {
                            ans = true;
                        }
                    }

                    if(ans){
                        effectAdo('anschk_o');
                        $(this).addClass('on');
                        $(this).find(".icon").show();
                        cN++;

                        if (cN == self.ansObj.length) {
                            self.ansbtn.addClass('re');
                            self.wrap.find('.quizGroup').addClass("ended");
                            
                            self.items.addClass('off');
                            for(var k=0; k<self.ansObj.length; k++){
                                var iN = parseInt(self.ansObj[k], 10) - 1;
                                self.items.eq(iN).removeClass('off');
                                self.items.eq(iN).addClass('on');
                            }
                        }
                    }else{
                        effectAdo('anschk_x');
                        $(this).addClass('off');
                    }
                }
            }
        });
        
        this.ansbtn.on('click', function(){
            if($(this).hasClass('re')){
                effectAdo('click');
                self.init();
            }else{
                effectAdo('anschk_o');
                $(this).addClass('re');
                self.items.addClass('off');
                for(var k=0; k<self.ansObj.length; k++){
                    var iN = parseInt(self.ansObj[k], 10) - 1;
                    self.items.eq(iN).find(".icon").show();
					self.items.eq(iN).removeClass('off');
					self.items.eq(iN).addClass('on');
                }
                self.wrap.find('.quizGroup').addClass("ended");
            }
        });
    };
    
    this.makeQuiz = function(){
        var html = '<div class="quizGroup"><ul class="bogi">';
        for(var i=0; i<this.expObj.length; i++){
            if(this.expObj[i] == ""){
                html += '<li>'+this.expObj[i]+'<div class="icon"></div></li>';
            }else{
                html += '<li><span>'+(i+1)+'</span>'+this.expObj[i]+'<div class="icon"></div></li>';
            }
        }
        html += '</ul>';
        html += '<div class="ansbtn"></div>';
        html += '</div>';
        self.wrap.append(html);
        this.ansbtn = this.wrap.find('.ansbtn'); 
        this.items = this.wrap.find('.quizGroup li');
    };
}

lineQuizContents = function(wrap, _lc, _rc, _ans, option){
    var self = this;
	this.wrap = wrap;
    var nlc;
    this.option = option;
    
    this.init = function(){
        if(this.wrap.find('.quizSec').length > 0){
			this.wrap.find('.quizSec').remove();
			this.wrap.find('.ansbtn').remove();
		}
        
        self.makeArea();
        
        setTimeout(function() {self.lineQuiz()}, 700);
    }
    
    this.lineQuiz = function(){
        if(nlc != undefined){
            self.wrap.find('.ansbtn').removeClass('re');
            nlc.enable();
            nlc.reset();
        }
    
        var lineCount = 0;
        var l_Quiz = self.wrap.find('.quizSec[data-quiz-name="quiz_line"]');
        var line_leng = l_Quiz.attr('data-line-leng');
        if (l_Quiz.length > 0) {
            var leftDots = l_Quiz.find('.leftLine .dot').get();
            var rightDots = l_Quiz.find('.rightLine .dot').get();
            if (!line_leng) {
                nlc = new LineConnector(leftDots, rightDots, self.option);
                if (!nlc.svgCreated) {
                    getScale();
                    nlc.createSVG();
                    nlc.svgCreated = true;
                }
            }
        }
        
        self.wrap.find('.ansbtn').off().on('click', function() {
            var quizCom = $(this).hasClass('re');
            if (quizCom) {
                effectAdo('click');
                $(this).removeClass('re');

                nlc.enable();
                nlc.reset();
            } else {
                effectAdo('anschk_o');
                $(this).addClass('re');

                var quizSec = self.wrap.find('.quizSec');
                var lineWrap = quizSec.find('.leftLine');
                var chkBox = lineWrap.find('.clickArea');

                // lineQuiz.find('.mask').show();
                quizSec.addClass('com');
                nlc.disable();
                nlc.reset();
                for(i = 0;i < chkBox.length; i++){
                    line_ans = chkBox[i].getAttribute('data-line-ans');
                    line_ans = line_ans.split('_');
                    nlc.drawLines([
                        {LIndex:line_ans[0], RIndex:line_ans[1], color:"#ff3300", id:"correct"+i}
                    ]);
                }
            }
        });
    }
    
    this.makeArea = function(){
        var html = '';
        html += '<div class="quizSec" data-quiz-name="quiz_line">';
        html += '<div class="quizArea">';
        html += '<div class="leftLine">';
        for(var i=0; i<_lc; i++){
            html += '<div class="ansArea area'+(i+1)+' clickArea" data-line-ans="'+_ans[i]+'">';
            html += '<div class="dot"></div>';
            html += '</div>';
        }
        html += '</div>';
        html += '<div class="rightLine">';
        for(var j=0; j<_rc; j++){
            html += '<div class="r_item item'+(j+1)+'">';
            html += '<div class="dot"></div>';
            html += '</div>';
        }
        html += '</div>';
        html += '<div class="lineBox"></div>';
        html += '<div class="mask"></div>';
        html += '</div>';
        html += '<div class="ansbtn"></div>';
        html += '</div>';
        this.wrap.append(html);
    }
}

dolbalContents = function(wrap, _ans){
    var self = this;
	this.wrap = wrap;
    this.ansText = _ans.text;
    this.ans = parseInt(_ans.ans, 10) - 1;
    
	this.init = function(){
        if(this.wrap.find('.dolquiz').length > 0){
			this.wrap.find('.dolquiz').remove();
			this.wrap.find('.dolbal_btn').remove();
		}
        
        self.makeArea();
        
        self.wrap.find('.dolbal_btn').off().on('click',function(){
            effectAdo('mong');
            $('.dolquiz').show();
            makeMask();
            
            if(typeof(videoCon) != 'undefined'){videoCon.stop()};
        });
        
        self.wrap.find('.ans').off().on('click',function(){
            var idx = $(this).index();
            if(!$(this).parents('.dolquiz').hasClass('ended')){
                if(idx == self.ans){
                    effectAdo('anschk_o');
                    $(this).addClass('on');
                    $(this).parents('.dolquiz').addClass('ended');
                }else{
                    effectAdo('anschk_x');
                }
            }
        });
        
        self.wrap.find('.dolquiz .dol_close').off().on('click',function(){
            effectAdo('click');
            $('.dolquiz .ans').removeClass('on');
            $('.dolquiz').removeClass('ended');
            $('.dolquiz').hide();
            removeMask();
        });
    }
    
    this.makeArea = function(){
        var html = '';
        html = '<div class="dolbal_btn"></div>';
        self.wrap.append(html);
        
        html = '';
        html += '<div class="dolquiz">';
        html += '<ul>';
        for(var i=0; i<self.ansText.length; i++){
            html += '<li class="ans ans'+(i+1)+'"><span>'+(i+1)+'</span> '+self.ansText[i]+'</li>';
        }
        html += '</ul>';
        html += '<div class="mask"></div>';
        html += '<div class="dol_close"></div>';
        html += '</div>';
        self.wrap.append(html);
    }
}

var rootTimer;
aniContents = function(wrap, _type, _toggle){
	var self = this;
	this.wrap = wrap;
    this.myTimer;
	if(_toggle == undefined) _toggle = "none";
    this.toggle = _toggle;
    
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
			e.stopPropagation();
			if(self.toggle == "toggle"){
				if($(this).hasClass("animotion")){
					effectAdo('click');
                    $(this).removeClass("animotion");
                    $(this).find('.item').hide();
				}else{
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
						
						if(!$(this).parent().find('.sound_btn').length){
							var adoTarget = document.getElementById(ado);
							var _this = $(this);
							adoTarget.addEventListener("ended", function(){
								_this.removeClass("animotion");
								_this.find('.item').hide();
							});
						}
					}
                    $(this).addClass("animotion");
				}
			}else{
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

					if(!$(this).parent().find('.sound_btn').length){
						var adoTarget = document.getElementById(ado);
						var _this = $(this);
						adoTarget.addEventListener("ended", function(){
							_this.removeClass("animotion");
							_this.find('.item').hide();
						});
					}
				}
                $(this).addClass("animotion");
			}
            
            if(typeof(videoCon) != 'undefined'){videoCon.stop()};
		});

		self.wrap.find('.ani .close').off('click').on('click',function(e){
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
    
    this.allSound = function(_times, _status, _ani1){
        var html = '<div class="sound_btn"></div>';
        self.wrap.append(html);
        self.wrap.addClass('soundAll');
        
        if(_ani1 == "ani1") self.wrap.find('.ani1').addClass('animotion');
        
        clearTimeout(rootTimer);
		for (var i = 0 ; i < rootTimer ; i++) {
            clearTimeout(i); 
        }
        
        self.wrap.find('.sound_btn').off().on('click', function(){
            ado_stop();
            clearTimeout(rootTimer);
            if($(this).hasClass('re')){
                effectAdo('click');
                self.wrap.find('.ani').removeClass("animotion");
                self.wrap.find('.ani .item').hide();
                $(this).removeClass('re');
                
                if(_ani1 == "ani1") self.wrap.find('.ani1').addClass('animotion');
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
			clearTimeout(rootTimer);
//            self.wrap.find('.sound_btn').removeClass('re');
            
            if(self.wrap.find(".animotion").length == 0){
                self.wrap.find('.sound_btn').removeClass('re');
            }
		});
        
        self.wrap.find('.ani').bind('click',function(e){
            clearTimeout(rootTimer);
            
            var totAni = _times.length;
            if(!_type){
                
            }else{
                if(totAni == self.wrap.find(".animotion").length){
                    self.wrap.find('.sound_btn').addClass('re');
                }else{
                    self.wrap.find('.sound_btn').removeClass('re');
                }
            }
		});
        
        if(self.wrap.parent().find('.navigation').length > 0){
            self.wrap.parent().find('.navigation .next').bind('click', function(){
                clearTimeout(rootTimer);
            })
            self.wrap.parent().find('.navigation .prev').bind('click', function(){
                clearTimeout(rootTimer);
            })
        }
    }
    
    this.customTimer = function(_cnt, _times,  _status){
        var cnt = _cnt;
        clearTimeout(rootTimer);
        rootTimer = setTimeout(function(){
            if(_status){
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
                }
                
                if(_cnt < (_times.length - 1)){
                    _cnt = _cnt + 1;
                    self.customTimer(_cnt, _times, _status);
                }else{
                    rootTimer = setTimeout(function(){
                        self.wrap.find('.sound_btn').addClass('re');
                    }, _times[_times.length - 1]);
                }
            }
        }, _times[_cnt-1]);
    }
    
    this.speeker = function(){
        self.wrap.find('.ani').addClass('speeker');
        
        self.wrap.find('.ani').bind('click',function(e){
            var _this = $(this);
            var ado2 = $(this).attr("data-ado");
            
            if($(this).hasClass('off')){
                $(this).removeClass('off');
                $(ado2)[0].removeEventListener("ended");
            }else{
                $(this).addClass('off');
                
                $(ado2)[0].addEventListener("ended", function(){
                    _this.removeClass('off');
                    $(ado2)[0].removeEventListener("ended");
                });
            }
        })
    }
    
    this.question = function(){
        self.wrap.find('.ani').addClass('question');
        
//        self.wrap.find('.ani').bind('click',function(e){
//            var _this = $(this);
//        })
    }
}

helpContents = function(wrap){
	var self = this;
	this.wrap = wrap;
	this.helpwrap,this.helpclose,this.helpbtn,this.helpcon;

	this.init = function(con){
		this.wrap.find('.helpWrap').remove();
		this.makeHtml();

		this.helpcon.html(con);

		this.helpbtn.on('click',function(){
			var h = self.helpcon.css('height')
			$(this).parent().css('bottom','+' + h);
			effectAdo('click');
			self.helpclose.show();
		});

		this.helpclose.on('click',function(){
			self.helpclose.hide();
			$(this).parent().css('bottom',0);
			effectAdo('click');
		})
	}

	this.makeHtml = function(){
		var html = 	'<div class="helpWrap">'+
					'<div class="helpbtn"></div>'+
					'<div class="con"></div>'+
					'<div class="close"></div>'+
					'</div>';
		self.wrap.append(html);
		this.helpwrap = self.wrap.find('.helpWrap');
		this.helpbtn = self.wrap.find('.helpWrap .helpbtn');
		this.helpclose = self.wrap.find('.helpWrap .close');
		this.helpcon = self.wrap.find('.helpWrap .con');
	}
}

mapContents = function(wrap,width,height,btn){
    var self = this;
    this.wrap = wrap;
    this.width = width;
    this.height = height;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.btn = btn;

    this.init = function(){
        if(this.wrap.find('.mapZoom').length > 0){
            this.wrap.find('.mapZoom').remove();
        }
        
        this.makeHtml();
        this.mapMove(this.map);

        this.map.css(self.wrap.css('background'));

        this.mapbtn.find('.text').html(self.scale*100 + '%');
        this.mapbtn.find('.plus').on('click',function(){
            self.scaleUp();
        });

        this.mapbtn.find('.minus').on('click',function(){
            self.scaleDown();
        });

        if(this.btn){
            self.map.find('.innerbtn').on('click',function(){
                effectAdo('click');
                self.map.toggleClass('on');
            });
        }
    }

    this.makeHtml = function(){
        var tmphtml = '<div class="mapZoom"><div class="btn"></div></div>';
        self.wrap.append(tmphtml);
        
        var html =  '<div class="mapWrap">';
        html += '<div class="mapbtn">';
        html += '<div class="btn plus"></div>';
        html += '<div class="text"></div>';
        html += '<div class="btn minus"></div>';
        html += '</div>';
        html += '<div class="mapbox">';
        html += '<div class="map"></div>';
        html += '</div>';
        html += '</div>';
        self.wrap.find('.mapZoom').append(html);
        
        self.mapwrap = self.wrap.find('.mapWrap');
        self.map = self.wrap.find('.map');
        self.mapbtn = self.wrap.find('.mapbtn');

        self.mapwrap.css({
            'width' : self.width + 'px',
            'height' : self.height + 'px',
        })

        if(self.btn){
            self.map.append('<div class="innerbtn"></div>');
        }
    }

    this.scaleUp = function(){
        if(self.scale < 1.8){
            effectAdo('click');
            self.scale += 0.2;
            var n = Math.round(self.scale*100);
            self.mapbtn.find('.text').html(n + '%');

            self.map.css({
                'transform':'scale('+self.scale+') translate(0px, 0px)',
                'transition' : 'transform 0.3s'
            });

            self.translateX = 0;
            self.translateY = 0;
        }

        if(self.scale >= 1.2){
            self.map.css('cursor','pointer');   
            self.map.css({
                'transform':'scale('+self.scale+') translate('+self.translateX+'px, '+self.translateY+'px)',
                'transition' : 'transform 0.3s'
            });
        }
    }

    this.scaleDown = function(){
        if(self.scale > 0.4){
            effectAdo('click');
            self.scale -= 0.2;
            self.map.css('transform','scale('+self.scale+')');
            var n = Math.round(self.scale*100)
            self.mapbtn.find('.text').html(n + '%');

            self.map.css({
                'transform':'scale('+self.scale+') translate('+self.translateX+'px, '+self.translateY+'px)',
                'transition' : 'transform 0.3s'
            });
        }

        if(self.scale <= 1){
            self.map.css('cursor','auto');   
            self.map.css({
                'transform':'scale('+self.scale+') translate(0px, 0px)',
                'transition' : 'transform 0.3s'
            });
            self.translateX = 0;
            self.translateY = 0;
        }
    }

    this.mapMove = function(el){
        var moving = false;
        var oX,oY,mapX, mapY;

        el.on('mousedown',function(e){
            if(self.scale > 1){
                moving = true;
                oX = e.pageX - self.translateX;
                oY = e.pageY - self.translateY;
            }
        });

        el.on('mousemove',function(e){
            if(moving){

                mapX = -(oX - e.pageX) ;
                mapY = -(oY - e.pageY) ;

                self.translateX = mapX;
                self.translateY = mapY;
                
                self.map.css({
                    'transform':'scale('+self.scale+') translate('+mapX+'px, '+mapY+'px)',
                    'transition' : 'transform 0s'
                });
            }
        });

        el.on('mouseup',function(e){
            if(moving){

                self.translateX = mapX;
                self.translateY = mapY;
                moving = false;
            }
        });

        el.on('mouseleave',function(e){
            if(moving){
                moving = false;
            }
        })
    }
}

cardturnContents = function(wrap, _cnt, option){
    var self = this;
    this.wrap = wrap;
    
    if(option != undefined){
        this.distort = option.distort != undefined ? option.distort : 1000;
        this.type = option.type != undefined ? option.type : "cardBtn";
    }
    
    this.init = function(){
        if(this.wrap.find('.cardGroup').length > 0){
			this.wrap.find('.cardGroup').remove();
		}
        
        this.makeHtml();
        
        if(this.type == "cardBtn"){
            self.wrap.find('.card').off().on("click", function(){
                effectAdo('click');
                $(this).toggleClass('applyflip');
            });
        }else if(this.type == "inBtn"){
            self.wrap.find('.f_btn').off().on("click", function(){
                effectAdo('click');
                self.wrap.find('.card').toggleClass('applyflip');
            });
            
            self.wrap.find('.b_btn').off().on("click", function(){
                effectAdo('click');
                self.wrap.find('.card').toggleClass('applyflip');
            });
        }else if(this.type == "outBtn"){
            self.wrap.find('.card_btn').off().on("click", function(){
                effectAdo('click');
                self.wrap.find('.card').toggleClass('applyflip');
            });
        }
    }

    this.makeHtml = function(){
        var html = '';
        html += '<div class="cardGroup">';
        for(var k=0; k<_cnt; k++){
            html += '<div class="card" data-num="'+(k+1)+'">';
            html += '<div class="content">';
            html += '<div class="cardFront"></div>';
            html += '<div class="cardBack"></div>';
            html += '</div></div>';
        }
        html += '</div>';
        self.wrap.append(html);
        
        if(this.type == "cardBtn"){
            self.wrap.find(".card").css("cursor", "pointer");
        }else if(this.type == "inBtn"){
            self.wrap.find(".cardFront").append("<div class='f_btn'></div>");
            self.wrap.find(".cardBack").append("<div class='b_btn'></div>");
        }else if(this.type == "outBtn"){
            self.wrap.find(".card").append("<div class='card_btn'></div>");
        }
        
        self.wrap.find(".card").css({
            perspective: this.distort+"px",
            "-webkit-perspective": this.distort+"px",
            "-moz-perspective": this.distort+"px",
            "-o-perspective": this.distort+"px",
            "-ms-perspective": this.distort+"px"
        })
    }
}

starContents = function(wrap, cnt){
    var self = this;
    this.wrap = wrap;
    this.star;

    this.init = function(){
        if(this.wrap.find('.starContent').length > 0){
			this.wrap.find('.starContent').remove();
		}
        
        this.makeHtml();
        
        self.star.each(function(){
            $(this).off().on('click',function(){
                if($(this).hasClass('on')) return false;
                effectAdo('click');
                $(this).parent().find(".star").removeClass('on');
                $(this).addClass('on');
                self.wrap.find('.ansbtn').addClass('active');
                
                
//                var idx = $(this).index();
//                if($(this).hasClass('on') && !$(this).next().hasClass('on')){
//                    $(this).removeClass('on');
//                    return false;
//                }
//                $(this).parent().find('.star').removeClass('on');
//                idx += 1;
//                for(var i = 0; i < idx; i ++){
//                    $(this).parent().find('.star').eq(i).addClass('on');
//                }
            })
        });
        
        self.wrap.find('.ansbtn').off().on('click', function(){
            effectAdo('click');
            self.star.removeClass('on');
            $(this).removeClass('active');
        })
    }

    this.makeHtml = function(){
        var star = 3;
        var html = '';
        html += '<div class="starContent">';
        for(var k=0; k<cnt; k++){
            html += '<div class="starGroup star'+(k+1)+'">';
            html += '<div class="starWrap"></div>';
            html += '</div>';
        }
        html += '<div class="ansbtn"></div>';
        html += '</div>';
        self.wrap.append(html);
        
        for(var i = 0; i < star; i++){
            var html =  '<div class="star"></div>';
            self.wrap.find('.starWrap').append(html);
        }
        self.star = self.wrap.find('.star');
    }
}

stampContents = function(wrap){
	var self = this;
	this.wrap = wrap;
	this.timer,this.timer2;


	this.init = function(){
		this.makeHtml();

		var time = self.wrap.find('.stamp').css('animation-duration');
		time = time.replace('s','');
		time = (Number(time)*1000) - 700;

		var time2 = time - 700;

		this.timer = setTimeout(function(){
			self.wrap.find('.st').show();
		},time);

		this.timer2 = setTimeout(function(){
			// effectAdo('stamp');
		},time2);
	}

	this.makeHtml = function(){
		var stampNum = (Math.random()*(8-1))+1;
		stampNum = Math.floor(stampNum);
		var html = 	'<div class="stamp">'+
					'</div>'+
					'<div class="bounce2 item st st'+stampNum+'"></div>';
		self.wrap.append(html);
		if(stampNum == 1 || stampNum == 5 ){
			effectAdo('stamp1');
		}else if(stampNum == 2 || stampNum == 6 ){
			effectAdo('stamp2');
		}else if(stampNum == 3 || stampNum == 7 ){
			effectAdo('stamp3');
		}else if(stampNum == 4 || stampNum == 8 ){
			effectAdo('stamp4');
		}
	}
}

turnClickContents = function(items, wrap) {
    var self = this;
    this.wrap = wrap;
    this.itemwrap = '';
    this.clickItems = items;
    this.openItemNum = 0;
    this.items = '';
    this.ansbtn = '';
    this.init = function() {
        this.openItemNum = 0;

        if (this.wrap.find('.clickItem').length > 0) {
            this.wrap.find('.clickContent').remove();
        }

        if (self.clickItems > 1) {
            this.makeWrap();
            this.makeItem();
            this.makeBtn();

            this.items.on('click', function() {
                if (!$(this).hasClass('turn')) return false;

                self.items.removeClass('turn');

                if ($(this).css('opacity') == '0') {
                    $(this).css('opacity', '1');
                    self.openItemNum--;
                    self.items.eq(self.openItemNum).prev().addClass('turn');
                    $(this).addClass('turn');
                } else {
                    $(this).css('opacity', '0');
                    self.items.eq(self.openItemNum).next().addClass('turn');
                    $(this).addClass('turn');
                    self.openItemNum++;
                }

                effectAdo('click');
                if (self.openItemNum == self.clickItems) {
                    self.ansbtn.addClass('re');
                } else {
                    self.ansbtn.removeClass('re');
                }
            });

            this.ansbtn.on('click', function() {
                effectAdo('click');
                if ($(this).hasClass('re')) {
                    self.items.css('opacity', '1');
                    self.openItemNum = 0;
                    self.ansbtn.removeClass('re');

                    self.items.removeClass('turn');
                    self.items.eq(0).addClass('turn');
                } else {
                    self.items.css('opacity', '0');
                    self.ansbtn.addClass('re');
                    self.openItemNum = self.clickItems;
                }
            });
        } else {
            this.makeWrap();
            this.makeItem();

            this.items.on('click', function() {
                effectAdo('click');
                if ($(this).css('opacity') == '0') {
                    $(this).css('opacity', '1');
                } else {
                    $(this).css('opacity', '0');
                }
            });
        }

    }

    this.makeWrap = function() {
        var html = '<div class="clickContent turn"></div>';
        this.wrap.append(html);
        this.itemwrap = this.wrap.find('.clickContent');
    };

    this.makeItem = function() {
        var html = '';
        for (var i = 0; i < this.clickItems; i++) {
            if (i == 0) html += '<div class="clickItem clickItem' + (i + 1) + ' turn"></div>';
            else html += '<div class="clickItem clickItem' + (i + 1) + '"></div>';
        }
        this.itemwrap.append(html);

        this.items = this.itemwrap.find('.clickItem');

        if (this.items.length == 1) this.items.addClass('ex');
    };

    this.makeBtn = function() {
        var html = '<div class="ansbtn"></div>'
        this.itemwrap.append(html);

        this.ansbtn = this.itemwrap.find('.ansbtn');
    };
}



$(function() {
    $('#wrap').append('<div id="cimgPreload"></div>');
    $('#cimgPreload').css({
        'opacity': 0.01,
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'z-index': -999
    });

    $('.contents').each(function(i) {
        var b = $(this).css('background-image');
        b = b.split('/');
        var imgSrc = 'inc/images/' + b[b.length - 2] + '/' + b[b.length - 1].split('.')[0] + '.png';
        $('#cimgPreload').append('<div style=background-image:url(' + imgSrc + ')>');
    });

    $('#cimgPreload div').css({
        'width': '100%',
        'height': '100%'
    });
});

$(window).on('load', function() {
    $('.setContent li').on('click', function() {
        var idx = $(this).index();
        var page = $('.contents').eq(idx);
        if (page.css('display') == 'block') return false;
        effectAdo('click');
        $('.contents').hide();
        page.show();
        
        clearTimeout(rootTimer);
    });

    $('body').on('contextmenu', function() {
        return false;
    });
});