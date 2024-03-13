$(function (){
    var player = new StarPlyr('#player', {
        debug: true,
        iconUrl: '/resources/plugins/starplayer/1.0.0/starplyr.svg',
    });
    window.player = player;

    Ajax.execute({
        type: 'GET',
        url: '/viewer/content-url.json',
        dataType: 'json',
        cache: false,
        async: false,
        data: {contentId: masterContent.contentId, contentGubun: masterContent.contentGubun},
        success: function (data) {
            $('#player').empty().append('<source src="' + data.response + '" type="video/mp4" />');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
        }
    });
});