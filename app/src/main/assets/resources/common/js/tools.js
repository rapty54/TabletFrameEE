'use strict';

COMMONLIBRARY.createNs('tools');


COMMONLIBRARY.tools = (function () {


  return {
    
    /* 탭 기능 ------------------------------------------------------------------------------- */
    methodTab: function () {
      $(".tabWrap .tabHead li").click(function(){
        var tabWrap = $(this).closest(".tabWrap");
        var tabHead = tabWrap.find(".tabHead");
        var tabBody = tabWrap.find(".tabBody");

        tabHead.find("li").removeClass("on");
        tabBody.find("li").removeClass("on");

        $(this).addClass("on");
        var idx = $(this).index();
        tabBody.find("#tabBody" + idx).addClass("on");
        $(".btnPopToastOpen").removeClass("on");
        $(".popToastWrap").removeClass("on");

        //inside slider reset
        if( tabBody.find(".sliderWrap").length >0) 
        {
          tabBody.find(".sliderWrap").find(".slideList").each(function(index, item){
            $(item).find(".slide").eq(0).addClass("on");
            $(".btnPrev").addClass("dim");
            $(".btnNext").removeClass("dim");
          });
        }


        //Sound        
        playSoundPaging();

      });
    },

    /* 퀴즈풀기 ------------------------------------------------------------------------------- */
    effectBox: function () {
      $(".effectWrap .btnQ").click(function(){ //개별문제 정답확인
        if( $(this).hasClass("trans") ){
          return;
        }

        var parent = $(this).parents(".effectWrap");
        if( $(parent).data("free")!=true && !$(this).hasClass("able")){
          return;
        }

        // 
        if ( $(this).hasClass("open") ) {
          $(this).parents(".verticalDivision").find(".hiddenArea").hide();
        }

        var btnList = $(this).parents(".groupWrap").find(".btnQ");
        var group = $(this).parents(".groupWrap").attr("id");
        var bAll = true;

        //q 버튼열기        
        $(this).toggleClass("trans");

        //텍스트 opacity 형인경우
        if( $(parent).data("type")=="showhide"){
          $(parent).find(".txtQ").removeClass("on");
          $(parent).find(".txtA").addClass("on");
        }

        //정답확인<->다시풀기 전환 체크
        for(var i=0; i<btnList.length; i++){
          if( !$(btnList).eq(i).hasClass("trans")){
            bAll = false;
            break;
          }
        }

        //group check
        if (bAll){
           $(".quizBtnWrap .btnCorrect[data-group='" + group + "']").addClass("re");
        }
        else{
          $(".quizBtnWrap .btnCorrect[data-group='" + group + "']").removeClass("re");
        }

        //순서없는 버튼
        if( $(parent).data("free")==true ){
        }
        //순서대로 열리는 버튼
        else{
          //order가 지정된 버튼
          var order = $(this).data("order");
          var bAll = true;
          if(order>-1){

            //같은 order버튼들이 다 열렸는지 먼저 체크
            for(var i=0; i<btnList.length; i++){
              var now = $(btnList).eq(i).data("order")+"";
              //order 지정여부 체크
              if( now=="" ){continue;}
              now = parseInt(now);

              //클릭된 버튼과 같은 order인지 체크
              if ( now==order){
                //버튼이 모두 열렸는지 체크
                if( !$(btnList).eq(i).hasClass("trans") ){                  
                  bAll =false;
                }
              }
            }

            if(bAll==false){
              playSoundClick();
              return;
            }

            //
            for(var i=0; i<btnList.length; i++){
              var now = $(btnList).eq(i).data("order")+"";
              //order 지정여부 체크
              if( now=="" ){continue;}
              now = parseInt(now);

              if( now == (order+1) ){
                $(btnList).eq(i).addClass("able");
              }
            }
          }
          //order지정없이 차례대로인 버튼
          else{
            //next button : disable -> able
            $(btnList).eq(i).addClass("able"); 
          }
        }

        playSoundClick();
      });

      $(".quizBtnWrap .btnCorrect").click(function(){ //그룹별 정답확인
        playSoundClick();

        if( $(this).hasClass("relatePop")){
          var popid = $(this).data("pop");
          $("#"+popid).addClass("on");
          $(this).removeClass("re");

          return;                
        }
        var groupId = "#" + $(this).data("group");

        // btnOrderQ
        //var btnList = $(groupId).find(".effectWrap .btnOrderQ");
        if( $(this).hasClass("re")){ //다시 풀기 -> 확인하기
          $(groupId).find(".effectWrap .btnQ, .effectWrap .btnOrderQ").removeClass("trans");
          $(groupId).find(".effectWrap .txtQ").addClass("on");
          $(groupId).find(".effectWrap .txtA").removeClass("on");
          $(this).removeClass("re");
          
          $(".hiddenArea").show();

          //$(btnList).data("clickable","off").removeClass("btnQuizbg");
          //$(btnList).eq(0).data("clickable","on").addClass("btnQuizbg");
        }
        else{  //확인하기 -> 다시 풀기
          $(groupId).find(".effectWrap .btnQ, .effectWrap .btnOrderQ").addClass("trans");
          $(this).addClass("re");
          $(groupId).find(".effectWrap .txtQ").removeClass("on");
          $(groupId).find(".effectWrap .txtA").addClass("on");
          
          $(".hiddenArea").hide();
          
          //$(btnList).data("clickable","off");
        }

        var group = $(this).data('group');
        var btnList = $("#"+group).find(".btnQ, .btnOrderQ");
        
        resetBtnAble(btnList, groupId);

      });

      $(".quizBtnWrap .btnCorrectPopup").click(function(){
        var popId = $(this).data("pop");
        $("#"+popId).addClass("on");
      });

      //STEP 별로 그룹보여주기
      $(".stepView .step button").click(function(){
        var p = $(this).parents(".step");

        //같은 그룹은 한번에 열어주기
        var btnGroup = $(this).data("group");
        $(p).find("button[data-group=" + btnGroup +"]").addClass("trans");

        //모든 버튼이 열려있는지 확인
        var btnList = $(p).find("button");
        var bAll = true;
        for(var i=0; i<btnList.length; i++){
          if( !$(btnList).eq(i).hasClass("trans") ){
            bAll = false;
            break;
          }
        }

        //안열린 버튼있면 패스
        if (!bAll){
          return;
        }

        //보여질 스팟이 있으면 처리
        $(p).find(".spot").addClass("open");

        //다음 스텝보여주기
        setTimeout(function(){viewNext(p);}, 10);

        //모든 버튼이 열렸으면 btnCorrect 보정
        bAll = true;
        btnList = $(".stepGroup button.btnQ");
        for(i=0; i<btnList.length; i++){
          if( !$(btnList).eq(i).hasClass("trans")){
            bAll = false;
            break;
          }
        }

        //group check
        if (bAll){
          $(".quizBtnWrap .btnCorrect").addClass("re");
        }
      });

      //STEP이 포함된 정답확인 버튼처리
      $(".stepGroup .btnCorrect").click(function(){
        if($(this).hasClass("re")) {
          $(".stepView .stepImg").addClass("step2");
          $(".stepView .stepImg").addClass("step3");
          $(".stepView .stepImg").addClass("step4");
          $(".step , .step .spot").addClass("open");
          $(".step button").addClass("trans");
        }
        else{
            stepViewInit();
        }
      });

      function viewNext(p){
        var next = $(p).data("next");
        if(!next){return;}
        $("#"+next).addClass("open");
        $(".stepImg").addClass(next);
      }

      ///////////////////////////////////////////////////////////////////////

      var audioEle = document.createElement('audio');
      var soundUrl = '../resources/media/click.mp3';
      audioEle.setAttribute('class', 'btnSoundClick');
      audioEle.setAttribute('src', soundUrl);
      audioEle.setAttribute('type', 'audio/mpeg');
      $("body").append(audioEle);


      var audioEleOk = document.createElement('audio');
      soundUrl = '../resources/media/feed_ok.mp3';
      audioEleOk.setAttribute('class', 'btnSoundOk');
      audioEleOk.setAttribute('src', soundUrl);
      audioEleOk.setAttribute('type', 'audio/mpeg');
      $("body").append(audioEleOk);

      var audioEleNo = document.createElement('audio');
      soundUrl = '../resources/media/feed_no.mp3';
      audioEleNo.setAttribute('class', 'btnSoundNo');
      audioEleNo.setAttribute('src', soundUrl);
      audioEleNo.setAttribute('type', 'audio/mpeg');
      $("body").append(audioEleNo);

      var audioElePaging = document.createElement('audio');
      soundUrl = '../resources/media/paging.mp3';
      audioElePaging.setAttribute('class', 'btnSoundPaging');
      audioElePaging.setAttribute('src', soundUrl);
      audioElePaging.setAttribute('type', 'audio/mpeg');
      $("body").append(audioElePaging);

    },



    /* 슬라이더 페이징  ------------------------------------------------------------------------ */
    slider: function () {
      var sliderWrap = $(".sliderWrap");
      var slide = $(sliderWrap).find(".slideList");
      //슬라이더 없으면 리던
      if( $(slide).length<1){
          return;
      }

      //슬라이더 갯수 체크해서 페이징 필요없으면 리턴
      var cnt = $(slide).children().length;
      if(cnt<2){
        return;
      }

      //첫번째 슬라이더 보이기
      $(slide).find("li.slide").removeClass("on");
      $(slide).find("li.slide").first().addClass("on");

      //페이징 버튼 붙이기
      $(sliderWrap).append("<a href =\"#\" class=\"btnPrev dim\">이전</a><a href =\"#\" class=\"btnNext\">다음</a>");
      COMMONLIBRARY.view.setSlidBtnPos();


      //페이징 버튼 이벤트 처리
      $(document).on('click','.btnPrev',function(){
        if( $(this).hasClass("dim") ){
          return;
        }

        var sliderWrap = $(this).parents(".sliderWrap");

        //parents type check + init
        var insidePop = $(this).parents(".insidePop");
        if( insidePop.length>0 ){
            sliderInsidePopInit();
        }
        else{
            sliderInit();
        }
        
        //Sound        
        /*
        var clickAudio = document.getElementsByClassName('btnSoundClick')[0];
        if (!clickAudio.ended) {
           clickAudio.currentTime = 0;
        }
        clickAudio.play();
        */
        playSoundPaging();

        var now = $(sliderWrap).find(".slide.on").index();
        now--;

        $(".sliderWrap .slideList .slide").removeClass("on");
        //$(".sliderWrap .slideList .slide").eq(now).addClass("on");
        $(sliderWrap).find(".slide").eq(now).addClass("on");

        if(now<1){
          $(".sliderWrap .btnPrev").addClass("dim");
        }
        
        $(".sliderWrap .btnNext").removeClass("dim");

        //좌우이동버튼 위치 설정
        COMMONLIBRARY.view.setSlidBtnPos();

        //pop button show/hide 
        popBtnCheck(slide);

        //toggleItem show/hide
        toggleCheck(slide); 
      });

      //페이징 버튼 이벤트 처리
      $(document).on('click','.btnNext',function(){
        if( $(this).hasClass("dim") ){
          return;
        }

        //parents type check + init
        var insidePop = $(this).parents(".insidePop");
        if( insidePop.length>0 ){
            sliderInsidePopInit();
        }
        else{
            sliderInit();
        }

        var sliderWrap = $(this).parents(".sliderWrap");
        

        //var now = $(slide).find(".slide.on").index();
        var now = $(sliderWrap).find(".slide.on").index();
        now++;

        $(".sliderWrap .slideList .slide").removeClass("on");
        //$(".sliderWrap .slideList .slide").eq(now).addClass("on");
        $(sliderWrap).find(".slide").eq(now).addClass("on");

        $(".sliderWrap .btnPrev").removeClass("dim");

        //Sound        
        playSoundPaging();
        
        now++;
        var len = $(sliderWrap).find(".slideList").children().length;

        if( len == now){
          $(this).addClass( "dim" );
        }

        //pop button show/hide 
        popBtnCheck(slide);

        //toggleItem show/hide
        toggleCheck(slide); 
        //좌우이동버튼 위치 설정
        COMMONLIBRARY.view.setSlidBtnPos();
        
        resetView();
        
      });

      function popBtnCheck(slide){
        var popBtn = $(".btnPopFullOpen");
        if(popBtn.length>0){
          popBtn.removeClass("show");
          for (var btni=0; btni<popBtn.length; btni++){

            var showidx = $(popBtn[btni]).data("showidx")+"";
            if( showidx == "" ){ continue; }
            if (showidx.indexOf("/")<0){ 
              showidx = showidx + "/";
            }

            var arr = showidx.split("/");

            for(var i=0; i<arr.length; i++){
              if( arr[i]=="" ){
                break;
              }
              if( arr[i]==$(slide).find(".slide.on").index() ){
                $(popBtn[btni]).addClass("show");
              }
            }
          }
        }

        //토스트팝업
        popBtn = $(".btnPopToastOpen");
        if(popBtn.length>0){
          popBtn.removeClass("show");
          for (btni=0; btni<popBtn.length; btni++){

            var showidx = $(popBtn[btni]).data("showidx")+"";
            if( showidx == "" ){ continue; }
            if (showidx.indexOf("/")<0){ 
              showidx = showidx + "/";
            }

            var arr = showidx.split("/");

            for(var i=0; i<arr.length; i++){
              if( arr[i]=="" ){
                break;
              }
              if( arr[i]==$(slide).find(".slide.on").index() ){
                $(popBtn[btni]).addClass("show");
              }
            }
          }
        }
      }

      function toggleCheck(slide){
        var toggleItem = $(".toggleItem");
        if(toggleItem.length>0){
          toggleItem.removeClass("show");
          for (var toggleItemi=0; toggleItemi<toggleItem.length; toggleItemi++){

            var showidx = $(toggleItem[toggleItemi]).data("showidx")+"";
            if( showidx == "" ){ continue; }
            if (showidx.indexOf("/")<0){ 
              showidx = showidx + "/";
            }

            var arr = showidx.split("/");

            for(var i=0; i<arr.length; i++){
              if( arr[i]=="" ){
                break;
              }
              if( arr[i]==$(slide).find(".slide.on").index() ){
                $(toggleItem[toggleItemi]).addClass("show");
              }
            }
          }
        }
      }
      //화면 초기화
      function sliderInsidePopInit(){
      };

      //화면 초기화
      function sliderInit(){
        var $frame = $('.frame_container iframe').get(0);
        if($frame){
            $frame.contentWindow.postMessage('RESET', '*');
        }
        $(".btnPopToastOpen").removeClass("on");
        $(".btnPopFullOpen").removeClass("on");
        $(".popFullWrap").removeClass("on");
        $(".popToastWrap").removeClass("on");
        $(".effectWrap").removeClass("on");
        $(".effectWrap .btnQ").removeClass("trans");
        $(".effectWrap .btnQ").removeClass("able");
        $(".effectWrap .btnQ[data-able='true']").addClass("able");
        $(".effectWrap .btnQGroup").removeClass("trans");
        $(".effectWrap .btnQGroup").removeClass("able");
        $(".effectWrap .btnQGroup[data-clickable='on']").addClass("able");
        $(".btnCorrect").removeClass("re");
        $(".btnCorrectGroup").removeClass("re");

        $(".sliderWrap input").val("");
        $("input:checkbox").prop("checked", false);
        stepViewInit();
        $(".hiddenArea").show();

        initTabWrap();
      };
    },

    /* 팝업 레이어 ------------------------------------------------------------------------ */
    popLayer: function () {
      //팝업창 닫기
      $(".popFullWrap .btnClose").click(function(){
        var p = $(this).parents(".popFullWrap");

        $(p).find(".btnQ").removeClass("trans");
        $(p).find(".btnCorrect").removeClass("re");
        $(p).removeClass("on");

        var btnList =  $(p).find(".btnQ");
        resetBtnAble(btnList);

        // 팝업창 안에 슬라이드 있을 때, 초기화
        if ( $(p).find(".pop_slide") ) {
          $(p).find(".pop_btnPrev, .pop_btnNext").removeClass("dim");
          $(p).find(".pop_btnPrev").addClass("dim");
          $(p).find(".pop_slide").removeClass("on");
          $(p).find(".pop_slide:first-child").addClass("on");
        }

        if($(p).hasClass('popupGif')){
          $(".aniReloadWrap .btnReload").trigger('click');
        }
      });

      //레이어 팝업 - 전체창 열기
      $(".btnPopFullOpen").click(function(){

        //Sound        
        playSoundClick();

        var popId = $(this).data("pop");
        $("#"+popId).addClass("on");

        //팝업 슬라이드 초기화
         $(".pop_slide").removeClass("on");
         $(".pop_slide:first-child").addClass("on");

         resetView();
      });

      //레이어 팝업 - 토스트창 열기
      $(".btnPopToastOpen").click(function(){
        var popId = $(this).data("pop");
        
        if( $(this).hasClass("on") ){
          $(this).removeClass("on");
          $("#"+popId).removeClass("on");
        }
        else{
          $("#"+popId).addClass("on");
          $(this).addClass("on");
        }

        playSoundClick();
      });

      //레이어팝업 - 토스트 닫기
      $(".btnPopToastClose").click(function(){ 
        $(this).parents(".popToastWrap").removeClass("on");
        $(this).parents(".popGroup").find(".btnPopToastOpen").removeClass("on");
      });



      //슬라이더 버튼 (이전으로)
      $(".pop_btnPrev").click(function(){
        if( $(this).hasClass("dim") ){
          return;
        }

        //var sliderWrap = $(this).parents(".sliderWrap");

        //parents type check + init
        var insidePop = $(this).parents(".insidePop");
        if( insidePop.length>0 ){
            popSliderInsidePopInit();
        }
        var pop_slideList = $(insidePop).find(".pop_slideList");
        
        //Sound        
        playSoundPaging();

        var now = $(pop_slideList).find(".pop_slide.on").index();
        now--;

        $(".pop_sliderWrap .pop_slideList .pop_slide").removeClass("on");
        $(pop_slideList).find(".pop_slide").eq(now).addClass("on");

        if(now<1){
          $(insidePop).find(".pop_btnPrev").addClass("dim");
        }
        
        $(insidePop).find(".pop_btnNext").removeClass("dim");

        //pop button show/hide 
        //popBtnCheck(slide);
        resetView();
      });
      
      //슬라이더 버튼 (다음으로)
      $(".pop_btnNext").click(function(){
        if( $(this).hasClass("dim") ){
          return;
        }

        //parents type check + init
        var insidePop = $(this).parents(".insidePop");
        if( insidePop.length>0 ){
           popSliderInsidePopInit();
        }

        var pop_slideList = $(insidePop).find(".pop_slideList");        

        var now = $(pop_slideList).find(".pop_slide.on").index();
        now++;

        $(".pop_sliderWrap .pop_slideList .pop_slide").removeClass("on");
        $(pop_slideList).find(".pop_slide").eq(now).addClass("on");

        $(insidePop).find(".pop_btnPrev").removeClass("dim");

        //Sound        
        playSoundPaging();
        
        //next 버튼 dim 여부 처리
        now++;
        var len = $(pop_slideList).find(".pop_slide").children().length;

        if( len == now){
          $(this).addClass( "dim" );
        }

        //pop button show/hide 
        //popBtnCheck(slide);
        resetView();
      });

      //닫기버튼일때 정리할거있음?
      $(".btnClose").click(function(){
        
        var insidePop = $(this).parents(".insidePop");
        //type5 타입이면 팝업창의 요소들을 초기화시킴
        if($(insidePop).find(".effectWrap").data("type") == "showhide") {
          $(insidePop).find(".txtQ").addClass("on");
          $(insidePop).find(".txtA").removeClass("on");
          $(insidePop).find(".btnQ").removeClass("trans");
          $(insidePop).find(".pop_btnPrev").addClass("dim");
          $(insidePop).find(".pop_btnNext").removeClass("dim");
          $(insidePop).find(".pop_slide").removeClass("on");
          $(insidePop).find(".pop_slide").eq(0).addClass("on");
        }

      });

      //팝업창(슬라이더버젼)의 초기화
      function popSliderInsidePopInit(){
        $(".insidePop .txtQ").addClass("on");
        $(".insidePop .txtA").removeClass("on");
        $(".insidePop .btnQ").removeClass("trans");
        $(".insidePop .btnCorrect").removeClass("re");

       
      }

    },


    /* 분수 처리 ------------------------------------------------------------------------ */
    mathForm: function () {
      var fracFormNode =$(".formFraction .frac");
      //frac 없으면 리던
      if( $(fracFormNode).length<1){
          return;
      }

      var fracNode ;
      var objT ;
      var objB ;
      for(var i=0; i<fracFormNode.length; i++){
        fracNode = $(fracFormNode).eq(i);
        var arr  = fracNode.html().split("/");

        objT = document.createElement("span");
        objT.className = 't';
        objT.innerHTML = arr[0];
        
        objB = document.createElement("span");
        objB.className = 't';
        objB.innerHTML = arr[2];
        
        $(fracNode).html("");
        $(fracNode).append("<span class='t'>" + arr[0] + "</span><span class='b'>" + arr[1] + "</span>");

      }

    },

    toggleShow: function (){
      var toggleItem = $(".toggleItem");
      if(toggleItem.length>0){
        for (var toggleItemi=0; toggleItemi<toggleItem.length; toggleItemi++){
          var showidx = $(toggleItem[toggleItemi]).data("showidx") + "";
          if( showidx == "" ){ continue; }
          if (showidx.indexOf("/")<0){ 
            showidx = showidx + "/";
          }

          var arr = showidx.split("/");

          for(var i=0; i<arr.length; i++){
            if( arr[i]=="0" ){
              $(toggleItem[toggleItemi]).addClass("show");
            }
          }
        }
      }
    },

    /* 팝업 버튼 처리 ------------------------------------------------------------------------ */
    popBtn: function () {
      //팝업레이어
      var btn = $(".btnPopFullOpen");
      if(btn.length>0){
        for (var btni=0; btni<btn.length; btni++){
          var showidx = $(btn[btni]).data("showidx") + "";
          if( showidx == "" ){ continue; }
          if (showidx.indexOf("/")<0){ 
            showidx = showidx + "/";
          }

          var arr = showidx.split("/");

          for(var i=0; i<arr.length; i++){
            if( arr[i]=="0" ){
              $(btn[btni]).addClass("show");
            }
          }
        }
      }

      //토스트팝업
      btn = $(".btnPopToastOpen");
      if(btn.length>0){
        for (btni=0; btni<btn.length; btni++){
          var showidx = $(btn[btni]).data("showidx") + "";
          if( showidx == "" ){ continue; }
          if (showidx.indexOf("/")<0){ 
            showidx = showidx + "/";
          }

          var arr = showidx.split("/");

          for(var i=0; i<arr.length; i++){
            if( arr[i]=="0" ){
              $(btn[btni]).addClass("show");
            }
          }
        }
      }
      
    },

    /* OX 퀴즈 --------------------------------------------------------------------------------*/
    oxQuiz: function () {
      $(".oxSelect").on("click", function(){  
        if(!$(this).hasClass("default")){
          
          $(this).addClass("default");
            
          if($(this).data("answer") === "o"){
            $(this).find(".answerImg").show();  
            // correct sound
            playSoundOk();
          }
          if($(this).data("answer") === "x"){
            $(this).find(".answerImg").fadeIn(200).fadeOut(200);
            $(this).removeClass("default"); 
            // incorrect sound
            playSoundNo();
          }

        }   

       if($(".oxQuizGrop").find(".answerImg.o:visible") ){
          $(this).addClass("default");
       }         
        if($(".slide.on").find(".oxSelect[data-answer=o]").length === $(".slide.on").find(".answerImg.o:visible").length ){
          $("#btnOXquiz").addClass("re");
          $(".btnOXquiz").addClass("re");
          $(".btnOXquizSlide").addClass("re");
          $(".slide.on").find(".oxSelect").addClass("default");     
        }   
      });
      $("#btnOXquiz, .btnOXquiz").on("click", function() {
        if ($(this).hasClass("re") ) {
          $(".answerImg.o").show();     
          $(".oxSelect").addClass("default");
        } else {
          $(".answerImg.o").hide();
          $(".oxSelect").removeClass("default");
        }
      });

      $(".btnOXquizSlide").on("click", function() {
        if ($(this).hasClass("re") ) {
          $(".slide.on").find(".answerImg.o").show();     
          $(".slide.on").find(".oxSelect").addClass("default");
        } else {
          $(".slide.on").find(".answerImg.o").hide();
          $(".slide.on").find(".oxSelect").removeClass("default");
        }

        $(".btnNext , .btnPrev").click(function(){
          $(".answerImg").hide();
          $(".oxSelect").removeClass("default");

          resetView();
        })
      });
    },


    //////////////////////////////////////////////////////////
    // img click gif , reload restart
    aniReload: function () {
      var gifIng = false;
      $(".aniReloadWrap .imgBox").on("click", function() {
        if(gifIng){
          return;
        }
        //gifIng = true;
        var src = $(this).data("gifsrc");
        $(this).addClass("done");
        gifStart(src);
      });

      $(".aniReloadWrap .btnReload").on("click", function() {
        gifIng = true;
        var src = $(this).next(".imgBox").data("gifsrc");
        $(".aniReloadWrap .imgFirst").css({"opacity":"1"});
        setTimeout(function() { 
          gifStart(src);
        }, 500);
      });
      function gifStart(src) {
        var srcUrl = src + "?" + Math.random();

        $(".aniReloadWrap .imgFirst").css({"opacity":"0"});
        $(".aniReloadWrap .gifimg").attr('src', srcUrl);;
      };
    },

    resetGif: function () {   
      $(".aniReloadWrap .imgFirst").css({"opacity":"1"});
      $(".aniReloadWrap .imgBox").removeClass("done");
    
    },

    // 세로샘 버튼 위치
    formVert: function () {
      $("#wrap .formVertQuiz").each(function(index, item) {
        var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
            mt = $('#wrap').css('transform').match(matrixRegex),
            scaleVal = Number(mt[1]) ;

        if ( $(item).hasClass("case2") ) {
          return;
        } else if ( $(item).hasClass("case3") ) {
          var pointX =  $(item).find(".line2").offset().left/scaleVal 
                        + $(item).find(".line2").outerWidth()/2 
                        - 36 //물음표 이미지 width의 반
                        - $(item).find(".line3 .effectWrap").offset().left/scaleVal 
                        +9 ;
          $(item).find(".line3 .effectWrap .inner button").css({"background-position-x": pointX , "background-position-y":"15px"} );
        }

        else if ( $(item).find(".effectWrap").length > 1 ) {
          $(item).find(".line3 .effectWrap").css({"position":"static", "border-color":"#3e97d6"});
          $(item).find(".line3:last-child").css({"border-top":"2px solid #000"});
          $(item).find(".effectWrap .inner button").css({"left": "-22px"});
        } else {
          var pointX =  $(item).find(".line2").offset().left/scaleVal 
                        + $(item).find(".line2").outerWidth()/2 
                        - 36 //물음표 이미지 width의 반
                        - $(item).find(".line3 .effectWrap").offset().left/scaleVal 
                        - 29; //세로샘에서 배경 이미지 위치 조정했던 만큼 
          $(item).find(".line3 .effectWrap .inner button").css({"background-position-x": pointX , "background-position-y":"0px"} );
        }
      });


    },




    // 그리기도구
    drawTool: function () {
      $("#drawTool").click(function(){
        var mode = $(this).data("mode");
        alert("그리기도구 연동 중 입니다. " + mode);
      });

      //지우는 기능
      function clearView(){
        alert("지우기도구 연동 중 입니다. ");
      }
    },

  };
})();

