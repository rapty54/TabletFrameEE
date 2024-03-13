//비바샘 음악관 신규 구축
$(function () {
    getList(false);

    // 페이지 전환이 아닌 ajax로 가져와서 처리 렌더 호출
    PaginationHandler.render({
        $target: $('#listConts')
    });

    //내 재생목록 클릭시
    $('.myMusic').on('click', function() {
        if(!prerequisite()) return;
        openMyMusic();
    });

    //개별음원 플레이어 열기
    $('#listConts').on('click', '.btn-music-player-open',function() {
        if(!prerequisite()) return;

        //유튜브가 아닌데 음원도 없는경우처리
        if($(this).data('isYoutube') == false && $(this).data('musicContentId') == undefined) {
            alert("해당 자료는 악보만 제공합니다");
            return;
        }

        openPlayer($(this).data('idx'));
    });

    //재생목록에 추가
    $('#listConts').on('click', '.my-music-save',function() {
        if(!prerequisite()) return;
        saveMusicInFolder();
    });

    //감성영역만 보기
    $('#listConts').on('click', '.view_type',function() {
        getList(true);
    });

    //음원·악보 다운로드
    $('#listConts').on('click', '.music-down-btn',function() {
        if(!prerequisite()) return;
        if ($('input[name=musicCheck]:checked').length == 0) {
            alert('다운로드 할 자료를 선택해주세요.');
            return false;
        }
        let content = '';
        let allNullDataCnt = 0;
        $('input[name=musicCheck]:checked').each(function() {
            let tmpMusicContent = $(this).data('musicContent');
            let tmpNoteContent = $(this).data('noteContent');

            if(tmpMusicContent.indexOf('null') < 0) content += tmpMusicContent + ',';
            if(tmpNoteContent.indexOf('null') < 0) content += tmpNoteContent + ',';
            if(tmpMusicContent.indexOf('null') >= 0 && tmpNoteContent.indexOf('null') >= 0) allNullDataCnt++;
        });
        if(allNullDataCnt === $('input[name=musicCheck]:checked').length) {
            alert("선택한 자료들은 음원과 악보파일이 없는 유튜브 자료들이므로 곡명을 클릭하여 이용해 주세요.");
            return;
        }

        Popup.openFileDownloadDext(content);
    });

    //개별 음원 다운로드
    $('#listConts').on('click', '.btn_music_down',function() {
        if(!prerequisite()) return;
        Popup.openFileDownloadDext($(this).data('content'));
    });

    //개별 악보 다운로드
    $('#listConts').on('click', '.btn_music_melody',function() {
        if(!prerequisite()) return;
        Popup.openFileDownloadDext($(this).data('content'));
    });

    //개별 차시 열기
    $('#listConts').on('click', '.btn_music_chasi',function() {
        if(!prerequisite()) return;
        Popup.openPeriodViewer($(this).data('period'), '', '');
    });


    //검색 버튼 클릭
    $('.btn_search').on('click', function() {
        getList(true);
    });

    //검색 키위드란에서 엔터 입력시
    $('#searchKeyword').on('keyup', function() {
        if(window.event.keyCode == 13) getList(true);
    });

    //초기화 버튼 클릭
    $('.btn_reset').on('click', function() {
        if(!$("input[name=category]:checkbox").eq(0).is(':checked')) $("input[name=category]:checkbox").eq(0).click();
        if(!$("input[name=grade]:checkbox").eq(0).is(':checked')) $("input[name=grade]:checkbox").eq(0).click();
        if(!$("input[name=sheet]:checkbox").eq(0).is(':checked')) $("input[name=sheet]:checkbox").eq(0).click();
        if(!$("input[name=publishing]:checkbox").eq(0).is(':checked')) $("input[name=publishing]:checkbox").eq(0).click();

        $('#searchKeyword').val('');
        getList(false);
    });

    //전체 checkbox를 클릭한 경우 전체를 제외한 나머지 모두 선택 해제
    $("input[name=category]:checkbox").eq(0).click(function() {
        allCheckBoxExceptCheck(this);
    });
    $("input[name=grade]:checkbox").eq(0).click(function() {
        allCheckBoxExceptCheck(this);
    });
    $("input[name=sheet]:checkbox").eq(0).click(function() {
        allCheckBoxExceptCheck(this);
    });
    $("input[name=publishing]:checkbox").eq(0).click(function() {
        allCheckBoxExceptCheck(this);
    });

    //전체 checkbox 외의 값을 선택한 경우 전체 선택 해제
    $("input[name=category]:checkbox").click(function() {
        allCheckBoxCheck(this);
    });
    $("input[name=grade]:checkbox").click(function() {
        allCheckBoxCheck(this);
    });
    $("input[name=sheet]:checkbox").click(function() {
        allCheckBoxCheck(this);
    });
    $("input[name=publishing]:checkbox").click(function() {
        allCheckBoxCheck(this);
    });

});

