// 기본설정 교과서
var DEFAULT_TEXTBOOK_CD = '106343';
// 현재 선택된 탭
var SELECTED_TAB;
// 현재 선택된 학기
var SELECTED_TERM;
// 교과서코드별 단원목록
var UNIT1LIST_MAP = {};
// 단원별 차시목록 (차시 하위에 퀴즈목록)
var PERIODLIST_MAP = {};


var QUIZ_TIP_PLAY_HTML = '<span class="ai_tip quiz_tip_p">4가지 플레이 모드로 연산 학습지를<br>활용하실 수 있습니다.<button class="btnTipClose"></button></span>';
var SHOW_QUIZ_TIP_PLAY = false;


//사용안내 팝업 띄우기
function openPopup(e){
    $('.themaPopWrap').show();
    $('.dimmed').show();
    if (e === 'useInfo'){
        $('.pop_useInfo').show();
    }
}

//
function moveToReport() {
    var redirectUrl = REQUEST_URL + '?textbookCd=' + SELECTED_TEXTBOOK_CD + '&unit1Cd=' + SELECTED_UNIT1_CD;
    if (!SessionUtils.isLogin(redirectUrl)) return;
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            var url = 'https://samquiz.vivasam.com/report/aimath';
            window.open(url, '_blank', "width=1280,height=800");
        }
    });
}


