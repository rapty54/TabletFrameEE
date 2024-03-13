/**
 * SMS 관련 클래스
 */
var Sms = function(containerId, authType, callback) {
	this.$container = $('#' + containerId);
	this.callback = callback;
	this.timeInveralId = null;
	this.limitTime = 0;
	this.authType = authType;
	this.send = false;
	var self = this;
	// 휴대폰인증
	this.$container.find('.btn-sms-auth').on('click', function () {
		self.start();
  });
	// 휴대폰번호
	this.$container.find('input.input-sms-phone').on('focusin', function () {
		// self.$container.find('.sms-result').hide();
  });
	// 휴대폰번호 변경확인
	if (self.$container.find('.sms-preivous-number').length > 0) {
		this.$container.find('input.input-sms-phone').on('keyup keydown keypress', function () {
			if (!self.send) {
				if ($(this).val() != self.$container.find('.sms-preivous-number').val()) {
					self.$container.find('.btn-sms-auth').show();
				}	else {
					self.$container.find('.btn-sms-auth').hide();
				}
			}
	  });
	}
	// 휴대폰인증 확인
	this.$container.find('button.btn-sms-auth-check').on('click', function () {
		self.check();
  });	
};

/**
 * 인증 시작.
 */
Sms.prototype.start = function(receiver) {
	var self = this;
	if (!self.send) {
		self.$container.find('.sms-result').hide();
		self.$container.find('input.input-auth-number').val('');
		var data = {
			phoneNo: self.$container.find('.input-sms-phone').val(),
			authType: self.authType
		};
		// 비밀번호 찾기에 사용
		if (self.$container.find('.sms-user-id').length > 0) {
			data['memberId'] = self.$container.find('.sms-user-id').val();
		}
		ajax.call({
			url: '/common/sms/send.json',
			data: data,
			type: 'post',
			success: function(response) {
				if (response.data.randomNumber && response.data.randomNumber.length > 0) {
					alert('인증번호가 발송되었습니다.\n인증번호 : ' + response.data.randomNumber);
				} else {
					alert('인증번호가 발송되었습니다.');
				}
				self.send = true;
				self.$container.find('.btn-sms-auth').hide();
				// 인증고유번호 form에 set
				self.$container.find('input.sms-auth-id').val(data.id);
				// 기존 입력필드 수정못하게
				self.$container.find('input.input-sms-phone').prop('readonly', true);
				// 인증번호 입력박스 보이게
				self.$container.find('.sms-authnumber').show();
				// 기존 타이머 제거
				if (self.timeInveralId != null) {
					clearInterval(self.timeInveralId);
				}			
				// 타이머 
				self.limitTime = new Date(response.data.year, response.data.month, response.data.date, response.data.hour, response.data.minute, response.data.second) - new Date().getTime();
				self.timeInveralId = setInterval(function() {
					self.getTime();
				}, 1000);				
			}
		});
	} else {
		alert('이미 전송되었습니다.');
	}
};

/**
 * 인증번호를 체크.
 */
Sms.prototype.check = function() {
	var self = this;
	ajax.call({
		url: '/common/sms/check.json',
		data: {
			sms_auth_id: self.$container.find('input.sms-auth-id').val(),
			smsAuthCode: self.$container.find('input.input-auth-number').val(),
			authType: self.authType
		},
		type: 'post',
		success: function(response) {
			self.$container.find('.sms-result').hide();
			// 인증완료
			if (response.data.result) {
				clearInterval(self.timeInveralId);
				// 버튼과 입력필드 숨김
				self.$container.find('.sms-authnumber').hide();
				self.$container.find('.sms-result-success').show();
				self.$container.find('.btn-sms-auth').hide();
			} else {
				self.$container.find('.sms-result-fail').show();
			}
			self.callback(response.data);
		}
	});
};

/**
 * 타이머를 체크하고 출력.
 */
Sms.prototype.getTime = function() {
	var self = this;
	// var hours = Math.floor((this.limitTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var miniutes = Math.floor((self.limitTime % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((self.limitTime % (1000 * 60)) / 1000);
	if (this.limitTime < 0) {
		clearInterval(self.timeInveralId);
		self.$container.find('.sms-result').hide();
		self.$container.find('.sms-result-timeout').show();
		self.$container.find('input.input-sms-phone').val('').prop('readonly', false);
		self.$container.find('.sms-authnumber').hide();
		self.$container.find('input.input-auth-number').val('');
		self.$container.find('.btn-sms-auth').removeClass('on').show();
		self.send = false;
	} else {
		self.$container.find('.sms-time').text(self.toTimeString(miniutes) + ":" + self.toTimeString(seconds));
		self.limitTime = self.limitTime - 1000; // 남은시간 -1초
	}
};

/**
 * 숫자 2자리로 변환
 */
Sms.prototype.toTimeString = function(n) {
	return n < 10 ? ("0" + n) : n;
};