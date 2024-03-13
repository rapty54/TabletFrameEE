$(document).ready(function(){

	//btnGroup 별 order
	$(".effectWrap .btnQGroup").click(function(){ //개별문제 정답확인
        if( $(this).hasClass("trans") ){
          return;
        }

        if( !$(this).hasClass("able")){
          return;
        }
        
        //Sound        
        var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
        if (!clickAudio.ended) {
           clickAudio.currentTime = 0;
        }
        clickAudio.play();

        //this button : to trans
        $(this).toggleClass("trans");

        //next button : disable -> able
        var btnList = $(this).parents(".childGroup").find(".btnQGroup");
        for(var i=0; i<btnList.length; i++){
          if( !$(btnList).eq(i).hasClass("trans")){
            break;
          }
        }
        $(btnList).eq(i).addClass("able");

        //group check
        var bAll = true;
        btnList = $(this).parents(".groupWrap").find(".btnQGroup");

        for(var i=0; i<btnList.length; i++){
          if( !$(btnList).eq(i).hasClass("trans")){
            bAll = false;
            break;
          }
        }
        if (bAll){
          $(".quizBtnWrap .btnCorrectGroup").addClass("re");
        }
        else{
          $(".quizBtnWrap .btnCorrectGroup").removeClass("re");
        }

    });


    $(".quizBtnWrap .btnCorrectGroup").click(function(){ //그룹별 정답확인
        var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
        if (!clickAudio.ended) { 
           clickAudio.currentTime = 0;
        }
        clickAudio.play();

        var groupId = "#" + $(this).data("group");

        // btnOrderQ
        var btnList = $(groupId).find(".effectWrap .btnQGroup");

        if( $(this).hasClass("re")){ //다시 풀기 -> 확인하기
          var groupList = $(".childGroup");

          for(var i=0; i<groupList.length; i++){
            var btnList = $(".childGroup").eq(i).find(".btnQGroup");
            $(btnList).removeClass("able");
            $(btnList).removeClass("trans");
            $(btnList).eq(0).addClass("able");
          }

          $(this).removeClass("re");

        }
        else{  //확인하기 -> 다시 풀기
          $(groupId).find(".btnQGroup").addClass("trans");
          $(this).addClass("re");
        }


      });

});