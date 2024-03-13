var dragCon;

$(document).ready(function() {
	dragCon = new dragContents2($('.dragPage'), dragItem[0].length, 2);
	dragCon.init();

});

var dragItem = [
	['물의 양', '온도', '강낭콩 개수', '빛', '페트리 접시 크기', '페트리 접시를 두는 장소'],
	[0, 1, 1, 1, 1, 1,],
]

var dragContents2 = function(wrap, drag, drop) {
	var self = this;
	this.wrap = wrap;
	this.dragArea, this.dropArea, this.dragItem, this.dropItem, this.ansbtn;
	this.dragLeng = drag;
	this.dropLeng = drop;

	this.init = function() {
		if (self.dragArea) {
			self.wrap.removeClass('dragContents');
			self.dragArea.remove();
			self.dropArea.remove();
		}

		COMMONLIBRARY.tools.initFeedSound_in();

		self.makeArea();
		self.addDrag();
		self.addDrop();
		self.makeBtn()

		self.ansbtn.on('click', function() {
			if($(this).hasClass('open')) return false;

			if($(this).index() === 0){
				self.dragCom($(this))
			}
			else{
				dragCon = new dragContents2($('.dragPage'), dragItem[0].length, 2);
				dragCon.init();
			}

			COMMONLIBRARY.tools.popupAudio();
		});

	}

	this.dragCom = function(el) {
		self.dropItem.html('')
		for(var i = 0; i < dragItem[1].length; i ++){
			var c = self.dragItem.eq(i).clone();
			self.dropItem.eq(dragItem[1][i]).append(c)
		}
		self.dragItem.removeAttr('style').addClass('com');
		el.addClass('open')
		el.next().removeClass('open')
	}

	this.makeArea = function() {
		var html = '' +
			'<div class="dropArea">' +
			'<div class="dropObj"></div>' +
			'</div>' +
			'<div class="dragArea"></div>'

		self.wrap.html('').removeClass('com')
		self.wrap.addClass('dragContents');
		self.wrap.append(html);
		self.dragArea = self.wrap.find('.dragArea');
		self.dropArea = self.wrap.find('.dropObj');

		for (var a = 0; a < self.dragLeng; a++) {
			var dragDiv = '<div class="dragItem drag'+ (a+1) +'">'+ dragItem[0][a] +'</div>'
			self.dragArea.append(dragDiv);
		}

		for (var b = 0; b < self.dropLeng; b++) {
			var dropDiv = '<div class="dropCode"></div>'
			self.dropArea.append(dropDiv);
		}
	}

	this.addDrag = function() {
		self.dragItem = self.dragArea.find('.dragItem');

		self.dragItem.draggable({

			cursor: 'pointer',
			revert: 'invalid',
			start: function(e, obj) {
				COMMONLIBRARY.view.setScale();
				var factor = COMMONLIBRARY.view.scale;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec = $(this);
			},
			drag: function(e, obj) {
				var factor = COMMONLIBRARY.view.scale;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec.addClass('ing')

				isRec.css('z-index', 999)
			},
			stop: function(e, obj) {
				isRec.removeClass('ing')
			}

		});
	}

	this.addDrop = function() {
		self.dropItem = self.dropArea.find('.dropCode');

		self.dropItem.droppable({
			accept: self.dragItem,
			over: function(e, obj) {
				var $item = $(obj);
				var $this = $(this);
			},
			drop: function(e, obj) {
				var factor = COMMONLIBRARY.view.scale;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				var $this = $(this);
				var idx = isRec.index();
				var num = 2.6
				var dt;

				if($this.index() === dragItem[1][idx]){
					isRec.addClass('com');
					// isRec.removeAttr('style');
					var c = isRec.clone();
					$this.append(c);

					COMMONLIBRARY.tools.correctAudio();
					isRec.draggable({revert: false});
				}
				else{
					COMMONLIBRARY.tools.wrongAudio();
					isRec.draggable({revert: true});
				}

				self.ansbtn.eq(1).removeClass('open')

				if(self.dragArea.find('.com').length === self.dragItem.length) self.ansbtn.eq(0).addClass('open')
			}
		});
	}

	this.makeBtn = function() {
		var html = '<div class="btnWrap">' +
						'<button type="button" class="btn-answer-show btnAll"></button>' +
						'<button type="button" class="btn-answer-blind btnRe open"></button>' +
					'</div>'
		self.wrap.append(html);
		self.ansbtn = this.wrap.find('.btnWrap button');
	};
}
