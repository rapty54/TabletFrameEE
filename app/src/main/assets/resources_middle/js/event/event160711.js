//비상교과서 동행 평가단 모집

function disView(val) {
	/* if (val == "schoolFindPop") {
		var sch_kind_checked = false;
		$("input:radio[name=sch_kind_sel_1]:checked").each(function(i){
			sch_kind_checked = true;
		});
		
		//학교급 선택
		if (!sch_kind_checked) {
			alert("학교명 검색전에 학교급을 먼저 선택해주세요.");
			$($("input[name=sch_kind_sel_1]").get(0)).focus();
			return;
		}
	} */
	
	if(document.getElementById(val).style.display == "none")
		document.getElementById(val).style.display = "block";
	else
		document.getElementById(val).style.display = "none";

	if (val == "schoolFindPop") {
		$("#sch_name_input_01").focus();
	}
}

function pop2view(obj,val)
{

	if(val==0)
	{
		
		$("#"+obj).hide();
		$("#"+obj).removeClass("block");
		
	} else {
		alert(11);
		$("#"+obj).show();
	}

}

$(function(){
	//약도보기
	$('.eventEvaluator .btnMap').click(function() {
		$('#mapWrap').show();
		return false;
	});	

	$('#mapWrap .close').click(function() {
		$('#mapWrap').hide();
		return false;
	});
	
	$('#mapWrap .tab a').click(function() {
		var obj = $(this).parent();
		var img = $(this).find('img').attr('src');
		var idx = obj.index() + 1;
		
		$('#mapWrap .tab li').removeClass('on');
		obj.addClass('on');

		$('#mapWrap .tab img').each(function() {
			var _img = $(this).attr('src');
			$(this).attr('src', _img.replace('_on', '_off'));
		});
		$(this).find('img').attr('src', img.replace('_off', '_on'));

		$('#mapWrap .map').hide();
		$('#mapWrap .map'+idx).show();

		return false;
	})
	.mouseover(function() {
		var img = $(this).find('img').attr('src');

		$(this).find('img').attr('src', img.replace('_off', '_on'));
	})
	.mouseout(function() {
		var img = $(this).find('img').attr('src');
		
		if($(this).parent().attr('class').indexOf('on') == -1 || $(this).parent().attr('class').indexOf('on') == undefined ) {
			$(this).find('img').attr('src', img.replace('_on', '_off'));
		}
	});

	$('#mapWrap .btnC a').click(function() {
		window.print();
		return false;
	});
	

	
	$("#popApply .close").click(function() {
		$("#popApply").hide();
		return false;
	});
	
	$("#schoolnName01").click(function() {
		$("#schName").val($("#orgSchName").val());
		$("#schAddr01").show();
		$("#schAddr02").hide();
	});
	
	$("#schoolnName02").click(function() {
		$("#schName").val('');
		$("#schAddr01").hide();
		$("#schAddr02").show();
	});
	
});	