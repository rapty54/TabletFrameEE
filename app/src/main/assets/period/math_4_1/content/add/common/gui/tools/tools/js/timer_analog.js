var arc = document.getElementById("arc");
var ctx = arc.getContext("2d");
var arc2 = document.getElementById("arc2");
var ctx2 = arc2.getContext("2d");
$(function(){
     var rot = "rotate(" + (-90) + "deg)";
    $("#arc").css({"-moz-transform" : rot, "-webkit-transform" : rot, "-ms-transform" : rot });
    $("#arc2").css({"-moz-transform" : rot, "-webkit-transform" : rot, "-ms-transform" : rot });

    var seconds = new Date().getSeconds();
    var sdegree = seconds * 6;
    var srotate = "rotate(" + sdegree + "deg)";
    $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "-ms-transform" : srotate });

    var mins = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var mdegree = mins * 6 + seconds*0.1;
    var mrotate = "rotate(" + mdegree + "deg)";
    $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate, "-ms-transform" : mrotate });

    var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var hdegree = hours * 30 + mins * 0.5;
    var hrotate = "rotate(" + hdegree + "deg)";
    $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate, "-ms-transform" : hrotate });

    setInterval( function() {
        var seconds = new Date().getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
        $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "-ms-transform" : srotate });
    }, 1000 );

    setInterval( function() {
        var mins = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var mdegree = mins * 6 + seconds*0.1;
        var mrotate = "rotate(" + mdegree + "deg)";
        $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate, "-ms-transform" : mrotate });
        draw_arc(mdegree, $('#min_r').data('deg'));
    }, 1000 );

    setInterval( function() {
        var hours = new Date().getHours();
        var mins = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var hdegree = hours * 30 + mins * 0.5;
        var hrotate = "rotate(" + hdegree + "deg)";
        $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate, "-ms-transform" : hrotate });
    }, 1000 );

});

function draw_arc(s_deg, e_deg){
    var remain_m = parseInt(time / 60);
    var arc_w = $("#arc").attr('width');
    if(remain_m>=60){
        ctx.clearRect(0, 0, arc_w, arc_w);
        ctx.beginPath();
        ctx.moveTo(arc_w/2, arc_w/2);
        ctx.arc(arc_w/2,arc_w/2,arc_w/2*0.9, 0, (Math.PI/180)*360, false);
        ctx.closePath();
        ctx.fillStyle = "#f93333";
        ctx.globalAlpha = 0.4;
        ctx.fill();
        $("#arc2").show();

        if(s_deg!=e_deg){
            ctx2.clearRect(0, 0, arc_w, arc_w);
            ctx2.beginPath();
            ctx2.moveTo(arc_w/2, arc_w/2);
            ctx2.arc(arc_w/2,arc_w/2,arc_w/2*0.9,(Math.PI/180)*Number(s_deg), (Math.PI/180)*Number(e_deg), false);
            ctx2.closePath();
            ctx2.fillStyle = "#f93333";
            ctx2.globalAlpha = 0.4;
            ctx2.fill();
        }
    } else {
        $("#arc2").hide();
        ctx.clearRect(0, 0, arc_w, arc_w);
        ctx.beginPath();
        ctx.moveTo(arc_w/2, arc_w/2);
        ctx.arc(arc_w/2,arc_w/2,arc_w/2*0.9,(Math.PI/180)*Number(s_deg), (Math.PI/180)*Number(e_deg), false);
        ctx.closePath();
        ctx.fillStyle = "#f93333";
        ctx.globalAlpha = 0.4;
        ctx.fill();
    }
}
function change_arc(e_deg){
    var mins = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var mdegree = mins * 6 + seconds*0.1;
   draw_arc(mdegree, e_deg)
}
function resize_arc(size){
    $('#arc').attr('width',size);
    $('#arc').attr('height',size);
    $('#arc2').attr('width',size);
    $('#arc2').attr('height',size);
    change_arc($('#min_r').data('deg'));
}
  function display_analog_target(){
        var cur_t  = new Date();
        var added_s = time%60;
        var added_m = parseInt(time / 60);
        var added_h = 0;
        if(added_m>60){
            added_h =  parseInt(added_m / 60);
            added_m = added_m % 60;
        }
        cur_t.setSeconds(cur_t.getSeconds() + added_s);
        cur_t.setMinutes(cur_t.getMinutes() + added_m);
        cur_t.setHours(cur_t.getHours() + added_h);

        var seconds = cur_t.getSeconds();
        var sdegree = seconds * 6;
        var srotate = "rotate(" + sdegree + "deg)";
        $("#sec_r").css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "-ms-transform" : srotate });

        var mins = cur_t.getMinutes();
        var seconds = cur_t.getSeconds();
        var mdegree = mins * 6 +  seconds*0.1;
        var mrotate = "rotate(" + mdegree + "deg)";
        $("#min_r").data('deg',mdegree);
        $("#min_r").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate, "-ms-transform" : mrotate });
        change_arc(mdegree);

        var hours = cur_t.getHours();
        var mins = cur_t.getMinutes();
        var seconds = cur_t.getSeconds();
        var hdegree = hours * 30 + mins * 0.5;
        var hrotate = "rotate(" + hdegree + "deg)";
        $("#hour_r").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate, "-ms-transform" : hrotate });
    }