(function($) {
    $.setTable = {
        sort: function() {
            var cnt = 0;
            this.find("tr").each(function(index) {
            	if(!$(this).hasClass("nodrag")){
	                cnt++;
	                $(this).children().eq(0).html(cnt);
                }
            });
            return this;
        }
    };
    $.fn.extend(
            {
                sortTableSeq: $.setTable.sort
            }
        )
})(jQuery);