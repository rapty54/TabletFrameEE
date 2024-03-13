$(document).ready(function () {
    //유형분류1 인덱스 값 변수
    let tabIdx2 = 0;

    //유형분류2 높이 값 변수
    let tabH2 = 0;

    // 팝업 변수
    var reset = false;
    var data = null;

    var getList = function (first) {
        var code;
        var $tabConts = null;
        var $li = $('#tab-educourse li.on');
        var index = $li.index();
        $tabConts = $('#tab-contents').find('.tab_conts:eq(' + index + ')');
        // html tag의 data를 활용하여 각 페이지 정보를 관리
        data = $li.find('a').data();
        code = data.code;
        var url;
        var _parameter;
        // 초기화 인경우
        if (reset) {
            data.page = 1;
        }

        // 전체 탭인 경우 유형분류2 리스트 만들기
        var type2List = [];
        if (code === 0) {
            $li.siblings('li').each(function () {
                type2List.push($(this).find('a').data('code'));
            });
        } else {
            type2List.push(code);
        }
        code = '1110002';

        // 평가 자료
        url = '/textbook/list/appraisal';
        _parameter = {
            codelistId: currentClassInfo.textbookCd,
            class1Cd: currentClassInfo.class1Cd,
            educourseId: parameter.educourseId,
            gubunCd: currentClassInfo.gubunCd,
            type1: code,
            type2List: type2List,
            page: data.page,
            periodId: parameter.periodId,
            contGroup: $li.find("a").data("code"),
        };

        if ($tabConts.find('div.accoItem.on').hasClass('loaded')) {
            data.load = true;
            return; // 이미 데이터가 로드된 상태이면 불러오지 않음
        }

        Ajax.execute({
            url: url,
            data: _parameter,
            type: 'get',
            dataType: 'html',
            success: function (html) {
                if (reset) {
                    // 초기화는 기존 데이터 삭제
                    $tabConts.find('div.accoItem.on').find('div.accoCont').empty();
                }
                $tabConts.find('div.accoItem.on').find('div.accoCont').append($(html));
                $tabConts.find('div.accoItem.on').addClass('loaded');

                data.load = true;
                reset = false;

                if (first) {
                    // 탭까지 스크롤
                    initScroll(function(){

                    });
                }

                //전체 다운로드 마우스 오버
                $('.tblist td .period-all-down').on('mouseover', function () {
                    $(this).siblings('.btn_type1.btn-download').addClass('on');
                });
                $('.tblist td .period-all-down').on('mouseout', function () {
                    $(this).siblings('.btn_type1.btn-download').removeClass('on');
                });
            }
        });

        $(window).scrollTop(0);

        setTimeout(function(){
            tabH2 = $('.subcontents .tab_conts').eq(tabIdx2).find('.tab_second').outerHeight();
        }, 1000);
    };

    // 좌측 교과서 내비게이션 탭 클릭 이벤트
    $("#textbookSelect").on('change', function() {
        if($("#textbookSelect").val() != '') {
            location.href = $("#textbookSelect").val();
        }
    });

    // 학년 선택 시 동작
    $("input[name=grade]").click(function () {
        location.href = "/evaluation/list?grade="+$(this).val()+"&term="+$("input[name=semester]:checked").val();
    });
    // 학기 선택 시 동작
    $("input[name=semester]").click(function () {
        location.href = "/evaluation/list?grade="+$("input[name=grade]:checked").val()+"&term="+$(this).val();
    });

    // 교과서 선택 시 동작
    $("a.textbookOpt").click(function () {
        location.href = "/evaluation/list?textbookCd="+$(this).data().codelistId+"&term="+$("input[name=semester]:checked").val();
    })

    // 유형분류2 탭 클릭 이벤트
    $('#tab-educourse li a').bind('click', function () {
        deleteUrlQueryString();

        var $li = $(this).closest('li');
        var index = $li.index();
        $('#tab_educourse li').removeClass('on');
        $li.addClass('on');

        $('#tab-contents .tab_conts').hide();
        var $tabConts = $('#tab-contents').find('.tab_conts:eq(' + index + ')');
        $tabConts.show();

        $(window).scrollTop(0);

        var _data = $(this).data();

        // 로드가 안된경우
        if (!_data.load) {
            getList();
        }

        setUrlByContGroup($(this).data('code'));

        tabIdx2 = $(this).parent('li').index();

    });

    // 탭 컨텐츠 전체선택 이벤트
    $(document).on('change', '#tab-contents input.input-checkbox-all',function () {
        var $accoTblWrap = $(this).parent().parent('div.module_tb').next('div');

        // 현재 차시 내 다운로드 가능한 항목이 있을 경우에만 동작한다 (else는 차시 내 다운로드 자료가 없는 것)
        if ($accoTblWrap.hasClass('accoTblWrap')) {
            if ($(this).prop('checked')) {
                $accoTblWrap.find('input[name=contentId]').prop('checked', true);
            } else {
                $accoTblWrap.find('input[name=contentId]').prop('checked', false);
            }

            ctrlBarCount();
        }
    });

    // 컨텐츠 개별 선택 이벤트
    $(document).on('change', 'input[name=contentId]', function () {
        ctrlBarCount();

        // 해당 자료 영역에 전부 선택되었는지 체크하여 전체체크 INPUT 눌리도록 함
        var $accoTblWrap = $(this).closest('div.accoTblWrap');
        if ($accoTblWrap.find('input:checkbox[name=contentId]:checked').length === $accoTblWrap.find('input:checkbox[name=contentId]').length) {
            $accoTblWrap.prev('div.module_tb').find('input:checkbox.input-checkbox-all').prop('checked', true);
        } else {
            $accoTblWrap.prev('div.module_tb').find('input:checkbox.input-checkbox-all').prop('checked', false);
        }
    });

    // 탭 컨텐츠 담기 이벤트
    $('#tab-contents .btn-module-folder-save').bind('click', function () {
        var $tabContItem = $('#tab-contents');
        if ($tabContItem.find('input[name=contentId]:checked').length == 0) {
            alert('담을 자료를 선택해 주세요.');
            return false;
        }

        var contentArray = []; // 컨텐츠 임시 담기 배열
        $tabContItem.find('input[name=contentId]:checked').each(function () {
            contentArray.push($(this).val());
        });
        var contentSet = new Set(contentArray); // 컨텐츠 중복 제거
        var content = '';
        if (contentSet.size > 0) content = Array.from(contentSet).join(',');

        Layer.openFolderMain({
            menu: window.globals.menu,
            type: 'TEXTBOOK',
            parameter: {
                textbookCd: currentClassInfo.textbookCd,
                code2: content,
            }
        });
    });

    // 탭 컨텐츠 다운로드 이벤트
    $('#tab-contents .btn-module-download').bind('click', function () {
        var $tabContItem = $('#tab-contents');
        if ($tabContItem.find('input[name=contentId]:checked').length == 0) {
            alert('다운로드할 자료를 선택해 주세요.');
            return false;
        }

        var contentArray = []; // 컨텐츠 임시 담기 배열
        $tabContItem.find('input[name=contentId]:checked').each(function () {
            contentArray.push($(this).val());
        });
        var contentSet = new Set(contentArray); // 컨텐츠 중복 제거
        var content = '';
        if (contentSet.size > 0) content = Array.from(contentSet).join(',');

        Popup.openFileDownloadDext(content);
    });

    // 문서자료 이벤트
    $('#tab-contents').on('click', '.btn-site-url', function (e) {
        if (SessionUtils.isLogin()) {
            SessionUtils.confirmValidMember(function (valid) {
                if (!valid) {
                    e.preventDefault();
                }
            });
        } else {
            e.preventDefault();
        }
    });
    // 컨텐츠 다운로드
    $('#tab-contents').on('click', '.btn-download', function () {

        var data = $(this).data();
        var content = data.content + '';
        var fileType = data.fileType;
        var mediaKind = data.mediatype;
        var url = data.url;
        if (!content) {
            alert('자료가 없습니다.');
            return false;
        }

        /*
        // 차시자료 문서자료 다운로드 에서 차시 PPT 인 경우 준비 중 알럿처리
        try {

            var title = data.title;
            if ($.trim(data.title) == '차시 PPT') {
                var checkTextbookCd = '106339,106338,106268,106340,106267,106341';
                var textbookCd = data.textbookCd
                if (checkTextbookCd.indexOf(textbookCd) > -1) {
                    alert('준비 중입니다.');
                    return;
                }
            }
        }catch(e){console.log(e)}
        */

        // pdf 설치안내 레이어를 보여줌...
        if (fileType == 'FT212' || (fileType == 'FT207' && mediaKind == 'FT359')) {

            // FT360	HTML5 (복합파일(ZIP) HTML5+ZIP (암석관) 이미지
            Layer.openLayer({
                url: '/textbook/pdf.popup',
                callback: function () {
                    setTimeout(function () {
                        Popup.openFileDownloadDext(content);
                    }, 1000);
                }
            });

        } else {
            if (mediaKind == 'FT360') {

                if (!window.globals.login) {
                    location.href = '/member/login';
                    alert('로그인해주세요.');
                    return false;
                } else {
                    Popup.openHtmlViewer(url);
                    return false;
                }

            } else {
                // 새창으로 다운로드 호출
                Popup.openFileDownloadDext(content);
            }


        }
    });

    // 컨텐츠 담기
    $('#tab-contents').on('click', '.btn-folder-layer-open', function () {
        var content = $(this).data().content;
        Layer.openFolderMain({
            menu: window.globals.menu,
            type: 'TEXTBOOK',
            parameter: {
                textbookCd: currentClassInfo.textbookCd,
                code2: content,
            }
        });
    });

    // 다운로드 선택 초기화
    $("button.ico.reset").click(function () {
        var $accordionItem = $(this).parent().parent().prev('div.accordion');
        if ($accordionItem.find('input[name=contentId]:checked').length > 0) {
            $accordionItem.find('input[name=contentId]:checked').attr("checked", false);
            $accordionItem.find('input.input-checkbox-all:checked').attr("checked", false);
            ctrlBarCount();
        }
    });

    // 통합뷰어 팝업 오픈
    $('#tab-contents').on('click', '.btn-viewer-main-open', function () {
        var data = $(this).data();
        if (data.fileType === 'FT207') {
            return;
        }
        Popup.openViewerMain(data.contentId, data.contentGubun, currentClassInfo.gubunCd);
    });

    // 최초 목록 조회
    getList(1);

    onAccordion();
});

