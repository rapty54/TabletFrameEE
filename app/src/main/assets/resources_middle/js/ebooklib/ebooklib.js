
		function goLibrary() {
			if ( chkLogIn() == "Y" ) {

//				var memberId = LOGIN_ID;
//				var memberName = encodeURI( LOGIN_NM );
//
//				var url = "http://visang.bookcube.biz/FxLibrary/dependency/sso/sso.jsp?param_1="+memberId+"&param_2=&param_3="+memberName+"&param_4=&param_5=vivasam";
//
//				var openNewWindow = window.open("about:blank");
//				openNewWindow.location.href = url;

				window.open('', 'VIVASAM_LIBRARY');
				var f = document.fm;
				f.name.value = name;
				f.target = 'VIVASAM_LIBRARY';
				f.action = 'https://visang.bookcube.biz/FxLibrary/dependency/sso/sso.jsp';
				f.submit();

				//	window.open(url);
			} else {
				if ( confirm("로그인이 필요합니다.") ) {
					var pathname = window.location.pathname;
					var url = CONTEXTPATH + "/member/login.do?goURL=" + pathname;
					$(location).attr("href", url);
				}
			}
		}

		function goEvent() {


			var url = CONTEXTPATH + "/event/eBookRecomView.do";

			location.href = url;
		}


		function chkLogIn() {

			var chkVal = "";

			$.ajax({
	    		type : "POST",
	    		url : CONTEXTPATH + "/member/chkSignInVivasam.do",
	    		async : false,
	    		cache : false,
	    		dataType : "json",
	    		data :  {vivasamformat : "json"},
	    		success : function(data){
	    			chkVal = data.result;
	    		},
				error: function (xhr, ajaxOptions, thrownError){
				},
				complete:function (xhr, textStatus){
				}
			});

			return chkVal;
		}