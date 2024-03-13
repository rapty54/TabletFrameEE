function DaumMap(options) {
	this.mapId = options.mapId;
	this.$elLat = options.$elLat;
	this.$elLng = options.$elLng;
	this.elLat = options.elLat;
	this.elLng = options.elLng;
	this.$elAddress = options.$elAddress;
	this.$elZipcode = options.$elZipcode;
	this.element_wrap = null;
	if (this.mapId != undefined) {
		alert('0');
		if (this.$elLat != undefined && this.$elLat != null) {
			alert('1');
			this.show(this.$elLat.val(), this.$elLng.val());
		}
		if (this.elLat) {
			alert('2');
			this.show(this.elLat, this.elLng);
		}
	}
}

DaumMap.prototype.show = function(lat, lng) {
	//마커를 미리 생성
	var _lat = 37.537187;
	var _lng = 127.005476;
	if (lat > 0) {
		_lat = lat;
	}
	if (lng > 0) {
		_lng = lng;
	}
	var mapOption = {
		center: new daum.maps.LatLng(_lat, _lng), // 지도의 중심좌표
		level: 5 // 지도의 확대 레벨
	};
	//지도를 미리 생성
	this.map = new daum.maps.Map(document.getElementById(this.mapId), mapOption);
	//주소-좌표 변환 객체를 생성
	this.geocoder = new daum.maps.services.Geocoder();
	this.marker = new daum.maps.Marker({
		position: new daum.maps.LatLng(_lat, _lng),
		map: this.map
	});
};

DaumMap.prototype.search = function() {
	var self = this;
	this.element_wrap = document.getElementById('daummap-wrap');
	$('#btnFoldWrap').bind('click', function() {
		self.element_wrap.style.display = 'none';
		$("body > header").show();
		$("body > .wrap").show();
	});
	var cls = this;
	$("body > header").hide();
	$("body > .wrap").hide();
	new daum.Postcode({
		oncomplete: function(data) {
			cls.callback(data);
		},
		onresize : function(size) {
      self.element_wrap.style.height = size.height + 'px';
    },
		width : '100%',
    height : '100%'
	}).embed(this.element_wrap);
	// iframe을 넣은 element를 보이게 한다.
	this.element_wrap.style.display = 'block';
};
DaumMap.prototype.callback = function(data) {
	var cls = this;
	// 각 주소의 노출 규칙에 따라 주소를 조합한다.
	// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	var fullAddr = data.address; // 최종 주소 변수
	var extraAddr = ''; // 조합형 주소 변수
	// 기본 주소가 도로명 타입일때 조합한다.
	if (data.addressType === 'R') {
		// 법정동명이 있을 경우 추가한다.
		if (data.bname !== '') {
			extraAddr += data.bname;
		}
		// 건물명이 있을 경우 추가한다.
		if (data.buildingName !== '') {
			extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
		}
		// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
		fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
	}
	// 주소 정보를 해당 필드에 넣는다.
	this.$elAddress.val(fullAddr);
	if (this.$elZipcode != null) {
		this.$elZipcode.val(data.zonecode);
	}
	// 주소로 좌표를 검색
	try {
		this.geocoder.addr2coord(data.address, function(status, result) {
			if (status === daum.maps.services.Status.OK) {
				var lat = result.addr[0].lat;
				var lng = result.addr[0].lng;
				// 해당 주소에 대한 좌표를 받아서
				var coords = new daum.maps.LatLng(lat, lng);
				// 지도를 보여준다.
				// common.mapContainer.style.display = "block";
				cls.map.relayout();
				// 지도 중심을 변경한다.
				cls.map.setCenter(coords);
				// 마커를 결과값으로 받은 위치로 옮긴다.
				cls.marker.setPosition(coords);
				cls.$elLat.val(lat);
				cls.$elLng.val(lng);
			}
		});
	} catch (e) { }
	this.element_wrap.style.display = 'none';
	$("body > header").show();
	$("body > .wrap").show();
};