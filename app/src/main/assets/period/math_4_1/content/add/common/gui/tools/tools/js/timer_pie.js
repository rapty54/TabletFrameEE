//d3
var ing = false;
var arc360 = false;
var width = 756,
    height = 756;
var circumference_r = 250;

var drag = d3.drag()
  .subject(function(d) {
            return {x: d3.select('.dot').select('circle').attr("cx"), y: d3.select('.dot').select('circle').attr("cy")};
        })
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended);

var svg = d3.select("figure").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

var container = svg.append("g");
var circumference = container.append('circle')
    .attr('r', circumference_r)
    .attr('class', 'circumference');

handle = [{
  x: 0,
  y: -circumference_r
}];

handle_circle = container.append("g")
    .attr("class", "dot")
    .selectAll('circle')
    .data(handle)
    .enter().append("circle")
    .attr("r", circumference_r/2)
    .attr("cx", function(d) { return d.x;})
    .attr("cy", function(d) { return d.y;})
    .call(drag);

function dragstarted(d) {
    ing = true;
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
}
function dragged(d) {
    if($("#btn_start").hasClass('stop')){return false;}
    d_from_origin = Math.sqrt(Math.pow(d3.event.x,2)+Math.pow(d3.event.y,2));
    alpha = Math.acos(d3.event.x/d_from_origin);
    d3.select(this)
        .attr("cx", d.x = circumference_r*Math.cos(alpha))
        .attr("cy", d.y = d3.event.y < 0 ? -circumference_r*Math.sin(alpha) : circumference_r*Math.sin(alpha));

    var mouse = Math.atan2(d3.event.y, d3.event.x);
    var deg = mouse / (Math.PI/ 180) + 90;
    var arcMouse = deg < 0 ? 360 + deg : deg;

    if( arcMouse > 359 && arcMouse < 360 && ing){
        arc360 = true;
    } else {
        arc360 = false;
    }
   if(ing && arc360){
        arcMouse = 360;
    }
    arcMouse = (arcMouse - arcMouse%3);
    time = arcMouse*10;
    display_time();
}

function dragended(d) {
    ing = false;
    d3.select(this).classed("dragging", false);
    var mouse = Math.atan2(d3.event.y, d3.event.x);
    var deg = mouse / (Math.PI/ 180) + 90;
    var arcMouse = deg < 0 ? 360 + deg : deg;
    $('#hand').data('deg',arcMouse);
}
//d3 end

var arcCanvas = document.getElementById("arc");
var ctx = arcCanvas.getContext("2d");

function draw_arc(s_deg, e_deg){
    var arc_w = $("#arc").attr('width');
    $("#arc2").hide();
    ctx.clearRect(0, 0, arc_w, arc_w);
    ctx.beginPath();
    ctx.moveTo(arc_w/2, arc_w/2);
    ctx.arc(arc_w/2,arc_w/2,arc_w/2*0.55,(Math.PI/180)*Number(s_deg), (Math.PI/180)*Number(e_deg), false);
    ctx.closePath();
    ctx.fillStyle = "#f93333";
    ctx.globalAlpha = 1;
    ctx.fill();
}
function drag_deg(deg) {
    $('#hand').data('deg',deg);
    draw_arc(0,deg);
    $('span.hand').css({transform:"rotate(" + deg + "deg)"});
    move_slider();
}
function move_slider(){
    var mouse = ($('#hand').data('deg') - 90) * (Math.PI/ 180);
    d3.select('.dot').select('circle')
        .attr("cx", circumference_r * Math.cos(mouse))
        .attr("cy", circumference_r * Math.sin(mouse));
}
function resize_arc(width,height){
    $('#arc').attr('width',width);
    $('#arc').attr('height',height);
    draw_arc(0,$('#hand').data('deg'));
}
function resize_svg(w,h,r){
    width=w;
    height = h;
    circumference_r = r;
    var svg = d3.select("figure").select("svg");
    svg.attr("width", width).attr("height", height);
    svg.select("g").attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var container = svg.select("g");
    container.select('circle').attr('r', circumference_r);
    container.select('g.dot').select('circle')
        .attr("r", circumference_r/2)
        .attr("cx", 0)
        .attr("cy", -circumference_r).call(drag);
    move_slider();
}
$(function() {
    var rot = "rotate(" + (-90) + "deg)";
    $("#arc").css({"-moz-transform" : rot, "-webkit-transform" : rot, "-ms-transform" : rot });
});
