$(function () {
    //최초 진입 - 선택된 과목의 값으로 따라감
    var textbookSpecialTabData = $("#tabEduList").children("li.on").data();
    getFilterTabList(textbookSpecialTabData.class1cd, 1);

    //과목 선택
    $('#tabEduList').on("click", "li", function (){
        $(this).parent().children("li").removeClass("on");
        $(this).addClass("on");

        let data = $(this).data();
        let class1Cd = data.class1cd;
        getFilterTabList(class1Cd, 1);
    });

    //필터 선택
    $('#filterTabList').on("click", "li", function (){
        $(this).children("input").prop("checked", true);
        let data = $(this).data();
        let class1Cd = data.class1cd;
        let class2Cd = data.class2cd;
        let specialThumbnail = data.thumnail;
        getLinkSpecialList(class1Cd, class2Cd, specialThumbnail);
    });
});

function getFilterTabList(class1Cd, firstYn){
    Ajax.execute({
        url: '/class/link/special/getFilterTabList',
        data: {
            class1Cd: class1Cd
        },
        type: 'get',
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            if(data.code == 'SUCCESS') {
                let json = data.response;
                let rHTML = "";
                for (let i=0; i<json.length; i++) {
                    if(json[i].dataCnt > 0) {
                        rHTML += "<li data-class1cd='" + json[i].class1Cd + "' data-class2cd='" + json[i].class2Cd + "' data-thumnail='" + json[i].specialThumbnail + "'>";
                        rHTML += "<input type='radio' name='sortRdo'>";
                        rHTML += "<label>" + json[i].class2Nm + " <span>(" + json[i].dataCnt + ")</span></label>";
                        rHTML += "</li>";
                    }
                }
                $('#filterTabList').empty();
                $('#filterTabList').html(rHTML);
                if(firstYn){
                    $('#filterTabList > li').eq(0).click();
                    $('#filterTabList > li').eq(0).children('input').prop('checked', true);
                }
                $("#filterTab").show();
                //$('#filterTabList').html(rHTML);
            }
        }
    });
}

function getLinkSpecialList(class1Cd, class2Cd, specialThumbnail){
    //console.log("class1Cd : "+class1Cd+", class2Cd : "+class2Cd+", specialThumbnail : "+specialThumbnail);
    $('#linkListTable').hide();
    $('#linkListThumnail').hide();

    Ajax.execute({
        url: '/class/link/special/getLinkSpecialList',
        type: 'get',
        data: {
            class1Cd: class1Cd,
            class2Cd: class2Cd,
            specialThumbnail: specialThumbnail
        },
        async: false,
        dataType: 'html',
        success: function(html) {
            $('#linkListThumnail').empty();
            $('#linkListTable').empty();
            //썸네일
            if(specialThumbnail){
                $('#linkListThumnail').append(html);
                $('#linkListThumnail').show();
            }else{	//리스트
                $('#linkListTable').append(html);
                $('#linkListTable').show();
            }
        },error: function (){
            console.log("실퍠");
        }
    });
}

// 통합뷰어 호출
function viewDataContents(target){
    var data = $(target).data();
    if (data.fileType === 'FT207') {
        return;
    }
    Popup.openViewerMain(data.contentId, data.contentGubun);
}

// 다운로드 호출
function downloadPopup(target){
    var data = $(target).data();
    if (data.downyn === 'Y') {
        Popup.openFileDownloadDext(data.contentGubun+"-"+data.contentId, data.downyn);
    }
}

// 담기
function insertFolderChk(target) {
    var data = $(target).data();
    Layer.openFolderMain({
        menu: window.globals.menu,
        type: 'LINK_SPECIAL',
        parameter: {
            textbookCd: '',
            code2: data.content
        }
    });
}

//전체선택
function AllCheck(){
    //전체 선택 or 전체 해제
    let isChecked = $('#linkSpecialList input[name=contentId]:checked').length;

    //한건이라도 체크 되어 있으면 전체 해제, 아니면 전체 선택
    if(isChecked) {
        $('#linkSpecialList input[name=contentId]').each(function () {
            $(this).prop("checked", false);
        });
    }else{
        $('#linkSpecialList input[name=contentId]').each(function () {
            $(this).prop("checked", true);
        });
    }
}

//선택담기
function selectInsertBox(){
    let items = "";
    $('#linkSpecialList input[name=contentId]:checked').each(function (){
        let data = $(this).data();
        items += data.contentGubun+"-"+data.contentId+",";
    });

    if(items) {
        Layer.openFolderMain({
            menu: window.globals.menu,
            type: 'LINK_SPECIAL',
            parameter: {
                textbookCd: '',
                code2: items
            }
        });
    }else{
        alert("담기 할 컨텐츠를 선택해주세요.");
    }
}

//선택 다운로드
function selectDownload(){
    let items = "";
    $('#linkSpecialList input[name=contentId]:checked').each(function (){
        let data = $(this).data();
        if (data.downyn === 'Y') {
            items += data.contentGubun+"-"+data.contentId+",";
        }
    });
    if(items) {
        Popup.openFileDownloadDext(items);
    }else{
        alert("다운로드 할 컨텐츠를 선택해주세요.");
    }
}