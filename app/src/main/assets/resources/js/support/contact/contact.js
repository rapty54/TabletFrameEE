$(document).ready(function() {
	$('#schSiDoCd').on('change',function() {
		getQnaSubjectCd();
		getContactList();
	});
	
	$('#schGuGunCd').on('change',function(){
		getContactList();
	});
	
	// 카카오 지도 열기
	$('#btn-map-layer-open').bind('click', function() {
		// 팝업창 호출
		Layer.openLayer({
			url: '/support/contact/map.popup',
			callback: function($div) {
				var container = document.getElementById('kakao-map');
				var options = {
				center: new kakao.maps.LatLng(37.48722456415066, 126.89461952944004),
					level: 3
				};
				var map = new kakao.maps.Map(container, options);
				
				var markerPosition  = new kakao.maps.LatLng(37.48722456415066, 126.89461952944004);
				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
				    position: markerPosition
				});
				marker.setMap(map);
			}
		});
	});
	$('.go_list .btn_type02').click(function(){
		history.back();
	})
	$('.popup_wrap').hide();
	$('.mapbtn').click(function(){
		$('.popup_wrap').show();
	})
	$('.popup_close').click(function(){
		$('.popup_wrap').hide();
	})
})

// 시/도 , 구/군 값으로 지사 찾기
function getContactList(){
	var schSiDoCd = $('#schSiDoCd').val();
	var schGuGunCd =  $('#schGuGunCd').val();
	var page = $('#pageNo').val();
	location.href="/support/contact/list?schSiDoCd="+schSiDoCd+"&schGuGunCd="+schGuGunCd
}

// 시/도 값으로 구/군 찾기
function getQnaSubjectCd() {
	var sidoCd = $('#schSiDoCd').val();
	$("#schGuGunCd").empty();
	if (sidoCd == "") {
		var addHtml = '<option value="" selected>구/군 찾기</option>';
		$("#schGuGunCd").append(addHtml);
		return;
	} 
	var data = {
			code1 : sidoCd
	};
	Select2Binder.bindAjax({
		placeholder: '선택해주세요.', 
		url: '/support/contact/area/dtl.json', 
		data: data, 
		id: 'schGuGunCd'
	});
}