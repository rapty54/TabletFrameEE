var clickCon1;
var clickCon2;
var clickCon3;
var clickCon4;
var clickCon5;
var clickCon6;
var clickCon7;
var clickCon8;
var clickCon9;
var totalNum;
var pageCon;
var pop_index = 0;
var easy_page = ['clickPage1','clickPage2','clickPage3'];
var normal_page = ['clickPage4','clickPage5','clickPage6'];
var hard_page = ['clickPage7','clickPage8','clickPage9'];
var easy_rand =[];
var noraml_rand = [];
var hard_rand =[];
var easy_show=[];
var normal_show=[];
var hard_show=[];
var click_page =[];

var currentPage;

var popArray = [1,2,3,4,5,6,7,8,9];

var route= 'url(inc/images/10/';

$(window).on('load',function(){
	bgColorChange('#fff');

	$('.introPage').show();
    
	var easy = 3;
	var normal = 2;
	var hard = 1;
    
	// 인트로 페이지에 각 문항 클릭시 색상 변하게
	$('.question li').on('click',function(){
		effectAdo('click');
		$(this).addClass('act');
		$(this).siblings().removeClass('act');

		if($(this).parent().hasClass('easy')){
			easy = $(this).index();
		}else if($(this).parent().hasClass('normal')){
			normal = $(this).index();
		}else{
			hard = $(this).index();
		}
		$('.sum').html(easy+normal+hard);
 	});


	// 인트로 페이지에서 시작하기 버튼
	$('.startBtn').click(function(){
        $('.tool').removeClass('off');
        $('.toolOff').removeClass('off');
        
        
        effectAdo('click');
		totalNum = easy+normal+hard;
        
        //-- add
        easy_rand = shuffleRandom(easy);
        normal_rand = shuffleRandom(normal);
        hard_rand = shuffleRandom(hard);
        
        easy_show = make_quiz(easy_page, easy_rand, easy);
        normal_show = make_quiz(normal_page, normal_rand, normal);
        hard_show = make_quiz(hard_page, hard_rand, hard);
        click_page = easy_show.concat(normal_show, hard_show);
        // ---------
        
	
		if(totalNum == 0){
			alert('문제를 선택하세요.');
			return false;
		}
        
        if(totalNum ==1){
            currentPage =1;
        }
		$('.setContent li').remove();

		$('.introPage').hide();
		$('.headerSec').show();
        $('.pageing').show();  

		for(var i=0; i < totalNum; i ++){
			if(i < easy){
				$('.setContent').append('<li class="easy">'+(i+1)+'</li>');
			}else if(i < (easy+normal)){
				$('.setContent').append('<li class="normal">'+(i+1)+'</li>');
			}else if(i < (totalNum)){
				$('.setContent').append('<li class="hard">'+(i+1)+'</li>');
			}
		}

        $('.setContent li').eq(0).trigger('click'); 
        $('.'+click_page[0]).show();    
              
        
        $('.pageing .btn').on('click',function(){
            effectAdo('click');
            var cur = $('.setContent li.on').index();
            currentPage = $('.setContent li.on').index();
            
            if($(this).hasClass('next')){
                cur += 1;
            }else{
                cur -= 1;
            }

            $('.setContent li').eq(cur).trigger('click');
        });
        
         makeSolbtn(popArray);
	});
});

