var dragCon1;
var clickCon1;
var clickCon2;
var clickCon3;
var clickCon4;

var dragItems1 = {
    drop : ['100','10','1'],
    drag : ['100','10','1'],
}

var dragContents;

$(window).on('load',function(){
	
    
	$('.contents').eq(0).show();

	dragCon1 = new modeldragContents($('.dragPage'));
	dragCon1.init();
    
    dragContents = $('.dragPage .dragContents');
    
	$('.setContent li').on('click',function(){
        
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
        
		if(page.attr('class').indexOf('dragPage') > -1){

			dragCon1 = new modeldragContents($('.dragPage'));
			dragCon1.init();

			$('.rebtn').trigger('click');

        }else if(page.attr('class').indexOf('clickPage2') > -1){

			clickCon2 = new clickAdoContents(1,page);
			clickCon2.init();
            

		}else if(page.attr('class').indexOf('clickPage3') > -1){
            
            clickCon3 = new clickAdoContents(1,page);
            clickCon3.init();     
		}else if(page.attr('class').indexOf('clickPage4') > -1){
            
            clickCon3 = new clickAdoContents(1,page);
            clickCon3.init();     
		}else if(page.attr('class').indexOf('clickPage5') > -1){
            
            clickCon3 = new clickAdoContents(1,page);
            clickCon3.init();     
		}
        
        
	});

	$('.item').click(function(){
		var itemIdx = $(this).index();

		$('.clickItem').eq(itemIdx).trigger('click');
	});

	$('.complete').click(function(){
        console.log('완성하기');
        effectAdo('click');
        $(this).css('pointer-events','none');
        $('.dragArea').hide();
        
        dragContents.find('.dropArea .objWrap1 .dropObj').find('.dropItem').remove();
        dragContents.find('.dropArea .objWrap2 .dropObj').find('.dropItem').remove();

        var html1 = '<div class="obj1 dropItem"></div>';
        var html2 = '<div class="obj2 dropItem"></div>';
        var html3 = '<div class="obj3 dropItem"></div>';
        
        var dropObj1_1 = $(this).siblings('.dragContents').find('.dropArea').eq(0).find('.objWrap1 .drop_obj1');
        var dropObj1_2 = $(this).siblings('.dragContents').find('.dropArea').eq(0).find('.objWrap1 .drop_obj2');
        var dropObj1_3 = $(this).siblings('.dragContents').find('.dropArea').eq(0).find('.objWrap1 .drop_obj3');
        
        var dropObj2_1 = $(this).siblings('.dragContents').find('.dropArea').eq(1).find('.objWrap2 .drop_obj1');
        var dropObj2_2 = $(this).siblings('.dragContents').find('.dropArea').eq(1).find('.objWrap2 .drop_obj2');
        var dropObj2_3 = $(this).siblings('.dragContents').find('.dropArea').eq(1).find('.objWrap2 .drop_obj3');
        
        
        
        var result1 = $(this).siblings('.dragContents').find('.result1');
        var result2 = $(this).siblings('.dragContents').find('.result2');
        result1.html('376');
        result2.html('213');
        
        for(var i=0; i<3; i++){
            dropObj1_1.append(html1);
        }
        for(var i=0; i<7; i++){
            dropObj1_2.append(html2);
        }
        for(var i=0; i<6; i++){
            dropObj1_3.append(html3);
        }
        
        for(var i=0; i<2; i++){
            dropObj2_1.append(html1);
        }
        for(var i=0; i<1; i++){
            dropObj2_2.append(html2);
        }
        for(var i=0; i<3; i++){
            dropObj2_3.append(html3);
        }
        
        $('.dropItem').addClass('dis');
	});

	$(document).on('click', '.rebtn', function(){
        effectAdo('click');
        $('.dragArea').show();
        
        var dragContents = $(this).siblings('.dragContents');
        dragContents.find('.dropArea .objWrap1 .dropObj').find('.dropItem').remove();
        dragContents.find('.dropArea .objWrap2 .dropObj').find('.dropItem').remove();
        $(this).siblings('.complete').css('pointer-events','auto');
		$('.dropItem').removeClass('dis');
        
		cal();
	});

});

