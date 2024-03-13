

// 진도관리
(function ($) {
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
		$element.find(".subClassInfo").text(item.subclass);
		$element.find(".dateInfo").text(getLocaleDate(item.date));
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
	function installDialog(item, options) {
		this.options = $.extend({
			list: [],
			checkedList: new Set(),
		}, options);
		this.item = $(item);
		this.init();
	}
	function calcelCallback(){
		this.hide();
	}

	installDialog.prototype = {
		init: function () {
			var item = this.item;
			var options = this.options;
			var $self = this;
			item.prepend(options.templete);
			item.find(".btnPopClose").click(function () {
		
				$self.hide();
			})
			// item.find('.btnAdd').click(function () {
			// 	$("#addProgress").AddProgress("show", "");
			// });
			item.find(".findPath").click(function() {
				$self.openPath();
			});
			item.find(".btnInstall").click(function() {
				$self.install();
			});
			item.find(".installDialogConf .btnOk").click(function(){
				
				$self.installpop();
			});
			item.find("#chkList-All").click(function() {
				var isChecked = $(this).prop("checked");
				var selector = `.inputChk.item${(isChecked) ? ":checkbox:not(:checked)" : ":checkbox:checked"}`;
				$(selector).each(function(i, el) {
					$(el).prop("checked", isChecked);
					$self.changeCheckedList(isChecked, $(el).data("id"))
				})
			});
			item.find("input").prop("checked", true);
			$(".installDialog2 .btnPopClose").on("click", function(){
				$self.installCancel();
			});
			$(".installDialog2 .btnCancel").on("click", function(){
				$self.installCancel();
			});
			$(".pcSave.complete .btnOk").on("click", function(){
				$self.installRestart();
			});
			$(".pcSave.complete .btnPopClose").on("click", function(){
				$self.installRestart();
			});
			

		},
		setPath:function(path){
			$(".installPath").val(decodeString(path));
		},
		install: function() {
			
			var data={
			"url":$(".installPath").val()
			
			}
			var checked = $(".installDialog input[type='checkbox'").prop("checked");
			if(checked)
				data.pageMode = 1;
			else
				data.pageMode = 0;
			command("install", encodeURI(JSON.stringify(data)), "installCallback");

			
		},
		installDup: function (){
			$(".inner.pcSave").hide();
			$(".inner.pcSave.installDialogConf").show();
			
		},
		installComp: function (){
			$(".inner.pcSave").hide();
			$(".inner.pcSave.complete").show();
			
		},
		installprogress: function (percent){
			if(!$(".inner.pcSave.installDialog2").is(":visible"))
			{
				$(".inner.pcSave").hide();
				$(".inner.pcSave.installDialog2").show();
			}
			$(".pcSave .progressBarInner").width(percent + "%");
			$(".percentage").text(percent);	
			
			
		},
		installpop: function (){
			$(".inner.pcSave").hide();
			$(".inner.pcSave.installDialog").show();
			
		},
		installRestart: function(){
			command("installRestart", '', "");
		},
		installCancel: function(){
			command("installCancel", '', "calcelCallback");
		},
		openPath: function(){
			command("openPath", encodeURI($(".installPath").val()), "openPathCallback");
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
		show: function () {
			this.item.show();
			this.installpop();
		},
		hide: function () {
			this.item.hide();
			var options = this.options;
			options.checkedList.clear();
			options.list = [];
			
		}
	}

	$.fn.installDialog = function (opt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var item = $(this), instance = item.data('installDialog');
			if (!instance) {
				item.data('installDialog', new installDialog(this, opt));
			} else {
				if (typeof opt === 'string') {
					instance[opt].apply(instance, args);
				}
			}
		});
	}
}(jQuery));

function openPathCallback(value){
	$("#installContainer").installDialog("setPath", value);
	
}
function loadInstallDialogTemplate(path) {
	$(document).load(path, function (resp, status, xhr) {
		if (status == "success" && xhr.status == 200)
			$("#installContainer").installDialog({ templete: resp });
		else {
			console.log("something wrong happend!");
		}
	});

}