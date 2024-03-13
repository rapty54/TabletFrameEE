var clickContents;
var pageingContents;
var dragContents;
var aniContents;
var helpContents;
var stampContents;
var colorList = [
	'#FDBB38',
	'#F8CADB',
	'#A9CE0D',
	'#5FCBD6',
	'#B6A3CE',
	'#A8A8A8'
];

function bgColorChange(color) {
	$('#container').css('background-color', color);
	// $('#wrap').css('background-color',color);
}

function makeMask() {
	$('#container').append('<div class="mask"></div>');
	$('#container .mask').css({
		'width': '100%',
		'height': '100%',
		'background-color': 'rgba(0,0,0,0.8)'
	});
}

function removeMask() {
	$('.mask').remove();
}

function effectAdo(effect) {
	if (effect == 'anschk_x') {
		var n = Math.floor(Math.random() * 6 + 1);
		effect = 'wrong' + n;
	}
	if (effect == 'anschk_x2') {
		effect = 'anschk_x';
	}

	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="../../common/media/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	ado_stop();
	if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	$(ado)[0].play();

	$(ado).on('ended', function(){
		$('.ansX').removeClass('ansX')
	})
}

function contentAdo(effect, chk) {
	var ado = '#' + effect;
	if ($(ado).length == 0) {
		var html = '<audio id="' + effect + '" src="inc/media/mp3/' + effect + '.mp3" type="audio/mp3"></audio>';
		$('#wrap').append(html);
	}
	if(chk == undefined){
		ado_stop();
		if ($(ado)[0].currentTime > 0) $(ado)[0].currentTime = 0;
	}
	$(ado)[0].play();
}

function ado_stop() {
	$('audio').each(function () {
		$(this)[0].pause();
	});
}

function cho_hangul(str) {
	cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
	result = "";
	for (i = 0; i < str.length; i++) {
		code = str.charCodeAt(i) - 44032;
		if (code > -1 && code < 11172) result += cho[Math.floor(code / 588)];
		else result += str.charAt(i);
	}
	return result;

}

$(document).on('click', '.clickItem, .ansbtn, .ansbtn2, .clkArea div', function(){
	$('.ansX').removeClass('ansX')
})

clickContents = function (items, wrap) {
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
	this.openItemNum = 0;
	this.items = '';
	this.ansbtn = '';
	this.init = function () {
		this.openItemNum = 0;

		if (this.wrap.find('.clickItem').length > 0) {
			this.wrap.find('.clickContent').remove();
		}

		if (self.clickItems > 0) {
			this.makeWrap();
			this.makeItem();
			this.makeBtn();

			this.items.on('click', function () {
				if ($(this).css('opacity') == '0') {
					$(this).css('opacity', '1');
					self.openItemNum--;
				} else {
					$(this).css('opacity', '0');
					self.openItemNum++;
				}

				effectAdo('click');
				if (self.openItemNum == self.clickItems) {
					self.ansbtn.addClass('re');
				} else {
					self.ansbtn.removeClass('re');
				}
			});

			this.ansbtn.on('click', function () {
				effectAdo('click');
				if ($(this).hasClass('re')) {
					self.items.css('opacity', '1');
					self.openItemNum = 0;
					self.ansbtn.removeClass('re');
				} else {
					self.items.css('opacity', '0');
					self.ansbtn.addClass('re');
					self.openItemNum = self.clickItems;

				}
			});
		} else {
			this.makeWrap();
			this.makeItem();

			this.items.on('click', function () {
				effectAdo('click');
				if ($(this).css('opacity') == '0') {
					$(this).css('opacity', '1');
				} else {
					$(this).css('opacity', '0');
				}
			});
		}

	}

	this.makeWrap = function () {
		var html = '<div class="clickContent"></div>';
		this.wrap.append(html);
		this.itemwrap = this.wrap.find('.clickContent');
	};

	this.makeItem = function () {
		var html = '';
		for (var i = 0; i < this.clickItems; i++) {
			html += '<div class="clickItem clickItem' + (i + 1) + '"></div>'
		}
		this.itemwrap.append(html);

		this.items = this.itemwrap.find('.clickItem');

		if (this.items.length == 1) this.items.addClass('ex');
	};

	this.makeBtn = function () {
		var html = '<div class="ansbtn"></div>'
		this.itemwrap.append(html);

		this.ansbtn = this.itemwrap.find('.ansbtn');
	};
}

pageingContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.pageNum = wrap.find('.page').length;
	this.currentPage = 0;
	this.next, this.prev, this.navi, this.dot

	this.init = function () {
		self.wrap.find('.navigation').remove();
		self.currentPage = 0;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(0).show();
		self.makeNavi();

		self.next.on('click', function () {
			self.nextClick($(this));
		});

		self.prev.on('click', function () {
			self.prevClick($(this));
		});

		self.dot.each(function () {
			$(this).on('click', function () {
				if ($(this).hasClass('on')) return false;
				var p = $(this).index();
				self.currentPage = p;
				self.pageMove(self.currentPage);
			});
		});
	}

	this.makeNavi = function () {
		var html = '<div class="navigation"></div>';
		self.wrap.append(html);
		self.navi = self.wrap.find('.navigation');
		var prev = '<div class="prev dis"></div>';
		var next = '<div class="next"></div>'
		var pageing = '<div class="pageing"></div>';
		self.navi.append(prev + next + pageing);
		var dot = '<div class="dot"></div>';
		for (var i = 0; i < self.pageNum; i++) {
			self.navi.find('.pageing').append(dot);
		}
		self.navi.find('.pageing .dot').eq(0).addClass('on');
		self.navi.find('.pageing').css('width', (50 * self.pageNum) + 30 + 'px');
		self.navi.find('.pageing').css('left', 960 - (((50 * self.pageNum) + 30) / 2) + 'px');
		self.next = self.navi.find('.next');
		self.prev = self.navi.find('.prev');
		self.dot = self.navi.find('.pageing .dot');
	}

	this.nextClick = function (el) {
		if (el.hasClass('dis')) return false;
		self.currentPage = self.currentPage + 1;
		self.pageMove(self.currentPage);
	}

	this.prevClick = function (el) {
		if (el.hasClass('dis')) return false;
		self.currentPage = self.currentPage - 1;
		self.pageMove(self.currentPage);
	}

	this.pageMove = function (page) {
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(self.currentPage).show();
		self.navi.find('.pageing .dot').removeClass('on');
		self.navi.find('.pageing .dot').eq(self.currentPage).addClass('on');

		effectAdo('click');
		$('.dis').removeClass('dis');
		if (self.currentPage == 0) {
			self.prev.addClass('dis');
		} else if (self.currentPage + 1 == self.pageNum) {
			self.next.addClass('dis');
		}
	};
}


