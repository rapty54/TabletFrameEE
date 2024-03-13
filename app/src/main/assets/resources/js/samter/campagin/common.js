function dreamPopOpen(){

    if($('#campaignPopWrap').length == 0) {
        Layer.openLayer({
            url: '/samter/campaign/popup/campaign.popup',
            callback: function() {
                $('.campaignPopWrap').css('display', 'block');
            }
        });
    }

}