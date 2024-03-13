(function ($) {
    function ChasiMessagePopup(item, options) {
        this.options = $.extend({
            functionName: null,
        }, options);
        this.item = $(item);
        this.init();
    }

    ChasiMessagePopup.prototype = {
        init: function () {
            var item = this.item;
            var options = this.options;
            var $self = this;
            item.prepend(options.templete);
            item.find(".btnOkLine").on("click", function (e) {
                $self.hide();
            });
            item.find(".btnMoveLine").on("click", function (e) {
                command(options.functionName, "");
                $self.hide();
            });
            item.find(".btnCancelLine").on("click", function (e) {
                $self.hide();
            });
            item.find(".btnPopClose").on("click", function (e) {
                $self.hide();
            });
        },
        setMode: function(isMove, functionName) {
            console.log("setMode");
            var item = this.item
            var options = this.options;
            options.functionName = functionName;
            item.find(".btnMoveLine").css("display", (isMove) ? "block" : "none");
            item.find(".btnCancelLine").css("display", (isMove) ? "block" : "none");
            item.find(".btnOkLine").css("display", (isMove) ? "none" : "block");
        },
        show: function (msg) {
            console.log("show");
            var item = this.item
            item.find(".msg").html(msg);
            item.show();
            disable();
        },
        hide: function () {
            this.item.hide();
            enable();
            command("enable", '', "");
        }
    }

    $.fn.ChasiMessagePopup = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this),
                instance = item.data('ChasiMessagePopup');
            if (!instance) {
                item.data('ChasiMessagePopup', new ChasiMessagePopup(this, opt));
            } else {
                if (typeof opt === 'string') {
                    instance[opt].apply(instance, args);
                }
            }
        });
    }
}(jQuery));

function loadChasiMessagePopup() {
    $(document).load(`./chasiMessagePopup.html`, function (resp, status, xhr) {
        if (status == "success" && xhr.status == 200)
            $("#chasiMessagePopup").ChasiMessagePopup({
                templete: resp
            });
        else {
            setTimeout(function () {
                loadChasiMessagePopup();
            }, 1000);
        }
    });
}
