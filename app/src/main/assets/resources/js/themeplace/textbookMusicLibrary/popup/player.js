//비바샘 음악관 신규 구축
let musicAudio = document.querySelector("#main-audio");
let musicIndex = 1;
let raf = null;
let isUpdateOrderNo = false;
let getText = "no-repeat"; // 반복 버튼

let slideControlFlag = true;

$(function () {
    $('#seek-slider').slider({
        orientation: 'horizontal',
        range: 'min',
        max: 100,
        value: 0,
        slide: function(_event, ui) {
            slideControlFlag = false;
            let currentTime = (ui.value / 100 * musicAudio.duration).toFixed(0);
            let min = Math.floor(currentTime / 60);
            let sec = Math.floor(currentTime % 60);
            if (sec < 10) sec = `0${sec}`;
            $(".wrap__music .music__progress .current").text(`${min}:${sec}`);
        },
        change: function(_event, ui) {
            slideControlFlag = true;
            // 퍼센트를 현재시간으로 변환
            var musicCurrentTime = (ui.value / 100 * musicAudio.duration).toFixed(2);
            musicAudio.currentTime = musicCurrentTime;
            $('#seek-slider').find('.ui-slider-range').css({
                width: ui.value + '%'
            });
        },
    });

    $('#volume-slider').slider({
        orientation: 'vertical',
        range: 'min',
        max: 100,
        value: 100,
        slide: function (_event, ui) {
            // 퍼센트를 현재시간으로 변환
            musicAudio.volume = ui.value / 100;
        },
    });

    $('#btn-volume').on('click', function () {
        $('.volume_slider_box').toggleClass('on');
    })

    $('#volume-slider').on('input', (e) => {
        const value = e.target.value;
        //outputContainer.textContent = value;
        musicAudio.volume = value / 100;
    });

    // 뮤직 진행바
    $(".wrap__music #main-audio").on("timeupdate", (e)=>{
        if(!slideControlFlag) {
            return false;
        }

        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime/duration) * 100;
        $(".wrap__music .music__progress .bar").css('width',`${progressWidth}%`);

        // $('#seek-slider').val(Math.floor(musicAudio.currentTime));
        $('#seek-slider').find('.ui-slider-range').css({
            width: progressWidth + '%'
        });
        $('#seek-slider').find('.ui-slider-handle').css({
            left: progressWidth + '%'
        });

        $(".wrap__music #main-audio").on("loadeddata", ()=>{
            let audioDuration = musicAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) totalSec = `0${totalSec}`;

            $(".wrap__music .music__progress .duration").text(`${totalMin}:${totalSec}`);
            $('#seek-slider').attr('max', Math.floor(musicAudio.duration));
        })

        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) currentSec = `0${currentSec}`;
        //$(".wrap__music .music__progress .current").innerText = `${currentMin}:${currentSec}`
    });

    // 재생/일시정지
    $(".wrap__music #control-play").on("click", ()=>{
        if(!isFromMyMusic && allMusic[0].isYoutube) {
            alert("유튜브 자료는 곡명 클릭하여 재생 가능합니다.");
            return;
        }
        musicAudio.currentTime = $('#seek-slider').val();
        const isMusicPaused = $(".wrap__music").hasClass("paused");
        isMusicPaused ? pauseMusic() : playMusic();
    });

    $(".wrap__music #control-prev").on("click", ()=>{
        prevMusic();
    });
    $(".wrap__music #control-next").on("click", ()=>{
        nextMusic();
    });

    // 반복 버튼
    $(".wrap__music #control-repeat").on("click", ()=>{
        let getText = $(".wrap__music #control-repeat").val();

        switch(getText){
            //전체 반복시
            case "repeat" :
                $(".wrap__music #control-repeat").attr("title", "한곡 반복");
                $(".wrap__music #control-repeat").val('repeat_one');
                $(".wrap__music #control-repeat").addClass('repeatOne');
                break;

            //한곡 반복시
            case "repeat_one" :
                $(".wrap__music #control-repeat").attr("title", "반복없음");
                $(".wrap__music #control-repeat").val('no_repeat');
                $(".wrap__music #control-repeat").removeClass('on repeatOne');
                playListMusic();
                break;

            //반복 없음시
            case "no_repeat" :
                $(".wrap__music #control-repeat").attr("title", "자동 재생");
                $(".wrap__music #control-repeat").val('repeat');
                $(".wrap__music #control-repeat").addClass('on');
                break;
        }
    });

    // 오디오가 끝나고
    $(".wrap__music #main-audio").on("ended", ()=>{
        let getText = $(".wrap__music #control-repeat").val();

        switch(getText){
            case "repeat" :
                nextMusic();
                break;

            case "repeat_one" :
                loadMusic(musicIndex);
                playMusic();
                break;

            case "no_repeat" :
                loadMusic(musicIndex);
                playMusic();
                pauseMusic();
                break;

            // case "shuffle" :
            //     let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            //     do {
            //         randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            //     } while (musicIndex == randIndex);
            //     musicIndex = randIndex;
            //     loadMusic(musicIndex);
            //     playMusic();
            //     break;
        }
    });

    // 뮤직 리스트 버튼
    $(".wrap__music #control-list").on("click", ()=>{
        $(".wrap__music .music__list").addClass("show");
    });

    // 뮤직 리스트 닫기 버튼
    $(".wrap__music .music__list .close").on("click", ()=>{
        $(".wrap__music .music__list").removeClass("show");
    });

    // 진행 버튼