function getList(isSearch){
    let $listConts = null;
    $listConts = $('#listConts');
    const data = isSearch ? makeSearchCondition() : {page : 1};

    Ajax.execute({
        url: '/themeplace/textbookMusicLibrary/getMusicList',
        data: data,
        type: 'get',
        dataType: 'html',
        success: function(html) {
            $listConts.empty();
            $listConts.append($(html));
        }
    });
}

function makeSearchCondition() {
    let data = {
        page : 1
    };

    //유형
    if($("input[name='category']:checked").length > 0 && $("input[name='category']:checked")[0].value !== 'all' ) {
        let tmpArr = [];
        $("input[name='category']:checked").each(function(idx, val) {
            tmpArr.push($(this).val());
        });
        data.categoryList = tmpArr;
    }

    //학년
    if($("input[name='grade']:checked").length > 0 && $("input[name='grade']:checked")[0].value !== 'all' ) {
        let tmpArr = [];
        $("input[name='grade']:checked").each(function(idx, val) {
            tmpArr.push($(this).val());
        });
        data.gradesList = tmpArr;
    }

    //악보 유형
    if($("input[name='sheet']:checked").length > 0 && $("input[name='sheet']:checked")[0].value !== 'all' ) {
        let tmpArr = [];
        $("input[name='sheet']:checked").each(function(idx, val) {
            tmpArr.push($(this).val());
        });
        data.sheetList = tmpArr;
    }

    //출판사
    if($("input[name='publishing']:checked").length > 0 && $("input[name='publishing']:checked")[0].value !== 'all' ) {
        let tmpArr = [];
        $("input[name='publishing']:checked").each(function(idx, val) {
            tmpArr.push(parseInt($(this).val()));
        });
        data.publisherBitSumList = tmpArr;
    }

    //검색어
    if($('#searchKeyword').val() !== null && $('#searchKeyword').val() !== undefined && $('#searchKeyword').val() !== "") {
        data.searchKeyword = $('#searchKeyword').val();
    }

    if($('.view_type').is(':checked')) {
        data.listeningTrue = 1;
    }

    return data;
}


//사용안내 팝업 띄우기
function openPopup(e){
    $('.themaPopWrap').show();
    $('.dimmed').show();
    $('.dimmed').css('z-index', '9501');
    if (e === 'useInfo'){
        $('.pop_useInfo').show();
    }
}

//내 재생목록 팝업
function openMyMusic() {
    Popup.openWindow({
        url: '/music/folder/myMusic.popup',
        width: 623,
        height: 690,
        name: 'myMusicPopup',
        callback: function($div) {
            //팝업 종료시 내교과서 목록 새로고침
            // var timer = setInterval(function() {
            //     if ($div.closed) {
            //         clearInterval(timer);
            //         location.reload();
            //     }
            // }, 500);
        }
    });
}

