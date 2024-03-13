function doCheckPromotionLogin(){
	$.ajax({
		type : "POST",
		url : "https://www.vivasam.com/doCheckPromotionLogin.do",
		cache : false,
		async : false,
		dataType : "jsonp",
		contentType : "javascript/jsonp; charset=utf-8",
		jsonpCallback : "callback",
		success : function(data) {
			if (data.result == "FALSE") {
				location.href = "https://www.vivasam.com/promotion/nes/2021/login.do";
				return;
			}
		},
		error : function(e) {
			console.log(e);
		},
		complete : function(xhr, textStatus) {
			return;
		}
	});
}
