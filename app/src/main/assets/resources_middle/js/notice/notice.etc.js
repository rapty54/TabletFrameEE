function noticeAlert() {
	alert("3월 14일 오픈 예정입니다.");
	return false;
}

//교과서 CD 다운로드  클릭시
function cdDownload(schoolLvlCd, textbookCd){

	popOpenFull(CONTEXTPATH+'/popup/downloadTextbookDVD.do?schoolLvlCd='+schoolLvlCd+'&subjectCd='+textbookCd, 984);

	return false;
}