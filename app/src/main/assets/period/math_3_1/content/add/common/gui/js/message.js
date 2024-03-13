(function ($) {
    function Message(item, options) {
        this.options = $.extend({
        }, options);
        this.item = $(item);
        this.init();
    }

    Message.prototype = {
        init: function () {
            var item = this.item;
            var options = this.options;
            var $self = this;
            item.prepend(options.templete);
            item.find(".btnOkLine").click(function (e) {
                $self.hide();
            });
        },
        setMessage(msg) {
            var item = this.item
            item.find(".msg").text(msg);
        },
        show: function () {
            var item = this.item
            item.show();
        },
        hide: function () {
            this.item.hide();
        }
    }

    $.fn.Message = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this), instance = item.data('Message');
            if (!instance) {
                item.data('Message', new Message(this, opt));
            } else {
                if (typeof opt === 'string') {
                    instance[opt].apply(instance, args);
                }
            }
        });
    }
}(jQuery));

function loadMessage() {
    $(document).load(`./message.html`, function (resp, status, xhr) {
        if (status == "success" && xhr.status == 200)
            $("#message").Message({ templete: resp });
        else {
            setTimeout(function () {
                loadMessage();
            }, 1000);
        }
    });
}