// musicProgress.on("click", e=>{
//     let progressWidth = musicProgress.clientWidth;
//     let clickedOffsetX = e.offsetX;
//     let songDuration = $(".wrap__music #main-audio").duration;
//
//     musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
//     playMusic();
// })

    //음원 순서변경 플러그인
    $("#sortable").sortable({
        placeholder:"itemBoxHighlight", /* 이동할 위치 css 적용  */
        start:function(event,ui){
            // 드래그 시작 시 호출
        },
        stop:function(event,ui){
            // 드래그 종료 시 호출
            reorder();
        }
    });

    //플레이어 종료시 음원 순서변경
    $(window).bind("beforeunload", function (e){
        if(isFromMyMusic && isUpdateOrderNo) {
            updateMyMusicOrderNo();
        }
    });

    let tooltip = $('#modules_tooltip');
    $('#sortable').on('mouseover', '.modules > *', function(){
        tooltip.show();
        tooltip.find('p').text($(this).data('title'));
        if($(this).hasClass('btn_move')){
            tooltip.css({
                left: $(this).position().left - (tooltip.outerWidth()/2 + 8) + $(this).outerWidth()/2,
                top: $(this).position().top - tooltip.outerHeight(),
            });
            tooltip.addClass('move');
        }else {
            tooltip.css({
                left: $(this).position().left - tooltip.outerWidth()/2 + $(this).outerWidth()/2,
                top: $(this).position().top - tooltip.outerHeight(),
            });
        }

    });

    $('#sortable').on('mouseleave', '.modules > *', function(){
        tooltip.hide();
        tooltip.css({left: 0, top: 0,});
        tooltip.removeClass("move");
    });

    //음원·악보 다운로드
    $('.btn_down').on('click', function() {
        if ($('input[name=musicContent]:checked').length == 0) {
            alert('다운로드 할 자료를 선택해주세요.');
            return false;
        }


        let content = '';
        $('input[name=musicContent]:checked').each(function() {
            if($(this).data('musicContent').indexOf('null') < 0) content += $(this).data('musicContent') + ',';
            if($(this).data('noteContent').indexOf('null') < 0) content += $(this).data('noteContent') + ',';
        });

        if(content === '') {
            alert('선택한 자료들은 음원과 악보파일이 없는 유튜브 자료들이므로 곡명을 클릭하여 이용해 주세요.');
            return;
        } else {
            alert('음원이나 악보 파일이 없는 자료는 제외하고 다운로드됩니다.');
        }

        Popup.openFileDownloadDext(content);
    });

    //음원 삭제
    $('.btn_del').on('click', function() {
        if ($('input[name=musicContent]:checked').length == 0) {
            alert('삭제 할 자료를 선택해주세요.');
            return false;
        }

        let tmpArr = [];
        $('input[name=musicContent]:checked').each(function() {
            tmpArr.push(parseInt($(this).data('idx')));
        });

        deleteMyMusic(tmpArr);
    });

    //재생목록에 추가
    $('.btn_add').on('click', function() {
        saveMusicInFolder();
    });

    //재생목록 변경
    $('select[name=myMusicFolder]').on('change', function() {
        openPlayer($(this).val());
    });

    //링크 복사하기
    $(".wrap__music .music__song .btn__share").on('click', function() {
        const tmpMusicIdx = parseInt($(".wrap__music .music__song .idx_for_link").val());
        const tpmObj = allMusic.find(e => e.idx === tmpMusicIdx);
        console.log(allMusic);

        if(tpmObj.isYoutube) {
            copyToClipboard(tpmObj.youtubeUrl, "링크 주소를 복사하였습니다.\n붙여넣기(Ctrl+V)하여 사용해 주세요.");
        } else {
            CopyShortUrl.getUrl('content', tpmObj.musicContentId);
        }
    });


    makePlayList();
    loadMusic(musicIndex);
    playListMusic();

    musicAudio = document.querySelector("#main-audio");

    //내 재생목록에서 시작하고 다음곡이 유튜브인경우 패스
    if(isFromMyMusic && allMusic.length > 1) {
        if(allMusic[musicIndex-1].isYoutube || allMusic[musicIndex-1].musicContentId == null) {
            nextMusic();
            pauseMusic();
        }
    }
});


