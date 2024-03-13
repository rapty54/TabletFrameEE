//비바샘 음악관 신규 구축

let DEFAULT_GRADE_TERM_CD = '050';
let GRADE_TERM_CD_ARR = [DEFAULT_GRADE_TERM_CD, '060'];

$(function () {
    // 플레이어 창 열기
    $('.myMusic-player-btn').bind('click', function() {
        if(parseInt($(this).data('contentCnt')) < 1) {
            alert('저장된 자료가 없습니다.');
            return;
        }
        openPlayer($(this).data('folderid'));
    });

    // 재생목록 추가하기 버튼 이벤트
    $('.btn-myMusic-add').bind('click', function() {
        saveMusicFolder(false);
    });

    // 재생목록 이름 수정하기 버튼 이벤트
    $('.btn-myMusic-edit').bind('click', function() {
        const thisIndex = $(this).data('index');
        $('.normal_name_area'+thisIndex).hide();
        $('.edit_name_area'+thisIndex).show();
    });
    // 재생목록 이름 수정하기 취소 버튼
    $('.btn-myMusic-edit-cancel').bind('click', function() {
        const thisIndex = $(this).data('index');
        $('.normal_name_area'+thisIndex).show();
        $('.edit_name_area'+thisIndex).hide();
        $('#myMusicName'+thisIndex).val('');
    });

    // 재생목록 이름 수정후 저장 버튼 이벤트
    $('.btn-myMusic-edit-save').bind('click', function() {
        saveMusicFolder(true, $(this).data('index'));
    });

    // 재생목록 삭제 버튼 이벤트
    $('.btn-myMusic-delete').bind('click', function() {
        const thisIndex = $(this).data('index');
        if (!confirm('해당 재생목록의 모든 자료가 삭제됩니다.\n정말 삭제하시겠습니까?')) {
            return false;
        }
        Ajax.execute({
            url: '/music/folder/delete.json',
            data: {
                folderId: $('#myMusic-id' + thisIndex).val()
            },
            method: 'post',
            success: function(response) {
                location.reload();
            }
        });
    });

    // 확인 버튼 이벤트
    $('.btn-music-save-confirm').bind('click', function() {
        saveMusicContent();
    });
    //닫기버튼
    $('.popup_close').bind('click', function() {
        window.close();
    });
});

//플레이어 팝업
function openPlayer(folderid) {
    var parameter = [];
    parameter.push('<input type="text" name="musicIdxs" value="0">');
    parameter.push('<input type="text" name="folderId" value="' + folderid + '">');
    parameter.push('<input type="text" name="isFromMyMusic" value="true">');

    Popup.openWindowPostType({
        url: '/themeplace/textbookMusicLibrary/player.popup',
        width: 600,
        height: 649,
        name: 'playerPopup',
        parameters: parameter,
        callback: function($div) {
            window.close();
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

function saveMusicFolder(isEdit, index) {
    let data = {
        folderName: ""
    };
    // 수정인경우 수정을 선택한 폴더 아이디를 set
    if (isEdit) {
        data.folderId = parseInt($('#myMusic-id'+index).val());
        data.folderName = $('#myMusicName'+index).val();

    // 새로 등록하는 경우 '내 재생목록(n)'으로 생성
    } else {
        let defaultNameArr = [];
        $('.myMusic-player-btn').map(function() {
            if(this.dataset.name.indexOf('내 재생목록') > -1) defaultNameArr.push(this.dataset.name);
        });
        //내 재생목록(1)부터 없는 폴더이름 확인 후 생성
        for(let i=1; i<=defaultNameArr.length; i++) {
            if(!defaultNameArr.includes('내 재생목록('+i+')')) {
                data.folderName = '내 재생목록('+i+')';
                break;
            }
        }
    }

    Ajax.execute({
        url: '/music/folder/save.json',
        data: JSON.stringify(data),
        contentType: 'application/json',
        method: 'post',
        success: function() {
            location.reload();
        }
    });
}

function saveMusicContent() {
    if(!isPost || musicItems.length < 1) {
        alert('재생목록에 담으실 음악들을 선택해주세요.');
        return false;
    }

    if ($('input[name=myMusicId]:checked').length == 0) {
        alert('음악 담기를 하실 내 재생목록을 선택해주세요.');
        return false;
    }

    var items = [];
    musicItems.forEach(item => items.push({musicDataId : parseInt(item)}))

    var data = {
        items: items,
        folderId: parseInt($('input[name=myMusicId]:checked').val())
    };

    Ajax.execute({
        url: '/music/folder/content/save.json',
        data: JSON.stringify(data),
        contentType: 'application/json',
        method: 'post',
        success: function(response) {
            alert("자료가 저장되었습니다.\n(해당 목록에 이미 저장된 자료가 있는 경우, 해당 자료는 제외됩니다.)");
            setTimeout(function() {
                window.close();
            }, 500);
        }
    });
}



//다운로드 호출 (contentGubun + '-' + contentId)
function downloadPopup(val){
    let redirectUrl = REQUEST_URL + ((SELECTED_GRADE_TERM_CD && SELECTED_GRADE_TERM_CD !== DEFAULT_GRADE_TERM_CD) ? '?gradeTermCd=' + SELECTED_GRADE_TERM_CD : '');
    if (!SessionUtils.isLogin(redirectUrl)) return;

    // 교사 인증
    SessionUtils.confirmValidMember(function(valid) {
        if (valid) {
            Popup.openFileDownloadDext(val);
        }
    });
}

