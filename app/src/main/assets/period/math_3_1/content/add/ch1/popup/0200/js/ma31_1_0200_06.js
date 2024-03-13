
;(function(win, doc) {
  function timeLine() {


    var scene1 = gsap.timeline({ paused: true }).set('#scene1', {
                                opacity: 0,
                              }).to('#scene1', {
                                delay:0.4,
                                opacity: 1,
                                duration: 0.6,
                              onComplete: function() {
                                  scene1_1.pause().seek(0).pause();
                                  scene1_1.play();
                                }
                              });
  //추가되는 부분 
    var scene1_1 = gsap.timeline({ paused: true }).set('#scene1_1', {
                                opacity: 0,
                              }).to('#scene1_1', {
                                opacity: 1,
                                duration: 0.6,
                              onComplete: function() {
                                  scene2.pause().seek(0).pause();
                                  scene2.play();
                                }
                              });
    var scene2 = gsap.timeline({ paused: true }).set('#scene2', {
                                opacity: 0,
                              }).to('#scene2', {
                                opacity: 1,
                                duration: 0.6,
                              onComplete: function() {
                                  scene3.pause().seek(0).pause();
                                  scene3.play();
                                }
                              });
      
    var scene3 = gsap.timeline({ paused: true }).set('#scene3', {
                                opacity: 0,
                              }).to('#scene3', {
                                opacity: 1,
                                duration: 0.4
                              }).to('#scene3', {
                                opacity: 0,
                                duration: 0.4
                              }).to('#scene3', {
                                opacity: 1,
                                duration: 0.4
                              }).to('#scene3', {
                                opacity: 0,
                                duration: 0.4,
                                onComplete: function() {
                                  scene4.pause().seek(0).pause();
                                  scene4.play();
                                }
                              });

    var scene4 = gsap.timeline({ paused: true }).set('#scene4', {
                                opacity: 0,
                              }).to('#scene4', {
                                opacity: 1,
                                duration: 0.6,
                              onComplete: function() {
                                  scene5.pause().seek(0).pause();
                                  scene5.play();
                                }
                              });
      
    var scene5 = gsap.timeline({ paused: true }).set('#scene5', {
                                opacity: 0,
                              }).to('#scene5', {
                                opacity: 1,
                                duration: 0.4
                              }).to('#scene5', {
                                opacity: 0,
                                duration: 0.4
                              }).to('#scene5', {
                                opacity: 1,
                                duration: 0.4
                              }).to('#scene5', {
                                opacity: 0,
                                duration: 0.4,
                                onComplete: function() {
                                  scene6.pause().seek(0).pause();
                                  scene6.play();
                                }
                              });

    var scene6 = gsap.timeline({ paused: true }).set('#scene6', {
                                opacity: 0,
                              }).to('#scene6', {
                                opacity: 1,
                                duration: 0.6});

    $("#btnToast01").click(function(){
      if(!$(this).hasClass("re")){
        playScene();
      }
      else{
        scene1.pause();
        scene1_1.pause();
        scene2.pause();
        scene3.pause();
        scene4.pause();
        scene5.pause();
        scene6.pause();

        $("#scene1").css("opacity", 1);
        $("#scene1_1").css("opacity", 0);
        $("#scene2").css("opacity", 0);
        $("#scene3").css("opacity", 0);
        $("#scene4").css("opacity", 0);
        $("#scene5").css("opacity", 0);
        $("#scene6").css("opacity", 0);

      }
    });

    function playScene(){
      scene1.pause();
      scene1_1.pause();
      scene2.pause();
      scene3.pause();
      scene4.pause();
      scene5.pause();
      scene6.pause();

      $("#scene1").css("opacity", 1);
      $("#scene1_1").css("opacity", 0);
      $("#scene2").css("opacity", 0);
      $("#scene3").css("opacity", 0);
      $("#scene4").css("opacity", 0);
      $("#scene5").css("opacity", 0);
      $("#scene6").css("opacity", 0);

      scene1.pause().seek(0).pause();
      scene1.play();   
    }

  }

  $(function() {
    timeLine();
  });
})(window, window.document);

