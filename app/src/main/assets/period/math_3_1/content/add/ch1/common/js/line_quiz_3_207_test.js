var GameManager = {
    event: {
        isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
        eventSelector: function (eventType) {
            var selectedEvent;
            switch (eventType) {
                case 'eventDown':
                    selectedEvent = this.isTouchDevice ? 'touchstart' : 'mousedown';
                    break;
                case 'eventMove':
                    selectedEvent = this.isTouchDevice ? 'touchmove' : 'mousemove';
                    break;
                case 'eventUp':
                    selectedEvent = this.isTouchDevice ? 'touchend' : 'mouseup';
                    break;
                case 'eventOut':
                    selectedEvent = this.isTouchDevice ? 'touchleave' : 'mouseout';
                    break;
            }
            return selectedEvent;
        }
    }
};

var factor = 1;
var isMobile;
var lineCount = 0;

function getScale() {

    if (/Android|webOS|iPhone|iPad|Mac|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;

        downEvent = "touchstart";
        moveEvent = "touchmove";
        upEvent = "touchend";
        clickEvent = "tap";
    } else {
        isMobile = false;

        downEvent = "mousedown";
        moveEvent = "mousemove";
        upEvent = "mouseup";
        clickEvent = "click"
    }
    var wrap = document.querySelector('#wrap');

    GameManager.event.clientWidth = document.body.clientWidth;
    GameManager.event.clientHeight = document.body.clientHeight;

    GameManager.event.wrapWidth = wrap.clientWidth;
    GameManager.event.wrapHeight = wrap.clientHeight;

    GameManager.event.zoomVertical = (GameManager.event.clientHeight / GameManager.event.wrapHeight) * 1.0;
    GameManager.event.zoomHorizontal = (GameManager.event.clientWidth / GameManager.event.wrapWidth) * 1.0;
    // if (parent.ZOOMVALUE == undefined) {
    //     parent.ZOOMVALUE = 1;
    // }
    // if (GameManager.event.clientHeight < GameManager.event.clientWidth) {
    //     factor = GameManager.event.zoomRate = parent.ZOOMVALUE;
    // } else {
    //     factor = GameManager.event.zoomRate = GameManager.event.zoomHorizontal;
    // }

    if(FORTEACHERCD){
        factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
    }
}