// 교과서별 단원 목록 조회
function fetchUnit1List(textbookCd) {
    //console.log("textbookCd >> "+textbookCd);
    Ajax.execute({
        type: 'GET',
        url: '/themeplace/aiArithmeticMaterials/unit1List.json',
        dataType: 'json',
        cache: false,
        async: false,
        data: {textbookCd: textbookCd},
        success: function (data) {
            buildUnit1List(textbookCd, data.response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
        }
    });
}


function findProcessingUnit(unit1List) {
    var equalUnit1 = unit1List.find(function (unit1) {
        return unit1.unit1Cd === SELECTED_UNIT1_CD
    });
    // 동일 코드의 단원이 존재하면 중지
    if (equalUnit1) return;

    // 동일 코드의 단원이 없을 경우 다음 단원 선택
    var nextUnit1 = unit1List.find(function (unit1) {
        return unit1.unit1Num > SELECTED_UNIT1_NUM
    });

    if (nextUnit1) {
        SELECTED_UNIT1_CD = nextUnit1.unit1Cd;
        SELECTED_UNIT1_NUM = nextUnit1.unit1Num;
    } else {
        // 다음 단원이 없을 경우 1단원 열기
        SELECTED_UNIT1_CD = unit1List[0].unit1Cd;
    }

}

// 단원 html 추가
function buildUnit1List(textbookCd, unit1List) {
    UNIT1LIST_MAP[textbookCd] = unit1List;

    if (!unit1List || unit1List.length === 0) return;
    if (!SELECTED_UNIT1_CD) {
        SELECTED_UNIT1_CD = unit1List[0].unit1Cd;
    } else {
        findProcessingUnit(unit1List);
    }

    var html = '', unit1;
    for (var i = 0, size = unit1List.length; i < size; i++) {
        unit1 = unit1List[i];
        html += '<div class="accoItem active' +  (SELECTED_UNIT1_CD === unit1List[i].unit1Cd ? ' on' : '') + '">';
        html += '<a href="javascript:void(0)" class="btnAcco" data-unit1-cd="' + unit1.unit1Cd + '">';
        html += '<em>' + unit1.unit1Num + '.</em>' + unit1.unit1Nm;
        html += '</a></div>'
    }
    $('#'+SELECTED_TAB+' .accordion').hide();
    $('#'+SELECTED_TAB+' .accordion').eq(SELECTED_TERM-1).show();
    $('#' + SELECTED_TAB + ' .accordion').eq(SELECTED_TERM-1).append(html);
    onAccordion($('#' + SELECTED_TAB));

    fetchPeriodList(SELECTED_UNIT1_CD);
}

// 차시정보 조회
function fetchPeriodList(unit1Cd) {
    var params = {
        textbookCd: SELECTED_TEXTBOOK_CD,
        unit1Cd: unit1Cd
    };

    Ajax.execute({
        type: 'GET',
        url: '/themeplace/aiArithmeticMaterials/materials.json',
        dataType: 'json',
        cache: false,
        async: false,
        data: params,
        success: function (data) {
            buildPeriodList(unit1Cd, data.response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
        }
    });
}

// 차시, 퀴즈 목록 html 추가
function buildPeriodList(unit1Cd, periodList) {
    PERIODLIST_MAP[unit1Cd] = periodList;

    var html = '<div class="accoCont" data-unit1-cd="' + unit1Cd + '"><table class="tblist textbookList"><colgroup><col style="width:auto;"><col style="width:86px;"><col style="width:125px;"><col style="width:125px;"></colgroup><tbody>';

    var period = null;
    var quiz = null;

    for (var i=0,size=periodList.length; i<size; i++) {
        period = periodList[i];
        //console.log("period >> "+JSON.stringify(period));
        quiz = period.materials[0];

        html += '<tr>';
        html += '<th rowspan="' + period.materials.length + '" data-period-id="' + period.periodId + '"><p>'+ (period.periodName||'진단 평가') + '</p></th>';
        html += '<td class="trun"><p>' + quiz.quizGroupSeq + '회</p><a style="cursor:pointer;" data-content="'+quiz.contentId+'" data-content-gubun="'+quiz.contentGubun+'" onclick="viewDataContents(this)" class="btn-viewer-main-open ico search" title="미리보기"><span></span></a></td>';
        html += '<td class="btn_cell play">'
        if (i === 0) {
            html += QUIZ_TIP_PLAY_HTML;
        }
        html += '<a href="javascript:void(0);"' + (quiz.playYn === 'N' ? 'class="disabled"': '') + ' data-quiz-group-id="' + quiz.quizGroupId + '">플레이</a>';
        html += '</td>';
        html += '<td class="btn_cell download"><a href="javascript:void(0);" data-content-id="' + quiz.contentId + '" data-content-gubun="' + quiz.contentGubun + '">다운로드</a></td>';
        html += '</tr>';

        for (var j=1,jSize=period.materials.length; j<jSize; j++) {
            quiz = period.materials[j];
            html += '<tr>';
            html += '<td class="trun"><p>' + quiz.quizGroupSeq + '회</p><a style="cursor:pointer;" data-content="'+quiz.contentId+'" data-content-gubun="'+quiz.contentGubun+'" onclick="viewDataContents(this)" class="btn-viewer-main-open ico search" title="미리보기"><span></span></a></td>';
            html += '<td class="btn_cell play"><a href="javascript:void(0);"' + (quiz.playYn === 'N' ? 'class="disabled"': '') + ' data-quiz-group-id="' + quiz.quizGroupId + '">플레이</a></td>';
            html += '<td class="btn_cell download"><a href="javascript:void(0);"  data-content-id="' + quiz.contentId + '" data-content-gubun="' + quiz.contentGubun + '">다운로드</a></td>';
            html += '</tr>';
        }
    }


    html += '</tbody></table></div>';
    var $html = $(html);
    var $tabHeader = $('a[data-unit1-cd='+unit1Cd+']');
    $html.insertAfter($tabHeader);

    if (!SHOW_QUIZ_TIP_PLAY) {
        $html.find('.quiz_tip_p').hide();
    }
}

// 통합뷰어 팝업 오픈
function viewDataContents(target) {
    var $target = $(target);
    var contentId = $target.data('content');
    var contentGubun = $target.data('contentGubun');
    Popup.openViewerMain(contentId, contentGubun);
}



// 데이터 조회후 tabconts 에 accordion 처리
function onAccordion($tabEl) {
    var $accordion = $tabEl.find('.accordion').eq(SELECTED_TERM-1);
    var $accoCtrl = $accordion.find('.btnAcco');

    $accoCtrl.on('click', function(e) {
        e.preventDefault();
        var $el = $(e.target);
        SELECTED_UNIT1_CD = $(e.target).data('unit1-cd');

        if($el.parent('.accoItem').hasClass('on') ) {
            $el.parent('.accoItem').removeClass('on').find('.accoCont').slideUp();
        } else {
            $el.parent().siblings('.accoItem').removeClass('on').find('.accoCont').slideUp();

            if (PERIODLIST_MAP[SELECTED_UNIT1_CD]) {
                // 조회한 기록이 있을 경우
                $el.next('.accoCont').slideDown();
                $el.parent('.accoItem').addClass('on');
            } else {
                fetchPeriodList(SELECTED_UNIT1_CD);
                $el.next('.accoCont').slideDown();
                $el.parent('.accoItem').addClass('on');
            }

            $([document.documentElement, document.body]).scrollTop($('#tab-educourse').offset().top);
        }
    });
}


function downloadOfflineQuiz(e) {
    var contentId = $(e.currentTarget).data('content-id');
    var contentGubun = $(e.currentTarget).data('content-gubun');
    var redirectUrl = REQUEST_URL + '?textbookCd=' + SELECTED_TEXTBOOK_CD + '&unit1Cd=' + SELECTED_UNIT1_CD;
    if (!SessionUtils.isLogin(redirectUrl)) return;
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            Popup.openFileDownloadDext(contentGubun + '-' + contentId);
        }
    });

}

