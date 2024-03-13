// 확장자를 포함한 html파일명 추출
function getFileName() {
    var ksUrl = window.location.href;
    ksUrl = ksUrl.substring(ksUrl.lastIndexOf('/') + 1);
    return (ksUrl.match(/[^.]+(\.[^?#]+)?/) || [])[0].split('?')[0];
}

// 2022-01-10 15:55:27 - JGY
// 가이드용 밑그림
// <div id="wrap"/> 맨 밑에 <div class="tt blk"/>가 있을 경우 테스터 동작
(function () {
    $(function () {
        if ($('.tt').length === 0) {
            return false;
        }
        var ksPageNo = getFileName().split('.')[0].slice(-2);
        $('.tt').css('background', 'url(inc/images/' + ksPageNo + '/tt' + '1' + '.png)');
        $(document).on('click', '.setContent li', function () {
            try {
                $('.tt').css('background', 'url(inc/images/' + ksPageNo + '/tt' + ($(this).index() + 1) + '.png)');
            } catch (error) {
            }
        });
    });
})();


// 2021-03-26 - PGE
// 팝업창 만들기(wrap, 팝업버튼index, 마스크유무)
// 팝업버튼 클릭했을 때 효과음, 클릭이벤트 막는 것 등은 따로 처리해야 함.
function makePop(wrap, idx, mask) {
    var html = '<div class="solpop solpop' + (idx + 1) + ' ' + (idx) + '" data-idx="' + idx + '"><div class="btnClose"></div></div>';
    if (mask) {
        wrap.append(html);
        makeMask();

    } else {
        wrap.append(html);
    }
}

// 팝업창닫기(팝업닫기버튼)
function closePop(el, bStopOther) {
    effectAdo('click', bStopOther);
    el.parent().remove();
    removeMask();
}

(function () {
    // 클릭요소가 1개이어도 확인하기/다시하기 버튼이 보이도록
    var clickContents2 = function clickContents2(items, wrap, set) {

        var p_parent = clickContents.apply(this, arguments);

        var self = this;

        this.init = function () {
            this.openItemNum = 0;

            if (this.wrap.find('.clickItem').length > 0) {
                this.wrap.find('.clickContent').remove();
            }

            /* if (self.clickItems > 1) { */
            this.makeWrap();
            this.makeItem();
            this.makeBtn();

            this.items.on('click', function (e) {
                e.stopPropagation();
                if ($(this).css('opacity') == '0') {
                    $(this).css('opacity', '1');
                    self.openItemNum--;
                } else {
                    $(this).css('opacity', '0');
                    self.openItemNum++;
                }

                effectAdo('click');
                if (self.openItemNum == self.clickItems) {
                    self.ansbtn.addClass('re');
                } else {
                    self.ansbtn.removeClass('re');
                }
            });

            this.ansbtn.on('click', function () {
                effectAdo('click');
                if ($(this).hasClass('re')) {
                    self.items.css('opacity', '1');
                    self.openItemNum = 0;
                    self.ansbtn.removeClass('re');
                    if (self.itemwrap.find('.showItem').length > 0) {
                        self.itemwrap.find('.showItem').hide();
                    }
                } else {
                    self.items.css('opacity', '0');
                    self.ansbtn.addClass('re');
                    self.openItemNum = self.clickItems;
                    if (self.itemwrap.find('.showItem').length > 0) {
                        self.itemwrap.find('.showItem').show();
                    }
                }
            });
            /*  } else {
                this.makeWrap();
                this.makeItem();

                this.items.on('click', function (e) {
                    e.stopPropagation();
                    effectAdo('click');
                    if ($(this).css('opacity') == '0') {
                        $(this).css('opacity', '1');
                        self.openItemNum--;
                    } else {
                        $(this).css('opacity', '0');
                        self.openItemNum++;
                    }
                });
            } */

        };

    };

    clickContents2.prototype = Object.create(clickContents.prototype);
    clickContents2.prototype.constructor = clickContents2;
    window.clickContents2 = clickContents2;
})();

(function () {
    // 한 page에 한 개 이상의 '팝업(풀)' 요소가 가능하도록
    var pageingContents2 = function pageingContents2(wrap) {

        var p_parent = pageingContents.apply(this, arguments);

        var self = this;

        /* this.setPopUpIdx = function (_btn, _idx) {
            _btn.attr('data-idx', parseInt(_idx, 10));
        }; */

        this.pageMove = function (page, bAdo) {
            self.currentPage = page;
            self.wrap.find('.page').hide();
            self.wrap.find('.page').eq(page).show();
            self.navi.find('.pageing .dot').removeClass('on');
            self.navi.find('.pageing .dot').eq(page).addClass('on');


            if (bAdo === false) {
            } else {
                effectAdo('click');
            }


            self.wrap.find('.dis').removeClass('dis');
            if (page == 0) {
                self.prev.addClass('dis');
            } else if (page + 1 == self.pageNum) {
                self.next.addClass('dis');
            }
        };


        this.setPopUp = function (_cont, _tN) {
            //_cont.find('.btn[data-num="' + _tN + '"]').off().on('click', function () {
            _cont.find('.btn[data-idx="' + _tN + '"]').off().on('click', function () {
                //var myN = _tN == undefined ? 0 : _tN;
                var myN;
                if ($(this).attr('data-idx') === undefined) {
                    myN = _tN == undefined ? 0 : _tN;
                } else {
                    myN = parseInt($(this).attr('data-idx'));
                }
                makeMask();
                effectAdo('click');
                if ($('.pop' + myN).length > 0) {
                    $('.pop' + myN).show();
                } else {
                    $('.pop').show();
                }

                var p = $(this).attr("data-num");
                if (p == undefined || p == "") {
                    p = 0;
                }
                self.currentPage = parseInt(p, 10);
                self.pageMove(self.currentPage);
            });

            $('.pop .close').off().on('click', function () {
                removeMask();
                effectAdo('click');
                $(this).parent().hide();
            });
        };
    };

    pageingContents2.prototype = Object.create(pageingContents.prototype);
    pageingContents2.prototype.constructor = pageingContents2;
    window.pageingContents2 = pageingContents2;
})();


/*
(function () {
    lineQuizContents2 = function lineQuizContents2(wrap, _lc, _rc, _ans, option) {

        var p_parent = lineQuizContents.apply(this, arguments);

        var self = this;

        this.lineQuiz = function () {
            if (nlc != undefined) {
                self.wrap.find('.ansbtn').removeClass('re');
                nlc.enable();
                nlc.reset();
            }

            var lineCount = 0;
            var l_Quiz = self.wrap.find('.quizSec[data-quiz-name="quiz_line"]');
            var line_leng = l_Quiz.attr('data-line-leng');
            if (l_Quiz.length > 0) {
                var leftDots = l_Quiz.find('.leftLine .dot').get();
                var rightDots = l_Quiz.find('.rightLine .dot').get();
                if (!line_leng) {
                    nlc = new LineConnector(leftDots, rightDots, self.option);
                    if (!nlc.svgCreated) {
                        getScale();
                        nlc.createSVG();
                        nlc.svgCreated = true;
                    }
                }
            }

            self.wrap.find('.ansbtn').off().on('click', function () {
                var quizCom = $(this).hasClass('re');
                if (quizCom) {
                    effectAdo('click');
                    $(this).removeClass('re');

                    nlc.enable();
                    nlc.reset();
                } else {
                    effectAdo('anschk_o');
                    $(this).addClass('re');

                    var quizSec = self.wrap.find('.quizSec');
                    var lineWrap = quizSec.find('.leftLine');
                    var chkBox = lineWrap.find('.clickArea');

                    // lineQuiz.find('.mask').show();
                    quizSec.addClass('com');
                    nlc.disable();
                    nlc.reset();
                    for (i = 0; i < chkBox.length; i++) {
                        line_ans = chkBox[i].getAttribute('data-line-ans');
                        line_ans = line_ans.split('_');
                        nlc.drawLines([
                            { LIndex: line_ans[0], RIndex: line_ans[1], color: "#ff3300", id: "correct" + i }
                        ]);
                    }
                }
            });
        }
    };
    lineQuizContents2.prototype = Object.create(lineQuizContents.prototype);
    lineQuizContents2.prototype.constructor = lineQuizContents2;
    window.lineQuizContents2 = lineQuizContents2;
})();
*/