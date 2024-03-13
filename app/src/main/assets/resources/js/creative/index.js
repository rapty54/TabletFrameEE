$(function(){
    /* 최신 계기 수업 자료 스와이프 */
    getSubjectOperate()

    /* 전문가 선생님 수업자료 모음 추천 */
    /* 탭 컨텐츠 스와이프 */
    var TabMenu = ["건강·안전","인성","세계시민","역사·문화 정체성","경제·금융","통일","생태환경","SW","독서","체험활동","진로활동"];
    var swiperCont = new Swiper(".teacherData", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop:true,
        loopedSlides:11,
        allowTouchMove: true,
        pagination: {
            el:".TabPage",
            bulletClass:"pageBtn",
            bulletActiveClass:"pageBtn-active",
            clickable: true,
            renderBullet:function(index,className){
                return '<span class="' + className + '">' + (TabMenu[index]) + '</span>';
            },
        },
        navigation: {
            nextEl: '.teacherListNext',
            prevEl: '.teacherListPrev',
        },
        observer: true,
        observeParents: true,
        autoplay:{
            delay:5000,
            // disableOnInteraction: false
        },
        centeredSlides:true,
        speed:1700,
        on: {
            slideChange: function () {
                getVideoData(this.realIndex);
            }
        }
    });

    var TabMenu = $(".teacherTab ul li a");
    $(TabMenu).click(function(e){
        e.preventDefault();
        /* 탭메뉴 선택시 자동롤링 멈춤 */
        swiperCont.autoplay.stop();
    });
});

function viewDataContents(target){
    var data = $(target).data();
    // ZIP 컨텐츠는 새창으로 띄워주기
    if (data.type != 'Y') {
        if (data.file == 'FT207') {
            // FT359	iPDF (복합파일(ZIP)
            if (data.mediaType == 'FT359') {
                Popup.openSimpleSViewer(data.siteUrl);
                return false;
            }
            // FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
            if (data.mediaType == 'FT360') {
                Popup.openHtmlViewer(data.siteUrl);
                return false;
            }
        }
    } else {
        Popup.openHtmlViewer2(data.siteUrl);
        return false;
    }
    Popup.openViewerMain(data.content, data.contentGubun);
}
// 최신 계기 수업 자료
function getSubjectOperate() {
    var date = $('[name=date]').val();

    Ajax.execute({
        data : {
            'date' : date
        },
        dataType : "html",
        type : "get",
        url: "/creative/subjectOperate.html",
        success: function(html) {
            $('#subjectOperateZone').html($(html));

            let swiper = new Swiper(".subjectDataSwiper", {
                slidesPerView: 4,
                spaceBetween: 7,
                slidesPerGroup: 4,
                loop: true,
                navigation: {
                    nextEl: '.dataListNext',
                    prevEl: '.dataListPrev',
                },
                pagination: {
                    bulletActiveClass:"dataPaging-active",
                    bulletClass:"dataPagingbullet",
                    el: '.dataPaging',
                    clickable: true
                },
                autoplay:{
                    delay: 3000,
                    // disableOnInteraction: false
                },
                speed: 1700,
                observer: true,
                observeParents: true,
            });

        }
    });
}

function getVideoData(index) {
    let data = $('.dataContent.swiper-slide[data-swiper-slide-index="'+index+'"]').data();
    if(data) {
        if(data.category == 'course') {
            return false;
        }
        Ajax.execute({
            data : {
                'educourseId' : data.educourseid
            },
            dataType : "html",
            loading: false,
            type : "get",
            loading: false,
            url: "/creative/videoData.html",
            success: function(html) {
                $('.dataContent.swiper-slide[data-swiper-slide-index="'+index+'"] .videoDataCont').html($(html));
            }
        });
    }
}