// 상단 탭 클릭(문제번호)
$(document).on('click','.setContent li',function(){
    $('.finish_btn').removeClass('on');
    effectAdo('click');
    var idx = $(this).index();
    currentPage = idx;
    var page = $('.'+click_page[idx]);
    
    var difficulty = $(this).attr('class');
    $('.setContent li').removeClass('on');
    $(this).addClass('on')
    
    $('.exBox').hide();
    $('.tool').removeClass('off');
    
    if(difficulty == 'easy'){
        $('.clickPage').hide();
        $('.'+click_page[idx]).show();

        $('.difficulty').css('background',route+'difficulty_easy.png)');

    }else if(difficulty == 'normal'){
        $('.clickPage').hide();
        $('.'+click_page[idx]).show();

        $('.difficulty').css('background',route+'difficulty_normal.png)');

    }else if(difficulty == 'hard'){
        $('.clickPage').hide();
        $('.'+click_page[idx]).show();

        $('.difficulty').css('background',route+'difficulty_hard.png)');

    }

    if(page.attr('class').indexOf('clickPage1') > -1){
        makeClickItem(1, page);
        
        pop_index = 1;
        trueIdxArray = [1];
        wrap = $('.clickPage1');
        num = 2;
        
        var ansWrap = page.find('.ansWrap');
         
        if(ansWrap.attr('class') == null){
            makeSelect(num, wrap, trueIdxArray);
        }
         
        page.find('.ans').css('opacity','0');
        page.find('.select').removeClass('dis');
        
        var ansbtn = page.find('.clickContent .ansbtn');

//         다시하기, 정답보기
        ansbtn.click(function(){
            var ansItem = wrap.find('.ans');
            var selectItem = wrap.find('.select');

            ansItem.stop(true,true);
            console.log('ansbtn clicked');

            // 정답보기
            if($(this).hasClass('re')){
                console.log('정답보기');
                ansItem.css('opacity','0');
                page.find('.select').addClass('dis');

                for(i=0;i<trueIdxArray.length;i++){
                    ansItem.eq(trueIdxArray[i]).css('opacity','1');
                }

            }else{  // 다시하기
                ansItem.css('opacity','0');
                page.find('.select').removeClass('dis');

            }
        })


     }else if(page.attr('class').indexOf('clickPage2') > -1){
         makeClickItem(1, page);
         
         pop_index = 2;
          
         // 괄호클릭
         trueIdxArray = [0];
         wrap = $('.clickPage2');
         num = 2;
        
         var ansWrap = page.find('.ansWrap');
         
         if(ansWrap.attr('class') == null){
             makeSelect(num, wrap, trueIdxArray);
         }
         
         page.find('.ans').css('opacity','0');
         page.find('.select').removeClass('dis');

         var ansbtn = page.find('.ansbtn');
         var select = page.find('.select');
          
         // 괄호 클릭
         select.click(function(){
             var idx = $(this).index();
             page.find('.ans').css('opacity','0');
             page.find('.ans').eq(idx).css('opacity','1');
             
             effectAdo('click');
             
             if($(this).data('data-item') == 'true'){
                 $('.select').removeClass('dis');
                 ansbtn.removeClass('re');
                 $('.finish_btn').removeClass('on');
             }else{
                 $('.select').removeClass('dis');
                 ansbtn.removeClass('re');
             }
         })
         
         // 다시하기, 정답보기
         ansbtn.click(function(){
             var ansItem = page.find('.ans');
             var selectItem = page.find('.select');
 
             ansItem.stop(true,true);
             console.log('ansbtn clicked');
 
             // 다시하기
             if(!$(this).hasClass('re')){
                 ansItem.css('opacity','0');
                 page.find('.select').removeClass('dis');
                 
             }else{  // 정답보기
                 ansItem.css('opacity','0');
                 page.find('.select').addClass('dis');
                 
                 for(i=0;i<trueIdxArray.length;i++){
                    ansItem.eq(trueIdxArray[i]).css('opacity','1');
                }
                 
             }
         }) 
        
     }else if(page.attr('class').indexOf('clickPage3') > -1){
        makeClickItem(1, page);
         
        pop_index = 3; 
         
        trueIdxArray = [1];
        wrap = $('.clickPage3');
        num = 2;
        
        var ansWrap = page.find('.ansWrap');
         
        if(ansWrap.attr('class') == null){
            makeSelect(num, wrap, trueIdxArray);
        }
         
        page.find('.ans').css('opacity','0');
        page.find('.select').removeClass('dis');
        
        var ansbtn = page.find('.clickContent .ansbtn');
        ansbtn.click(function(){
            var ansItem = wrap.find('.ans');
            var selectItem = wrap.find('.select');

            ansItem.stop(true,true);
            console.log('ansbtn clicked');

            // 정답보기
            if($(this).hasClass('re')){
                console.log('정답보기');
                ansItem.css('opacity','0');
                page.find('.select').addClass('dis');

                for(i=0;i<trueIdxArray.length;i++){
                    ansItem.eq(trueIdxArray[i]).css('opacity','1');
                }

            }else{  // 다시하기
                ansItem.css('opacity','0');
                page.find('.select').removeClass('dis');

            }
        })
 

     }else if(page.attr('class').indexOf('clickPage4') > -1){
        makeClickItem(1, page);
        
        pop_index = 4;
         
        trueIdxArray = [1];
        wrap = $('.clickPage4');
        num = 3;
        
        var ansWrap = page.find('.ansWrap');
         
        if(ansWrap.attr('class') == null){
            makeSelect(num, wrap, trueIdxArray);
        }
         
        page.find('.ans').css('opacity','0');
        page.find('.select').removeClass('dis');
         
        var ansbtn = page.find('.clickContent .ansbtn'); 
        ansbtn.click(function(){
            var ansItem = wrap.find('.ans');
            var selectItem = wrap.find('.select');

            ansItem.stop(true,true);
            console.log('ansbtn clicked');

            // 정답보기
            if($(this).hasClass('re')){
                console.log('정답보기');
                ansItem.css('opacity','0');
                page.find('.select').addClass('dis');

                for(i=0;i<trueIdxArray.length;i++){
                    ansItem.eq(trueIdxArray[i]).css('opacity','1');
                }

            }else{  // 다시하기
                ansItem.css('opacity','0');
                page.find('.select').removeClass('dis');

            }
        })


    }else if(page.attr('class').indexOf('clickPage5') > -1){
        makeClickItem(1, page);
        
        pop_index = 5;
        trueIdxArray = [1];
        wrap = $('.clickPage5');
        num = 3;
        
        var ansWrap = page.find('.ansWrap');
         
        if(ansWrap.attr('class') == null){
            makeSelect(num, wrap, trueIdxArray);
        }
         
        page.find('.ans').css('opacity','0');
        page.find('.select').removeClass('dis');
        
        var ansbtn = page.find('.clickContent .ansbtn');
        ansbtn.click(function(){
            var ansItem = wrap.find('.ans');
            var selectItem = wrap.find('.select');

            ansItem.stop(true,true);
            console.log('ansbtn clicked');

            // 정답보기
            if($(this).hasClass('re')){
                console.log('정답보기');
                ansItem.css('opacity','0');
                page.find('.select').addClass('dis');

                for(i=0;i<trueIdxArray.length;i++){
                    ansItem.eq(trueIdxArray[i]).css('opacity','1');
                }

            }else{  // 다시하기
                ansItem.css('opacity','0');
                page.find('.select').removeClass('dis');

            }
        })
        

    }else if(page.attr('class').indexOf('clickPage6') > -1){
        makeClickItem(3, page);
        
        pop_index = 6;
        
    }else if(page.attr('class').indexOf('clickPage7') > -1){
        makeClickItem(2, page);
        
        pop_index = 7;


    }else if(page.attr('class').indexOf('clickPage8') > -1){
        makeClickItem(3, page);
        
        pop_index = 8;

    }else if(page.attr('class').indexOf('clickPage9') > -1){
        makeClickItem(3, page);
        
        pop_index = 9;

    }

    $('.solpop').remove();

    
    var cur = $('.setContent li.on').index();
    var num = $('.setContent li').length;
    $('.pageing .btn').hide()
    if(cur !== 0) $('.pageing .prev').show();
    if(cur !== (num - 1)) $('.pageing .next').show();
    
    if(cur == num - 1) {

		$('.ansbtn').click(function(){
			if($(this).hasClass('re')){
				$('.finish_btn').addClass('on');
			}else{
				$('.finish_btn').removeClass('on');

				$('.bounce2').remove();
			}
		});
	}
    
});