function whilePlaying() {
    $('#seek-slider').val(Math.floor(musicAudio.currentTime));
    if (slideControlFlag) {
        $(".wrap__music .music__progress .current").text(calculateTime($('#seek-slider').val()));
    }
    //audioPlayerContainer.style.setProperty('--seek-before-width', `${$('#seek-slider').value / $('#seek-slider').max * 100}%`);
    raf = window.requestAnimationFrame(whilePlaying);
}

function calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

// 음악 재생
function loadMusic(num){
    //musicImg.src = `images/${allMusic[num - 1].img}.jpg`;
    //musicImg.alt = `${allMusic[num - 1].img}`;
    $(".wrap__music .music__song .name").text((allMusic[num - 1].type1Name === '테마곡' ? '[' + allMusic[num - 1].genreTypeName + '] ' : '') + allMusic[num - 1].subject);
    $(".wrap__music .music__song .idx_for_link").val(allMusic[num - 1].idx);
    //musicArtist.innerText = allMusic[num - 1].artist;
    $(".wrap__music #main-audio").attr('src', `https://dn.vivasam.com/${allMusic[num - 1].musicDownUrl}`);
}

// 플레이 버튼
function playMusic(){
    $('#seek-slider').attr('max', Math.floor(musicAudio.duration));
    $(".wrap__music").addClass("paused");
    $(".wrap__music #control-play").addClass("paused");
    $(".wrap__music #control-play").attr("title", "일시정지")
    musicAudio.play();
    window.requestAnimationFrame(whilePlaying);
}

// 일시정지 버튼
function pauseMusic(){
    $(".wrap__music").removeClass("paused");
    $(".wrap__music #control-play").removeClass("paused");
    $(".wrap__music #control-play").attr("title", "재생")
    musicAudio.pause();
    window.cancelAnimationFrame(raf);
}

// 이전 곡 듣기 버튼
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;

    //이전곡이 유튜브이거나 음원이 없는경우 패스
    if(allMusic[musicIndex-1].isYoutube || allMusic[musicIndex-1].musicContentId == null) prevMusic();

    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 다음 곡 듣기 버튼
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;

    //다음곡이 유튜브이거나 음원이 없는경우 패스
    if(allMusic[musicIndex-1].isYoutube || allMusic[musicIndex-1].musicContentId == null) nextMusic();

    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// 뮤직 리스트 구현하기
