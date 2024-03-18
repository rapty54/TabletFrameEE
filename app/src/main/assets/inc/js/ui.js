const AppUI = {
     init: function() {
        this.onTab();
        this.onMovePage();
        this.onOpenVideo();
    },
    onTab: function() {
        let $tab = $('.tabWrap');
        let $tabCtrlWrap = $tab.find('.btnTabWrap');
        let $tabCtrl = $tabCtrlWrap.find('>button');
        let $tabViewWrap = $tab.find('.tabContWrap');
        let $tabView = $tabViewWrap.find('.tabCont');

        $tabCtrl.on('click', function() {
            let idx = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $tabView.eq(idx).addClass('on').siblings().removeClass('on');
        });
    },
    onMovePage: function() { // VR, 샘퀴즈, 샘보드
        $('.wrap>.imgWrap').each( function(i) {
            $(this).attr('data-idx', i+1)
        });

        $('.wrap>.imgWrap[data-idx="1"]').addClass('on').siblings().removeClass('on');

        $('.btnMove').on('click', function() {
            let nextIdx = $(this).data('next-idx');
            $('.wrap>.imgWrap[data-idx="' + nextIdx + '"]').addClass('on').siblings().removeClass('on');
        });
    },
    onOpenVideo: function() { // 지역화 자료실
        let $wrap = $('.wrap');
        let $videoCtrl = $wrap.find('.btnVideo');
        let $popWrap = $wrap.find('.popWrap');
        let $video = $popWrap.find('video');
        let $videoTit = $popWrap.find('.videoTit');
        let $popCtrl = $popWrap.find('.btnPopClose');

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
};

$( function() {
    AppUI.init();
});