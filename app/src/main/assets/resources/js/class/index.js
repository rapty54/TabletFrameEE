$(function(){
    /* 전문가 선생님 수업자료 모음 추천 */
    /* 탭 컨텐츠 스와이프 */
    var TabMenu = ["허쌤의 학급경영","경원쌤의 창의융합교실","잘노는쌤의 게임수업","놀이위키의 교실놀이","보람·재신쌤의 미술견문록","상상그리다필름의 영상클래스"];
    var swiperCont = new Swiper(".creativeData", {
        slidesPerView:1,
        spaceBetween: 15,
        loop:true,
        loopedSlides:6,
        allowTouchMove: true,
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
        pagination: {
            el:".TabPage2",
            bulletClass:"pageBtn",
            bulletActiveClass:"pageBtn-active",
            clickable: true,
            renderBullet:function(index,className){
                return '<span class="' + className + '">' + (TabMenu[index]) + '</span>';
            },
        },
        centeredSlides:true,
        speed:1700,
    });

    /* 탭메뉴 선택시 자동롤링 멈춤 */
    var TabMenu = $(".creativeTab ul li a");
    $(TabMenu).click(function(e){
        e.preventDefault();
        swiperCont.autoplay.stop();
    });

    /* 공모전 수상작 스와이프 */
    var AwardsSwiper = new Swiper(".awardsList", {
        loop:true,
        observer: true,
        observeParents: true,
        autoplay:{
            delay:5000,
            // disableOnInteraction: false
        },
        speed:1450,
    });
});

function onlineLink(obj) {
    location.href = "https://e.vivasam.com/class/alive/online/list?type="+obj.id;
}