function makePlayList() {
    for(let i=0; i<allMusic.length; i++){
        let li = `
                <li data-index="${i + 1}" data-orderno="${allMusic[i].orderNo}" data-idx="${allMusic[i].idx}">
                    <input type="checkbox" name="musicContent" id="music${allMusic[i].idx}"
                    data-idx="${allMusic[i].idx}" 
                    data-music-content="${allMusic[i].musicContentGubun + '-' + allMusic[i].musicContentId}"
                    data-note-content="${allMusic[i].noteContentGubun + '-' + allMusic[i].noteContentId}"
                    >
                    <label for="music${allMusic[i].idx}"></label>
                    
                    ${
                        allMusic[i].isYoutube ?
                            `
                            <div class="tit youtube" data-index="${i + 1}" disabled>
                                <a href="javascript:void(0)" onclick="youtubeForIframe(this)" data-url="${allMusic[i].youtubeUrl}">
                                <em>${(allMusic[i].type1Name === '테마곡' ? '[' + allMusic[i].genreTypeName + '] ' : '') + allMusic[i].subject}</em>
                                <span class="badge"></span></a>
                            </div>        
                            <audio class="${'music' + allMusic[i].idx}" src=""></audio>                    
                            ` 
                            : 
                            `
                            <div class="tit ${allMusic[i].musicContentId === null ? 'disabled' : ''}" data-index="${i + 1}" ${allMusic[i].musicContentId === null ? 'onclick="alert(\'해당 자료는 악보만 제공합니다\');" disabled' : 'onclick="clicked(this)"'}>
                                <em>${(allMusic[i].type1Name === '테마곡' ? '[' + allMusic[i].genreTypeName + '] ' : '') + allMusic[i].subject}</em>
                            </div>
                            <audio class="${'music' + allMusic[i].idx}" src="https://dn.vivasam.com/${allMusic[i].musicDownUrl}"></audio>
                            `
                    }
                    <div class="modules">
                        ${
                            (allMusic[i].musicContentId === null &&  allMusic[i].noteContentId === null) ? `` : 
                            `
                            <button class="down-one-MyMusic" data-idx="${allMusic[i].idx}" data-title="음원·악보 다운로드" 
                            data-music-content="${allMusic[i].musicContentGubun + '-' + allMusic[i].musicContentId}"
                            data-note-content="${allMusic[i].noteContentGubun + '-' + allMusic[i].noteContentId}"
                            ></button>
                            `
                        }
                        ${
                            isFromMyMusic ? `<button class="delete-one-MyMusic" data-idx="${allMusic[i].idx}" data-title="삭제"></button>` : ``
                        }
                        <span class="btn_move" data-title="순서 이동"><i></i></span>
                    </div>
                    <span id="${'audio-duration' + allMusic[i].idx}" class="audio-duration" style="display: none">3:36</span>
                </li>
            `;

        $(".wrap__music .music__list .list ul").append(li);

        let liAudioDuration = $(".wrap__music .music__list .list ul").find(`#${'music' + allMusic[i].idx}`);
        let liAudio = $(".wrap__music .music__list .list ul").find(`.${'music' + allMusic[i].idx}`);

        liAudio.on("loadeddata", () => {
            let audioDuration = liAudio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) totalSec = `${totalSec}`;

            liAudioDuration.text(`${totalMin}:${totalSec}`);
            liAudioDuration.data("duration", `${totalMin}:${totalSec}`)
        });
    }

    //개별음원 삭제
    $('.delete-one-MyMusic').on('click', function(e) {
        let tmpArr = [];
        tmpArr.push(parseInt($(this).data('idx')));
        deleteMyMusic(tmpArr);
    });

    //개별 음원·악보 다운로드
    $('.down-one-MyMusic').on('click', function() {
        let content = '';
        if($(this).data('musicContent').indexOf('null') < 0) content += $(this).data('musicContent') + ',';
        if($(this).data('noteContent').indexOf('null') < 0) content += $(this).data('noteContent') + ',';
        Popup.openFileDownloadDext(content);
    });
}

function deleteMyMusic(musicIdxArr) {
    if(!confirm("선택하신 자료를 삭제하시겠습니까?")) return;

    let tmpAllMusic = [];
    musicIdxArr.map(function(x, index) {
        let tpmMusicObj = {
            memberId: '',
            folderId: 0,
            musicDataId: x,
            orderNo: 0
        }
        tmpAllMusic.push(tpmMusicObj);
    });

    const data = {
        items: tmpAllMusic,
        folderId: parseInt(folderId)
    };

    Ajax.execute({
        url: '/music/folder/content/delete.json',
        data: JSON.stringify(data),
        async : true,
        contentType: 'application/json',
        method: 'post',
        success: function(response) {
            musicIdxArr.map(function(x, index) {
                //allMusic에서 삭제
                allMusic = allMusic.filter((item) => item.idx !== x);
                //list에서 삭제
                $("#sortable li[data-idx='" + x + "']").remove();
            });

            if(allMusic.length === 0) {
                alert("해당 재생목록의 자료가 모두 삭제되었습니다");
                setTimeout(function() {
                    window.close();
                }, 500);
            } else {
                alert("삭제되었습니다");
                reorder();
            }
        }
    });
}

