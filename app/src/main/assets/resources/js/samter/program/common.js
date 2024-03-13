function programPopOpen(){

    if($('#programPopWrap').length == 0) {
        Layer.openLayer({
            url: '/samter/teacher/program/popup/program.popup',
            callback: function() {
                $('.programPopWrap').css('display', 'block');
            }
        });
    }

}