// 드래그 드롭
var modeldragContents = function(wrap){
	var self = this;
	this.wrap = wrap;
	this.dragArea = self.wrap.find('.dragArea');
	this.dropArea = self.wrap.find('.dropObj');
	this.left = 0;
	this.right = 0;
    var dragItem;
    var dropItem;
    var isRec;
    
	this.init = function(){
		self.addDrag();
		self.addDrop();
//		self.makeBtn();

	}

	this.setPosition = function(xPos, yPos, el) {
		if(el){
			el.style.top = yPos + "px";
			el.style.left = xPos + "px";
		}
	}

	this.addDrag = function(){
		var isRevert = true;
        
		self.dragItem = self.dragArea.find('.dragItem');
		self.dragItem2 = self.dropArea.find('.dragItem');
		
		self.dragItem.draggable({
			cursor: 'pointer',
			revert:function(e, obj){  // --add 다른영역에 드래그시 '띵' 효과음 + 튕기는 모션
				if(e == false){
					isRevert = false;
					effectAdo('anschk_x');
					return true;
				}else{
					isRevert = true;
				}
				
			},
			helper: 'clone',
			start: function(e, obj){
                isRec = $(this);
                dragItem = $(this).attr('data-item');
                
				startPos = obj.position;
				obj.startPos = startPos;
				
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				
				obj.helper.attr('data-pos', obj.startPos.left +' '+ obj.startPos.top)
				obj.helper.css('z-index',2);
				obj.helper.css({
					'background': $(this).css('background'),
					'width':$(this).css('width'),
					'height':$(this).css('height'),
					'border': '0',
					'z-index' : '2',
                    'opacity' : '1'
				});

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
		self.dropItem = self.dropArea;
		
		self.dropItem.each(function(){
			var item = $(this).attr('data-item');
			var el = $(this);

			$(this).droppable({
				accept: '.dragItem',
				tolerance: 'pointer',
				drop: function(e, obj) {
                    
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
	
					effectAdo('click');
                    
                    if(item == dragItem && $(this).find('.dropItem').length <9){
                        var html = '<div class="'+dragItem+' dropItem"></div>';
                        $(this).append(html);
                        isRec.draggable({revert: false});
                        
                    }else{
                        isRec.draggable({revert: true});
                        effectAdo('anschk_x');
                    }
                    
                    cal(); //결과값 계산

                    $('.objWrap1 .dropItem, .objWrap2 .dropItem').draggable({
                        cursor: 'pointer',
                        revert:function(){
                            effectAdo('anschk_x');
                        },
                        drag: function(e, obj){
                            isRec = $(this);

                            var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                            obj.position.top = Math.round(obj.position.top / factor);
                            obj.position.left = Math.round(obj.position.left / factor);
                        },
                        stop: function(){
                            $(this).remove();
                            
                            cal();
                        }
                    });
                    

				},

			});
		});
	}

//	this.makeBtn = function(){
//		var html = '<div class="ansbtn"></div>'
//		self.wrap.append(html);
//
//		self.ansbtn = this.wrap.find('.ansbtn');
//	};

}

var t;
function cal(){
	if(t) clearTimeout(t);
	t = setTimeout(function(){
		var restul1100 = $('.objWrap1 .drop_obj1 div').length * 100;
		var restul110 = $('.objWrap1 .drop_obj2 div').length * 10;
		var restul11 = $('.objWrap1 .drop_obj3 div').length;
		var restul2100 = $('.objWrap2 .drop_obj1 div').length * 100;
		var restul210 = $('.objWrap2 .drop_obj2 div').length * 10;
		var restul21 = $('.objWrap2 .drop_obj3 div').length * 1;
		$('.result1').html(restul1100 + restul110 + restul11);
		$('.result2').html(restul2100 + restul210 + restul21);
	},10)
	
}

var clickAdoContents = function(items,wrap){
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
