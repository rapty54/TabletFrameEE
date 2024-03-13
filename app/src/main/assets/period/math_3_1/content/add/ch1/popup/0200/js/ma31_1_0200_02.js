var video;
$(window).on('load',function(){

  video = new videoPlayer($('.videoFrame'));
  video.init();
})