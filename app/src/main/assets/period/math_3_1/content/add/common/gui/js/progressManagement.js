// 진도관리
(function ($) {
	function setTooltip($el, text, width) {
		if (text.width() > width) {
			$el.attr("title", text);
		}
	}

	function getLocaleDate(date) {
		var localeDate = new Date(date).toLocaleDateString()
		var tmp = localeDate.split("/");
		return `${tmp[0]}-${tmp[1]}`;
	}

	function setProgressItem(parent, templete, item, checked) {
		var $element = templete.clone();
		// $element.data(item);
		var $input = $element.find("input");
		$element.find("label").attr("for", `chkList-${item.id}`);
		$input.attr("id", `chkList-${item.id}`);
		$input.data("id", item.id);
		$input.prop("checked", checked);
		$input.addClass("item");
		$element.find(".classInfo").text(item.cls);
		$element.find(".contentInfo").text(item.content);
		setTooltip($element.find(".contentInfo"), item.content, 110);
		$element.find(".subClassInfo").text(item.subclass);
		setTooltip($element.find(".subClassInfo"), item.subclass, 280);
		$element.find(".dateInfo").text(getLocaleDate(item.date));
		setTooltip($element.find(".dateInfo"), getLocaleDate(item.date), 68);
		$element.find(".btnClass").click(function () {
			var data = {
				index: item._content,
				subIndex: item._subclass,
			};
			command("goProg", JSON.stringify(data), "goProgCallback");
		});

		$input.click(function(){
			var id = parseInt($(this).data("id"));
			$("#progressContainer").ProgressManagement("changeCheckedList", $(this).prop("checked"), id);
			var count = $(".inputChk.item:checkbox:checked").length;
			var countAll = $(".inputChk.item").length;
			$("#chkList-All").prop("checked", (countAll === count) ? true : false)
		});


		$element.find(".btnSave").click(function () {
			$("#addProgress").AddProgress("show", item.cls)
		});
		$element

		parent.append($element);
	}
	function ProgressManagement(item, options) {
		this.options = $.extend({
			list: [],
			checkedList: new Set(),
		}, options);
		this.item = $(item);
		this.init();
	}

	ProgressManagement.prototype = {
		init: function () {
			var item = this.item;
			var options = this.options;
			var $self = this;
			item.prepend(options.templete);
			item.find(".btnPopClose").click(function () {
				command("enable", '', "");
				$self.hide();
			})
			item.find('.btnAdd').click(function () {
				$("#addProgress").AddProgress("show", "");
			});
			item.find(".btnDel").click(function() {
				$self.delete();
			});
			item.find("#chkList-All").click(function() {
				var isChecked = $(this).prop("checked");
				var selector = `.inputChk.item${(isChecked) ? ":checkbox:not(:checked)" : ":checkbox:checked"}`;
				$(selector).each(function(i, el) {
					$(el).prop("checked", isChecked);
					$self.changeCheckedList(isChecked, $(el).data("id"))
				})
			});
		},
		setTable: function (list) {
			var item = this.item;
			var options = this.options;
			list.sort((a, b) => (parseInt(a.cls) > parseInt(b.cls)) ? 1 : ((parseInt(b.cls) > parseInt(a.cls)) ? -1 : 0));
			options.list = $.extend(true, [], list);
			var $rootList = item.find(".tableList")
			$rootList.children().remove();
			$templete = item.find(".progressTemplete").children();
			if(list.length === 0){
				$rootList.addClass('noneList');
			}else{
				$rootList.removeClass('noneList');
				for (var i = 0; i < list.length; i++) {
					var data = options.list[i];
					setProgressItem($rootList, $templete, data, options.checkedList.has(data.id));
				}
			}

			$("#chkList-All").prop("checked", false)
		},
		setTooltipHidden: function(isHidden) {
			if (isHidden) {
				$(".viewTooltip").attr("title", "");
			}
		},
		changeCheckedList: function(checked, id) {
			if (checked) {
				this.options.checkedList.add(id);
			} else {
				if (this.options.checkedList.has(id)) {
					this.options.checkedList.delete(id);
				}
			}
		},
		delete: function() {
			var options = this.options;
			command("delProg", JSON.stringify([...options.checkedList]), "deleteProgCallback");
			this.options.checkedList.clear();
		},
		show: function () {
			try {
				disable(false);
			} catch(e) {

			}
			this.item.show();
		},
		hide: function () {
			this.item.hide();
			try {
				enable();
			} catch(e) {
			}
			var options = this.options;
			options.checkedList.clear();
			options.list = [];
			try {
				$("#addProgress").AddProgress("hide");
			} catch(e) {
				console.error(e);
			}
		}
	}

	$.fn.ProgressManagement = function (opt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var item = $(this), instance = item.data('ProgressManagement');
			if (!instance) {
				item.data('ProgressManagement', new ProgressManagement(this, opt));
			} else {
				if (typeof opt === 'string') {
					instance[opt].apply(instance, args);
				}
			}
		});
	}
}(jQuery));

function loadProgressManagement(path) {
	$(document).load(path, function (resp, status, xhr) {
		if (status == "success" && xhr.status == 200)
			$("#progressContainer").ProgressManagement({ templete: resp });
		else {
			console.log("something wrong happend!");
		}
	});

}
