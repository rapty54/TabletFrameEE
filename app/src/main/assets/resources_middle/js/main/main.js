
$(function() {
	//2020 개편 메인 비주얼
    // $('#slide_counter').prepend('<h4 class="slide_index current_index"></h4>');
    // var mainslider = $('.main_visual ul').bxSlider({
    //     mode: 'fade',
    //     auto: true,
    //     autoControls: false,
    //     //autoHover: true,
    //     //stopAutoOnClick : true,
    //     pause: 5000,
    //     minSlides: 1,
    //     maxSlides: 1,
    //     infiniteLoop: true,
    //     pager: false,
    //     speed: 500,
    //     onSliderLoad: function (currentIndex){
    //          $('#slide_counter .current_index').text(currentIndex + 1);
    //      },
    //      onSlideBefore: function ($slideElement, oldIndex, newIndex){
    //          $('#slide_counter .current_index').text(newIndex + 1);
    //      }
    // });

    let mainSlider = new Swiper('.main_visual', {
        observer: true,
        observerParents: true,
        slidesPerView: '1',
        loopAdditionalSlides: 1,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.mainSlider-pagination',
            type: "fraction",
        },
        navigation: {
                prevEl: '.nav_wrap .mainSlider-button-prev',
                nextEl: '.nav_wrap .mainSlider-button-next',
        }
    })

    //공지사항, 자료요청 스와이퍼
    $('.rolling_wrap .rolling_item').each((idx, val) => {
        let slider = $(val).find('.swiper-container');
        var swiper2 = new Swiper(slider, {
            observer: true,
            observerParents: true,
            slidesPerView: '1',
            loop: true,
            direction: 'vertical',
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    });

    //비바샘연수원 추천강의 배너
    var swiper4 = new Swiper('.institute_wrap .swiper-container', {
        observer:true,
        observerParents: true,
        slidesPerView: '1',
        loop: true,
        loopAdditionalSlides: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // $('#slide_counter').append('<div class="slide_counter_badge"> / <h4 class="total_slides">'+mainslider.getSlideCount()+'</h4>');
    // $('.total_slides, .slide_index').css('display','inline-block');
    //2020 개편 메인 비주얼2

    
    //2020 개편 : 맞춤 추천
    // function main_top_type03 (){
    //     $('.main_slider03 ul').bxSlider({
    //         mode: 'fade',
    //         auto: false,
    //         moveSlides: 1,
    //         pager: true,
    //         controls: true
    //     });
    // }
    // main_top_type03 ();
    
    // 2020 개편 테마관
    function themeListSlide(){
        $('.theme_list ul').bxSlider({
            mode: 'fade',
            auto: true,
            pause: 4000,
            pager: true,
            controls: true,
            moveSlides: 1,
            minSlides: 1,
            maxSlides: 1,
            infiniteLoop: true,
            speed: 500,
        });
    }
    themeListSlide();

    //수업자료 공모전 수상작
    function main_tab (){
        $('ul.tabs li').hover(function(){            	   
            var tab_id = $(this).attr('data-tab');

            $('ul.tabs li').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tab_id).addClass('current');
        });
    }
    main_tab ();
    
    // 2020 개편 : notice 롤링
    noticeStart();
    $('#contents .noti_list a').click(function(){
        if ($(this).hasClass('btn_prev'))
        {
            noticeFn('prev');
        } else {
            noticeFn('next');
        }
        return false;
    }).mouseover(function(){
        noticeStop();
    }).mouseleave(function(){
        noticeStart();
    });

    function noticeStart(){
        noticeRoll= setInterval(function(){
            noticeFn('next');
        }, 3000);
    }
    function noticeStop(){
        clearInterval(noticeRoll);
    }
    function noticeFn(val){
        var $target =$('#contents .noti_list');
        var $item =$target.find('li');
        var idx = $target.find('li.active').index();
        var targetSize = $item.length;
        
        $item.hide().removeClass('active');
        if (val == 'prev')
        {	
            idx = idx-1;
        } else
        {
            if (idx == targetSize-1)
            {	
                idx=0;
            } else {
                idx = idx+1;
            }
        }
        $item.eq(idx).show().addClass('active');
    }

    $('.mySubject .setting').click(function(){

        $('.mySubject_popup').toggleClass('on');

        if($('.mySubject_popup').hasClass('on')) {
            $('.mySubject_popup').stop().animate({
                left: '66px'
            });
        }else {
            $('.mySubject_popup').stop().animate({
                left: '-1134px'
            });
        }

    });

});

/*********************************** 메인 우측 하단의 이달의 이슈 **************************************/
var isLoadingIssueContents = false;
function _issueThisMonthContents() {
    if (isLoadingIssueContents) return;
    isLoadingIssueContents = true;

    var templateType = "IssueThisMonth";

    var callbackId = "issueThisMonth";

    var templateOption = {
            dataUrl : CONTEXTPATH + '/main/issueThisMonthContentsList.do',
            returnType: 'html',
            callbackId : callbackId,
            dataCondition : {
                templateType : templateType
            }
        };

    $('#issueThisMonth').vsTemplate(templateOption);
}

//이슈 컨텐츠 display
function _drawIssueThisMonthContents(callbackId, resultData) {
    $('#issueThisMonth').html(resultData);

    //자료 개수가 1개 이상일 경우
    if ($("#issueThisMonth").find('li').length > 1) {
    	$('.banner2 div:eq(1)').rollingBanner();
    }
	
    isLoadingIssueContents = false;
}
/*********************************** 메인 우측 하단의 이달의 이슈 **************************************/

/*********************************** 메인 학교급/과목별 컨텐츠 정보 처리 **************************************/
var isLoadingRecommendContents = false;
function _recommendContents(obj, subjectCd, schoolLvlCd) {
	
	

    if (isLoadingRecommendContents) return;
    isLoadingRecommendContents = true;
    
    
    $('#subjectData').append().spin('main');

    //학교급 select 처리
 	if (subjectCd == "") {
 		$(obj).parent().parent().children('li').removeClass('on');   	     		
 		$(obj).parent().addClass('on');
 		
 		$('.subject .menu li ul li a').parent().parent().find('a').removeClass('on');
 	}
 	else {
 		$('.subject .menu li ul li a').parent().parent().find('a').removeClass('on');
 	}
 	
 	
 
    var templateOption = {
            dataUrl : CONTEXTPATH + '/main/mainRecommendContents.do',
            returnType: 'html',
            callbackId : 'recommend', 
            dataCondition : {
                subjectCd : subjectCd,
                schoolLvlCd : schoolLvlCd,
                mLevel : MEMLEVEL //회원레벨
            }
        };

    $('#subjectData').vsTemplate(templateOption);
    
   // mainSubjectTitleHTML =  $(obj).parent().parent().parent().children('li a').text() + " > " + $(obj).html() ;
    
	 
}

function _recommendContentsNew(subjectCd, schoolLvlCd) {
	
	

    if (isLoadingRecommendContents) return;
    isLoadingRecommendContents = true;
    
    
    $('#subjectData').append().spin('main');
    /*
    //학교급 select 처리
 	if (subjectCd == "") {
 		$(obj).parent().parent().children('li').removeClass('on');   	     		
 		$(obj).parent().addClass('on');
 		
 		$('.subject .menu li ul li a').parent().parent().find('a').removeClass('on');
 	}
 	else {
 		$('.subject .menu li ul li a').parent().parent().find('a').removeClass('on');
 	}
 	*/
 	
 	
 
    var templateOption = {
            dataUrl : CONTEXTPATH + '/main/mainRecommendContents.do',
            returnType: 'html',
            callbackId : 'recommend', 
            dataCondition : {
                subjectCd : subjectCd,
                schoolLvlCd : schoolLvlCd,
                mLevel : MEMLEVEL //회원레벨
            }
        };

    $('#subjectData').vsTemplate(templateOption);
    
   // mainSubjectTitleHTML =  $(obj).parent().parent().parent().children('li a').text() + " > " + $(obj).html() ;
    
	 
}

function _loadingMainBannerList(type) {
    $('.tab_cont').spin('main');
    var templateOption = {
        dataUrl : CONTEXTPATH + "/create/mainBannerInfoListTemplate.do",
        returnType : 'html',
        callbackId : 'mbiList',
        dataCondition : {
        	type : type
        }
    };
    $('.tab_cont').vsTemplate(templateOption);
}

//var mainSubjectTitleHTML = "";

function _templateDataSuccessCallback(callbackId, resultData) {
    switch (callbackId) {
    	case 'recommend' :
            $('#subjectData').data('spinner').stop();
            $('#subjectData').html(resultData);
            if ($("#curSchoolLvlCd").val() != "" && $("#curMainSubjectCd").val() != "") {
            	$("#" + $("#curSchoolLvlCd").val() + $("#curMainSubjectCd").val()).addClass('on');	
            }
            isLoadingRecommendContents = false;
            
        	// id="curSchoolLvlCd" 
        	// id="curMainSubjectCd"

            var txtSbCode = $('#curSchoolLvlCd').val()+$('#curMainSubjectCd').val();
            var txtss1 =  $("#" + txtSbCode).parent().parent().parent().children('li a').text();
            var txtss2 =  $("#" + txtSbCode).text();            
            $("#mainSubjectTitle").html(txtss1 + " > " + txtss2);
            
            
            break;
        case 'issueThisMonth' :
        	_drawIssueThisMonthContents(callbackId, resultData);
            break;
        case 'mbiList' :
		    $('.tab_cont').data().spinner.stop();
		    $('.tab_cont').html(resultData);
		    //createListSlide();
			break;
    }
}

function _templateDataErrorCallback(callbackId) {
    switch (callbackId) {
        case 'recommend' :
            $('#sec_subject .tabCnt').data('spinner').stop();
            isLoadingRecommendContents = false;
            break;
        case 'issueThisMonth' :
            isLoadingIssueContents = false;
            break;
        case 'mbiList' :
        	$('.tab_cont').data().spinner.stop();
        	break;
            
    }
}
/*********************************** 메인 학교급/과목별 컨텐츠 정보 처리 **************************************/

/********************************************* 문제은행 **********************************************/
/*문제은행 바로가기 과목 선택*/
function qBankSelectSubject(obj, subject) {
	if (MEMLEVEL == "AU400") {
		memLevelAlert('qbank');
		$("#qBankSelectDiv").hide();
		return;
	}
	
	$("#qBankSelect").html("<span id='" + subject + "'>" + $(obj).html() + "</span>");
	$("#qBankSelectDiv").hide();
	$("#qBankSelect").removeClass('on');
}


/********************************************* 문제은행 **********************************************/