dragContents = function (wrap, set) {
	var self = this;
	this.wrap = wrap;
	this.dragItems = set;
	this.dragArea, this.dropArea, this.txtArea, this.dragItem, this.dropItem, this.ans;
	this.dragObj = set.drag;
	this.dropObj = set.drop;

	this.init = function () {
		console.log(self.wrap.hasClass('dragContents'))
		if (self.wrap.hasClass('dragContents')) {
			self.wrap.removeClass('dragContents');
			self.wrap.find('.dragArea').remove();
			self.wrap.find('.dropArea').remove();
			self.wrap.find('.ansbtn').remove();
		}

		self.makeArea();
		self.makeObj();
		self.addDrag();
		self.addDrop();
		self.makeBtn()

		this.ansbtn.on('click', function () {
			if ($(this).hasClass('re')) {
				effectAdo('click');
				self.init();
			} else {
				$(this).addClass('re')
				effectAdo('anschk_o');
				self.dropArea.each(function (i) {
					$(this).find('.dropCode').html(self.dropObj[i]);
					$(this).find('.dropCode').addClass('ans');
					self.dragItem.each(function (j) {

						if ($(this).html() == self.dropObj[j]) {
							$(this).css('visibility', 'hidden');
						}
					});
				})
			};
		});
	}

	this.makeArea = function () {
		var html = '' +
			'<div class="dropArea">' +
			'<div class="conObj"></div>' +
			'<div class="txtArea"></div>' +
			'<div class="dropObj"></div>' +
			'</div>' +
			'<div class="dragArea"></div>';

		self.wrap.addClass('dragContents');
		self.wrap.append(html);
		self.dragArea = self.wrap.find('.dragArea');
		self.dropArea = self.wrap.find('.dropObj');
		self.txtArea = self.wrap.find('.txtArea');
	}

	this.makeObj = function () {
		for (var a = 0; a < self.dragObj.length; a++) {
			var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
			self.dragArea.append(dragDiv);
		}

		for (var b = 0; b < self.dropObj.length; b++) {
			var dropDiv = '<div class="dropCode"></div>'
			self.dropArea.append(dropDiv);
		}
	}

	this.addDrag = function () {
		self.dragItem = self.dragArea.find('.dragItem');

		self.dragItem.draggable({

			cursor: 'pointer',
			revert: 'invalid',
			start: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec = $(this);
			},
			drag: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
			},
			stop: function (e, obj) {

			}

		});
	}

	this.addDrop = function () {
		self.dropItem = self.dropArea.find('.dropCode');

		self.dropItem.droppable({
			accept: self.dragItem,
			over: function (e, obj) {
				var $item = $(obj);
				var $this = $(this);
			},
			drop: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				var $item = $(obj);
				var $this = $(this);
				var drag_ans = isRec.html();
				var drop_ans = self.dropObj[$this.index()];

				if (drop_ans == drag_ans) {
					$this.html(drag_ans);
					$this.addClass('ans');
					isRec.css('visibility', 'hidden');
					effectAdo('anschk_o');
					if (self.dropItem.length == self.dropArea.find('.ans').length) {
						self.dragItem.draggable('destroy')
						self.ansbtn.addClass('re');
					}
				} else {
					isRec.draggable({
						revert: true
					})
					effectAdo('anschk_x')
				}

			}
		});
	}

	this.makeBtn = function () {
		var html = '<div class="ansbtn"></div>'
		self.wrap.append(html);

		self.ansbtn = this.wrap.find('.ansbtn');
	};
}

aniContents = function (wrap) {
	//캐릭터 클릭
	var self = this;
	this.wrap = wrap;
	this.init = function () {
		self.wrap.find('.item').hide();
		self.wrap.find('.ani').unbind('click').on('click', function (e) {
			e.stopPropagation();
			self.wrap.find('.item').hide();
			$(this).find('.item').show();
			ado_stop();
			effectAdo('click');
			if ($(this).attr('data-ado')) {
				var ado = $(this).attr('data-ado');
				contentAdo(ado);
			}
		});

		self.wrap.find('.close').unbind('click').on('click', function (e) {
			e.stopPropagation();
			$(this).parent().hide();
			ado_stop();
			effectAdo('click');
		});
	}
}

helpContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.helpwrap, this.helpclose, this.helpbtn, this.helpcon;

	this.init = function (con) {
		this.wrap.find('.helpWrap').remove();
		this.makeHtml();

		this.helpcon.html(con);

		this.helpbtn.on('click', function () {
			var h = self.helpcon.css('height')
			$(this).parent().css('bottom', '+' + h);
			effectAdo('click');
			self.helpclose.show();
		});

		this.helpclose.on('click', function () {
			self.helpclose.hide();
			$(this).parent().css('bottom', 0);
			effectAdo('click');
		})
	}

	this.makeHtml = function () {
		var html = '<div class="helpWrap">' +
			'<div class="helpbtn"></div>' +
			'<div class="con"></div>' +
			'<div class="close"></div>' +
			'</div>';
		self.wrap.append(html);
		this.helpwrap = self.wrap.find('.helpWrap');
		this.helpbtn = self.wrap.find('.helpWrap .helpbtn');
		this.helpclose = self.wrap.find('.helpWrap .close');
		this.helpcon = self.wrap.find('.helpWrap .con');
	}
}

stampContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.timer, this.timer2;


	this.init = function () {
		this.makeHtml();

		var time = self.wrap.find('.stamp').css('animation-duration');
		time = time.replace('s', '');
		time = (Number(time) * 1000) - 700;

		var time2 = time - 700;

		this.timer = setTimeout(function () {
			self.wrap.find('.st').show();
		}, time);

		this.timer2 = setTimeout(function () {
			// effectAdo('stamp');
		}, time2);
	}

	this.makeHtml = function () {
		var stampNum = (Math.random() * (8 - 1)) + 1;
		stampNum = Math.floor(stampNum);
		var html = '<div class="stamp">' +
			'</div>' +
			'<div class="bounce2 item st st' + stampNum + '"></div>';
		self.wrap.append(html);
		if (stampNum == 1 || stampNum == 5) {
			effectAdo('stamp1');
		} else if (stampNum == 2 || stampNum == 6) {
			effectAdo('stamp2');
		} else if (stampNum == 3 || stampNum == 7) {
			effectAdo('stamp3');
		} else if (stampNum == 4 || stampNum == 8) {
			effectAdo('stamp4');
		}
	}
}

toolContents = function (wrap, triangle1, triangle2, angle, ja) {
	var self = this;
	this.wrap = wrap;
	this.angleMove1 = false;
	this.angleMove2 = false;
	this.angleMove3 = false;
	this.angleMove3_r = false;
	this.angleMove4 = false;
	this.factor = 1;
	this.ftangle = 0;
	this.tool,
	this.obj1,
	this.obj2,
	this.obj3,
	this.obj4,
	this.closebtn,
	this.triangle1,
	this.triangle2,
	this.angle,
	this.ja;
	this.makeHtml = function () {
		if (self.wrap.find('.triangletool').length > 0) {
			self.wrap.find('.triangletool').remove();
			self.wrap.find('.triangle1').remove();
			self.wrap.find('.triangle2').remove();
			self.wrap.find('.angle').remove();
			self.wrap.find('.ja').remove();
		}
		var html = '<div class="triangletool tools">' +
			'<div class="close"></div>' +
			'</div>';
		self.wrap.append(html);
		this.tool = self.wrap.find('.triangletool');
		this.close = self.wrap.find('.triangletool .close');
		if (triangle1) {
			self.tool.append('<div class="triangle1"></div>')
			this.obj1 = self.wrap.find('.triangle1');
		}
		if (triangle2) {
			self.tool.append('<div class="triangle2"></div>')
			this.obj2 = self.wrap.find('.triangle2');
		}
		if (angle) {
			self.tool.append('<div class="angle"></div>')
			this.obj3 = self.wrap.find('.angle');
		}
		if (ja) {
			self.tool.append('<div class="ja"></div>')
			this.obj4 = self.wrap.find('.ja');
		}
	}

	this.init = function () {
		self.makeHtml();

		self.tool.on('click', function (e) {
			e.stopPropagation();
			effectAdo('click');
			if ($(this).hasClass('on')) {
				$(this).removeClass('on');
			} else {
				$(this).addClass('on');
			}
			// return false;
		});

		self.close.on('click', function (e) {
			e.stopPropagation();
			effectAdo('click');
			self.tool.removeClass('on')
		});

		if (triangle1) {
			self.setObjEvent1();
		}

		if (triangle2) {
			self.setObjEvent2();
		}

		if (angle) {
			self.setObjEvent3();
		}

		if (ja) {
			self.setObjEvent4();
		}
	}

	this.setObjEvent1 = function () {
		self.obj1.on('click', function (e) {
			e.stopPropagation();
			self.turnangle = 0;
			effectAdo('click');
			// $(this).siblings().removeClass('on')
			// if (self.triangle2) {
			// 	self.triangle2.remove()
			// }
			// if (self.angle) {
			// 	self.angle.remove()
			// }
			// if (self.ja) {
			// 	self.ja.remove()
			// }
			if ($(this).hasClass('on')) {
				// self.triangle1.remove();
				// $(this).removeClass('on')
				self.tool.removeClass('on')
				return false;
			}
			self.triangle1 = $(this).clone();
			self.triangle1.css({
				'width': '400px',
				'height': '400px',
				'position': 'absolute',
				'top': '369px',
				'left': '792px',
				'pointer-events': 'none'
			});

			self.triangle1.append('<div class="rotateBg"><div class="turn"></div><div class="close"></div></div>');

			self.triangle1.find('.rotateBg').css({
				'width': '400px',
				'height': '400px',
				'background': 'url("../../common/images/toolitem/ja1.png") 0px 0px no-repeat',
				'background-size': '100%',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'pointer-events': 'all'
			})

			self.triangle1.find('.turn').css({
				'width': '50px',
				'height': '49px',
				'background': 'url("../../common/images/toolitem/turnbtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '0',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.triangle1.find('.close').css({
				'width': '49px',
				'height': '50px',
				'background': 'url("../../common/images/toolitem/closebtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '55px',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.wrap.append(self.triangle1);
			self.obj1.addClass('on');

			self.triangle1.draggable({
				cursor: 'pointer',
				revert: 'false',
				start: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
					isRec = $(this);
				},
				drag: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
				},
				stop: function (e, obj) {

				}

			});

			self.triangle1.find('.turn').on('mousedown', function (e) {
				e.stopPropagation();
				self.angleMove1 = true;

			});

			self.triangle1.find('.close').on('click', function (e) {
				e.stopPropagation();
				effectAdo('click');
				self.triangle1.remove();
				self.obj1.removeClass('on');
			})
		});

		self.wrap.on('mousemove', function (e) {
			if (self.angleMove1) {
				self.moveAngle(self.triangle1.find('.rotateBg'), e.pageX - self.triangle1.offset().left, e.pageY - self.triangle1.offset().top);
			}
		});

		self.wrap.on('mouseup mouseleave', function (e) {
			self.angleMove1 = false;
		});
	}

	this.setObjEvent2 = function () {
		self.obj2.on('click', function (e) {
			e.stopPropagation();
			effectAdo('click');
			self.turnangle = 0;
			// $(this).siblings().removeClass('on')
			// if (self.triangle1) {
			// 	self.triangle1.remove()
			// }
			// if (self.angle) {
			// 	self.angle.remove()
			// }
			// if (self.ja) {
			// 	self.ja.remove()
			// }
			if ($(this).hasClass('on')) {
				// self.triangle2.remove();
				// $(this).removeClass('on')
				self.tool.removeClass('on')
				return false;
			}
			self.triangle2 = $(this).clone();
			self.triangle2.css({
				'width': '690px',
				'height': '400px',
				'position': 'absolute',
				'top': '375px',
				'left': '659px',
				'pointer-events': 'none'
			});

			self.triangle2.append('<div class="rotateBg"><div class="turn"></div><div class="close"></div></div>');

			self.triangle2.find('.rotateBg').css({
				'width': '690px',
				'height': '400px',
				'background': 'url("../../common/images/toolitem/ja2.png") 0px 0px no-repeat',
				'background-size': '100%',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'pointer-events': 'all'
			})

			self.triangle2.find('.turn').css({
				'width': '50px',
				'height': '49px',
				'background': 'url("../../common/images/toolitem/turnbtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '0',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.triangle2.find('.close').css({
				'width': '49px',
				'height': '50px',
				'background': 'url("../../common/images/toolitem/closebtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '55px',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.obj2.addClass('on');
			self.wrap.append(self.triangle2);
			self.triangle2.draggable({
				cursor: 'pointer',
				revert: 'false',
				start: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
					isRec = $(this);
				},
				drag: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
				},
				stop: function (e, obj) {

				}

			});

			self.triangle2.find('.turn').on('mousedown', function (e) {
				e.stopPropagation();
				self.angleMove2 = true;
			});

			self.triangle2.find('.close').on('click', function (e) {
				e.stopPropagation();
				effectAdo('click');
				self.triangle2.remove();
				self.obj2.removeClass('on');
			})
		});

		self.wrap.on('mousemove', function (e) {
			if (self.angleMove2) {
				self.moveAngle(self.triangle2.find('.rotateBg'), e.pageX - self.triangle2.offset().left, e.pageY - self.triangle2.offset().top);
			}
		});

		self.wrap.on('mouseup mouseleave', function (e) {
			self.angleMove2 = false;
		});
	}

	this.setObjEvent3 = function () {
		self.obj3.on('click', function (e) {
			e.stopPropagation();
			effectAdo('click');
			self.turnangle = 0;
			// $(this).siblings().removeClass('on')
			// if (self.triangle1) {
			// 	self.triangle1.remove()
			// }
			// if (self.triangle2) {
			// 	self.triangle2.remove()
			// }
			// if (self.ja) {
			// 	self.ja.remove()
			// }

			if ($(this).hasClass('on')) {
				// self.angle.remove();
				// $(this).removeClass('on')
				self.tool.removeClass('on')
				return false;
			}
			self.angle = $(this).clone();

			self.angle.css({
				'width': '723px',
				'height': '387px',
				'position': 'absolute',
				'top': '396px',
				'left': '586px',
				'z-index': '2',
				'pointer-events': 'none'
			});

			self.angle.append('<div class="rotateBg"><div class="turn"></div><div class="turn r"></div><div class="close"></div><div class="close r"></div></div>');

			self.angle.find('.rotateBg').css({
				'width': '723px',
				'height': '387px',
				'background': 'url("../../common/images/toolitem/angle.png") 0px 0px no-repeat',
				'background-size': '100%',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'border-top-left-radius': '357px',
				'border-top-right-radius': '357px',
				'pointer-events': 'all'
			})

			self.angle.find('.turn').css({
				'width': '50px',
				'height': '49px',
				'background': 'url("../../common/images/toolitem/turnbtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '0',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.angle.find('.close').css({
				'width': '49px',
				'height': '50px',
				'background': 'url("../../common/images/toolitem/closebtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '55px',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.angle.find('.turn.r, .close.r').css({
				'left': '740px'
			})

			self.obj3.addClass('on');
			self.wrap.append(self.angle);
			self.angle.draggable({
				cursor: 'pointer',
				revert: 'false',
				start: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
					isRec = $(this);
				},
				drag: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
				},
				stop: function (e, obj) {

				}

			});

			self.angle.find('.turn').on('mousedown', function (e) {
				e.stopPropagation();
				if ($(this).hasClass('r')) {
					self.angleMove3_r = true;
				} else {
					self.angleMove3 = true;
				}
			});

			self.angle.find('.close').on('click', function (e) {
				e.stopPropagation();
				effectAdo('click');
				self.angle.remove();
				self.obj3.removeClass('on');
			})
		});

		self.wrap.on('mousemove', function (e) {
			e.preventDefault();
			if (self.angleMove3) {
				self.moveAngle(self.angle.find('.rotateBg'), e.pageX - self.angle.offset().left, e.pageY - self.angle.offset().top);
			} else if (self.angleMove3_r) {
				self.moveAngle(self.angle.find('.rotateBg'), e.pageX - self.angle.offset().left, e.pageY - self.angle.offset().top, true);
			}
		});

		self.wrap.on('mouseup mouseleave', function (e) {
			e.preventDefault();
			self.angleMove3 = false;
			self.angleMove3_r = false;
		});
	}

	this.setObjEvent4 = function () {
		self.obj4.on('click', function (e) {
			e.stopPropagation();
			effectAdo('click');
			self.turnangle = 0;
			// $(this).siblings().removeClass('on')
			// if (self.triangle1) {
			// 	self.triangle1.remove()
			// }
			// if (self.triangle2) {
			// 	self.triangle2.remove()
			// }
			// if (self.angle) {
			// 	self.angle.remove()
			// }
			if ($(this).hasClass('on')) {
				// self.ja.remove();
				// $(this).removeClass('on')
				self.tool.removeClass('on')
				return false;
			}
			self.ja = $(this).clone();
			self.ja.css({
				'width': '875px',
				'height': '160px',
				'position': 'absolute',
				'top': '531px',
				'left': '510px',
				'pointer-events': 'none',
				'z-index': '3'
			});

			self.ja.append('<div class="rotateBg"><div class="turn"></div><div class="close"></div></div>');

			self.ja.find('.rotateBg').css({
				'width': '875px',
				'height': '160px',
				'background': 'url("../../common/images/toolitem/ja5.png") 0px 0px no-repeat',
				'background-size': '100%',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'pointer-events': 'all'
			})

			self.ja.find('.turn').css({
				'width': '50px',
				'height': '49px',
				'background': 'url("../../common/images/toolitem/turnbtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '0',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.ja.find('.close').css({
				'width': '49px',
				'height': '50px',
				'background': 'url("../../common/images/toolitem/closebtn.png") 0px 0px no-repeat',
				'position': 'absolute',
				'bottom': '55px',
				'left': '-60px',
				'cursor': 'pointer'
			})

			self.obj4.addClass('on');
			self.wrap.append(self.ja);
			self.ja.draggable({
				cursor: 'pointer',
				revert: 'false',
				start: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
					isRec = $(this);
				},
				drag: function (e, obj) {
					var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
					obj.position.top = Math.round(obj.position.top / factor);
					obj.position.left = Math.round(obj.position.left / factor);
				},
				stop: function (e, obj) {

				}

			});

			self.ja.find('.turn').on('mousedown', function (e) {
				e.stopPropagation();
				self.angleMove4 = true;
			});

			self.ja.find('.close').on('click', function (e) {
				e.stopPropagation();
				effectAdo('click');
				self.ja.remove();
				self.obj4.removeClass('on');
			})
		});

		self.wrap.on('mousemove', function (e) {
			e.preventDefault();
			if (self.angleMove4) {
				self.moveAngle(self.ja.find('.rotateBg'), e.pageX - self.ja.offset().left, e.pageY - self.ja.offset().top);
			}
		});

		self.wrap.on('mouseup mouseleave', function (e) {
			e.preventDefault();
			self.angleMove4 = false;
		});
	}

	this.turnangle = 0;
	this.moveAngle = function (obj, cx, cy, angle_r) {
		var zoom = FORTEACHERCD.responsive.baseContainerSize.zoom;
		var ex = ex;
		var ey = ey;
		var angleCenter = 361;
		if (!ex) {
			ex = Number(obj.css('left').replace('px', '')) + (obj.width() / 2);
		}
		if (!ey) {
			if (obj.parent().hasClass('angle')) ey = Number(obj.css('top').replace('px', '')) + angleCenter;
			else ey = Number(obj.css('top').replace('px', '')) + (obj.height() / 2);
		}
		console.log(obj,obj.css('top'))
		if (obj.parent().hasClass('angle')) {
			var dy = ey - (cy / zoom);
		} else {
			var dy = (ey - $('#wrap').offset().top) - (cy / zoom);
		}
		var dx = (ex - $('#wrap').offset().left) - (cx / zoom);
		var theta = Math.atan2(dy, dx);
		theta = (theta * 180) / Math.PI;

		if (angle_r != undefined) {
			theta += 180;
		}

		if (self.turnangle == 0) {
			if (angle_r != undefined) self.turnangle = -theta;
			else self.turnangle = theta;
		}


		if (angle_r != undefined) theta = theta + self.turnangle;
		else theta = theta - self.turnangle;

		theta = Number(theta).toFixed(1);
		if (obj.parent().hasClass('angle')) {
			obj.css({
				'transform': 'rotate(' + theta + 'deg)',
				'transform-origin': 'center ' + angleCenter + 'px'
			});
		} else {
			obj.css({
				'transform': 'rotate(' + theta + 'deg)',
				'transform-origin': 'center center'
			});
		}

		if (self.wrap.find('.center').length == 0) {
			self.wrap.append('<div class="center"></div>');
			self.wrap.append('<div class="turno"></div>');
		}

		return theta;
	}
}

$(window).on('load', function () {
	$('.setContent li').on('click', function () {
		var idx = $(this).index();
		var page = $('.contents').eq(idx);
		if (page.css('display') == 'block') return false;
		$(this).siblings().removeClass('on');
		$(this).addClass('on');
		effectAdo('click');
		$('.contents').hide();
		page.show();
	});

	$('body').on('contextmenu', function () {
		return false;
	})
});
$('.finish_btn').on('click', function () {
	effectAdo('click');
	$(this).removeClass('on');
})
