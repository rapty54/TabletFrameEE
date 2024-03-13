var drawing_sound = new Audio("./tools/sound/drawing_sound.mp3");
$(function(){
    var group = 0;
    var total = 0;
    var total_array = new Array();
    var drawing_array = new Array();
    var ex_num1,ex_num2;

    $("input[id=num],input[id=ex_num1],input[id=ex_num2] ").on("keypress keyup mouseup", function(){
        check_length(2,this);
        check_max(99, this);
     });
    $("#btn_group_1").on("click", function(event) {
        group = 1;
        setting_done();
    });
    $("#btn_group_2").on("click", function(event) {
        group = 2;
        setting_done();
    });
    $("#btn_start").on("click", function(event) {
        drawing();
        view_result_page();
    });
    $("#btn_continue").on("click", function(event) {
        drawing();
    });
    $("#btn_again").on("click", function(event) {
        drawing_array = total_array.slice();
        drawing();
    });
    $("#btn_init").on("click", function(event) {
        view_init_page();
    });
    function drawing(){
        play_sound();
        var random_num = Math.floor((Math.random() * drawing_array.length));
        $('#result1').text(drawing_array[random_num]);
         drawing_array.splice(random_num ,1);
         if(group == 2){
                $('#result2').show();
                random_num = Math.floor((Math.random() * drawing_array.length));
                $('#result2').text(drawing_array[random_num]);
                drawing_array.splice(random_num,1);
         } else {
            $('#result2').hide();
         }
         display_num_size();
         if(drawing_array.length < group){
            $('#btn_continue').hide();
         } else {
           $('#btn_continue').show();
         }
    }
    function setting_done(){
        if(check_all_num()){
            total = $('#num').val();
            ex_num1 = Number($('#ex_num1').val());
            ex_num2 = Number($('#ex_num2').val());
            make_tot_array();
            view_draw_page();
        } else {
            $('#drawAlertPopup').show();
        }
    }
    function make_tot_array(){
        total_array = new Array();
        drawing_array = new Array();
        for(var i = 0; i < total; i ++){
            total_array[i] = i+1;
        }
        if(ex_num1 == 0 && ex_num2 != 0){
            ex_num1 = ex_num2;
        } else if(ex_num1 != 0 && ex_num2 == 0){
            ex_num2 = ex_num1;
        }
        if(ex_num1 != 0 && ex_num2 != 0){
            if(ex_num1<=ex_num2){
                total_array.splice(total_array.indexOf(ex_num1),ex_num2-ex_num1+1);
            } else {
                total_array.splice(total_array.indexOf(ex_num2),ex_num1-ex_num2+1);
            }
        }
        drawing_array = total_array.slice();
    }
    function check_all_num(){
        var n = $('#num').val();
        if(n == ''  || Number(n)  == 0 ){
            return false;
        } else {
            return true;
        }
    }
    function view_init_page(){
        $('.draw_input_page').show();
        $('.draw_result_page').hide();
        $('.start_btn_box').show();
        $('.draw_result').hide();
    }
    function view_draw_page(){
        display_num_size();
        $('.draw_input_page').hide();
        $('.draw_result_page').show();
    }
    function view_result_page(){
        $('.draw_input_page').hide();
        $('.draw_result_page').show();
        $('.start_btn_box').hide();
        $('.draw_result').show();
    }
    function display_num_size(){
        $('#tot_num').text(total_array.length );
        $('#drawing_num').text(drawing_array.length );
    }
    function play_sound(){
        if (drawing_sound.paused) {
            drawing_sound.play();
        }else{
            drawing_sound.pause();
            drawing_sound.currentTime = 0
            drawing_sound.play();
        }
    }
});

