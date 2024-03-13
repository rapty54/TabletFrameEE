$(function() {
	
	ThumbRolling.init();

	$('.detail .cont ul li a').click(function() {
		var n = $(this).parent().index();
		var cln = $(this).attr('class');

		$('.detail .cont ul li').each(function(n) {
			var obj = $(this).find('a');
			var cl = obj.attr('class');
			
			obj.attr('class', cl.replace('_on', ''));
		});
		$(this).attr('class', cln+'_on');

		$('.detail .cont .img').removeClass('on');
		$('.detail .cont .img').eq(n).addClass('on');

		return false;
	});

});

var ThumbRolling = {
	total: 0,
	clTime: null,
	cnt: 0,
	time: 2000,
	init: function() {
		ThumbRolling.total = $('.detail .book .steel ul li').length;

		ThumbRolling.drawPage();
	},
	drawPage: function() {
		var ol = $('<ol></ol>');

		$('.detail .steel').append(ol);
		for(var i=0; i<this.total; i++) {
			if( i == 0 ) {
				$('.detail .steel').find('ol').append('<li><a href="#" class="on">' + i + '</a></li>');
			}else {
				$('.detail .steel').find('ol').append('<li><a href="#">' + i + '</a></li>');
			}
		}
		
		$('.detail .steel ol a').click( function() { 
			ThumbRolling.rolling($(this).parent().index());

			return false;
		})
		.mouseover( function() {
			clearTimeout(ThumbRolling.clTime);
		})
		.mouseout( function() {
			ThumbRolling.clTime = setInterval(ThumbRolling.rolling, ThumbRolling.time);
		});

		ThumbRolling.clTime = setInterval(ThumbRolling.rolling, ThumbRolling.time);
	},
	goThumb: function(n) {
		$('.detail .steel ol a').removeClass('on');
		$('.detail .steel ol a').eq(n).addClass('on');

		return false;
	},
	rolling: function(n) {
		
		if( arguments.length == 0 ) {
			ThumbRolling.cnt = (ThumbRolling.cnt > ThumbRolling.total-2) ? 0 : ThumbRolling.cnt+1;
		}else {
			ThumbRolling.cnt = n;
		}

		$('.detail .steel ul').animate({left: ThumbRolling.cnt * -330});

		ThumbRolling.goThumb(ThumbRolling.cnt);
	}
};

