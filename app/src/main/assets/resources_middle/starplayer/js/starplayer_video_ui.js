var subtitle_url = "http://axis-auth.x-cdn.com/visangtext/scms/cc.asp";

function initScriptVideoUI(z) {
    var F = false;
    var v = false;
    var m;
    $(".starplayer_script_ui a").click(function(i) {
        i.preventDefault()
    });
    $(".starplayer_script_ui").each(function() {
        this.onselectstart = function() {
            return false
        };
        this.unselectable = "on";
        jQuery(this).css("user-select", "none");
        jQuery(this).css("-o-user-select", "none");
        jQuery(this).css("-moz-user-select", "none");
        jQuery(this).css("-khtml-user-select", "none");
        jQuery(this).css("-webkit-user-select", "none")
    });
    $(".btn_play").click(C);
    $(".btn_pause").click(function() {
        z.pause()
    });
    $(".btn_stop").click(function() {
        z.stop()
    });
    $(".btn_backward").click(function() {
        z.backward()
    });
    $(".btn_forward").click(function() {
        z.forward()
    });
    $(".btn_repeat").click(function() {
        r()
    });
    $(".btn_fullscreen").click(function() {
        H()
    });
    $(".smi_change").click(function() {
        h()
    });
    $(".btn_mute").click(function() {
        y()
    });
    $(".btn_speed06").click(function() {
        g(0.6)
    });
    $(".btn_speed08").click(function() {
        g(0.8)
    });
    $(".btn_speed10").click(function() {
        g(1)
    });
    $(".btn_speed12").click(function() {
        g(1.2)
    });
    $(".btn_speed14").click(function() {
        g(1.4)
    });
    $(".btn_speed16").click(function() {
        g(1.6)
    });
    $(".btn_speed18").click(function() {
        g(1.8)
    });
    $(".btn_speed20").click(function() {
        g(2)
    });
    var B = 0;

    function h() {
        if (B == 0) {
            D("KRCC");
            B = 1
        } else {
            D("KRCC");
            B = 0
        }
    }

    function n(i) {
        return i.originalEvent.changedTouches ? i.originalEvent.changedTouches[0].pageX : i.pageX
    }
    $(".seekbar_l").bind("mousedown touchstart", function(K) {
        var L = $(this);

        function I(N) {
            var M = n(N) - L.offset().left;
            var O = (M / L.width()) * z.getDuration();
            if (O < 0) {
                O = 0
            }
            if (O > z.getDuration()) {
                O = z.getDuration()
            }
            return O
        }

        function J(M) {
            var N = I(M);
            p(N);
            M.preventDefault()
        }

        function i(M) {
            F = false;
            var N = z.getCurrentPosition();
            z.setCurrentPosition(I(M));
            $(document).unbind("mousemove touchmove", J);
            L.unbind("mousemove touchmove", J);
            $(document).unbind("mouseup touchend", i)
        }
        F = true;
        p(I(K));
        $(document).bind("mousemove touchmove", J);
        L.bind("mousemove touchmove", J);
        $(document).bind("mouseup touchend", i);
        K.preventDefault()
    });
    $(".btn_repeatA").bind("mousedown touchstart", function(K) {
        var L = $(this).parent();

        function I(O) {
            var N = n(O) - L.offset().left - 7;
            var P = (N / L.width()) * z.getDuration();
            if (P < 0) {
                P = 0
            } else {
                if (P > z.getRepeatEndTime()) {
                    P = z.getRepeatEndTime()
                }
            }
            return P
        }

        function M(P) {
            var N = (P / z.getDuration()) * 100 + "%";
            var O = ((z.getRepeatEndTime() - P) / z.getDuration() * 100) + "%";
            $(".btn_repeatA").css("left", N);
            $(".repeatbar").css("left", N).css("width", O);
            $("#text_currentTime").text(G(P))
        }

        function J(N) {
            M(I(N));
            N.preventDefault()
        }

        function i(N) {
            v = false;
            z.setRepeatStartTime(I(N));
            $(document).unbind("mousemove touchmove", J);
            L.unbind("mousemove touchmove", J);
            $(document).unbind("mouseup touchend", i)
        }
        v = true;
        M(I(K));
        $(document).bind("mousemove touchmove", J);
        L.bind("mousemove touchmove", J);
        $(document).bind("mouseup touchend", i);
        K.preventDefault();
        K.stopPropagation()
    });
    $(".btn_repeatB").bind("mousedown touchstart", function(K) {
        var L = $(this).parent();

        function I(O) {
            var N = n(O) - L.offset().left - 7;
            var P = (N / L.width()) * z.getDuration();
            if (P < z.getRepeatStartTime()) {
                P = z.getRepeatStartTime()
            } else {
                if (P > z.getDuration()) {
                    P = z.getDuration()
                }
            }
            return P
        }

        function M(O) {
            var P = (O / z.getDuration()) * 100 + "%";
            var N = ((O - z.getRepeatStartTime()) / z.getDuration() * 100) + "%";
            $(".btn_repeatB").css("left", P);
            $(".repeatbar").css("width", N);
            $("#text_currentTime").text(G(O))
        }

        function J(N) {
            M(I(N));
            N.preventDefault()
        }

        function i(N) {
            v = false;
            z.setRepeatEndTime(I(N));
            $(document).unbind("mousemove touchmove", J);
            L.unbind("mousemove touchmove", J);
            $(document).unbind("mouseup touchend", i)
        }
        v = true;
        M(I(K));
        $(document).bind("mousemove touchmove", J);
        L.bind("mousemove touchmove", J);
        $(document).bind("mouseup touchend", i);
        K.preventDefault();
        K.stopPropagation()
    });
    $(".volumebar").bind("mousedown touchstart", function(K) {
        var L = $(this);

        function J(O) {
            var M = n(O) - L.offset().left;
            var N = M / L.width();
            if (N < 0) {
                N = 0
            } else {
                if (N > 1) {
                    N = 1
                }
            }
            return N
        }

        function I(N) {
            var M = J(N);
            z.setVolume(M);
            N.preventDefault()
        }

        function i(M) {
            z.setVolume(J(M));
            $(document).unbind("mousemove touchmove", I);
            L.unbind("mousemove touchmove", I);
            $(document).unbind("mouseup touchend", i)
        }
        z.setVolume(J(K));
        $(document).bind("mousemove touchmove", I);
        L.bind("mousemove touchmove", I);
        $(document).bind("mouseup touchend", i);
        K.preventDefault()
    });
    z.bindEvent("open_state_change", E);
    z.bindEvent("play_state_change", q);
    z.bindEvent("rate_change", t);
    z.bindEvent("repeat_change", a);
    z.bindEvent("volume_change", s);
    z.bindEvent("repeat_range_change", k);
    z.bindEvent("position_change", c);
    var o;
    var f;

    function w(I) {
        var i = "";
        HTMLParser(I, {
            start: function(J, L, K) {},
            end: function(J) {},
            chars: function(J) {
                i += J.replace("&nbsp;", " ")
            },
            comment: function(J) {}
        });
        return i
    }
    var d = 0;

    function j(I) {
        if (typeof f == "undefined") {
            return
        }
        var J = parseInt(I / 100, 10) * 100;
        var i = f.get(J);
        if (typeof i != "undefined") {
            d++
        }
        return w(i);
        return ""
    }

    function D(i) {
        f = o.getLanguage(i)
    }

    function l(I) {
        o = new Smi();
        var i = subtitle_url + "?smi=";
        i += encodeURIComponent(I);
        $.ajax({
            url: i,
            dataType: "jsonp",
            success: function(M) {
                var L = decodeURIComponent(M);
                if (o.parse(L) == false) {
                    return
                }
                var K = o.getLangCount();
                if (K < 1) {
                    return
                }
                var J = o.getLangNames();
                D(J)
            },
            error: function(J) {}
        })
    }

    function c(i) {
        $("#subtitle").text("")
    }

    function E(I) {
        switch (I) {
            case OpenState.OPENING:
                break;
            case OpenState.OPENED:
                e(z.getDuration());
                m = setInterval(x, 10);
                break;
            case OpenState.CLOSED:
                e(0);
                break
        }
        u(b(I))
    }

    function q(i) {
        switch (i) {
            case PlayState.PLAYING:
                $(".btn_play").removeClass("btn_play").addClass("btn_pause");
                break;
            case PlayState.PAUSED:
                $(".btn_pause").removeClass("btn_pause").addClass("btn_play");
                break;
            case PlayState.STOPPED:
                $(".btn_pause").removeClass("btn_pause").addClass("btn_play");
                break;
            case PlayState.BUFFERING_STARTED:
                break
        }
        u(A(i))
    }

    function u(i) {
        $(".control_text_status").text(i)
    }

    function t(J) {
        $(".btn_common").removeClass("active");
        var i = Math.ceil(parseInt(J * 10));
        i /= 10;
        var I;
        switch (i) {
            case 0.6:
                I = $(".btn_speed06");
                break;
            case 0.8:
                I = $(".btn_speed08");
                break;
            case 1:
                I = $(".btn_speed10");
                break;
            case 1.2:
                I = $(".btn_speed12");
                break;
            case 1.3:
                I = $(".btn_speed14");
                break;
            case 1.4:
                I = $(".btn_speed14");
                break;
            case 1.6:
                I = $(".btn_speed16");
                break;
            case 1.7:
                I = $(".btn_speed18");
                break;
            case 1.8:
                I = $(".btn_speed18");
                break;
            case 2:
                I = $(".btn_speed20");
                break
        }
        I.addClass("active")
    }

    function a(i) {
        if (i) {
            $(".btn_repeat").addClass("active");
            $(".currentbar").hide();
            $(".repeatbar").css("left", "0%").css("width", "100%").show();
            $(".btn_repeatA").css("left", "0%").show();
            $(".btn_repeatB").css("left", "100%").show()
        } else {
            $(".btn_repeat").removeClass("active");
            $(".currentbar").show();
            $(".repeatbar").hide();
            $(".btn_repeatA").hide();
            $(".btn_repeatB").hide()
        }
    }

    function s(I, i) {
        if (i) {
            $(".btn_mute").addClass("active")
        } else {
            $(".btn_mute").removeClass("active")
        }
        $(".btn_volume").css("left", I * 100 + "%");
        $(".current_volumebar").css("width", I * 100 + "%")
    }

    function k(L, I) {
        if (z.getRepeat()) {
            $(".btn_repeat").addClass("active");
            var i = (L / z.getDuration() * 100) + "%";
            var K = (I / z.getDuration() * 100) + "%";
            var J = ((I - L) / z.getDuration() * 100) + "%";
            $(".btn_repeatA").css("left", i).show();
            $(".btn_repeatB").css("left", K).show();
            $(".repeatbar").css("left", i).css("width", J).show()
        } else {
            $("btn_repeat").removeClass("active");
            $(".btn_repeatA").hide();
            $(".btn_repeatB").hide();
            $(".repeatbar").hide()
        }
    }

    function x() {
        var i = z.getCurrentPosition();
        if (!F) {
            p(i)
        }
        if (typeof f != "undefined") {
            var I = j(i * 1000);
            if (I != "") {
                $("#subtitle").text(I)
            }
        }
    }

    function p(I) {
        var i = z.getDuration();
        var J = (i > 0 ? (I / i) * 100 : 0) + "%";
        $(".btn_seek").css("left", J);
        $(".currentbar").css("width", J);
        if (!v) {
            $("#text_currentTime").text(G(I))
        }
    }

    function e(i) {
        $("#text_duration").text(G(i))
    }

    function C() {
        if (z.getPlayState() == PlayState.PLAYING) {
            z.pause()
        } else {
            z.play()
        }
    }

    function r() {
        var i = z.getRepeat();
        z.setRepeat(!i)
    }

    function H() {
        if (z.getPlayState() == PlayState.PLAYING || z.getPlayState() == PlayState.PAUSED) {
            var i = z.getFullscreen();
            z.setFullscreen(!i)
        } else {
            z.setFullscreen(false)
        }
    }

    function y() {
        var i = z.getMute();
        z.setMute(!i)
    }

    function g(i) {
        z.setRate(i)
    }

    function G(L) {
        if (!L) {
            L = 0
        }
        var J = parseInt(L) % 60;
        var i = parseInt(L / 60) % 60;
        var I = parseInt(L / 60 / 60);

        function K(M) {
            if (M < 10) {
                return "0" + M
            } else {
                return M
            }
        }
        return [K(I), K(i), K(J)].join(":")
    }

    function b(i) {
        switch (i) {
            case OpenState.CLOSED:
                return "닫힘";
            case OpenState.OPENING:
                return "여는 중";
            case OpenState.OPENED:
                return "열림";
            case OpenState.CLOSING:
                return "닫는 중"
        }
    }

    function A(i) {
        switch (i) {
            case PlayState.STOPPED:
                return "정지";
            case PlayState.PLAYING:
                return "재생 중";
            case PlayState.PAUSED:
                return "일시정지";
            case PlayState.BUFFERING_STARTED:
                return "버퍼링";
            case PlayState.COMPLETE:
                return "재생완료"
        }
    }
};