function deleteUrlQueryString() {
    var query = window.location.search;
    var param = new URLSearchParams(query);
    var url = window.location.href.split("?")[0];

    param.delete("contGroup");
    param.delete("contGroup2");

    history.pushState({}, null, url + "?" + param.toString());
}

//페이지 이동없이 유형분류1 & 유형분류2 선택시 URL 생성
function setUrlByContGroup(contGroup1) {
    var query = window.location.search;
    var param = new URLSearchParams(query);
    var url = window.location.href.split("?")[0];

    if(param.has("contGroup")) {
        param.set("contGroup", contGroup1);
    } else {
        param.append("contGroup", contGroup1);
    }

    history.pushState({}, null, url + "?" + param.toString());
}

function initScroll() {
    var gnbHeight = $('#gnb').outerHeight();
    var top = $(".subcontents").offset().top - gnbHeight + (48 - 4); // (여백 - boxshadow값)

    $('html, body').scrollTop(top);

    // var $quickMenu = $('#quickMenu');
    // var $header = $('.wrap .header');
    // var $wrap = $('.wrap');
    //
    // if (!$header.is('.type02, .type03')) {
    //     if ($(this).scrollTop() > 191) {
    //         $header.addClass('fix');
    //         $wrap.find('.logo').prependTo($('.gnb article'));
    //         $wrap.css('paddingTop', '214px');
    //     } else if ($(this).scrollTop() < 191) {
    //         $header.removeClass('fix');
    //         $wrap.find('.logo').prependTo($('.top article'));
    //         $wrap.css('paddingTop', 0);
    //     }
    // }
}

