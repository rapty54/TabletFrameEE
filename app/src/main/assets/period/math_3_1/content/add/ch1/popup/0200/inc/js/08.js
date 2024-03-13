var oneObj = $('.objWrap'),
	ans1 = $('.calculation'),
	que = $('.que');

var clickCon1;
var clickCon2;
var clickCon3;
var addClassTime;
$(window).on('load',function(){

	$('.contents').eq(0).show();
    $('.setContent_02').css('display','none');
	 clickCon1 = new clickContents(3 ,$('.clickPage1'));
	 clickCon1.init();
    
    $('.clickPage .clickContent .clickItem3').removeClass('dis mask');

	// 상단 탭
	$('.setContent li').on('click',function(){
        
        clearTimeout(addClassTime);
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
        $('.setContent_02').css('display','none');
        
		if(page.attr('class').indexOf('clickPage1') > -1){
             clickCon1 = new clickContents(3 ,page);
             clickCon1.init();
            $('.clickPage .clickContent .clickItem3').removeClass('dis mask');

		}else if(page.attr('class').indexOf('clickPage2') > -1){
			 clickCon2 = new clickContents(3 ,page);
			 clickCon2.init();
            $('.clickPage .clickContent .clickItem3').removeClass('dis mask');
            
		}else if(page.attr('class').indexOf('clickPage3') > -1){
            
			$('.setContent_02').css('display','block'); 

			// 3번탭의 다시하기 버튼 강제 클릭
			$('.clickPage3 .rebtn').trigger('click');

		}

		// 탭을 눌렀을 때 강제로 다시하기 버튼 클릭하도록 트리거 설정
		$('.rebtn').trigger('click');

	});


	// 3번째 탭에 있는 cal_ans를 클릭했을 때
	$('.cal_ans').click(function(){
		$(this).css({'pointer-events':'none'});

		$('.que1_line').addClass('ani');
		$('.que2_line').addClass('ani');
		$('.que3_line').addClass('ani');
		$('.cal_color_wrap').children('ul').addClass('ani');

	});

	// 3번째 탭 안에 서브 탭에 있는 cal_ans를 클릭했을 때
	$('.tabPage2 .cal_ans').click(function(){
		$(this).css({'pointer-events':'none'});

		$('.numObj').addClass('ani');

	});

	
    // 다시하기
	$('.rebtn').click(function(){
        clearTimeout(addClassTime);
		effectAdo('click');
        
        $('.clickPage .clickContent .clickItem').removeClass('on');
        $('.clickPage .clickContent .clickItem').css('opacity','1');
        $('.clickPage .clickContent .clickItem1').addClass('dis mask');
        $('.clickPage .clickContent .clickItem2').addClass('dis mask');
        $('.clickPage .clickContent .clickItem3').removeClass('dis mask');
        
        $('.queLine').removeClass('ani');
	});

	// 3번째 탭 다시하기 버튼 클릭
	$('.clickPage3 .rebtn').click(function(){
		oneObj.children('div').removeClass('ani');
		$('.que1_line').removeClass('ani');
		$('.que2_line').removeClass('ani');
		$('.que3_line').removeClass('ani');

		$('.cal_ans').removeClass('on');
		$('.cal_ans').css({'pointer-events':'auto'});

		$('.numObj').removeClass('ani');
		$('.cal_color_wrap').children('ul').removeClass('ani');

	});
	
	$('.cal_ans').on('click', function () {
		effectAdo('click');
		var $this = $(this);

		if($(this).hasClass('on')){
			$this.addClass('mask');
		}
		
		$this.addClass('on');

	});


    //---추가 탭
    $('.setContent_02 li').on('click',function(){
        var idx = $(this).index();
        effectAdo('click');

        $('.tabPage').hide();
        $('.tabPage').eq(idx).show();

        $('.clickPage3 .rebtn').trigger('click');

    });
    //---

});

$(document).on('click','.clickPage .clickContent .clickItem',function(){
    var clickPage = $(this).parent().parent();

    if(clickPage.hasClass('clickPage1') || clickPage.hasClass('clickPage2')){
        
        if($(this).hasClass('on')){
            switch($(this).index()){
                case 2:
                    $('.que1_line').addClass('ani');
                    break;
                case 1:
                    $('.que2_line').addClass('ani');
                    break;
                case 0:
                    $('.que3_line').addClass('ani');
                    break;
            }
            
        }else{
             switch($(this).index()){
                case 2:
                    $('.que1_line').removeClass('ani');
                    break;
                case 1:
                    $('.que2_line').removeClass('ani');
                    break;
                case 0:
                    $('.que3_line').removeClass('ani');
                    break;
            }
        }
       
    }
    
});
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
//			this.makeBtn();
            

			this.items.on('click',function(){
                
                console.log($(this).index());
                
                var idx = $(this).index()
                effectAdo('click');

                
				if($(this).css('opacity') == '0'){
                    clearTimeout(addClassTime);
                    $(this).removeClass('on');
					$(this).css('opacity','1');
                    $(this).next().removeClass('mask');
                    
                    if(idx >= 1){
                        $(this).prev().addClass('dis mask');
                    }
                    
					self.openItemNum --;
				}else{
                    $(this).next().addClass('mask');

                    $(this).addClass('on');
					$(this).css('opacity','0');
                    addClassTime = setTimeout(function(){
                        console.log('setTimeout');
                        $('.clickPage1 .clickContent .clickItem').eq(idx).prev().removeClass('mask');
                        $('.clickPage1 .clickContent .clickItem').eq(idx).prev().removeClass('dis');
                        
                        
                        $('.clickPage2 .clickContent .clickItem').eq(idx).prev().removeClass('mask');
                        $('.clickPage2 .clickContent .clickItem').eq(idx).prev().removeClass('dis');
                    },1500);
                    
                    if(idx == 0){
                        $(this).removeClass('mask');
                    }
					self.openItemNum ++;
				}
                
                
                if(self.openItemNum == self.clickItems){

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
			html += '<div class="clickItem clickItem'+(i+1)+' dis mask"></div>'
		}
		this.itemwrap.append(html);

		this.items = this.itemwrap.find('.clickItem');

		if(this.items.length == 1) this.items.addClass('ex');
	};

}