(function () {

    var lineq = LineConnector.prototype;

    function LineConnector(leftItems, rightItems) {
        getScale();
        this.leftItems = leftItems;
        this.rightItems = rightItems;

        this.connections = [];
        this.lConnections = [];
        this.rConnections = [];

        this.enabled = true;
        this.compledted = false;

        this.lineArray = [];


        this.setHandler();
    }

    lineq.setHandler = function () {
        var self = this;

        var linequiz = $('.quizSec[data-quiz-name="quiz_line"], .quizSec[data-quiz-name="input_line"], .quizSec[data-quiz-name="work_line"]');

        linequiz.on('dragstart selectstart', function (e) {
            return false;
        });

        linequiz.unbind(moveEvent).on(moveEvent, function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        for (var i = 0; i < self.leftItems.length; i++) {
            var leftItem = self.leftItems[i];
            leftItem.ondragstart = function () {
                return false;
            };

            var mx, my;
            $(leftItem).unbind(downEvent).on(downEvent, function (e) {
                var $this = $(this);
                var idx = $this.parent('.ansArea').index()
                // console.log(idx);

                getScale();
                mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
                my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
                self.mouseX = mx / factor;
                self.mouseY = my / factor;
                self.curItem = this;
                self.pressed = true;
                if (!self.svgCreated) {
                    self.createSVG();
                    self.svgCreated = true;
                }

                var curIndex = self.leftItems.indexOf(self.curItem);
                var lineAns = $(this).parent().attr('data-line-ans');
                var dataAns = lineAns.split('_');
                curAns = dataAns[1];
                self.connections[curIndex] = undefined; // 0130
                for (var i in self.rConnections) {
                    if (self.rConnections[i] == curIndex) {
                        var line = self.rLines[i];
                        self.updateLine(line, self.rightItems[i].ox, self.rightItems[i].oy);
                        self.rConnections[i] == undefined;
                    }
                }

                l_start_lft = curIndex;
                $(linequiz).unbind(moveEvent).on(moveEvent, function (e) {
                    if (!self.pressed) return;
                    e.preventDefault();
                    e.stopPropagation();
                    getScale();
                    mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
                    my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
                    self.mouseX = (mx - $('#wrap').offset().left) / factor;
                    self.mouseY = (my - $('#wrap').offset().top) / factor;
                    var line = self.lLines[curIndex];
                    self.updateLine(line, self.mouseX, self.mouseY);
                });

                $(document).unbind(upEvent).on(upEvent, function (e) {
                    $(linequiz).off(moveEvent);
                    $(document).off(upEvent);
                    if (!self.pressed) return;
                    self.pressed = false;
                    getScale();
                    var rightItem = self.lHitTest(self.mouseX, self.mouseY);
                    var linevalue = $(self.svg).parents('.quizSec').find('textarea[data-type=linevalue]');

                    var tx, ty;
                    var cline = true;

                    if ($this.attr('data-cline')) {
                        if ($this.attr('data-cline').indexOf(self.rightItems.indexOf(rightItem)) >= 0) {
                            cline = true;
                        } else {
                            cline = false;
                        }
                    }

                    if (self.lineArray.indexOf(idx) > -1) {
                        var tsIdx = self.lineArray.indexOf(idx)
                        if (self.lineArray.indexOf(tsIdx) > -1) self.lineArray.splice(tsIdx, 1)


                    }
                    // $('.ansCheck').show()
                    if (rightItem) {
                        var ans = $this.parent().attr('data-line-ans').split('_');
                        var line = self.lLines[curIndex];
                        // if (Number(ans[1]) !== $(rightItem).parent().index()) { // 정오답체크
                        //     effectAdo('anschk_x');
                        //     self.updateLine(line, self.leftItems[curIndex].ox, self.leftItems[curIndex].oy); // 중복선 제거 (좌표값 원래대로 돌리기.)
                        //     return false;
                        // }
                        tx = ($(rightItem).offset().left - $('#wrap').offset().left) / factor + $(rightItem).width() / 2;
                        ty = ($(rightItem).offset().top - $('#wrap').offset().top) / factor + $(rightItem).height() / 2;
                        //중복선 제거
                        var l = self.lConnections.indexOf(self.rightItems.indexOf(rightItem));
                        if (l >= 0) {
                            var ll = $(rightItem).parents('.quizSec').find('#leftItem' + l)[0];
                            self.lConnections[l] = undefined;
                            self.updateLine(ll, self.leftItems[l].ox, self.leftItems[l].oy);
                            self.connections[l] = undefined; //0130
                        }
                        // //0211
                        var rightIndex = self.rightItems.indexOf(rightItem);
                        if (self.connections.indexOf(rightIndex) > -1) {
                            self.connections[self.connections.indexOf(rightIndex)] = undefined;
                        }
                        $('.area2 .dot').css('z-index', '0');
                        //
                        self.lConnections[curIndex] = self.rightItems.indexOf(rightItem); //연결 확인용
                        self.connections[curIndex] = self.rightItems.indexOf(rightItem); //정답확인용

                        //기존선 없애기
                        var line = self.rLines[rightIndex];
                        self.updateLine(line, self.rightItems[rightIndex].ox, self.rightItems[rightIndex].oy);
                        self.rConnections[rightIndex] == undefined;
                        effectAdo('click');

                        if (self.lineArray.indexOf(idx) < 0) {
                            self.lineArray.push(idx)
                        }
                    } else {
                        $('.area2 .dot').css('z-index', '1');
                        tx = self.curItem.ox;
                        ty = self.curItem.oy;
                        self.lConnections[curIndex] = undefined;
                        self.connections[curIndex] = undefined;
                    }

                    var line = self.lLines[curIndex];
                    self.updateLine(line, tx, ty);
                    if (self.onConnect) self.onConnect(self.curItem, rightItem);
                    if (linevalue.length > 0) linevalue.val(self.connections);
                    var cur = $('.setContent li.on').index();
                    var num = $('.setContent li').length;
                    if (self.lineArray.length == 2) {
                        // effectAdo('anschk_o');
                        console.log('com');
                        $('.clickPage > .ansbtn').addClass('re')

                    } else {

                        console.log(self.lineArray.length, linequiz.find('.ansArea').length);
                        $('.clickPage > .ansbtn').removeClass('re')
                    }
                });
            });

        }

        for (var i = 0; i < self.rightItems.length; i++) {
            var rightItem = self.rightItems[i];
            rightItem.ondragstart = function () {
                return false;
            };

            var mx, my;

            $(rightItem).unbind(downEvent).on(downEvent, function (e) {
                getScale();
                var $this = $(this);
                var idx;
                var ansArea = $this.parents('.quizSec').find('.ansArea')

                ansArea.each(function () {
                    var ts = $(this)
                    var lineAns = ts.attr('data-line-ans').split('_')[1]

                    if (lineAns == $this.parent('.r_item').index()) {
                        idx = Number(ts.attr('data-line-ans').split('_')[0])
                        return false;
                    }
                })

                mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
                my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
                self.mouseX = mx / factor;
                self.mouseY = my / factor;
                self.curItem = this;
                self.pressed = true;
                if (!self.svgCreated) {
                    getScale();
                    self.createSVG();
                    self.svgCreated = true;
                }

                var curIndex = self.rightItems.indexOf(self.curItem);
                r_start_rght = curIndex;
                if (self.connections.indexOf(curIndex) > -1) self.connections[self.connections.indexOf(curIndex)] = undefined; //0130
                for (var i in self.lConnections) {
                    if (self.lConnections[i] == curIndex) {
                        var line = self.lLines[i];
                        self.updateLine(line, self.leftItems[i].ox, self.leftItems[i].oy);
                        self.lConnections[i] = undefined;
                    }
                }

                $(linequiz).unbind(moveEvent).on(moveEvent, function (e) {
                    if (!self.pressed) return;
                    e.preventDefault();
                    e.stopPropagation();
                    getScale();
                    mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
                    my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
                    self.mouseX = (mx - $('#wrap').offset().left) / factor;
                    self.mouseY = (my - $('#wrap').offset().top) / factor;
                    var curIndex = self.rightItems.indexOf(self.curItem);
                    var line = self.rLines[curIndex];
                    self.updateLine(line, self.mouseX, self.mouseY);
                });


                $(document).unbind(upEvent).on(upEvent, function (e) {
                    $(linequiz).off(moveEvent);
                    $(document).off(upEvent);
                    if (!self.pressed) return;
                    getScale();
                    self.pressed = false;
                    var leftItem = self.rHitTest(self.mouseX, self.mouseY);
                    var linevalue = $(self.svg).parents('.quizSec').find('textarea[data-type=linevalue]');
                    var tx, ty;
                    // 넘어가는선 방지
                    var cline = true;
                    if ($this.attr('data-cline')) {
                        if ($this.attr('data-cline').indexOf(self.leftItems.indexOf(leftItem)) >= 0) {
                            cline = true;
                        } else {
                            cline = false;
                        }
                    }

                    if (self.lineArray.indexOf(idx) > -1) {
                        var tsIdx = self.lineArray.indexOf(idx)
                        if (self.lineArray.indexOf(tsIdx) > -1) self.lineArray.splice(tsIdx, 1)
                    }

                    if (leftItem) {
                        var ans = $(leftItem).parent().attr('data-line-ans').split('_');
                        var line = self.rLines[curIndex];
                        // if (Number(ans[1]) !== curIndex) { // 정오답체크
                        //     effectAdo('anschk_x');
                        //     self.updateLine(line, self.rightItems[curIndex].ox, self.rightItems[curIndex].oy);
                        //     return false;
                        // }
                        effectAdo('anschk_x');
                        $('.area2 .dot').css('z-index', '1');
                        self.updateLine(line, self.rightItems[curIndex].ox, self.rightItems[curIndex].oy);
                        return false;
                        effectAdo('anschk_x');
                        self.updateLine(line, self.rightItems[curIndex].ox, self.rightItems[curIndex].oy);
                        return false;
                        tx = ($(leftItem).offset().left - $('#wrap').offset().left) / factor + $(leftItem).width() / 2;
                        ty = ($(leftItem).offset().top - $('#wrap').offset().top) / factor + $(leftItem).height() / 2;

                        //중복선 제거
                        var r = self.rConnections.indexOf(self.leftItems.indexOf(leftItem));
                        if (r >= 0) {
                            var rr = $(leftItem).parents('.quizSec').find('#rightItem' + r)[0];
                            self.rConnections[r] = undefined;
                            self.updateLine(rr, self.rightItems[r].ox, self.rightItems[r].oy);
                        }

                        //0122
                        if (self.leftItems.indexOf(leftItem) > -1) {
                            self.connections[self.leftItems.indexOf(leftItem)] = undefined;
                        }
                        //
                        self.rConnections[curIndex] = self.leftItems.indexOf(leftItem);
                        self.connections[self.leftItems.indexOf(leftItem)] = curIndex //정답확인용
                        //기존선 없애기
                        var leftIndex = self.leftItems.indexOf(leftItem);
                        var line = self.lLines[leftIndex];
                        self.updateLine(line, self.leftItems[leftIndex].ox, self.leftItems[leftIndex].oy);
                        self.lConnections[leftIndex] = undefined;
                        effectAdo('click');

                        if (self.lineArray.indexOf(idx) < 0) {
                            self.lineArray.push(idx)
                        }
                    } else {
                        tx = self.curItem.ox;
                        ty = self.curItem.oy;
                        self.rConnections[curIndex] = undefined;
                        self.connections[self.connections.indexOf(curIndex)] = undefined;
                    }
                    var line = self.rLines[curIndex];
                    self.updateLine(line, tx, ty);
                    if (self.onConnect) self.onConnect(self.curItem, leftItem);
                    if (linevalue.length > 0) linevalue.val(self.connections);

                    if (self.lineArray.length == linequiz.find('.ansArea').length) {
                        console.log('com');
                        linequiz.parents('.contents').find('.ansbtn').addClass('re')
                    } else {
                        effectAdo('anschk_x');
                        $('.area2 .dot').css('z-index', '1');
                        console.log('x');
                        linequiz.parents('.contents').find('.ansbtn').removeClass('re')
                    }
                });
            });
        }
    }

    lineq.reset = function () {
        if (!this.lines) return;
        var self = this;
        for (var i = 0; i < this.leftItems.length; i++) {
            var item = this.leftItems[i];
            var line = this.lLines[i];
            this.updateLine(line, item.ox, item.oy, "#c1262d");
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            var item = this.rightItems[i];
            var line = this.rLines[i];
            this.updateLine(line, item.ox, item.oy, "#c1262d");
        }

        $(self.svg).find('line').each(function () {
            if ($(this).parent()[0] == self.svg && $(this).attr('stroke') == '#c1272d') $(this).remove();
        });
        self.lineArray = []

    }

    lineq.createSVG = function () {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        $(this.svg).attr("xmlns", "http://www.w3.org/2000/svg");
        $(this.svg).attr("width", 1920);
        $(this.svg).attr("height", 1080);
        $(this.svg).css("position", "absolute");
        $(this.svg).css("pointer-events", "none");

        this.lines = [];
        this.lLines = [];
        this.rLines = [];
        for (var i = 0; i < this.leftItems.length; i++) {
            var item = this.leftItems[i];
            item.ox = ($(item).offset().left - $('#wrap').offset().left) / factor + $(item).width() / 2;
            item.oy = ($(item).offset().top - $('#wrap').offset().top) / factor + $(item).height() / 2;
            var line = this.createLine(item.ox, item.oy, item.ox, item.oy, "#c1262d", 10, 'leftItem' + i);
            this.lines.push(line);
            this.lLines.push(line);
            this.svg.appendChild(line);
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            var item = this.rightItems[i];
            item.ox = ($(item).offset().left - $('#wrap').offset().left) / factor + $(item).width() / 2;
            item.oy = ($(item).offset().top - $('#wrap').offset().top) / factor + $(item).height() / 2;
            var line = this.createLine(item.ox, item.oy, item.ox, item.oy, "#c1262d", 10, 'rightItem' + i);
            this.lines.push(line);
            this.rLines.push(line);
            this.svg.appendChild(line);
        }

        $(this.svg).insertBefore(this.leftItems[0]);
        var offset = $(this.svg).parent().position();

        getScale();
        $(this.svg).css({
            left: -offset.left / factor,
            top: -offset.top / factor
        });
    }

    lineq.createLine = function (x1, y1, x2, y2, color, w, id) {
        var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', w);
        line.setAttribute('id', id);

        return line;
    }

    lineq.updateLine = function (line, tx, ty, color) {
        line.setAttribute('x2', tx);
        line.setAttribute('y2', ty);
        if (color != undefined) {
            line.setAttribute("stroke", color);
        }
    }
    lineq.lHitTest = function (x, y) {
        for (var i = 0; i < this.rightItems.length; i++) {
            var item = this.rightItems[i];
            var rect = item.getBoundingClientRect();
            var top = rect.top - $('#wrap').offset().top;
            var bottom = rect.bottom - $('#wrap').offset().top;
            var left = rect.left - $('#wrap').offset().left;
            var right = rect.right - $('#wrap').offset().left;
            if (x > left / factor && x < right / factor && y > top / factor && y < bottom / factor) {
                return item;
            }

        }


        return null;
    }

    lineq.rHitTest = function (x, y) {

        for (var i = 0; i < this.leftItems.length; i++) {
            var item = this.leftItems[i];
            var rect = item.getBoundingClientRect();

            var top = rect.top - $('#wrap').offset().top;
            var bottom = rect.bottom - $('#wrap').offset().top;
            var left = rect.left - $('#wrap').offset().left;
            var right = rect.right - $('#wrap').offset().left;

            if (x > left / factor && x < right / factor && y > top / factor && y < bottom / factor) {
                return item;
            }
        }

        return null;
    }

    lineq.enable = function () {
        this.enabled = true;

        for (var i = 0; i < this.leftItems.length; i++) {
            $(this.leftItems[i]).css({
                pointerEvents: "all"
            });
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            $(this.rightItems[i]).css({
                pointerEvents: "all"
            });
        }

    }

    lineq.disable = function () {
        this.enabled = false;

        for (var i = 0; i < this.leftItems.length; i++) {
            $(this.leftItems[i]).css({
                pointerEvents: "none"
            });
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            $(this.rightItems[i]).css({
                pointerEvents: "none"
            });
        }

    }

    lineq.singleEnable = function () {
        this.enabled = true;

        $(this.leftItems[data_line_ans_L]).css({
            pointerEvents: "all"
        });

        $(this.rightItems[data_line_ans_R]).css({
            pointerEvents: "all"
        });
    }

    lineq.singleDisable = function () {
        this.enabled = false;

        $(this.leftItems[data_line_ans_L]).css({
            pointerEvents: "none"
        });

        $(this.rightItems[data_line_ans_R]).css({
            pointerEvents: "none"
        });
    }

    lineq.com = function () {
        var cl = 0;
        for (var i in this.lines) {
            if (this.lines[i].x1.baseVal.value !== this.lines[i].x2.baseVal.value || this.lines[i].y1.baseVal.value !== this.lines[i].y2.baseVal.value) {
                cl++
            }
        }
        return cl;
    }

    // [{targetIndex:index, lineColor:"color"}, ....]
    lineq.drawLines = function (settings) {
        getScale();
        // if (!self.svgCreated) {
        //     this.createSVG();
        //     self.svgCreated = true;
        // }

        for (var i = 0; i < settings.length; i++) {

            var setting = settings[i];
            var leftItem = this.leftItems[setting.LIndex];
            var rightItem = this.rightItems[setting.RIndex];

            var lx = ($(leftItem).offset().left - $('#wrap').offset().left) / factor + $(leftItem).width() / 2;
            var ly = ($(leftItem).offset().top - $('#wrap').offset().top) / factor + $(leftItem).height() / 2;
            var rx = ($(rightItem).offset().left - $('#wrap').offset().left) / factor + $(rightItem).width() / 2;
            var ry = ($(rightItem).offset().top - $('#wrap').offset().top) / factor + $(rightItem).height() / 2;

            var line = this.createLine(lx, ly, rx, ry, setting.color, 10, setting.id);
            this.svg.appendChild(line);
        }
    }

    lineq.singleRemov = function () {
        var self = this;
        var otherUserLine;

        $('.leftLine .clickArea').each(function () {
            var $this = $(this)
            var tsAtt = $this.attr('data-user-ans')
            if (tsAtt) {
                tsAtt = tsAtt.split('_')

                if (tsAtt[1] == data_line_ans_R) {
                    otherUserLine = tsAtt[0]
                } else if (tsAtt[0] == data_line_ans_L) {
                    otherUserLine = tsAtt[1]
                }
            }
        })

        $('line').each(function (i) {
            var $this = $(this)
            var atID = $(this).attr('id');
            if ($(this).parent()[0] == self.svg) {
                if (atID == ('leftItem' + data_user_ans_L) || atID == ('leftItem' + data_line_ans_L) || atID == ('rightItem' + data_user_ans_R) || atID == ('rightItem' + data_line_ans_R)) {
                    //기존선 없애기
                    var line = self.rLines[data_line_ans_R];
                    self.updateLine(line, self.rightItems[data_line_ans_R].ox, self.rightItems[data_line_ans_R].oy);
                    self.rConnections[data_line_ans_R] = undefined;
                    var line = self.lLines[data_line_ans_L];
                    self.updateLine(line, self.leftItems[data_line_ans_L].ox, self.leftItems[data_line_ans_L].oy);
                    self.lConnections[data_line_ans_L] = undefined;
                }
                if (otherUserLine && atID == ('leftItem' + otherUserLine)) {
                    var line = self.lLines[otherUserLine];
                    self.updateLine(line, self.leftItems[otherUserLine].ox, self.leftItems[otherUserLine].oy);
                    self.lConnections[otherUserLine] = undefined;
                }

                if (otherUserLine && atID == ('rightItem' + otherUserLine)) {
                    var line = self.rLines[otherUserLine];
                    self.updateLine(line, self.rightItems[otherUserLine].ox, self.rightItems[otherUserLine].oy);
                    self.rConnections[otherUserLine] = undefined;
                }

            }
        });
    }

    lineq.singleRedRemov = function () {
        var self = this;
        $('line').each(function () {
            var $this = $(this)
            if ($(this).attr('id') == ('correct' + removeIdx)) $(this).remove();
        });
    }

    window.LineConnector = LineConnector;
})();