function onAccordion() {
    var $accordion = $('.accordion');
    var $accoCtrl = $accordion.find('.btnAcco');

    $accoCtrl.on('click', function(e) {
        e.preventDefault();
		onScrollMove();

        if( $(this).parent('.accoItem').hasClass('on') ) {
            $(this).parent('.accoItem').removeClass('on').find('.accoCont').slideUp();
        } else {
            $(this).parent().siblings('.accoItem').removeClass('on').find('.accoCont').slideUp();
            var nextAccoCont = $(this).next('.accoCont');
            nextAccoCont.slideDown().parent('.accoItem').addClass('on');

            // 목록 가져오기 ajax
            var $li = $("#tab-educourse li.on");
            var dataCode = $li.find("a").data("code");
            var gubunCd = currentClassInfo.gubunCd;
            var url;
            var _parameter;
            var selector;

            // 유형분류2 리스트 만들기
            var type2List = [];
            if (dataCode === 0) {
                $li.siblings('li').each(function () {
                    type2List.push($(this).find('a').data('code'));
                });
            } else {
                type2List.push(dataCode);
            }
            dataCode = '1110002';

            currentClassInfo.class1Cd = $(this).data("class1-cd");
            parameter.educourseId = $(this).data("class1-cd");
            $("ul.gnbmenu").find("a.textbook").attr('href'
                , '/textbook/list?textbookCd='+currentClassInfo.textbookCd
                +'&class1Cd='+$(this).data("class1-cd")
                +'&term='+parameter.term
            ); // 대단원 선택할때마다 교과자료 링크 동적 변경

            $(".tab_conts:hidden").find("div.accoItem.on").children("div.accoCont").hide();
            $(".tab_conts:hidden").find("div.accoItem.on").removeClass("on");
            $(".tab_conts:hidden").find("a.btnAcco[data-class1-cd='"+$(this).data("class1-cd")+"']").each(function () {
                $(this).next("div.accoCont").show();
                $(this).parent("div.accoItem").addClass("on");
            });
            if (!$(".tab_conts:visible").find("div.accoItem.on").hasClass('loaded')) $('#tab-educourse li').not('.on').find('a').data("load", false);

            // 수업자료는 기존에 음원자료+이미지자료를 같이 모아서 같이 처리
            url = '/textbook/list/appraisal';
            _parameter = {
                codelistId: currentClassInfo.textbookCd,
                textbook: currentClassInfo.textbookCd,
                gubunCd: gubunCd,
                educourseId: currentClassInfo.class1Cd,
                type1: dataCode,
                type2List: type2List,
                page: 1,
                periodId: parameter.periodId,
                contGroup: $li.find("a").data("code"),
            };

            if (nextAccoCont.parent('.accoItem').hasClass('loaded')) {
                return; // 이미 데이터가 존재하는 경우에는 다시 데이터 로드 하지 않음
            }

            Ajax.execute({
                url: url,
                data: _parameter,
                type: 'get',
                dataType: 'html',
                success: function (html) {
                    if (selector === undefined) {
                        nextAccoCont.empty();
                        nextAccoCont.html($(html));
                    } else {
                        nextAccoCont.find(selector).empty();
                        nextAccoCont.find(selector).html($(html));
                    }
                    nextAccoCont.parent('.accoItem').addClass('loaded');
					onScrollMove();
                }
            });
        }
    });
}

