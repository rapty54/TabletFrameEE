$(function () {
	$("input[name=inputsite]").click(function () {
		var radioValue = $(this).val();

		//강좌유형 선택 초기화
		$("input[name=inputkind]").each(function () {
			$(this).attr('checked', false);
		});
		//쿠폰 수량 초기화
		$("input[name=inputcount]").each(function () {
			$(this).attr('checked', false);
		});

		if (radioValue == "SOOBAKC") {
			$(".msOption").show();
			$("#couponReceiver").show();
			$("#couponCert").hide();
			$(".esOption").hide();
			//$("#checkInputId").val("수박씨닷컴의 아이디를 입력 후 ‘찾아보기’를 클릭해 주세요.");
		} else {
			$(".msOption").hide();
			$(".esOption").show();
			$("#couponCert").show();
			$("#couponReceiver").hide();
			$("input[name=inputkind]").eq(2).attr('checked', true); //아이패스 자동 체크 처리
			$("input[name=inputcount]").eq(0).attr('checked', true); //아이패스 쿠폰 수량 자동 체크 처리

			//$("#checkInputId").val("아이수박씨닷컴의 아이디를 입력 후 ‘찾아보기’를 클릭해 주세요.");
		}
	});

	$("#checkInputId").each(function () {
		var defaultValue = $(this).val();

		/* if ($("input[name=inputsite]:checked").val() == "SOOBAKC") {
			defaultValue = "수박씨닷컴의 아이디를 입력 후 ‘찾아보기’를 클릭해 주세요.";
		}
		else {
			defaultValue = "아이수박씨닷컴의 아이디를 입력 후 ‘찾아보기’를 클릭해 주세요.";
		} */

		$(this).focus(function () {
			if ($(this).val() == defaultValue) $(this).val("");
		});
		$(this).blur(function () {
			if ($(this).val() == "") $(this).val(defaultValue);
		});
	});

	$(".couponSubmit").click(function () {
		submitCoupon();
	});
});

function checkInputkind() {
	$("input:radio[name=inputkind]:checked").each(function () {
		if ($(this).val() == "UNLIMITED") {
			$("input[name=inputcount]").each(function (i) {
				if (i != 0) {
					$(this).attr('checked', false);
					$(this).parent().parent().hide();
				} else {
					$(this).attr('checked', true);
				}
			});
		} else if ($(this).val() == "LECTURE") {
			$("input[name=inputcount]").each(function (i) {
				$(this).attr('checked', false);
				$(this).parent().parent().show();
			});
		}
	});
}

function checkReceiver() {

	var checkInputId = $("#checkInputId").val();
	// var siteNm = $("input[name=inputsite]:checked").val() === "SOOBAKC" ? "중학(수박씨)" : "초등(아이수박씨)";
	var siteNm = $("input[name=inputsite]:checked").val() === "SOOBAKC" && "온리원";

	if ($.trim(checkInputId) === "") {
		alert("쿠폰 수령자 아이디를 확인해주세요.");
		$("#checkInputId").focus();
		return;
	}

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/coupon/check",
		cache: false,
		async: false,
		contentType: 'application/json',
		dataType: "json",
		data: JSON.stringify({receiverId: checkInputId}),
		success: function (data) {

			console.log(data);

			var result = data.response;

			if (result && confirm("이름 : " + result.mname + "\n아이디 : " + result.memberId + "\n\n쿠폰을 사용할 아이디가 맞습니까?")) {
				$("#inputid").val(result.memberId);
			} else {
				alert('해당 아이디는 ' + siteNm + '에는 존재하지 않습니다.');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
		},
		complete: function (xhr, textStatus) {
			console.log("idx:\n\ncomplete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
		}
	});

}

function submitCoupon() {

	var checkInputId = $("#checkInputId").val();
	var inputid = $("#inputid").val();
	var inputsite = $('input:radio[name=inputsite]:checked').val();
	var inputkind = $('input:radio[name=inputkind]:checked').val();
	var inputcount = $('input:radio[name=inputcount]:checked').val();

	if ($("input[name=inputkind]:checked").length <= 0) {
		alert("강좌유형을 선택해주세요.");
		$("input[name=inputkind]").eq(0).focus();
		return;
	}

	if ($("input[name=inputcount]:checked").length <= 0) {
		alert("쿠폰수량을 선택해주세요.");
		$("input[name=inputcount]").eq(0).focus();
		return;
	}

	if ($("input[name=inputsite]:checked").val() === "SOOBAKC"
		&& ($.trim(checkInputId) === "" || ($.trim(checkInputId) !== "" && inputid === "")
			|| ($.trim(checkInputId) !== inputid))) {
		alert("쿠폰 수령자 아이디를 찾아보기를 통해서 확인해주세요.");
		$("#checkInputId").focus();
		return;
	}

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/coupon/regist",
		cache: false,
		async: false,
		contentType: 'application/json',
		dataType: "json",
		data: JSON.stringify({
			inputid: inputid,
			inputsite: inputsite,
			inputkind: inputkind,
			inputcount: inputcount
		}),
		success: function (data) {

			console.log(data);

			if (data.code === "SUCCESS") {
				alert("감사합니다. 멤버십 쿠폰이 발급되었습니다.");
				location.href = "/my/classroom/coupon/list";
			} else {
				alert(data);
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			console.log("error\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\nthrownError:" + thrownError);
		},
		complete: function (xhr, textStatus) {
			console.log("idx:\n\ncomplete\n" + xhr.status + "\nstatusText:" + xhr.statusText + "\ntextStatus:" + textStatus);
		}
	});
}