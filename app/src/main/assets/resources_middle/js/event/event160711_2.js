var reg_btn_click = false;	
var regExp = /^[0-9]+$/;

//멀티미디어 이벤트
$(function(){
	$('.btn_reset').click(function() {
		$('input[name="useNo"]').each(function () {
			$(this).val('');
		});
	});
	
	$('input[name="useNo"]').keyup(function () {
			if (!regExp.test($(this).val())) {
				alert('순서 번호는 숫자만 입력해주세요.');
				return false; //break
			}
			if (parseInt($(this).val()) <= 0 || parseInt($(this).val()) >= 5) {
				alert('순서 번호는 1~4까지의 숫자만 입력해주세요.');
				$(this).val('');
				return false; //break
			}
	});
	
	//숫자만 입력되도록 체크(IE11 에서는 input 박스에  style="ime-mode:disabled" 추가해야 한글 입력되는 것을 막을 수 있음)
	$("input[name='useNo']").keydown(function (e) {
		numberValidation(e); //common.js
    });
	
	$(".btn_apply").click(function() {
		if (reg_btn_click == false) {
			reg_btn_click = true;
			
			apply();
		}
		else {	
			return;
		}
	});
	
	$('input[name="useNo"]').click(function() {
		loginCheck();
	});
	
	$('input[name="multiTitle"]').click(function() {
		loginCheck();
	});
	
	$("#multiReason").on("click", function(){
		
		if (!loginCheck())
			return;
		
       	$('.remaining').each(function () {
            // count 정보 및 count 정보와 관련된 textarea/input 요소를 찾아내서 변수에 저장한다.
            var $count = $('.count', this);
            var $input = $("#multiReason");
            
            // .text()가 문자열을 반환하기에 이 문자를 숫자로 만들기 위해 1을 곱한다.
			var maximumCount = 500;

            // update 함수는 keyup, paste, input 이벤트에서 호출한다.
            var update = function () {
                var before = $count.text() * 1;
                //var now = maximumCount - $input.val().length;
                var now = $input.val().length;

                // 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
                if (now > maximumCount) {
                	now = maximumCount;
                    var str = $input.val();
                    alert(maximumCount + "자까지 입력할 수 있습니다.\n\n초과된 내용은 자동으로 삭제 됩니다. ");
                    $input.val(str.substr(0, maximumCount));
                    $count.text(now);
                }

                // 필요한 경우 DOM을 수정한다.
                if (before != now) {
                    $count.text(now);
                }
            };

            // input, keyup, paste 이벤트와 update 함수를 바인드한다
            $input.bind('input keyup paste', function () { setTimeout(update, 0) });

            update();
		});
    });
	
	$("#multiTitle").on("click", function(){	
       	$('.remaining2').each(function () {
            // count 정보 및 count 정보와 관련된 textarea/input 요소를 찾아내서 변수에 저장한다.
            var $count = $('.count2', this);
            var $input = $("#multiTitle");
            
            // .text()가 문자열을 반환하기에 이 문자를 숫자로 만들기 위해 1을 곱한다.
			var maximumCount = 30;

            // update 함수는 keyup, paste, input 이벤트에서 호출한다.
            var update = function () {
                var before = $count.text() * 1;
                //var now = maximumCount - $input.val().length;
                var now = $input.val().length;
                
                // 사용자가 입력한 값이 제한 값을 초과하는지를 검사한다.
                if (now > maximumCount) {
                	now = maximumCount;
                    var str = $input.val();
                    alert(maximumCount + "자까지 입력할 수 있습니다.\n\n초과된 내용은 자동으로 삭제 됩니다. ");
                    $input.val(str.substr(0, maximumCount));
                    $count.text(now);
                }

                // 필요한 경우 DOM을 수정한다.
                if (before != now) {
                    $count.text(now);
                }
            };

            // input, keyup, paste 이벤트와 update 함수를 바인드한다
            $input.bind('input keyup paste', function () { setTimeout(update, 0) });

            update();
		});
    });
});

function loginCheck() {
	if ( memberId == "" ) {
		alert("로그인 후 참여하실 수 있습니다.");
		var url = CONTEXTPATH + "/member/login.do?goURL=" + CONTEXTPATH + "/event/multimediaLink.do";
		$(location).attr("href", url);
		return false;
	}
	else if (applyCnt > 0) {
		alert("이미 이벤트에 참여 하셨습니다.");
		return false;
	}
	
	return true;
} 

function apply() {
	if (eventEndYn == "Y"){
		alert("이벤트 기간이 종료되었습니다.");
        return;
	}
	else if ( !loginCheck() ) {
		reg_btn_click = false;
		return;
	}
	else {
		if (applyCnt <= 0) {
			var useNo = "";
			var useNoSum = 0;
			var cnt = 0;
			$('input[name="useNo"]').each(function () {
				if (cnt == 0) {
					useNo += $(this).val();
					useNoSum += parseInt($(this).val());
					
					if ($(this).val() == "") {
						alert('순서 번호를 1~4까지의 숫자로 입력해주세요.');
						$(this).focus();
						reg_btn_click = false;
						cnt = 1;
						return;
					}
					if (!regExp.test($(this).val())) {
						alert('순서 번호는 숫자만 입력해주세요.');
						$(this).focus();
						reg_btn_click = false;
						cnt = 1;
						return; //break
					}
					if (parseInt($(this).val()) <= 0 || parseInt($(this).val()) >= 5) {
						alert('순서 번호를 1~4까지의 숫자로 입력해주세요.');
						$(this).focus();
						reg_btn_click = false;
						cnt = 1;
						return; //break
					}	
				}				
			});
			
			if (cnt != 0)
				return;
			
			//alert(useNo + " | " + useNoSum);
			
			if (useNoSum != 10){
				alert("Q1) 활용성이 높은 순서를 1~4까지의 숫자로 순차적으로 입력해주세요.");
				$('input[name="useNo"]').eq(0).focus();
				reg_btn_click = false;
				return;
			}
			if ($("#multiTitle").val() == "") {
				alert("Q2) 보완되어야 하는 멀티미디어 자료명을 입력해주세요.");
				$("#multiTitle").focus();
				reg_btn_click = false;
				return;
			}
			if ($("#multiReason").val() == "") {
				alert("Q2) 보완되어야 하는 멀티미디어 자료의 이유를 500자 이내로 입력해주세요.");
				$("#multiReason").focus();
				reg_btn_click = false;
				return;
			}
			
			$.ajax({
	    		type : "POST",
	    		url : CONTEXTPATH + "/event/multimediaLinkApplyInsert.do",
	    		async : false,
	    		cache : false,
	    		dataType : "json",
	    		data :  $("#frmApply").serialize(),
	    		success : function(data){
	    			if(data.code == "0000"){
	    				alert("이벤트 참여가 완료되었습니다. 감사합니다.");
	    				location.reload(); 
                    }else {
                    	alert("이벤트 참여가 정상적으로 완료되지 못했습니다.\n\n고객센터(1544-7714)를 통해 문의바랍니다.");
                    }
	    		},
				error: function (xhr, ajaxOptions, thrownError){
				},
				complete:function (xhr, textStatus){
					reg_btn_click = false;
				}
			});
		}
		else {
			alert("이미 이벤트에 참여 하셨습니다.");
			reg_btn_click = false;
			return;
		}
	}
}