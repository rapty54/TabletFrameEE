var AppUI = {
     init: function() {
        this.movePage();
        this.openVideo();
    },
    movePage: function() { // VR, 샘퀴즈, 샘보드
        $('.wrap>.imgWrap').each( function(i) {
            $(this).attr('data-idx', i+1)
        });

        $('.wrap>.imgWrap[data-idx="1"]').addClass('on').siblings().removeClass('on');

        $('.btnMove').on('click', function() {
            let nextIdx = $(this).data('next-idx');
            $('.wrap>.imgWrap[data-idx="' + nextIdx + '"]').addClass('on').siblings().removeClass('on');
        });
    },
    openVideo: function() { // 지역화 자료실
        $wrap = $('.wrap');
        $videoCtrl = $wrap.find('.btnVideo');
        $popWrap = $wrap.find('.popWrap');
        $video = $popWrap.find('video');
        $videoTit = $popWrap.find('.videoTit');
        $popCtrl = $popWrap.find('.btnPopClose');


        $videoCtrl.each( function(i) {
            $(this).attr('data-video-idx', i+1)
        });

        $videoCtrl.on('click', function() {
            let videoIdx = $(this).data('video-idx');
            let videoTit = $(this).attr('title');
            let videoURL = `inc/video/locallibrary/${videoIdx}.mp4`;

            $videoTit.text(videoTit);
            $video.find('source').attr('src', videoURL).parent().load();
            $popWrap.addClass('on');
        });

        $popCtrl.on('click', function() {
            $videoTit.text('');
            $video.find('source').attr('src', '').parent().load();
            $popWrap.removeClass('on');
        });
    }
}

$( function() {
    AppUI.init();
});