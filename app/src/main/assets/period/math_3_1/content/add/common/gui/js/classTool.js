(function ($) {
	function ClassTool(item, options) {
		this.options = $.extend({}, options);
		this.item = $(item);
		this.init();
	}

	ClassTool.prototype = {
		init: function () {
			var item = this.item;
			var options = this.options;
			var $self = this;
			item.prepend(options.templete);

			item.find(".btnPopClose").click(function () {
				$self.hide();
			});

			item.find("li").on("click", function (e) {
				let id = $(this).attr("id");
				$(this).addClass("on");
				item.find(".on").removeClass("on")
				switch (id) {
					case "timer":
						var data = {
							"title": "타이머",
							"url": "/common/gui/tools/timer.html",
							width: 1024,
							height: 542,
							"pageMode": 0
						};
						command("studyHelp", encodeURI(JSON.stringify(data)), "");
						break;
					case "stopWatch":
						var data = {
							"title": "스톱워치",
							"url": "/common/gui/tools/stopwatch.html",
							width: 1024,
							height: 542,
							"pageMode": 0
						};
						command("studyHelp", encodeURI(JSON.stringify(data)), "");
						break;
					case "guide":
						var data = {
							"title": "번호 뽑기",
							"url": "/common/gui/tools/drawing.html",
							width: 1024,
							height: 542,
							"pageMode": 0
						};
						command("studyHelp", encodeURI(JSON.stringify(data)), "");
						break;
					case "scoreBoard":
						var data = {
							"title": "모둠 점수판",
							"url": "/common/gui/tools/score.html",
							width: 1024,
							height: 542,
							"pageMode": 0
						};
						command("studyHelp", encodeURI(JSON.stringify(data)), "");
						break;
					case "blink":
						var data = {
							"title": "깜깜이",
							"url": "/common/gui/tools/dark.html",
							width: 1024,
							height: 542,
							"pageMode": 1
						};
						command("studyHelp", encodeURI(JSON.stringify(data)), "");
						break;
					case "drawNwrite":
						ppt_drawing();
						break;
				}

				$self.hide();
			});
		},
		show: function (clazz) {
			this.item.show();
		},
		hide: function () {
			this.item.hide();
		}
	}

	$.fn.ClassTool = function (opt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var item = $(this),
				instance = item.data('ClassTool');
			if (!instance) {
				item.data('ClassTool', new ClassTool(this, opt));
			} else {
				if (typeof opt === 'string') {
					instance[opt].apply(instance, args);
				}
			}
		});
	}
}(jQuery));

function loadClassTool(path) {
	$(document).load(path, function (resp, status, xhr) {
		if (status == "success" && xhr.status == 200)
			$("#classTool").ClassTool({
				templete: resp
			});
		else {
			console.log("something wrong happend!");
		}
	});
}
