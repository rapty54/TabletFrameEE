// Ajax 데이터 전송 (No Async) : 리턴형이 없는 경우
function AjaxPostNormalType ( reqUrl, reqData ) {
	$.ajax({
		type: "POST",
		url: reqUrl,
		cache: false,
		async: false,
		dataType: "json",
		data: reqData,
		success: function(msg){

		},
		error:function (xhr, ajaxOptions, thrownError){
	            alert(xhr.status + "\nstatusText:" + xhr.statusText);
	            alert(thrownError);
	        } 
	});	
}


//Ajax 데이터 전송 (No Async) : 리턴형이 있는 경우
function AjaxPostReturnsTypeP ( reqUrl, reqData ) {
	var result="";
	$.ajax({
		type: "POST",
		url: reqUrl,
		cache: false,
		async: false,
		dataType: "jsonp",
		data: reqData,
		success: function(msg){		
			alert(msg);
			result = msg;
		},
		error:function (xhr, ajaxOptions, thrownError){
	            //alert(xhr.status + "\nstatusText:" + xhr.statusText);
	            //alert(thrownError);
	        } 
	});	
	
	
	return result;
}


// Ajax 데이터 전송 (No Async) : 리턴형이 있는 경우
function AjaxPostReturnsType ( reqUrl, reqData ) {
	var result="";
	$.ajax({
		type: "POST",
		url: reqUrl,
		cache: false,
		async: false,
		dataType: "json",
		data: reqData,
		success: function(msg){		
			result = msg;
		},
		error:function (xhr, ajaxOptions, thrownError){
	            alert(xhr.status + "\nstatusText:" + xhr.statusText);
	            alert(thrownError);
	        } 
	});	
	return result;
}