function onScrollMove() {
	var onTabIdx = $('#tab-educourse li.on').index();
	setTimeout(function() {
		var gnbHeight = $('.gnb').outerHeight() - 5; // boxshadow값
		var onScrollTop = $('.tab_conts').eq(onTabIdx).find('.accoItem.on').offset().top - gnbHeight;
		$('html, body').scrollTop(onScrollTop);
	}, 500);
}

// 담기, 다운로드 고정바 갯수 및 퍼블 동적 변환
function ctrlBarCount() {
    var $dataCtrlBar = $('.dataCtrlBar');
    var $cidCheckedItems = $(".tab_conts").find("input[name=contentId]:checked");
    var $dataCtrlBarTotalCnt = $('.dataCtrlBar #dataCtrlTotalCnt');

    if ($cidCheckedItems.length > 0) {
        $dataCtrlBar.addClass('on');
    } else {
        $dataCtrlBar.removeClass('on');
    }

    $dataCtrlBarTotalCnt.data('ctrl-total-cnt', $cidCheckedItems.length);
    $dataCtrlBarTotalCnt.html('['+$cidCheckedItems.length+']');
}

function goAiEval() {
    location.href = '/themeplace/aiArithmeticMaterials/main?grade='+currentClassInfo.grade + '&term='+parameter.term;
}