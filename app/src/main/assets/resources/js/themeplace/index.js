let appleSwiper;
function ClassSwiper(el, idx, num, margin) {
    let innerSwiper = new Swiper(el + idx + ' .swiper', {
        autoplay: {
            delay: 5000
        },
        slidesPerView: num,
        spaceBetween: margin,
        pagination: {
            el: el + idx + ' .pagination',
            type: 'bullets',
            clickable: true,
        },
        observer: true,
        observeParents: true,
        watchOverflow: true
    });
    return innerSwiper;
}

function resetSwiper(index) {
    if(appleSwiper) {
        // Swiper 객체 파기
        appleSwiper.destroy(true, true); // true, true 옵션으로 파기하고 이벤트 리스너 제거
    }
    // Swiper 시작
    appleSwiper = ClassSwiper('#numbers', index + 1, 2, 16);
}

$( function() {
    let semesterSwiper = new Swiper('.semesterSwiper', {
        speed: 1450,
        pagination: {
            el: '.semesterPagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="btnGrade ' + className + '">' + (index + 1) + '학년</span>';
            },
        },
        on: {
            init: function() {
                ClassSwiper('#semester', 1, 3, 0);
            },
            slideChange: function() {
                ClassSwiper('#semester', this.activeIndex+1, 3, 0);
            }
        },
        observer: true,
        observeParents: true,
        allowTouchMove: false,
    });

    $('.btnSwitch').on('click', function(e){
        let index = $(this).parent().index();
        resetSwiper(index);
    });

    // 초기화
    $('.themeItem01 .btnSwitch').eq(1).trigger('click');
});