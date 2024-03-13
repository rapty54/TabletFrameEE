/*!@preserve
 * -----------------------------------------------------------------------------
 * Vivasam | 테마관
 * -----------------------------------------------------------------------------
 * Thinkbud
 * # Author:
 * ## UX
 * - 한은희 CP
 * ## UX Design
 * - 강시내 선임 <mc_2_e@thinkbud.co.kr>
 * ## FE
 * - 최선기 수석 <iru@nate.com>
*/

var works = {},
    __ua  = window.navigator.userAgent.toUpperCase();

/**
 * Detects if WebGL is enabled.
 * Inspired from http://www.browserleaks.com/webgl#howto-detect-webgl
 *
 * @return { number } -1 for not Supported,
 *                    0 for disabled
 *                    1 for enabled
 */
function detectWebGL()
{
    // Check for the WebGL rendering context
    if ( !! window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;

        for (var i in names) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter === "function") {
                    // WebGL is enabled.
                    return 1;
                }
            } catch (e) {}
        }

        // WebGL is supported, but disabled.
        return 0;
    }

    // WebGL not supported.
    return -1;
};

works.device = {
  isMobile: __ua.indexOf('MOBILE') > -1,
  isChrome: __ua.indexOf('CHROME') > -1,
  isIE    : ($.browser.msie)?true:false,
  isWebGl : detectWebGL()==1?true:false
};

works.theme = {

  init: function(){
    this.hamberg();
    this.alerts();
    this.isRichSupported();
    this.isMainSupported();
    this.fullPage();

    // WebGL 지원 여부로 hook 생성
    if( !works.device.isWebGl ) {
      $('html').addClass('no-webgl');
    }

  },

  /**
   * alert 닫기
  */
  alerts: function(){

    var $alerts = $('.m_alert'),
        $alertClose = $alerts.find('.btn_close_alert');

    $alerts.on('click','.btn_close_alert', function(){
      $(this).closest('.m_alert').removeClass('show');
    });

  },

  /**
   * Unity 지원여부
   * 모던 웹 브라우저에서는 WebGl이 사용되므로,
   * 1. WebGl을 지원하지 않거나,
   * 2. 모바일 기기일때
   * 테마관 콘텐츠를 지원하지 않는다는 메세지를 노출 시키도록 함
  */
  isRichSupported: function( elem, opts ){

    var defaults = {
      showClass: 'show'
    },
    options = $.extend(defaults, opts),
    _elem = elem?elem:'.rich_not_supported';

    if( works.device.isMobile || !works.device.isWebGl ) {
      $(_elem).addClass( options.showClass );
    }

  },

  isMainSupported: function(){

    // WebGl 점검
    if( !works.device.isWebGl ) {
      $('#alert_browser').addClass('show');
    }

    // 기기 점검
    if( works.device.isMobile ) {
      $('#alert_device').addClass('show');
    }

  },

  /**
   * 유니티 풀스크린 모드 진입
   * - 지원하지 않을경우 안내 메시지를 띄우거나 다른 처리를 한다.
  */
  fullPage: function(){

    var $fullExec = $('#fullexec'),
        el = document.getElementById('rich_wrap');

    $fullExec.on('click', function(){

      if( screenfull.enabled ) {

        screenfull.request( el );

      } else {

        alert('풀스크린을 지원하지 않습니다.');

      }
    });

  },

  /**
   * Hamberg 메뉴
  */
  hamberg: function(){

    var $hamberg = $('#snb_hamberg '),
        $expands = $('#expands_hamberg');

    $hamberg.on('mouseenter mouseleave', function( e ){

      if( e.type === 'mouseenter' ) {
        $('#snb_shape').addClass('show');
      }

    })

    $expands.on('mouseleave', function(){
      $('#snb_shape').removeClass('show');
    })
  }
};

$(document).ready(function(){
  works.theme.init();
})
