(function ($) {
	function AddProgress(item, options) {
		this.options = $.extend({
			clazz: "",
		}, options);
		this.item = $(item);
		this.init();
	}

	AddProgress.prototype = {
		init: function () {
			var item = this.item;
			var options = this.options;
			var $self = this;
			item.prepend(options.templete);
			item.find(".btnPopClose").click(function () {
				$self.hide();
			});

			item.find(".currSave").click(function () {
				command("insertNowProg", $('.content > input').val(), "insertProgCallback");
			});

			item.find(".nextSave").click(function () {
				if (curSubIndex === lastIndex) {
					$("#message").Message("show");
				} else {
					command("insertNextProg", $('.content > input').val(), "insertProgCallback");
				}
			});

			item.find(".inputClass").keypress(function (e) {
				if (e.charCode === 46) e.preventDefault();
			});

			item.find(".inputClass").on("input", function(e) {
				this.value = this.value.replace(/[^0-9]/g, '')
				if(this.value.length > this.maxLength){
					this.value = this.value.slice(0, this.maxLength);
				}
			});
		},
		show: function (clazz) {
			$('.content > input').val(clazz);
			var options = this.options;
			this.item.show();
		},
		hide: function () {
			$('.content > input').val("");
			this.item.hide();
		}
	}

	$.fn.AddProgress = function (opt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var item = $(this), instance = item.data('AddProgress');
			if (!instance) {
				item.data('AddProgress', new AddProgress(this, opt));
			} else {
				if (typeof opt === 'string') {
					instance[opt].apply(instance, args);
				}
			}
		});
	}
}(jQuery));

function loadAddProgress(path) {
	$(document).load(path, function (resp, status, xhr) {
		if (status == "success" && xhr.status == 200)
			$("#addProgress").AddProgress({ templete: resp });
		else {
			console.log("something wrong happend!");
		}
	});
}