//그룹 순서지정 btnQ fix
function dataOrderFix(){
  $(".groupWrap[data-type='groupOrderFix'] .btnQGroup[data-clickable='off']").removeClass("able");
}

  function stepViewInit(){
        //이미지를 1번만 보이고 다 가리기
        //$(".stepView .stepImg").removeClass("step1");
        $(".stepView .stepImg").removeClass("step2");
        $(".stepView .stepImg").removeClass("step3");
        $(".stepView .stepImg").removeClass("step4");

        //버튼들은 첫번째 그룹만 보이고 다 가리기
        $(".step").removeClass("open");
        $(".step").eq(0).addClass("open");

        //모든 버튼을 초기화하기
        $(".step button").removeClass("trans");
        $(".step .spot").removeClass("open");
  }

  function resetView() { //화면전환시 초기화 되어야 하는 기능
    formVert();
  }

  function formVert() {
    $("#wrap .formVertQuiz").each(function(index, item) {
      var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/,
          mt = $('#wrap').css('transform').match(matrixRegex),
          scaleVal = Number(mt[1]) ;

      if ( $(item).hasClass("case2") ) {
        return;
      } else if ( $(item).hasClass("case3") ) {
        var pointX =  $(item).find(".line2").offset().left/scaleVal 
                      + $(item).find(".line2").outerWidth()/2 
                      - 36 //물음표 이미지 width의 반
                      - $(item).find(".line3 .effectWrap").offset().left/scaleVal 
                      +9 ;
        $(item).find(".line3 .effectWrap .inner button").css({"background-position-x": pointX , "background-position-y":"15px"} );
      }

      else if ( $(item).find(".effectWrap").length > 1 ) {
        $(item).find(".line3 .effectWrap").css({"position":"static", "border-color":"#3e97d6"});
        $(item).find(".line3:last-child").css({"border-top":"2px solid #000"});
        $(item).find(".effectWrap .inner button").css({"left": "-22px"});
      } else {
        var pointX =  $(item).find(".line2").offset().left/scaleVal 
                      + $(item).find(".line2").outerWidth()/2 
                      - 36 //물음표 이미지 width의 반
                      - $(item).find(".line3 .effectWrap").offset().left/scaleVal 
                      - 29; //세로샘에서 배경 이미지 위치 조정했던 만큼 
        $(item).find(".line3 .effectWrap .inner button").css({"background-position-x": pointX , "background-position-y":"0px"} );
      }
    });
  }

  function resetBtnAble(btnList, groupId){
    !groupId && (groupId = null)
    $(btnList).removeClass("able");
    var bOrder = -1;
    if($(btnList).data("order")>=0){
      //같은 order버튼들이 다 열렸는지 먼저 체크

      for(var i=0; i<btnList.length; i++){
        var now = $(btnList).eq(i).data("order")+"";
        //order 지정여부 체크

        if(now =="" ){continue;}

        if( bOrder>-1 && bOrder!=now){
          break;
        }
        bOrder = now;
        $(btnList).eq(i).addClass("able");
      }
    }
    //그룹이 없을 경우는 첫번째 버튼에 able넣기
    if(bOrder<0){
      if(groupId != null && $(groupId).find(".effectWrap .btnQ[data-able=true]").length > 0 ){
        $(groupId).find(".effectWrap .btnQ[data-able=true]").addClass("able");
      }else{
        $(btnList).eq(0).addClass("able");
      }
    }
  }
  function initTabWrap(){
    var tabWrap = $(".tabWrap");
    if($(tabWrap).length == 1){
        $(tabWrap).each(function(i,itm){
            var tabHead = $(this).find(".tabHead");
            var tabBody = $(this).find(".tabBody");

            $(tabHead).find("li").removeClass("on");
            $(tabBody).find("li").removeClass("on");

            $(tabHead).find("li").eq(0).addClass("on");
            $(tabBody).find("li").eq(0).addClass("on");
        });
    }
  }

