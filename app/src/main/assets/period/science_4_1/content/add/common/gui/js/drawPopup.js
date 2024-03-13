(function ($) {
    function drawPopup(item, options) {
        this.options = $.extend({
            grade: '1',
            group: '1',
            selectAnnotations: []
        }, options);
        this.item = $(item);
        this.lc = null;
        this.opacity = 0;
        this.init();
    }

    drawPopup.prototype = {
        init: function () {
            var item = this.item;
            var options = this.options;
            var $self = this;
            item.prepend(options.templete);

            $self.clearColorPicker(item);
            item.find(".colorPad." + 'brown').addClass("on");

            item.find(".btnPopClose").click(function (e) {
                $self.hide();
            });

            item.find(".drawWrite .opacity .slider").slider();
            item.find(".drawWrite .opacity .slider").slider('option', { min: 0, max: 100 });
            item.find(".drawWrite .opacity .slider").slider('value', 0);
            item.find(".drawWrite .opacity .slider").on('slidechange', $self.opacityChanged);

            item.find(".colorPicker").css({
                "background": '#000000',
            });
            item.find(".colorPicker").spectrum({
                flat: false,
                showInput: false,
                cancelText: "취소",
                chooseText: "선택",
                preferredFormat: "hsl",
                color: '#000000',
                change: function (color) {
                    $(".colorPicker").css({
                        "background": color,
                    });
                    $(".colorPicker").spectrum('set', color);
                    var hsl = color.toHsl();
                    $self.lc.colors.primaryHSL = 'hsla(' + hsl.h + ', ' + (hsl.s * 100) + '%, ' + (hsl.l * 100) + '%, ';
                    $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ')';
                    $self.lc.setColor('primary', $self.lc.colors.primary);
                }
            });


            var message = "텍스트를 추가할 위치를 선택하세요(취소:ESC)."
            var hint = '<div id="hint-message">' + message + '</div>';
            item.append(hint);
            $self.hintShown = "none";
            $("body").mouseover(function(e) {
                item.find('#hint-message')
                            .css({
                                'top': (e.pageY - 20) + 'px',
                                'position': "absolute",
                                'left': (e.pageX + 20) + 'px',
                                'z-index': "999",
                                'display': "" + $self.hintShown,
                            }); //.show('fast');
            }).mousemove(function(e) {
                item.find('#hint-message')
                            .css({
                                'top': (e.pageY - 20) + 'px',
                                'position': "absolute",
                                'left': (e.pageX + 20) + 'px',
                                'z-index': "999",
                                'display': "" + $self.hintShown,
                            });
            });


            item.find(".drawMode").click(function (e) {
                item.find(".drawMode").addClass("on");
                item.find(".drawOption").addClass("on");
                item.find(".textMode").removeClass("on");
                item.find(".textOption").removeClass("on");
                item.find(".selectMode").removeClass("on");

                $self.clearDrawTool(item);
                item.find(".drawToolPen").click(); //addClass("on");
                $self.lc.setTool(new LC.tools.Pencil($self.lc));
                if ($self.lc) {
                    $self.lc.setShapesInProgress($self.lc);
                    $self.lc.repaintLayer('main')
                }
            });

            item.find(".textMode").click(function (e) {
                item.find(".drawToolPen").click();
                item.find(".drawMode").removeClass("on");
                item.find(".drawOption").removeClass("on");
                item.find(".textMode").addClass("on");
                item.find(".textOption").addClass("on");
                item.find(".selectMode").removeClass("on");
                $self.clearDrawTool(item);
                $self.lc.setTool(new LC.tools.Tool($self.lc));
                if ($self.lc) {
                    $self.lc.setShapesInProgress($self.lc);
                    $self.lc.repaintLayer('main')
                }
            });

            item.find(".selectMode").click(function (e) {
                item.find(".drawMode").removeClass("on");
                item.find(".drawOption").removeClass("on");
                item.find(".textMode").removeClass("on");
                item.find(".textOption").removeClass("on");
                item.find(".selectMode").addClass("on");

                $self.clearDrawTool(item);
                $self.lc.setTool(new LC.tools.SelectShape($self.lc));
                if ($self.lc) {
                    $self.lc.setShapesInProgress($self.lc);
                    $self.lc.repaintLayer('main')
                }
            });

            item.find(".drawToolPen").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolPen").addClass("on");
                $self.lc.setTool(new LC.tools.Pencil($self.lc));
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }
            });

            item.find(".drawToolHighlighter").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolHighlighter").addClass("on");
                $self.lc.setTool(new LC.tools.Pencil($self.lc));
                $("#drawPopup").drawPopup('setOpacity', 50);
                $(".slider").slider('value', 50);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 50;
                }
            });

            item.find(".allEraser").click(function (e) {
                item.find(".inner.delAll .content p").html("현재 페이지의 그리기한 내용과 텍스트를<br/>모두 삭제하시겠습니까?");
                item.find(".inner.delAll").show();
            });

            item.find(".inner.delAll .content .btnOkLine").click(function (e) {
                $self.lc.clear();
                item.find(".inner.delAll").hide();
            });

            item.find(".inner.delAll .content .btnCancelLine").click(function (e) {
                item.find(".inner.delAll").hide();
            });

            item.find(".partEraser").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".partEraser").addClass("on");
                $self.lc.setTool(new LC.tools.Eraser($self.lc));
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }

            });

            item.find(".drawToolLine").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolLine").addClass("on");
                $self.lc.hasEndArrow = false;
                $self.lc.setTool(new LC.tools.Line($self.lc));
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }
            });

            item.find(".drawToolArrow").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolArrow").addClass("on");
                $self.lc.hasEndArrow = true;
                $self.lc.setTool(new LC.tools.Line($self.lc));
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }
            });

            item.find(".drawToolSquare").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolSquare").addClass("on");
                $self.lc.setTool(new LC.tools.Rectangle($self.lc));
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }
            });

            item.find(".drawToolCircle").click(function (e) {
                $self.clearDrawTool(item);
                item.find(".drawToolCircle").addClass("on");
                $self.lc.setTool(new LC.tools.Ellipse($self.lc));
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $("#drawPopup").drawPopup('setOpacity', 0);
                $(".slider").slider('value', 0);
                var len = $("#drawPopup .opacity .percentage").length;
                for (var i = 0; i < len; i++) {
                    $("#drawPopup .opacity .percentage")[i].innerText = "" + 0;
                }
            });

            item.find(".colorPad").click(function (e) {
                var self = $(this);
                var color = "";
                var annotation = $.extend(true, {}, options.annotation);

                if (self.hasClass('brown')) {
                    color = 'brown';
                    $self.lc.colors.primary = 'hsla(350, 100%, 27%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('sky')) {
                    color = 'sky';
                    $self.lc.colors.primary = 'hsla(206, 66%, 51%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('red')) {
                    color = 'red';
                    $self.lc.colors.primary = 'hsla(350, 81%, 56%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('navy')) {
                    color = 'navy';
                    $self.lc.colors.primary = 'hsla(225, 61%, 42%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('orange')) {
                    color = 'orange';
                    $self.lc.colors.primary = 'hsla(20, 100%, 62%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('purple')) {
                    color = 'purple';
                    $self.lc.colors.primary = 'hsla(294, 92%, 30%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('yellow')) {
                    color = 'yellow';
                    $self.lc.colors.primary = 'hsla(48, 100%, 69%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('gray')) {
                    color = 'gray';
                    $self.lc.colors.primary = 'hsla(0, 0%, 58%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('mint')) {
                    color = 'mint';
                    $self.lc.colors.primary = 'hsla(147, 73%, 62%, ' + (1 - ($self.opacity / 100)) + ')';
                } else if (self.hasClass('black')) {
                    color = 'black';
                    $self.lc.colors.primary = 'hsla(0, 0%, 0%, ' + (1 - ($self.opacity / 100)) + ')';
                }
                $self.clearColorPicker(item);
                item.find(".colorPad." + color).addClass("on");
            });

            item.find(".thick05").click(function (e) {
                $self.clearThickness(item);
                item.find(".thick05").addClass("on");
                $self.lc.strokeWidth = 30;
            });

            item.find(".thick04").click(function (e) {
                $self.clearThickness(item);
                item.find(".thick04").addClass("on");
                $self.lc.strokeWidth = 25;
            });

            item.find(".thick03").click(function (e) {
                $self.clearThickness(item);
                item.find(".thick03").addClass("on");
                $self.lc.strokeWidth = 18;
            });

            item.find(".thick02").click(function (e) {
                $self.clearThickness(item);
                item.find(".thick02").addClass("on");
                $self.lc.strokeWidth = 12;
            });

            item.find(".thick01").click(function (e) {
                $self.clearThickness(item);
                item.find(".thick01").addClass("on");
                $self.lc.strokeWidth = 8;
            });

            item.find(".font30").click(function (e) {
                $self.clearFont(item);
                item.find(".font30").addClass("on");
                $self.lc.fontSize = 30;
                $self.lc.font = `${$self.lc.fontSize}px ${$self.lc.fontFamily}`;
            });

            item.find(".font24").click(function (e) {
                $self.clearFont(item);
                item.find(".font24").addClass("on");
                $self.lc.fontSize = 24;
                $self.lc.font = `${$self.lc.fontSize}px ${$self.lc.fontFamily}`;
            });

            item.find(".font18").click(function (e) {
                $self.clearFont(item);
                item.find(".font18").addClass("on");
                $self.lc.fontSize = 18;
                $self.lc.font = `${$self.lc.fontSize}px ${$self.lc.fontFamily}`;
            });

            item.find(".font14").click(function (e) {
                $self.clearFont(item);
                item.find(".font14").addClass("on");
                $self.lc.fontSize = 14;
                $self.lc.font = `${$self.lc.fontSize}px ${$self.lc.fontFamily}`;
            });

            item.find(".textAdd").click(function (e) {
                $self.lc.setTool(new LC.tools.Text($self.lc))
                $self.hintShown = "block";
                // showMouseText(true, "텍스트를 추가할 위치를 선택하세요(취소:ESC).");
                document.body.style.cursor = 'crosshair';
            });

            item.find(".textDelAll").click(function (e) {
                item.find(".inner.delAll .content p").html("현재 페이지의 그리기한 내용과 텍스트를<br/>모두 삭제하시겠습니까?");
                item.find(".inner.delAll").show();
                //$self.lc.clear();
            });

            item.find(".viewToggle").click(function (e) {
                if ($(this).hasClass("off")) {
                    $(this).removeClass("off");
                    $(".drawing-canvas-container").css("visibility", "visible");
                } else {
                    $(this).addClass("off");
                    $(".drawing-canvas-container").css("visibility", "hidden");
                }
            });

            item.find(".rotateCounter").click(function (e) {
                if ($self.lc.canUndo()) {
                    $self.lc.undo();
                }
            });

            item.find(".rotateClockwise").click(function (e) {
                if ($self.lc.canRedo()) {
                    $self.lc.redo();
                }
            });

            var x, i, j, l, ll, selElmnt, a, b, c;
            /*look for any elements with the class "drawwrite-custom-select":*/
            x = document.getElementsByClassName("drawwrite-custom-select");
            l = x.length;
            for (i = 0; i < l; i++) {
                selElmnt = x[i].getElementsByTagName("select")[0];
                ll = selElmnt.length;
                /*for each element, create a new DIV that will act as the selected item:*/
                a = document.createElement("DIV");
                a.setAttribute("class", "select-selected");
                a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                x[i].appendChild(a);
                /*for each element, create a new DIV that will contain the option list:*/
                b = document.createElement("DIV");
                b.setAttribute("class", "select-items select-hide");
                for (j = 0; j < ll; j++) {
                    /*for each option in the original select element,
                    create a new DIV that will act as an option item:*/
                    c = document.createElement("DIV");
                    c.innerHTML = selElmnt.options[j].innerHTML;
                    if (j === selElmnt.selectedIndex) {
                        c.setAttribute("class", "same-as-selected");
                    }
                    c.addEventListener("click", function (e) {
                        /*when an item is clicked, update the original select box,
                        and the selected item:*/
                        var y, i, k, s, h, sl, yl;
                        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                        sl = s.length;
                        h = this.parentNode.previousSibling;
                        for (i = 0; i < sl; i++) {
                            if (s.options[i].innerHTML == this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                yl = y.length;
                                for (k = 0; k < yl; k++) {
                                    y[k].removeAttribute("class");
                                }
                                this.setAttribute("class", "same-as-selected");
                                $self.lc.fontFamily = s.options[i].value;
                                $self.lc.font = `${$self.lc.fontSize}px ${$self.lc.fontFamily}`;
                                break;
                            }
                        }
                        h.click();
                    });
                    b.appendChild(c);
                }
                x[i].appendChild(b);
                a.addEventListener("click", function (e) {
                    /*when the select box is clicked, close any other select boxes,
                    and open/close the current select box:*/
                    e.stopPropagation();
                    closeAllSelect(this);
                    this.nextSibling.classList.toggle("select-hide");
                    this.classList.toggle("select-arrow-active");
                });
            }
            function closeAllSelect(elmnt) {
                /*a function that will close all select boxes in the document,
                except the current select box:*/
                var x, y, i, xl, yl, arrNo = [];
                x = document.getElementsByClassName("select-items");
                y = document.getElementsByClassName("select-selected");
                xl = x.length;
                yl = y.length;
                for (i = 0; i < yl; i++) {
                    if (elmnt == y[i]) {
                        arrNo.push(i)
                    } else {
                        y[i].classList.remove("select-arrow-active");
                    }
                }
                for (i = 0; i < xl; i++) {
                    if (arrNo.indexOf(i)) {
                        x[i].classList.add("select-hide");
                    }
                }
            }
            /*if the user clicks anywhere outside the select box,
            then close all select boxes:*/
            document.addEventListener("click", closeAllSelect);
        },
        hideHint: function() {
            var $self = this;
            $self.hintShown = "none";
            $('#hint-message').css({
                'display': "none",
            });
        },
        setOpacity: function (opacity) {
            this.opacity = opacity;
            var alpha = 1 - (opacity / 100);
            this.lc.colors.primary = this.lc.colors.primaryHSL + alpha + ")";
            this.lc.setColor('primary', this.lc.colors.primary);
        },
        opacityChanged: function (e, ui) {
            var opacity = ui.value;
            $("#drawPopup").drawPopup('setOpacity', opacity);
            if (ui.handle.className.includes("ui-state-focus")) {
                if (e.target.id == "drawOpacitySlider") {
                    $("#textOpacitySlider").slider('value', opacity);
                } else {
                    $("#drawOpacitySlider").slider('value', opacity);
                }
            }
            var len = $("#drawPopup .opacity .percentage").length;
            for (var i = 0; i < len; i++) {
                $("#drawPopup .opacity .percentage")[i].innerText = "" + opacity;
            }
        },
        drawSnapshot: function (key, mode, num, offsetX) {
            var $self = this;
            var _item = this.item;

            setTimeout(() => {
                $("#drawPopup").drawPopup('hide');

                $(".drawing-canvas-container.literally.core").removeClass('toolbar-hidden');
                $(".drawing-canvas-container.literally.core").removeClass('single-page');
                if (mode == 1) {
                    $(".drawing-canvas-container.literally.core").addClass('single-page');
                }
                $self.lc = LC.init(document.getElementsByClassName('drawing-canvas-container literally core')[0], {

                });

                $self.lc.colors.secondary = "hsla(0, 0%, 100%, 0)";
                $self.lc.colors.primaryHSL = "hsla(0, 0%, 0%, ";
                $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                $self.lc.setColor('primary', $self.lc.colors.primary);
                $self.lc.strokeWidth = 18;
                $self.lc.hasEndArrow = false;
                $self.lc.fontWeight = 'normal';
                $self.lc.fontSize = 18;
                $self.lc.fontFamily = 'NanumGothic';
                $self.lc.isDrawWrite = true;
                $self.lc.isInCapture = false;

                $self.lc.offsetX = 0;
                if (mode == 1 && num != 0) {
                    $self.lc.offsetX = offsetX;
                }

                $self.lc.indexed_db_key = key;
                getData_indexed_db("drawing", $self.lc.indexed_db_key, function (tmp_dataKeyRtnValue) {
                    if (tmp_dataKeyRtnValue !== undefined) {
                        $self.lc.loadSnapshot(tmp_dataKeyRtnValue.value[0]);
                        _item.find(".drawMode").click();
                        _item.find(".drawToolPen").click();
                        //_item.find(".colorPad.brown").click();
                        _item.find(".thick03").click();
                        $self.lc.fontFamily = 'NanumGothic';
                        _item.find(".font18").click();
                        _item.find(".drawWrite .select-items :first-child").click();
                        _item.find(".drawWrite .opacity .slider").slider('value', 0);
                        $self.lc.colors.primaryHSL = "hsla(0, 0%, 0%, ";
                        $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                        $self.lc.setColor('primary', $self.lc.colors.primary);

                        _item.find(".colorPicker").css({
                            "background": '#000000',
                        });

                        if ($self.lc.canUndo()) {
                            _item.find(".rotateCounter").removeClass("disable");
                        } else {
                            _item.find(".rotateCounter").addClass("disable");
                        }
                        if ($self.lc.canRedo()) {
                            _item.find(".rotateClockwise").removeClass("disable");
                        } else {
                            _item.find(".rotateClockwise").addClass("disable");
                        }
                    } else {
                        console.log("snapshot is not defined.");
                        $self.lc.clear();
                        _item.find(".drawMode").click();
                        _item.find(".drawToolPen").click();
                        //_item.find(".colorPad.brown").click();
                        _item.find(".thick03").click();
                        $self.lc.fontFamily = 'NanumGothic';
                        _item.find(".font18").click();
                        _item.find(".drawWrite .select-items :first-child").click();
                        _item.find(".drawWrite .opacity .slider").slider('value', 0);
                        $self.lc.colors.primaryHSL = "hsla(0, 0%, 0%, ";
                        $self.lc.colors.primary = $self.lc.colors.primaryHSL + (1 - ($self.opacity / 100)) + ")";
                        $self.lc.setColor('primary', $self.lc.colors.primary);

                        _item.find(".colorPicker").css({
                            "background": '#000000',
                        });

                        if ($self.lc.canUndo()) {
                            _item.find(".rotateCounter").removeClass("disable");
                        } else {
                            _item.find(".rotateCounter").addClass("disable");
                        }
                        if ($self.lc.canRedo()) {
                            _item.find(".rotateClockwise").removeClass("disable");
                        } else {
                            _item.find(".rotateClockwise").addClass("disable");
                        }
                    }
                });

                $self.lc.on("drawingChange", function () {
                    if ($self.lc.canUndo()) {
                        _item.find(".rotateCounter").removeClass("disable");
                    } else {
                        _item.find(".rotateCounter").addClass("disable");
                    }
                    if ($self.lc.canRedo()) {
                        _item.find(".rotateClockwise").removeClass("disable");
                    } else {
                        _item.find(".rotateClockwise").addClass("disable");
                    }
                });


            }, 100);
        },
        show: function () {
            this.item.show();
        },
        hide: function () {
            $(".drawing-canvas-container").css({
                "pointer-events": "none"
            });
            $(".drawing-canvas-container-outer").css({
                "pointer-events": "none"
            });
            if (this.lc) {
                this.lc.setShapesInProgress(this.lc);
                this.lc.repaintLayer('main')
            }
            this.item.hide();
        },
        clearDrawTool: function (item) {
            item.find(".drawToolPen").removeClass("on");
            item.find(".drawToolHighlighter").removeClass("on");
            item.find(".allEraser").removeClass("on");
            item.find(".partEraser").removeClass("on");
            item.find(".drawToolLine").removeClass("on");
            item.find(".drawToolArrow").removeClass("on");
            item.find(".drawToolSquare").removeClass("on");
            item.find(".drawToolCircle").removeClass("on");
        },
        clearColorPicker: function (item) {
            item.find(".colorPad.brown").removeClass("on");
            item.find(".colorPad.red").removeClass("on");
            item.find(".colorPad.orange").removeClass("on");
            item.find(".colorPad.yellow").removeClass("on");
            item.find(".colorPad.mint").removeClass("on");
            item.find(".colorPad.sky").removeClass("on");
            item.find(".colorPad.navy").removeClass("on");
            item.find(".colorPad.purple").removeClass("on");
            item.find(".colorPad.gray").removeClass("on");
            item.find(".colorPad.black").removeClass("on");
        },
        clearThickness: function (item) {
            item.find(".thick05").removeClass("on");
            item.find(".thick04").removeClass("on");
            item.find(".thick03").removeClass("on");
            item.find(".thick02").removeClass("on");
            item.find(".thick01").removeClass("on");
        },
        clearFont: function (item) {
            item.find(".font30").removeClass("on");
            item.find(".font24").removeClass("on");
            item.find(".font18").removeClass("on");
            item.find(".font14").removeClass("on");
        }
    }

    $.fn.drawPopup = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var item = $(this), instance = item.data('drawPopup');
            if (!instance) {
                item.data('drawPopup', new drawPopup(this, opt));
            } else {
                if (typeof opt === 'string') {
                    instance[opt].apply(instance, args);
                }
            }
        });
    }
}(jQuery));

$(document).load("./drawWrite.html", function (resp, status, xhr) {
    if (status == "success" && xhr.status == 200) {
        $("#drawPopup").drawPopup({ templete: resp });
        $("#popFull .inner.drawWrite").draggable({
            containment: "body",
            handle: ".top"
        });
    } else {
        console.log("something wrong happend!");
    }
});

// wait for font loaded
function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    var callbackCalled = false;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        if (!callbackCalled) {
                            callbackCalled = true;
                            callback();
                        }
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
};