var plus_sound = new Audio("./tools/sound/score_plus.mp3");
var minus_sound = new Audio("./tools/sound/score_minus.mp3");
var done_sound = new Audio("./tools/sound/done_sound.mp3");
$(function(){
    $("#btn_start").on("click", function(event) {
        if($('#group').val()==''){
            showPopup('모둠 수를 설정해 주세요.');
        } else if($('#target_score').val()=='' || $('#target_score').val()==0){
            showPopup('목표 점수를 설정해 주세요.');
        } else if(($('#s_plus_1').val()=='' || $('#s_plus_1').val()==0) && ($('#s_plus_2').val()=='' || $('#s_plus_2').val()==0)){
            showPopup('점수 단위를 입력하세요.');
        } else {
            readyRace();
            $('#groupSetPopup').hide();
            $('.score_start_page').hide();
            $('.score_race_page').show();
        }
    });
    $(document).on("focusout ","input[id=group]", function(){
        if($('#group').val()==1){
            $('#group').val('');
        }
    });
    $(document).on("keypress keyup mouseup","input[id=group]", function(){
        check_length(2,this);
        check_min(1, this);
        check_max(10, this);
    });

    $('input[id=target_score]').on("keypress keyup mouseup", function(e){
        check_length(3,this);
        check_max(100, this);
        $('#target_score_text').text($('#target_score').val()+'점');
    });

    $('input[id=s_plus_1]').on("keypress keyup mouseup", function(e){
        check_length(3,this);
        check_max(100, this);
    });
    $('input[id=s_plus_2]').on("keypress keyup mouseup", function(e){
        check_length(3,this);
        check_max(100, this);
    });
    $('input[id=s_minus_1]').on("keypress keyup mouseup", function(e){
        check_length(3,this);
        check_max(100, this);
    });
    $('input[id=s_minus_2]').on("keypress keyup mouseup", function(e){
        check_length(3,this);
        check_max(100, this);
    });
    $(document).on("keypress keyup mouseup","textarea[name=group_name]", function(e){
        check_length(10,this);
    });
    $(document).on("keypress keyup mouseup","#win_msg", function(e){
        check_length(15,this);
    });
    $(document).on("blur","input[id=win_msg]", function(){
        if($(this).val()==''){
            $(this).val($(this).data('default'));
        }
    });
    $(document).on("blur","textarea[name=group_name]", function(e){
        if($(this).val()==''){
            $(this).val($(this).data('default'));
        }
    });
    $(document).on("mouseenter",".lane_area .name_box .plus_btn", function(e){
        $(this).siblings(".eval_tooltip").show();
    });
    $(document).on("mouseleave",".lane_area .name_box .btn_box", function(e){
        $(this).find(".eval_tooltip").hide();
    });
    $(document).on("click",".score_reset_btn", function(e){
        $('.lane_area').empty();
        $('#groupSetPopup').hide();
        $('.score_start_page').show();
        $('.score_race_page').hide();
    });
    $(document).on("click",".eval_tooltip_list li button", function(e){
        var charactor_box1 = $(e.target).closest('.each').find('.charactor_box').eq(0);
        var charactor_box2 = $(e.target).closest('.each').find('.charactor_box').eq(1);
        $(charactor_box1).css('overflow','hidden');
        var location = $(charactor_box1).css('bottom').replace('%','').replace('px','');
        var score = $(charactor_box1).find('.score');
        var move = Number($(e.target).text());
        var up_gif = "tools/img/help/score_up.gif?d="+new Date().getTime();
        var up_full_gif = "tools/img/help/score_up_full.gif?d="+new Date().getTime();
        var down_gif = "tools/img/help/score_down.gif?d="+new Date().getTime();
        if(move>0){
            play_plus_sound();
        } else {
            play_minus_sound();
        }
        var score_num = (Number($(score).text())+move);
        if(score_num >= $('#target_score').val()){
            score_num = $('#target_score').val();
        }
        if(score_num < 0){
            score_num = 0;
        }
        location = score_num / Number($('#target_score').val()) * 100;
	$(score).text(score_num);
        $(".eval_tooltip").hide();
            if(move>0){
                $(charactor_box1).find('.char_front').hide();
                $(score).hide();
                $(charactor_box1).find('.char_back').show();
            }
            $(charactor_box2).css('bottom',location+'%');
            $(charactor_box2).fadeIn(500, function(){
                $(charactor_box1).animate(
                    { bottom:  location+'%'},
                    { duration: 900, easing: 'easeOutBounce',
                        complete: function(){
                            $(charactor_box1).find('.char_front').show();
                            $(charactor_box1).find('.char_back').hide();
		    $(charactor_box1).find('.full').hide();
                            $(charactor_box2).fadeOut(1000, function(){});
                            $(score).show();
                            
                            if(score_num >= $('#target_score').val()){
                                $(charactor_box1).addClass('full');
                            } else {
                                $(charactor_box1).removeClass('full');
                            }
                            if(score_num >= $('#target_score').val()){
                                $(charactor_box1).find('.char_front').hide();
                                $(charactor_box1).find('.full').show();
                                play_done_sound();
                                showResult($(e.target).closest('.each').find('.name_box textarea').val());
                            }
                        }
                });
            });
    });

    function showPopup(msg){
        $('#groupSetPopup').find('p').text(msg);
        $('#groupSetPopup').show();
    }
    function readyRace(){
        var group = Number($('#group').val());
        var left_empty = parseInt((10-group)/2);
        var right_empty = 10-left_empty-group;
        var each;
        makeScoreBtn();
        for(var i = 0; i < 10; i++){
            if(i<left_empty){
                each = $('.each_sample .each').clone();
                $(each).children('div').hide();
                $('.lane_area').append(each);
            } else if( i< left_empty + group){
                 each = $('.each_sample .each').clone();
                 $(each).find('.name_box textarea').text('모둠 '+ (i+1-left_empty));
                 $(each).find('.name_box textarea').data('default','모둠 '+ (i+1-left_empty));
                 $('.lane_area').append($(each));
            } else {
                each = $('.each_sample .each').clone();
                $(each).children('div').hide();
                $('.lane_area').append(each);
            }
        }
        if(countScoreUnit() <= 2){
            $('.eval_tooltip').addClass('min');
        }else {
            $('.eval_tooltip').removeClass('min');
        }
    }
    function showResult(group_name){
        $('#groupWinPopup div > .gname').text(group_name);
        $('#groupWinPopup div > .txt2').text($('#win_msg').val());
        $('#groupWinPopup').show();
    }
    function countScoreUnit(){
        var cnt = 0;
        $.each($(".score_unit_box >  li >  input"), function (t, e) {
            if($(this).val()!=''&&$(this).val()!=0){
                cnt++;
            }
        });
        return cnt;
    }
    function play_plus_sound(){
        if (plus_sound.paused) {
            plus_sound.play();
        }else{
            plus_sound.pause();
            plus_sound.currentTime = 0
            plus_sound.play();
        }
    }
    function play_minus_sound(){
        if (minus_sound.paused) {
            minus_sound.play();
        }else{
            minus_sound.pause();
            minus_sound.currentTime = 0
            minus_sound.play();
        }
    }
    function play_done_sound(){
        if (done_sound.paused) {
            done_sound.play();
        }else{
            done_sound.pause();
            done_sound.currentTime = 0
            done_sound.play();
        }
    }
    function makeScoreBtn(){
            var num1 = $('#s_plus_1').val();
            var num2 = $('#s_plus_2').val();
            if(num1 != '' && num1 != 0 && num2 != '' && num2 != 0 ){
                if(Number(num1)<Number(num2)){
                    var tmp = num1;
                    num1 = num2;
                    num2 = tmp;
                }
            }
            if(num1 == '' || num1 == 0){
                $('.eval_tooltip_list li').eq(0).hide();
            } else {
                $('.eval_tooltip_list li').eq(0).show();
            }
            $('.eval_tooltip_list li').eq(0).find('button').text('+'+num1);

            if(num2 == '' || num2 == 0){
                $('.eval_tooltip_list li').eq(1).hide();
            } else {
                $('.eval_tooltip_list li').eq(1).show();
            }
            $('.eval_tooltip_list li').eq(1).find('button').text('+'+num2);

            num1 = $('#s_minus_1').val();
            num2 = $('#s_minus_2').val();
            if(num1 != '' && num1 != 0 && num2 != '' && num2 != 0 ){
                if(Number(num1)>Number(num2)){
                    var tmp = num1;
                    num1 = num2;
                    num2 = tmp;
                }
            }
             if(num1 == '' || num1 == 0){
                $('.eval_tooltip_list li').eq(2).hide();
            } else {
                $('.eval_tooltip_list li').eq(2).show();
            }
            $('.eval_tooltip_list li').eq(2).find('button').text('-'+num1);

            if(num2 == '' || num2 == 0){
                $('.eval_tooltip_list li').eq(3).hide();
            } else {
                $('.eval_tooltip_list li').eq(3).show();
            }
            $('.eval_tooltip_list li').eq(3).find('button').text('-'+num2);
        }
});
