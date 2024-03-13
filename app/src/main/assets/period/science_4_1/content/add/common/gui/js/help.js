(function ($) {
    function Help(item, options) {
        this.options = $.extend({
            checked: false,
        }, options);
        this.item = $(item);
        this.init();
    }

    Help.prototype = {
        init: function () {
            var item = this.item;
            var options = this.options;
            item.prepend(options.templete);
            this.connectEvent();
        },
        connectEvent: function() {
            var item = this.item;
            var $self = this;
            var options = this.options;
            item.find(".btnPopClose").on("click", function (e) {
                $self.hide();
            });
            item.find("#closePop").on("click", function (e) {
                options.checked = $(this).prop("checked");
                var trans = db.transaction(["checked"], "readwrite");
                var store = trans.objectStore("checked");
                store.put({"type": "chasi", "state": options.checked});
            });
        },
        setChecked: function(checked) {
            var options = this.options;
            options.checked = checked;
        },
        show: function () {
            var item = this.item
            var options = this.options;

            if (options.checked) {
                item.find("#closePop").prop("checked", true);
            } else {
                item.find("#closePop").prop("checked", false);
            }
            
            this.connectEvent();
            item.show();
            disable();
        },
        hide: function () {
            this.item.hide();
            enable();
            command("enable", '', "");
        }
    }

    $.fn.Help = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this),
                instance = item.data('Help');
            if (!instance) {
                item.data('Help', new Help(this, opt));
            } else {
                if (typeof opt === 'string') {
                    instance[opt].apply(instance, args);
                }
            }
        });
    }
}(jQuery));

function loadHelp() {
    var includeArea = $('[data-include]');
    var self, url;
    $.each(includeArea, function () {
        self = $(this);
        url = self.data("include");
        self.load(url, function (resp, status, xhr) {
            self.removeAttr("data-include");
            if (status == "success" && xhr.status == 200) {
                $("#help").Help();
                checkHelpState();
            }
            else {
                setTimeout(function () {
                    loadHelp();
                }, 500);
            }
        });
    });
}

var db = null;
function checkHelpState() {
    const dbName = "VSSB_4_1";
    const version = 1;
    if (window.indexedDB) {
        let request = indexedDB.open(dbName, version);
        request.onupgradeneeded = function(event) {
            db = event.target.result;
            var objectStore = db.createObjectStore("checked", { keyPath: "type" });
            objectStore.createIndex("state", "state", { unique: false });
        }

        request.onsuccess = function(event) {
            db = request.result;
            db.transaction("checked").objectStore("checked").get("chasi").onsuccess = function(event) {
                let checked = false;
                if (event.target.result) {
                    checked = event.target.result.state;
                } else {
                    db.transaction(["checked"], "readwrite").objectStore("checked").add({"type": "chasi", "state": false});
                }
                
                $("#help").Help("setChecked", checked);

                if (!checked) {
                    showHelp();
                }
            }
        }
    }
}