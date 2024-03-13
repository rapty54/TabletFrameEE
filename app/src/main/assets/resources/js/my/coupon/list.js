$(function () {
});

// 내 쿠폰 차시 삭제
function deleteCoupon() {

	var checkList = $("input[name='couponCheck']:checked");

	if (checkList.length === 0) {
		alert("삭제할 쿠폰을 하나 이상 선택해 주세요.");
		return;
	} else if (!confirm("선택한 파일을 정말 삭제하시겠습니까?")) {
		return;
	}

	var data = "";

	checkList.each(function () {
		if ($(this).val()) {
			data += $(this).val() + ",";
		}
	});

	Ajax.execute({
		type: "POST",
		url: "/my/classroom/coupon/delete",
		contentType: 'application/json',
		dataType: 'json',
		cache: false,
		async: false,
		data: JSON.stringify({couponNumbers: data}),
		success: function (data) {
			if (data.code == "SUCCESS") {
				location.reload();
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
		},
		complete: function (xhr, textStatus) {
		}
	});
}

// check
function allCheck(self) {
	$("input[name='couponCheck']").prop("checked", $(self).is(":checked"));
}