function runSamQuizPlayer(e) {
    e.preventDefault();
    var $el = $(e.currentTarget);
    if ($el.hasClass('disabled')) return;

    var quizGroupId = $el.data('quiz-group-id');
    var redirectUrl = REQUEST_URL + '?textbookCd=' + SELECTED_TEXTBOOK_CD + '&unit1Cd=' + SELECTED_UNIT1_CD;
    if (!SessionUtils.isLogin(redirectUrl)) return;
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            Ajax.execute({
                type: 'GET',
                url: '/themeplace/aiArithmeticMaterials/samquiz-play-url.json',
                dataType: 'json',
                cache: false,
                async: false,
                data: { quizGroupId: quizGroupId },
                success: function (data) {
                    if (data.code !== 'SUCCESS') {
                        alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
                    }

                    if (data.response) {
                        var win = window.open(data.response, '_blank', "width=1280,height=800");
                        win.focus();
                    } else {
                        alert('컨텐츠 주소를 알 수 없습니다.');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
                }
            });
        }
    });
}

function handleTabClick (e) {
    //var $el = $(e.target);
    var $el = $('#tab-educourse li.on a');
    SELECTED_TAB = $el.attr('href').replace('#', '');
    SELECTED_TERM = $('#semester1').prop("checked")?'1':'2';
    if(SELECTED_TERM == 1) {
        SELECTED_TEXTBOOK_CD = $el.data('textbook-cd');
    }else{
        SELECTED_TEXTBOOK_CD = $el.data('textbook-cd2');
    }
    //$('#' + SELECTED_TAB + ' .accordion').html('');
    Ajax.execute({
        type: 'GET',
        url: '/themeplace/aiArithmeticMaterials/recently-view-unit.json',
        dataType: 'json',
        cache: false,
        async: false,
        data: {textbookCd: SELECTED_TEXTBOOK_CD},
        success: function (data) {
            SELECTED_UNIT1_CD = data.response.unit1Cd;
            SELECTED_UNIT1_NUM = data.response.unit1Num;
            if (!UNIT1LIST_MAP[SELECTED_TEXTBOOK_CD]) {
                fetchUnit1List(SELECTED_TEXTBOOK_CD);
            }else{
                //accordion1
                $('#'+SELECTED_TAB+' .accordion').hide();
                $('#'+SELECTED_TAB+' .accordion').eq(SELECTED_TERM-1).show();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('데이터 조회중 오류가 발생했습니다. 관리자에게 문의해 주세요');
        }
    });
}

$(function () {
    $('.dimmed').css('z-index', '9998');

    // 최초 선택된 탭 아이디
    SELECTED_TAB = $('#tab-educourse li.on a').attr('href').replace('#', '');
    // 최초 선택된 학기
    SELECTED_TERM = $('#semester1').prop("checked")?'1':'2';
    var $el = $('#tab-educourse li.on a');
    if(SELECTED_TERM == 1) {
        SELECTED_TEXTBOOK_CD = $el.data('textbook-cd');
    }else{
        SELECTED_TEXTBOOK_CD = $el.data('textbook-cd2');
    }

    //console.log("SELECTED_TAB >> "+SELECTED_TAB);
    //console.log("SELECTED_TERM >> "+SELECTED_TERM);
    //console.log("SELECTED_TEXTBOOK_CD >> "+SELECTED_TEXTBOOK_CD);
    // 최초 선택된 탭 컨텐츠 보이기
    $('#' + SELECTED_TAB).show();

    // 학년-과목 탭 클릭시
    $('#tab-educourse').on('click', handleTabClick);
    // 학기 탭 클릭시
    $('#tabTerm input').on('click', handleTabClick);

    // 페이지 진입시 리포트 tooltip 처리
    if (!$.cookie('quiz_tip_r')) {
        $('#quiz_tip_r').show();
    }
    $('#quiz_tip_r button.btnTipClose').on('click', function () {
        $(this).parent('.ai_tip').hide();
        $.cookie('quiz_tip_r', 1, { expires: 365, path: '/themeplace/aiArithmeticMaterials/main' })
    })


    // 단원, 퀴즈 조회후 tooltip 처리
    if (!$.cookie('quiz_tip_p')) {
        SHOW_QUIZ_TIP_PLAY = true;
    }
    $('#contsThema').on('click', '.quiz_tip_p button.btnTipClose', function () {
        SHOW_QUIZ_TIP_PLAY = false;
        $('#contsThema .quiz_tip_p').hide();
        $.cookie('quiz_tip_p', 1, { expires: 365, path: '/themeplace/aiArithmeticMaterials/main' })
    });

    // 플레이
    $('#contsThema').on('click', '[data-quiz-group-id]', runSamQuizPlayer)
    // 다운로드
    $('#contsThema').on('click', '[data-content-id][data-content-gubun]', downloadOfflineQuiz)

    // 최초 선택된 탭에 해당하는 교과서 단원 조회
    fetchUnit1List(SELECTED_TEXTBOOK_CD);
    $('#'+SELECTED_TAB+' .accordion').eq(SELECTED_TERM-1).show();
});