//플레이어 팝업
function openPlayer(idx) {
    var parameter = [];
    parameter.push('<input type="text" name="musicIdxs" value="' + idx +'">');
    parameter.push('<input type="text" name="folderId" value="0">');
    parameter.push('<input type="text" name="isFromMyMusic" value="false">');

    Popup.openWindowPostType({
        url: '/themeplace/textbookMusicLibrary/player.popup',
        width: 500,
        height: 619,
        name: 'playerPopupMain' + idx,
        parameters: parameter,
        callback: function($div) {
            //팝업 종료시 내교과서 목록 새로고침
            // var timer = setInterval(function() {
            //     if ($div.closed) {
            //         clearInterval(timer);
            //         location.reload();
            //     }
            // }, 500);
        }
    });
}

function saveMusicInFolder() {
    var parameter = [];
    var chkCnt = $("input[name='musicCheck']:checked").length;

    if (chkCnt == 0 ){
        alert('저장할 음악을 선택해주세요');
        return false;
    }

    $("input[name='musicCheck']:checked").each(function(){
       parameter.push('<input type="text" name="items" value="' + $(this).val() +'">');
    });


    Popup.openWindowPostType({
        url: '/music/folder/myMusic.popup',
        width: 623,
        height: 690,
        name: 'myMusicPopup',
        parameters: parameter,
        callback: function($div) {
            //팝업 종료시 내교과서 목록 새로고침
            // var timer = setInterval(function() {
            //     if ($div.closed) {
            //         clearInterval(timer);
            //         location.reload();
            //     }
            // }, 500);
        }
    });
}

//전체 checkbox를 클릭한 경우 전체를 제외한 나머지 모두 선택 해제
function allCheckBoxExceptCheck(obj) {
    var attrName = $(obj).attr("name");

    if ($(obj).is(":checked")) {
        for (var i = 1; i < $("input[name=" + attrName + "]:checkbox").length; i++) {
            $("input[name=" + attrName + "]:checkbox").eq(i).prop("checked", false);
        }
    }
    else {
        $("input[name=" + attrName + "]:checkbox").eq(0).prop("checked", true);
    }
}

//전체 checkbox 외의 값을 선택한 경우 전체 선택 해제
function allCheckBoxCheck(obj) {
    var unCheckedCnt = 0;
    var attrName = $(obj).attr("name");

    $("input[name=" + attrName + "]:checkbox").each(function(i){
        //전체 선택 박스는 check 비교 대상에서 제외
        if (i > 0 && $(this).is(":checked")) {
            if ($(this).val() != "") {
                $("input[name=" + attrName + "]:checkbox").eq(0).prop("checked", false);
                return false;
            }
        }
        else {
            ++unCheckedCnt;
        }
    });

    if($("input[name=" + attrName + "]:checkbox").length === unCheckedCnt) {
        $("input[name=" + attrName + "]:checkbox").eq(0).prop("checked", true);
    }

    unCheckedCnt = 0;
}


//다운로드 호출 (contentGubun + '-' + contentId)
function downloadPopup(val){
    var redirectUrl = REQUEST_URL + ((SELECTED_GRADE_TERM_CD && SELECTED_GRADE_TERM_CD !== DEFAULT_GRADE_TERM_CD) ? '?gradeTermCd=' + SELECTED_GRADE_TERM_CD : '');
    if (!SessionUtils.isLogin(redirectUrl)) return;

    // 교사 인증
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            Popup.openFileDownloadDext(val);
        }
    });
}

// check
function allCheck(self) {
    $("input[name='musicCheck']").prop("checked", $(self).is(":checked"));
}

function prerequisite() {
    // 로그인 안됐을 경우 처리
    if (!window.globals.login) {
        location.href = "/member/login?goURL=" + location.pathname;
        alert('로그인이 필요한 서비스입니다.');
        return false;
    }

    //교사 인증 체크
    if (teacherCertifiedYn !== 'Y') {
        if (!confirm('교사 인증이 필요한 서비스입니다. \n지금 인증을 진행하시겠습니까?')) {
            return false;
        }
        location.href='/member/memberReCertify';
        return false;
    }

    return true;
}