// 팝업창 만들기(mask2 마스크 포함)
function makePop(page, fileName){
    var html2 = '<div class="mask2"></div><div class="solpop '+fileName+'"><div class="closeBtn"></div></div>'
    var url = route+fileName;
    makeMask();
    
    if(fileName == null){
        page.append(html2);
        
    }else if(page == null){ 
        $('.solpop').css({'display':'block','background':'url('+url+'.png) 0 0 no-repeat'});
        
    }else{ 
        page.append(html2);
        $('.solpop').css({'display':'block','background':'url('+url+'.png) 0 0 no-repeat'});

    }
}

// 정답풀이 버튼 눌렀을 때
$(document).on('click','.solbtn',function(){
    effectAdo('click');
    var page = $(this).parent();
    var fileName = 'pop'+(page.index()+1);
	makePop(page,fileName);
})

// 팝업창 닫기
$(document).on('click', '.closeBtn',function(){
    effectAdo('click');
    if($(this).css('display')=='block'){
        $('.solpop').css('display','none');
        $('.solpop').remove();
		removeMask();
		$('.mask2').remove();
    }else{
        $('.solpop').css('display','block');
        
    }
});

// 클릭아이템 
$(document).on('click','.clickPage .clickItem',function(){
    var idx =$(this).index();
    var clickPage = $(this).parent().parent();
    var opacity = $(this).css('opacity');

    if(opacity == 0){
        if(idx == 0){
            clickPage.find('.exBox').show();
        }
    }else{
        if(idx == 0){
            clickPage.find('.exBox').hide();
        }
    }
    
})

