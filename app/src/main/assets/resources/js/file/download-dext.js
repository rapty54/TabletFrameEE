var dx = null;

function onDX5Error(_id, _code, msg) {
	/*
	* IE11/호환성보기 에러 발생 분기처리
	* 파일이 없는 경우는 공통으로 처리 (ESVG-00021)
	* 2021-10-08 김인수
	 */
	if(_code == 'ESVG-00021') { // 파일이 없을때 발생하는 에러코드
		alert("다운로드 파일이 없습니다.");
	} else {
		if(navigator.userAgent.indexOf("Trident/7.0") > -1 || (navigator.userAgent.indexOf('trident') > -1 && navigator.userAgent.indexOf('msie 7') > -1)) {
			alert("IE11 브라우저 또는 호환성 보기 설정을 통해서는 정상 다운로드가 안될 수 있습니다. \n" +
				"크롬이나 IE 엣지 이상의 브라우저를 통해 다운로드를 진행해 주세요.");
		} else {
			alert(msg);
		}
	}
}

function download(flag, isMulti) {
	if (SessionUtils.isLogin()) {
		if (flag == 'SELECTED') {
			var selecteds = dx.getSelectedItemIds();
			if (!selecteds || selecteds.length == 0) {
				alert('파일을 선택 하세요.');
				return;
			} else {
				if (selecteds.length == 1) {
					//  ga 로그
					var tempId = selecteds[0];
					var item = dx.getItemById(tempId);
					var fileName = item.name;
					var fileSize = item.size;
					if(fileSize != '' && fileSize > 0) {
						fileSize = (fileSize / 1024) / 1024;
					}
					gtag('event', '다운로드', {
						'event_category': '자료다운로드',
						'event_label': fileName
					});


					// 다운로드
					var downUrl = item.downUrl;
					// 비상교재 및 CDN을 서버 자료가 아닐때 직접다운로드 함
					if (downUrl.indexOf('/VisangUpload/') > -1
							|| downUrl.indexOf('/vivasamfiledir/') > -1
							|| downUrl.indexOf('/www.soobakc.com/') > -1) {
						urlDown(downUrl);
						return;
					} else {
						if (fileName.toUpperCase().indexOf('.ZIP') < 0 || fileSize < 100) {
							// 덱스트 업로드 컴포넌트
							dx.getItemById(selecteds[0]);
						} else {
							// 브라우저 다운로드로 던짐
							dx.downloadById(selecteds[0]);
							return;
						}
					}

				} else {
					//  ga 로그
					for (var i = 0; selecteds.length > i; i++) {
						var tempId = selecteds[i];
						var item = dx.getItemById(tempId);
						var fileName = item.name;
						gtag('event', '다운로드', {
							'event_category': '자료다운로드',
							'event_label': fileName
						});
					}
				}
			}
		} else {
			var ids = dx.getItemIds();
			if (ids.length == 1) {
				//  ga 로그
				var tempId = ids[0];
				var item = dx.getItemById(tempId);
				var fileName = item.name;
				var fileSize = item.size;
				if(fileSize != '' && fileSize > 0) {
					fileSize = (fileSize / 1024) / 1024;
				}
				gtag('event', '다운로드', {
					'event_category': '자료다운로드',
					'event_label': fileName
				});

				// 다운로드
				var downUrl = item.downUrl;
				// 비상교재 및 CDN을 서버 자료가 아닐때 직접다운로드 함
				if (downUrl.indexOf('/VisangUpload/') > -1
						|| downUrl.indexOf('/vivasamfiledir/') > -1
						|| downUrl.indexOf('/www.soobakc.com/') > -1) {
					urlDown(downUrl);
					return;
				} else {
					// 파일1개 다운로드인 경우 DVD 다운로드 일 경우 용량이 너무 많아서 예외 처리
					if (fileName.toUpperCase().indexOf('.ZIP') < 0 || fileSize < 100) {
						// 덱스트 업로드 컴포넌트
						dx.getItemById(ids[0]);
					} else {
						// 브라우저 다운로드로 던짐
						dx.downloadById(ids[0]);
						return;
					}
				}
			} else {
				//  ga 로그
				for (var i = 0; ids.length > i; i++) {
					var tempId = ids[i];
					var item = dx.getItemById(tempId);
					var fileName = item.name;
					gtag('event', '다운로드', {
						'event_category': '자료다운로드',
						'event_label': fileName
					});
				}
			}
		}
		dx.download(flag, isMulti == true);
	}
}

function urlDown(fileUrl) {
	var URI = fileUrl.replace('https://', '').split('/');
	var orgFileName = '';
	var saveFileName = '';
	var saveFilePath = '/';
	if (URI != undefined && URI.length > 0) {
		orgFileName = URI[URI.length - 1];
		saveFileName = fileUrl;
		for (var i = 1; i < URI.length - 1; i++) {
			saveFilePath += URI[i] + '/';
		}
	}

	var frm = document.urlDown;
	frm.orgFileName.value = orgFileName;
	frm.saveFileName.value = saveFileName;
	frm.saveFilePath.value = saveFilePath;
	frm.submit();
}

function onDX5Created(id) {
	var files = returnvalue.split('^');
	var pushfile = '';
	for (var i = 1; i < files.length; i++) {
		if (ufiles == 'Y') {
			if (dttype == 'URL') {
				var ff = files[i].split('/');
				var chff = decodeURIComponent(ff[ff.length - 1]);
				files[i] = files[i].replace(ff[ff.length - 1], chff);
			}
			pushfile += '|' + files[i];
		} else {
			var arrfile = files[i].split('x%x');
			if (arrfile[2] == 'Y') {
				pushfile += '|' + arrfile[0];
			}
		}
	}
	dx = dx5.get(id);
	var arrTemp = pushfile.split('|');
	var arrFileSize = null;
	if (sFileSize != '') {
		arrFileSize = sFileSize.split(',');
	}
	for (var i = 1; i < arrTemp.length; i++) {
		var fileUrl = arrTemp[i];
		var protocol = window.location.protocol;
		if (protocol == 'https:') {
			fileUrl = fileUrl.replace('http://', 'https://');
		}
		var arrTemp2 = arrTemp[i].split('/');
		var fileName = arrTemp2[arrTemp2.length - 1];
		dx.addVirtualFile({
			vindex: i,
			name: fileName,
			downUrl: fileUrl,
			size: arrFileSize[i - 1]
		});
	}
	dx.setUIStyle({
		filterVisible: false,
		sizeColumnVisible: true,
		downloadButtonVisible: false,
		itemHeight: parseInt(36, 10),
		checkerVisible: false,
		statusBarVisible: false,
		headerHeight: parseInt(37, 10)
	});
	dx.setLimitMultiDownloadSize(1024 * 1024 * 10000);
}

$(function() {
	dx5.create({
		mode: 'multi', id: 'dext5', parentId: 'dext5-container', btnFile: 'btn-add-files' , progressType: '0'
	});
});