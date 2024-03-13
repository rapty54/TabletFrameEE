var textbookKeywordList = [];

$(function () {
    urlSearch = new URLSearchParams(location.search);
    var pageNo = urlSearch.get('pageNo')
    if(pageNo == null || pageNo == undefined || isNaN(pageNo) || pageNo < 1) {
        pageNo = 1;
    }
    getList(pageNo);



    let ClTab = $(".cl_ma_tab li input");

    $(ClTab).click(function() {
        if($(this).is('checked')) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }

        textbookKeywordList = [];
        const checkedKeywordArr = $(".textbook_keyword_li_not_all:checked");
        if($(this).val() === 'ALL' || checkedKeywordArr.length === 0) { // 전체 버튼이 선택되어야할 때
            $(".textbook_keyword_li_not_all").prop("checked", false);

            if(!($('#textbook_li_all').is('checked'))){
                $('#textbook_li_all').prop("checked", true);
            }
        } else { // 나머지 버튼일 때
            $('#textbook_li_all').prop("checked", false);

            checkedKeywordArr.each(function(i){
                textbookKeywordList.push($(this).val())
            });
        }


        getList(1);
    });
});


function getList(pageNo){
    var $listConts = null;
    $listConts = $('#listConts');

    var params = {
        pageNo: pageNo,
        pageSize: 10,
        textbookKeywordList: textbookKeywordList,
    };

    $.ajax({
        url: $('#webRoot').val() + '/opendata/get/OriginalIdeaConvergenceList.do',
        // contentType: 'application/json',
        data: params,
        type: 'post',
        dataType: 'html',
        success: function(html) {
            $listConts.empty();
            $listConts.append($(html));
        }
    });
}





// list-type-table.jsp에서 사용하는 함수들
function fnDetailView(seq){
    $('#seqCode').val(seq);

    $('#viewfrm').submit();
}

//페이징
function go_page(pageNo) {
    getList(pageNo);
}