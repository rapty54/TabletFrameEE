$(function () {
	//topLink
	$(".topLink>ul>li:gt(0)>a").click(function () {
        var idx = $(this).parents("ul").children(".active").index();
        $(".allBrand>a").removeClass("active");
        $(".topLink>ul>li>div").fadeOut();
        $(".topLink>ul>li:gt(0)>a").each(function (i) {
            if (i != (idx - 1)) {
                $(this).find('img').attr("src", $(this).find('img').attr("src").replace("_on.png", ".png"));
            }
        });
        var img = $(this).find("img");
        var imgsrc = $(img).attr("src")
        var imglen = $(img).attr("src").length;
        var imgstr = $(img).attr("src").substr((imglen - 6), imglen);

        if (imgstr != "on.png") {
            $(img).attr("src", imgsrc.replace(".png", "_on.png"));
        }
        //$(this).parent().addClass("active");
        $(this).next(".global").slideDown(500);
        if ($(window).width() <= 1000) {
            $(".topLink .global").width(1000).css({ marginLeft: -500 });
        } else {
            var cw = $("body").width();
            $(".topLink .global").width(cw).css({ marginLeft: -cw / 2 });
        }
		// 브랜드 닫기
        $(".allBrand > a").removeClass("close");
        $(".allBrand > a > img").attr("src", $(".allBrand > a > img").attr("src").replace("allBrand_close.png", "allBrand.png"));

        $('#allBrand:visible').slideUp(500);
        tab1Click();
        return false;
    });
    $(".topLink .global a.close").click(function () {//[alt='close']
        if (!$(this).parents("li").hasClass("active")) {
            $(this).parents(".global").prev("a").find(">img").attr("src", $(this).parents(".global").prev("a").find(">img").attr("src").replace("_on.png", ".png"));
        }
        $(this).parents(".global").slideUp(500);
        return false;
    });

    //전체브랜드
    $('.allBrand>a').click(function () {
        if ($(this).hasClass("close")) {
            $(".allBrand>a").removeClass("active");
            $(this).find('img').attr("src", $(this).find('img').attr("src").replace("allBrand_close.png", "allBrand.png"));
            $(this).removeClass("close");
            $("#allBrand").slideUp();

            return false;
        } else {
            tab1Click();
            $(this).addClass("active");
            $(".topLink>ul>li>div").fadeOut();
            $(this).next(".global").slideDown();
            if ($(window).width() <= 1000) {
                $(this).next(".global").width(1000).css({ marginLeft: -500 });
            } else {
                var cw = $("body").width();
                $(this).next(".global").width(cw).css({ marginLeft: -cw / 2 });
            }
            if ($(".topLink>ul>li").hasClass("active")) {
                $(".topLink .active>div").fadeOut();
            };
            $(this).find('img').attr("src", $(this).find('img').attr("src").replace("allBrand.png", "allBrand_close.png"));
            $(this).addClass("close");
            return false;
        }
    });

    $('.allBrand a.close').click(function () {
        $(".allBrand>a").removeClass("active");
        $(this).parents(".global").slideUp();

        $('.allBrand>a').find("img").attr("src", $('.allBrand>a').find("img").attr("src").replace("allBrand_close.png", "allBrand.png"));
        $('.allBrand>a').removeClass("close");

        return false;
    });
    $('.allBrand .global_cont>div>ul>li>a').on("click", function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().children('ul').hide();
        $(this).parent().addClass('active');
        $(this).next().show();
        var bgPos = $('.allBrand .global_cont>div>ul>li>a').index($(this)) * 37;
        var strpos = "0px " + "-" + bgPos + "px";
        $('.allBrand strong').css('backgroundPosition', strpos);
        return false;
    });
    //전체브랜드 탭
    $('.allBrand .global_cont li li:nth-child(6n)').css('background', '#fafafa');
    $('.allBrand .global_cont li li:nth-child(6n-1)').css('background', '#fafafa');
    $('.allBrand .global_cont li li:nth-child(6n-2)').css('background', '#fafafa');
    $('.allBrand .global_cont li li:nth-child(3n)').css('border-right', 'none', 'width', '324px');


	//즐겨찾기
	$(".favorite").click(function () {
	if (document.all) {
		window.external.AddFavorite('http://www.visang.com/book', '비상교재사이트'); return false;
	} /*else if (window.sidebar) { /* 파폭 안됨
		window.sidebar.addPanel('비상교재사이트', 'http://www.visang.com/book');
	} */else {
		alert("Ctrl+D키를 누르세요");
	}; 
});
});

//global
function global(){
	if ( $(window).width() <= 1000 ){
		$(".topLink .global").width(1000).css({marginLeft: -500});
	} else {
		var cw = $("body").width();
		$(".topLink .global").width(cw).css({marginLeft: - cw / 2 });
	}
}
$(window).ready(function(){
	/*
	footerFixed();
	*/
});
$(window).resize(function(){
	/*
	footerFixed();
	*/
	global();
});

function tab1Click() {
	$(".tab1").children("a").trigger("click");
}