function playListMusic(){
    // 뮤직 리스트 클릭하기
    const musicListAll = $(".wrap__music .music__list .list ul li");
    musicListAll.map(function(index, value) {
        let audioTag = value.querySelector(".audio-duration");
        let adDuration = value.getAttribute("data-duration");

        if(value.classList.contains("playing")){
            value.classList.remove("playing");
            audioTag.innerText = adDuration;
        }

        if(value.getAttribute("data-index") == musicIndex){
            value.classList.add("playing");
            audioTag.innerText = "재생중";
        }
    });
}

function clicked(el){
    let getLiIndex = el.getAttribute("data-index");

    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
}

// sortable 사용시 allMusic, 음원태그들 orderNo 재배치
function reorder() {
    let tmpAllMusic = [];
    $("#sortable li").each(function(i, box) {
        //allMusic순서변경
        let tpmObj = allMusic.find(e => e.idx === $(box).data('idx'));
        tpmObj.orderNo = i+1;
        tmpAllMusic.push(tpmObj);

        //태그 순서변경
        $(box).attr('data-index',i+1);
        $(box).attr('data-orderno',i+1);
        $(box).find('div.tit').attr('data-index',i+1);

        //현재 재생중인 음악 인덱스 동적으로 변경
        if($(box).hasClass('playing')) musicIndex = $(box).data('index');
    });

    //순서변경된 allMusic으로 다시 셋팅
    allMusic = tmpAllMusic;
    isUpdateOrderNo = true;
}


function updateMyMusicOrderNo() {
    let tmpAllMusic = [];
    for(let i=0; i<allMusic.length; i++){
        let tpmMusicObj = {
            memberId: '',
            folderId: 0,
            musicDataId: 0,
            orderNo: 0
        }
        tpmMusicObj.musicDataId =  allMusic[i].idx;
        tpmMusicObj.orderNo =  allMusic[i].orderNo;
        tmpAllMusic.push(tpmMusicObj);
    }

    const data = {
        items: tmpAllMusic,
        folderId: parseInt(folderId)
    };

    //async : true, beforeunload에서 비동기 지원안됨
    Ajax.execute({
        url: '/music/folder/content/update.json',
        data: JSON.stringify(data),
        async : true,
        contentType: 'application/json',
        method: 'post',
        success: function(response) {
            // location.reload();
        }
    });

}


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
    var chkCnt = $("input[name='musicContent']:checked").length;

    if (chkCnt == 0 ){
        alert('저장할 음악을 선택해주세요');
        return false;
    }

    $("input[name='musicContent']:checked").each(function(){
        parameter.push('<input type="text" name="items" value="' + $(this).data('idx') +'">');
    });


    Popup.openWindowPostType({
        url: '/music/folder/myMusic.popup',
        width: 630,
        height: 700,
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

function copyToClipboard(txt,alertTxt) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = txt;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert(alertTxt);
    copyYn = "";
    return;
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
    $("input[name='musicContent']").prop("checked", $(self).is(":checked"));
}

/**
 * 유튜브 embed 플레이어 팝업
 * @param object
 */
function youtubeForIframe(object){
    console.log($(object));
    var url = decodeURIComponent($(object).data("url"));
    var regExp = /(?:[?&]v=|\/embed\/|\/1\/|\/v\/|https:\/\/(?:www\.)?youtu\.be\/)([^&\n?#]+)(?:\?start\=([0-9]+))?/;

    var matchs = url.match(regExp);
    var youtubeId = matchs[1];
    var youtubeUrl = "https://www.youtube.com/embed/"+youtubeId;
    if(matchs[2]){
        youtubeUrl += "?start="+matchs[2];
    }
    onPlayer("youtube", youtubeUrl);
}