//// 정답보기: true, 다시하기: false
//$(document).on('click','.ansbtn', function(){
//    var ansbtn = $(this).hasClass('re');
//    var clickPage = $(this).parent().parent();
//    
//    if(clickPage.attr('class').indexOf('clickPage1')>-1){
//        
//    }
//    
//})

// ans, select 만들기 및 처리
function makeSelect(num, wrap, trueIdxArray){
    var ansWrap = '<div class="ansWrap"></div>';
    var selectwrap = '<div class="selectWrap"></div>';
    wrap.append(ansWrap);
    wrap.append(selectwrap);
    
    for(i=0; i<num; i++){
        wrap.find('.ansWrap').append('<div class="ans ans'+(i+1)+'"></div>');
        wrap.find('.selectWrap').append('<div class="select select'+(i+1)+'"></div>');
    }
    
    var ansItem = wrap.find('.ansWrap .ans');
    var selectItem = wrap.find('.selectWrap .select');
    
    for(i=0; i<trueIdxArray.length; i++){
        selectItem.eq(trueIdxArray[i]).data('data-item','true');
    }
    
    
    
    ansItem.css('opacity','0');
    
    // 기호 클릭
    selectItem.click(function(){
        var page = $(this).parent().parent();
        var idx = $(this).index();
        var setContent = $('.setContent li').length;
        var ansbtn = page.find('.ansbtn');
        
        
        if($(this).data('data-item') == 'true'){
            effectAdo('anschk_o');
            ansItem.eq(idx).css('opacity','1');
            ansbtn.addClass('re');
            page.find('.select').addClass('dis');
        }else{
            effectAdo('anschk_x');
            ansbtn.removeClass('re');
            ansItem.eq(idx).addClass('ani');
            ansTime = setTimeout(function(){
                ansItem.eq(idx).removeClass('ani');
            },500);
        }
        
        // 해당 페이지가 마지막 문제일 때 finish_btn 애니메이션 적용 처리
        var condition_1 = $('.setContent li').eq(setContent-1).hasClass('on');
        var condition_2 = ansbtn.hasClass('re');
        if(condition_1 && condition_2){
            $('.finish_btn').addClass('on');
        }else{
            $('.finish_btn').removeClass('on');
        }
    })
    
//    var ansbtn = wrap.find('.clickContent .ansbtn');

//     다시하기, 정답보기
//    ansbtn.click(function(){
//        var ansItem = wrap.find('.ans');
//        var selectItem = wrap.find('.select');
//
//        ansItem.stop(true,true);
//        console.log('ansbtn clicked');
//
//        // 정답보기
//        if($(this).hasClass('re')){
//            console.log('정답보기');
//            ansItem.css('opacity','0');
//            wrap.find('.select').addClass('dis');
//
//            for(i=0;i<trueIdxArray.length;i++){
//                ansItem.eq(trueIdxArray[i]).css('opacity','1');
//            }
//
//        }else{  // 다시하기
//            ansItem.css('opacity','0');
//            wrap.find('.select').removeClass('dis');
//            
//        }
//    })

}


// 정답풀이 버튼 만들기
function makeSolbtn(array){
    var page;
    var html = '<div class="solbtn"></div>';
    for(i=0; i<array.length; i++){
        page = ".clickPage" + array[i];
        $(page).append(html);
    }
    
}

//클릭아이템 초기화 시키기
function makeClickItem(num, page){
    clickCon1 = new clickAdoContents(num,page);
    clickCon1.init();
}

// 랜덤 숫자 생성
function shuffleRandom(n){
    var ar = new Array();
    var temp;
    var rnum;

    for(var i=1; i<=n; i++){
        ar.push(i);
    }

    for(var i=0; i< ar.length ; i++)
    {
        rnum = Math.floor(Math.random() *n);
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }

        return ar;
}

// 난이도에 따라 clickPage 생성
function make_quiz(diff_array, ar, n){
    var array = [];

    for(var i = 0; i<n; i++){
        array.push(diff_array[ar[i]-1]);
    }

    return array;
}




