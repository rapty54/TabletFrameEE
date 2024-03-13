var GameManager = {
    event: {
        isTouchDevice: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
        eventSelector: function(eventType) {
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
    if(FORTEACHERCD){
        factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
    }
}



(function() {

    var lineq = LineConnector.prototype;

    function LineConnector(leftItems, rightItems, option) {
        getScale();
        this.leftItems = leftItems;
        this.rightItems = rightItems;

        this.connections = [];
        this.lConnections = [];
        this.rConnections = [];
        this.ans = [];
        this.cnt = 0;
        this.answerLeng = 0;

        this.enabled = true;
        this.compledted = false;

        if(option != undefined){
            if(option._page != undefined){
                this._page = option._page;
            }
            this._id = option._id != undefined ? option._id : '';
            this.overlap = option.overlap != undefined ? option.overlap : false;
        }

        this.setHandler();
    }

    lineq.setHandler = function() {
        var self = this;

        var linequiz = self._page.find('.quizSec[data-quiz-name="quiz_line"], .quizSec[data-quiz-name="input_line"], .quizSec[data-quiz-name="work_line"]');

        linequiz.on('dragstart selectstart', function(e) {
            return false;
        });

        linequiz.unbind(moveEvent).on(moveEvent, function(e) {
            e.preventDefault();
            e.stopPropagation();
        });

        for (var i = 0; i < self.leftItems.length; i++) {
            var leftItem = self.leftItems[i];
            leftItem.ondragstart = function() {
                return false;
            };

            var mx, my;
            $(leftItem).unbind(downEvent).on(downEvent, function(e) {
                var $this = $(this);
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

                self.ans = [];
                var clickArea = $this.parents('.clickArea')
                var ans = clickArea.attr('data-line-ans').split('/')

                for(var i = 0; i < ans.length; i ++){
                    self.ans.push(ans[i].split('_')[1])
                }

                var curIndex = self.leftItems.indexOf(self.curItem);
                var item = $(this);
                this.ox = (item.offset().left - $('#wrap').offset().left) /factor + item.width()/2;
                this.oy = (item.offset().top- $('#wrap').offset().top) /factor + item.height()/2;
                var line = self.createLine(this.ox, this.oy, this.ox, this.oy, "#0f74aa", 5);
                line.setAttribute('li', curIndex);

                self.lines.push(line);
                self.svg.appendChild(line);

                $(linequiz).unbind(moveEvent).on(moveEvent, function(e) {
                    if (!self.pressed) return;
                    e.preventDefault();
                    e.stopPropagation();
                    getScale();
                    mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
                    my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
                    self.mouseX = (mx - $('#wrap').offset().left) / factor ;
                    self.mouseY = (my - $('#wrap').offset().top) / factor;
                    self.updateLine(line, self.mouseX, self.mouseY);
                });

                $(document).unbind(upEvent).on(upEvent, function(e) {
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

                    if (rightItem) {
                        var idx = $(rightItem).parent().index()
                        tx = ($(rightItem).offset().left - $('#wrap').offset().left) / factor + $(rightItem).width() / 2;
                        ty = ($(rightItem).offset().top - $('#wrap').offset().top) / factor + $(rightItem).height() / 2;
                        //중복선 제거

                        if(!self.overlap){
                            var l = self.lConnections.indexOf(self.rightItems.indexOf(rightItem));
                            if (l >= 0) {
                                var ll = $(rightItem).parents('.quizSec').find('#leftItem' + l)[0];
                                self.lConnections[l] = undefined;
                                self.updateLine(ll, self.leftItems[l].ox, self.leftItems[l].oy);
                                self.connections[l] = undefined; //0130
                            }
                        }
                        // //0211
                        var rightIndex = self.rightItems.indexOf(rightItem);
                        if (self.connections.indexOf(rightIndex) > -1) {
                            self.connections[self.connections.indexOf(rightIndex)] = undefined;
                        }
                        //
                        self.lConnections[curIndex] = self.rightItems.indexOf(rightItem); //연결 확인용
                        self.connections[curIndex] = self.rightItems.indexOf(rightItem); //정답확인용

                        //기존선 없애기
                        if(!self.overlap){
                            // var line = self.rLines[rightIndex];
                            self.updateLine(line, self.rightItems[rightIndex].ox, self.rightItems[rightIndex].oy);
                            self.rConnections[rightIndex] == undefined;
                        }
                        // effectAdo('click');
                        if(self.ans.length > 0){
                            var idx = $(rightItem).parents('.r_item').index()
                            var c = false;
                            for(var i = 0; i < self.ans.length; i ++){
                                if(self.ans[i] == idx) c = true;
                            }

                            if(c){
                                effectAdo('click')
                                self.updateLine(line, tx, ty);

                                if (self.onConnect) self.onConnect(self.curItem, rightItem);
                                if (linevalue.length > 0) linevalue.val(self.connections);

                                self.cnt ++;
                            }
                            else{
                                effectAdo('anschk_x')
                                tx = self.curItem.ox;
                                ty = self.curItem.oy;
                                self.lConnections[curIndex] = undefined;
                                self.connections[curIndex] = undefined;
                            }
                        }
                    } else {
                        tx = self.curItem.ox;
                        ty = self.curItem.oy;
                        self.lConnections[curIndex] = undefined;
                        self.connections[curIndex] = undefined;
                        self.ans = [];
                    }

                    // var line = self.lLines[curIndex];
                    self.updateLine(line, tx, ty);

                    if (self.onConnect) self.onConnect(self.curItem, rightItem);
                    if (linevalue.length > 0) linevalue.val(self.connections);


                    var ansleng = [];
                    self._page.find('.leftLine .clickArea').each(function(){
                        var $this = $(this)
                        var ans = $this.attr('data-line-ans').split('/')
                        ansleng.push(ans)
                    })

                    self.answerLeng = 0;
                    for(var i = 0; i < ansleng.length; i ++){
                        for(var j = 0; j < ansleng[i].length; j ++){
                            self.answerLeng ++;
                        }
                    }
                    console.log(self.answerLeng, self.cnt);

                    if(self.answerLeng === self.cnt){
                        self._page.find('.ansbtn').trigger('click')
                    }

                });

            });

        }
        //
        // for (var i = 0; i < self.rightItems.length; i++) {
        //     var rightItem = self.rightItems[i];
        //     rightItem.ondragstart = function() {
        //         return false;
        //     };
        //
        //     var mx, my;
        //
        //     $(rightItem).unbind(downEvent).on(downEvent, function(e) {
        //         getScale();
        //         var $this = $(this);
        //         mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
        //         my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
        //         self.mouseX = mx / factor;
        //         self.mouseY = my / factor;
        //         self.curItem = this;
        //         self.pressed = true;
        //         if (!self.svgCreated) {
        //             getScale();
        //             self.createSVG();
        //             self.svgCreated = true;
        //         }
        //
        //         var curIndex = self.rightItems.indexOf(self.curItem);
        //         r_start_rght = curIndex;
        //         if (self.connections.indexOf(curIndex) > -1) self.connections[self.connections.indexOf(curIndex)] = undefined; //0130
        //         for (var i in self.lConnections) {
        //             if (self.lConnections[i] == curIndex) {
        //                 var line = self.lLines[i];
        //                 self.updateLine(line, self.leftItems[i].ox, self.leftItems[i].oy);
        //                 self.lConnections[i] = undefined;
        //             }
        //         }
        //
        //         $(linequiz).unbind(moveEvent).on(moveEvent, function(e) {
        //             if (!self.pressed) return;
        //             e.preventDefault();
        //             e.stopPropagation();
        //             getScale();
        //             mx = isMobile ? e.originalEvent.touches[0].pageX : e.pageX;
        //             my = isMobile ? e.originalEvent.touches[0].pageY : e.pageY;
        //             self.mouseX = (mx - $('#wrap').offset().left) / factor ;
        //             self.mouseY = (my - $('#wrap').offset().top) / factor;
        //             var curIndex = self.rightItems.indexOf(self.curItem);
        //             var line = self.rLines[curIndex];
        //             self.updateLine(line, self.mouseX, self.mouseY);
        //         });
        //
        //
        //         $(document).unbind(upEvent).on(upEvent, function(e) {
        //             $(linequiz).off(moveEvent);
        //             $(document).off(upEvent);
        //             if (!self.pressed) return;
        //             getScale();
        //             self.pressed = false;
        //             var leftItem = self.rHitTest(self.mouseX, self.mouseY);
        //             var linevalue = $(self.svg).parents('.quizSec').find('textarea[data-type=linevalue]');
        //             var tx, ty;
        //             // 넘어가는선 방지
        //             var cline = true;
        //             if ($this.attr('data-cline')) {
        //                 if ($this.attr('data-cline').indexOf(self.leftItems.indexOf(leftItem)) >= 0) {
        //                     cline = true;
        //                 } else {
        //                     cline = false;
        //                 }
        //             }
        //             if (leftItem) {
        //                 tx = ($(leftItem).offset().left - $('#wrap').offset().left) / factor + $(leftItem).width() / 2;
        //                 ty = ($(leftItem).offset().top - $('#wrap').offset().top) / factor + $(leftItem).height() / 2;
        //
        //                 //중복선 제거
        //                 if(!self.overlap){
        //                     var r = self.rConnections.indexOf(self.leftItems.indexOf(leftItem));
        //                     if (r >= 0) {
        //                         var rr = $(leftItem).parents('.quizSec').find('#rightItem' + r)[0];
        //                         self.rConnections[r] = undefined;
        //                         self.updateLine(rr, self.rightItems[r].ox, self.rightItems[r].oy);
        //                     }
        //                 }
        //
        //                 //0122
        //                 if (self.leftItems.indexOf(leftItem) > -1) {
        //                     self.connections[self.leftItems.indexOf(leftItem)] = undefined;
        //                 }
        //                 //
        //
        //                 self.rConnections[curIndex] = self.leftItems.indexOf(leftItem);
        //                 self.connections[self.leftItems.indexOf(leftItem)] = curIndex //정답확인용
        //                 effectAdo('click');
        //
        //                 //기존선 없애기
        //                 if(!self.overlap){
        //                     var leftIndex = self.leftItems.indexOf(leftItem);
        //                     var line = self.lLines[leftIndex];
        //                     self.updateLine(line, self.leftItems[leftIndex].ox, self.leftItems[leftIndex].oy);
        //                     self.lConnections[leftIndex] = undefined;
        //                 }
        //             } else {
        //                 tx = self.curItem.ox;
        //                 ty = self.curItem.oy;
        //                 self.rConnections[curIndex] = undefined;
        //                 self.connections[self.connections.indexOf(curIndex)] = undefined;
        //             }
        //             var line = self.rLines[curIndex];
        //             self.updateLine(line, tx, ty);
        //             if (self.onConnect) self.onConnect(self.curItem, leftItem);
        //             if (linevalue.length > 0) linevalue.val(self.connections);
        //
        //         });
        //     });
        // }
    }

    lineq.reset = function() {
        if (!this.lines) return;
        var self = this;
        for (var i = 0; i < this.leftItems.length; i++) {
            var item = this.leftItems[i];
            var line = this.lLines[i];
            this.updateLine(line, item.ox, item.oy, "#0f74aa");
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            var item = this.rightItems[i];
            var line = this.rLines[i];
            this.updateLine(line, item.ox, item.oy, "#0f74aa");
        }

        $(self.svg).find('line').each(function() {
            if ($(this).parent()[0] == self.svg && $(this).attr('stroke') == '#c1272c') $(this).remove();
            if ($(this).parent()[0] == self.svg && $(this).attr('stroke') == '#0f74aa') $(this).remove();
        });


        self.cnt = 0;
        self.answerLeng = 0;

    }

    lineq.createSVG = function() {
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
            item.oy = ($(item).offset().top  - $('#wrap').offset().top) / factor + $(item).height() / 2;
            var line = this.createLine(item.ox, item.oy, item.ox, item.oy, "#0f74aa", 5, 'leftItem' + i);
            this.lines.push(line);
            this.lLines.push(line);
            this.svg.appendChild(line);
        }

        for (var i = 0; i < this.rightItems.length; i++) {
            var item = this.rightItems[i];
            item.ox = ($(item).offset().left - $('#wrap').offset().left) / factor + $(item).width() / 2;
            item.oy = ($(item).offset().top - $('#wrap').offset().top) / factor + $(item).height() / 2;
            var line = this.createLine(item.ox, item.oy, item.ox, item.oy, "#0f74aa", 5, 'rightItem' + i);
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

    lineq.createLine = function(x1, y1, x2, y2, color, w, id) {
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

    lineq.updateLine = function(line, tx, ty, color) {
//        console.log(tx,ty)
        line.setAttribute('x2', tx);
        line.setAttribute('y2', ty);

        if (color != undefined) {
            line.setAttribute("stroke", color);
        }
    }

    lineq.lHitTest = function(x, y) {

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

    lineq.rHitTest = function(x, y) {

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

    lineq.enable = function() {
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

    lineq.disable = function() {
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

    lineq.singleEnable = function() {
        this.enabled = true;

        $(this.leftItems[data_line_ans_L]).css({
            pointerEvents: "all"
        });

        $(this.rightItems[data_line_ans_R]).css({
            pointerEvents: "all"
        });
    }

    lineq.singleDisable = function() {
        this.enabled = false;

        $(this.leftItems[data_line_ans_L]).css({
            pointerEvents: "none"
        });

        $(this.rightItems[data_line_ans_R]).css({
            pointerEvents: "none"
        });
    }

    lineq.com = function() {
        var cl = 0;
        for (var i in this.lines) {
            if (this.lines[i].x1.baseVal.value !== this.lines[i].x2.baseVal.value || this.lines[i].y1.baseVal.value !== this.lines[i].y2.baseVal.value) {
                cl++
            }
        }
        return cl;
    }

    // [{targetIndex:index, lineColor:"color"}, ....]
    lineq.drawLines = function(settings) {
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

            var line = this.createLine(lx, ly, rx, ry, setting.color, 5, setting.id);
            this.svg.appendChild(line);
        }
    }

    lineq.singleRemov = function() {
        var self = this;
        var otherUserLine;

        self._page.find('.leftLine .clickArea').each(function(){
            var $this = $(this)
            var tsAtt = $this.attr('data-user-ans')
            if(tsAtt){
                tsAtt = tsAtt.split('_')

                if(tsAtt[1] == data_line_ans_R){
                    otherUserLine = tsAtt[0]
                }else if(tsAtt[0] == data_line_ans_L){
                    otherUserLine = tsAtt[1]
                }
            }
        })

        self._page.find('line').each(function(i) {
            var $this = $(this)
            var atID = $(this).attr('id');
            if($(this).parent()[0] == self.svg){
                if(atID == ('leftItem' + data_user_ans_L) || atID == ('leftItem' + data_line_ans_L) || atID == ('rightItem' + data_user_ans_R) || atID == ('rightItem' + data_line_ans_R)){
                    //기존선 없애기
                    var line = self.rLines[data_line_ans_R];
                    self.updateLine(line, self.rightItems[data_line_ans_R].ox, self.rightItems[data_line_ans_R].oy);
                    self.rConnections[data_line_ans_R] = undefined;
                    var line = self.lLines[data_line_ans_L];
                    self.updateLine(line, self.leftItems[data_line_ans_L].ox, self.leftItems[data_line_ans_L].oy);
                    self.lConnections[data_line_ans_L] = undefined;
                }
                if(otherUserLine && atID == ('leftItem' + otherUserLine)){
                    var line = self.lLines[otherUserLine];
                    self.updateLine(line, self.leftItems[otherUserLine].ox, self.leftItems[otherUserLine].oy);
                    self.lConnections[otherUserLine] = undefined;
                }

                if(otherUserLine && atID == ('rightItem' + otherUserLine)){
                    var line = self.rLines[otherUserLine];
                    self.updateLine(line, self.rightItems[otherUserLine].ox, self.rightItems[otherUserLine].oy);
                    self.rConnections[otherUserLine] = undefined;
                }

            }
        });
    }

    lineq.singleRedRemov = function() {
        var self = this;
        self._page.find('line').each(function() {
            var $this = $(this)
            if ($(this).attr('id') == ('correct' + removeIdx)) $(this).remove();
        });
    }

    window.LineConnector = LineConnector;
})();
