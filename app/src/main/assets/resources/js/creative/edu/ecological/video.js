function getVideoList() {

	var $tabConts = null;
	$tabConts = $('#content');
	Ajax.execute({
		url: '/creative/edu/ecological/videoList',
		data: {
			searchKeyword : $('input[name=searchKeyword]').val() ==  null ? '' : $('input[name=searchKeyword]').val(),
			page : $('input[name=page2]').val() ==  null ? '' : $('input[name=page2]').val(),
			educourseId : '2320053',
			type1 : $('input[name=type1]').val() ==  null ? '' : $('input[name=type1]').val(),
			type2 : $('input[name=type2]').val() ==  null ? '' : $('input[name=type2]').val(),
			type3 : '614'
		},
		type: 'get',
		dataType: 'html',
		success: function(html) {
			$tabConts.empty();
			$tabConts.append($(html));
		}
	});
};