// 효과음 수정
var commonAudioEffect = {};
function initCommonAudio() {
  commonAudioEffect["ok"] = new Audio();
  commonAudioEffect["ok"].src = '../resources/media/feed_ok.mp3';

  commonAudioEffect["no"] = new Audio();
  commonAudioEffect["no"].src = '../resources/media/feed_no.mp3';

  commonAudioEffect["click"] = new Audio();
  commonAudioEffect["click"].src = '../resources/media/click.mp3';

  commonAudioEffect["paging"] = new Audio();
  commonAudioEffect["paging"].src = '../resources/media/paging.mp3';
};

function playSoundOk(){
  !commonAudioEffect["ok"] && initCommonAudio();
  var audio = commonAudioEffect["ok"];
  audio && (audio.load(), audio.play());
}

function playSoundNo(){
  !commonAudioEffect["no"] && initCommonAudio();
  var audio = commonAudioEffect["no"];
  audio && (audio.load(), audio.play());
}

function playSoundClick(){
  !commonAudioEffect["click"] && initCommonAudio();
  var audio = commonAudioEffect["click"];
  audio && (audio.load(), audio.play());
}


function playSoundPaging(){
  !commonAudioEffect["paging"] && initCommonAudio();
  var audio = commonAudioEffect["paging"];
  audio && (audio.load(), audio.play());
}
