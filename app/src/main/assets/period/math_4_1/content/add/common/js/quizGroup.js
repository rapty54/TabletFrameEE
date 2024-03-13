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

        // check order number
        //order가 지정된 버튼
        var order = $(this).data("order");

        //next button : disable -> able
        var btnList = $(this).parents(".childGroup").find(".btnQGroup");
        for(var i=0; i<btnList.length; i++){
          if(order>-1){
              var now = $(btnList).eq(i).data("order")+"";
              console.log(order, now);
              //order 지정여부 체크
              if( now=="" ){continue;}
              now = parseInt(now);

              //클릭된 버튼과 같은 order인지 체크
              if ( now==order + 1){
                break;
              }
          }else{
            if( !$(btnList).eq(i).hasClass("trans")){
              break;
            }
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

            for(var j=0; j<btnList.length; j++){
              var order = btnList.eq(j).data("order");
              if(typeof(order) != "undefined"){
                if (order == 0){
                  btnList.eq(j).addClass("able");
                  break;
                }
              }else{
                $(btnList).eq(0).addClass("able");
              }
            }
          }

          $(this).removeClass("re");

        }
        else{  //확인하기 -> 다시 풀기
          $(groupId).find(".btnQGroup").addClass("trans");
          $(this).addClass("re");
        }


      });

});