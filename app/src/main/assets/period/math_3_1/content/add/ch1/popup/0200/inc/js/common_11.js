var clickContents;
var pageingContents;
var dragContents;
var aniContents;
var helpContents;
var stampContents;
var colorList = [
	'#FDBB38',
	'#F8CADB',
	'#A9CE0D',
	'#5FCBD6',
	'#B6A3CE',
	'#A8A8A8'
];

function bgColorChange(color){
	$('#container').css('background-color',color);
	// $('#wrap').css('background-color',color);
}

function makeMask(){
	$('#container').append('<div class="mask"></div>');
	$('#container .mask').css({
		'width': '100%',
		'height': '100%',
		'background-color': 'rgba(0,0,0,0.8)'
	});
}

function removeMask(){
	$('.mask').remove();
}

function effectAdo(effect){
    var ado = '#' + effect;
    if($(ado).length == 0){
    	var html = '<audio id="'+effect+'" src="../../common/media/'+effect+'.mp3" type="audio/mp3"></audio>';
    	$('#wrap').append(html);
    }
    ado_stop();
    if($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
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

clickContents = function(items,wrap){
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
	this.openItemNum = 0;
	this.items = '';
	this.ansbtn = '';
	this.init = function(){
		this.openItemNum = 0;
		
		if(this.wrap.find('.clickItem').length > 0){
			this.wrap.find('.clickContent').remove();
		}

		if(self.clickItems > 0){
			this.makeWrap();
			this.makeItem();		
			this.makeBtn();

			this.items.on('click',function(){
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
				}else{
					self.items.css('opacity','0');
					self.ansbtn.addClass('re');
					self.openItemNum = self.clickItems;

				}
			});
		}else{
			this.makeWrap();
			this.makeItem();		

			this.items.on('click',function(){
				effectAdo('click');
				if($(this).css('opacity') == '0'){
					$(this).css('opacity','1');
				}else{
					$(this).css('opacity','0');
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

		if(this.items.length == 1) this.items.addClass('ex');
	};

	this.makeBtn = function(){
		var html = '<div class="ansbtn"></div>'
		this.itemwrap.append(html);

		this.ansbtn = this.itemwrap.find('.ansbtn');
	};
}

pageingContents = function(wrap){
	var self = this;
	this.wrap = wrap;
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
		self.navi.find('.pageing').css('width',(50*self.pageNum)+30 +'px');
		self.navi.find('.pageing').css('left',960-(((50*self.pageNum)+30)/2)  +'px');
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
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(self.currentPage).show();
		self.navi.find('.pageing .dot').removeClass('on');
		self.navi.find('.pageing .dot').eq(self.currentPage).addClass('on');

		effectAdo('click');
		$('.dis').removeClass('dis');
		if(self.currentPage == 0){
			self.prev.addClass('dis');
		}else if(self.currentPage+1 == self.pageNum){
			self.next.addClass('dis');
		}
	};
}


dragContents = function(wrap,set){
	var self = this;
	this.wrap = wrap;
	this.dragItems = set;
	this.dragArea,this.dropArea,this.txtArea,this.dragItem,this.dropItem,this.ans;
	this.dragObj = set.drag;
	this.dropObj = set.drop;

	this.init = function(){
		console.log(self.wrap.hasClass('dragContents'))
		if(self.wrap.hasClass('dragContents')){
			self.wrap.removeClass('dragContents');
			self.wrap.find('.dragArea').remove();
			self.wrap.find('.dropArea').remove();
			self.wrap.find('.ansbtn').remove();
		}

		self.makeArea();
		self.makeObj();
		self.addDrag();
		self.addDrop();
		self.makeBtn()

		this.ansbtn.on('click',function(){
			if($(this).hasClass('re')){
				effectAdo('click');
				self.init();
			}else{
				$(this).addClass('re')
				effectAdo('anschk_o');
				self.dropArea.each(function(i){
					$(this).find('.dropCode').html(self.dropObj[i]);
					$(this).find('.dropCode').addClass('ans');
					self.dragItem.each(function(j){

						if($(this).html() == self.dropObj[j]){
							$(this).css('visibility','hidden');
						}
					});
				})
			};
		});
	}

	this.makeArea = function(){
		var html = ''+
		'<div class="dropArea">' +
            '<div class="conObj"></div>' +
            '<div class="txtArea"></div>' +
            '<div class="dropObj"></div>' +
        '</div>' +
        '<div class="dragArea"></div>';

        self.wrap.addClass('dragContents');
        self.wrap.append(html);
        self.dragArea = self.wrap.find('.dragArea');
        self.dropArea = self.wrap.find('.dropObj');
        self.txtArea = self.wrap.find('.txtArea');
	}

	this.makeObj = function(){
		for(var a = 0; a < self.dragObj.length; a++){
            var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
            self.dragArea.append(dragDiv);
        }

        for(var b = 0; b < self.dropObj.length; b++){
            var dropDiv = '<div class="dropCode"></div>'
            self.dropArea.append(dropDiv);
        }
	}

	this.addDrag = function(){
		self.dragItem = self.dragArea.find('.dragItem');

		self.dragItem.draggable({

			cursor: 'pointer',
			revert: 'invalid',
			start: function(e, obj){
			    var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

			    obj.position.top = Math.round(obj.position.top / factor);
			    obj.position.left = Math.round(obj.position.left / factor);
			    isRec = $(this);
			},
			drag: function(e, obj){
			    var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
			    obj.position.top = Math.round(obj.position.top / factor);
			    obj.position.left = Math.round(obj.position.left / factor);
			},
			stop: function(e, obj){

			}

		});
	}

	this.addDrop = function(){
		self.dropItem = self.dropArea.find('.dropCode');

		self.dropItem.droppable({
            accept: self.dragItem,
            over: function(e, obj) {
                var $item = $(obj);
                var $this = $(this);
            },
            drop: function(e, obj) {
                var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                obj.position.top = Math.round(obj.position.top / factor);
                obj.position.left = Math.round(obj.position.left / factor);
                var $item = $(obj);
                var $this = $(this);
                var drag_ans = isRec.html();
                var drop_ans = self.dropObj[$this.index()];
                
                if(drop_ans == drag_ans){
                    $this.html(drag_ans);
                    $this.addClass('ans');
                    isRec.css('visibility','hidden');
                    effectAdo('anschk_o');
                    if(self.dropItem.length == self.dropArea.find('.ans').length) {
                    	self.dragItem.draggable('destroy')
                    	self.ansbtn.addClass('re');
                    }
                }else{
                    isRec.draggable({revert:true})
                    effectAdo('anschk_x')
                }
                
            }
        });
	}

	this.makeBtn = function(){
		var html = '<div class="ansbtn"></div>'
		self.wrap.append(html);

		self.ansbtn = this.wrap.find('.ansbtn');
	};
}

aniContents = function(wrap){
	//캐릭터 클릭
	var self = this;
	this.wrap = wrap;
	this.init = function(){
		self.wrap.find('.item').hide();
		self.wrap.find('.ani').unbind('click').on('click',function(e){
			e.stopPropagation();
			self.wrap.find('.item').hide();
			$(this).find('.item').show();
			ado_stop();
			effectAdo('click');
			if($(this).attr('data-ado')){
				var ado = $(this).attr('data-ado');
				contentAdo(ado);
			}
		});

		self.wrap.find('.close').unbind('click').on('click',function(e){
			e.stopPropagation();
			$(this).parent().hide();
			ado_stop();
			effectAdo('click');
		});
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
			effectAdo('stamp');
		},time2);
	}

	this.makeHtml = function(){
		var stampNum = (Math.random()*(8-1))+1;
		stampNum = Math.floor(stampNum);
		var html = 	'<div class="stamp">'+
					'</div>'+
					'<div class="bounce2 item st st'+stampNum+'"></div>';
		self.wrap.append(html);
	}
}

$(window).on('load',function(){
	$('.setContent li').on('click',function(){
		var idx = $(this).index();
		var page = $('.clickPage').eq(idx);
		if(page.css('display') == 'block') return false;
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		effectAdo('click');
		$('.clickPage').hide();
		page.show();
	});
});