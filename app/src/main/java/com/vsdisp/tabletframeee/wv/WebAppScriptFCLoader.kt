package com.vsdisp.tabletframeee.wv

import android.util.Log
import android.webkit.WebView

/**
 * 웹간 Native 상호 호출 접점의 처리
 */
class WebAppScriptFCLoader {
    companion object {

        private const val CUSTOM_DISPATCH_LISTENER_NAME = "custom-vst-evl"

        const val JAVASCRIPT_FUNC_GET_PAGE_INFO = "reqPageInfo"

        // 현재의 사항은 여분용
        const val JAVASCRIPT_FUNC_DOWNLOAD = "reqDownload"

        // 현재의 사항은 여분용
        const val JAVASCRIPT_FUNC_DELETE = "reqDelete"

        /**
         * Asset 내부에 작성된 html 페이지 내에서
         * script 태그 내에서 이벤트 발생시 하기의 방식 으로 호출 할때
         * window.webViewBridge.send(targetFunc, data, success, error)
         * Native 웹뷰 내에 자바 스크 립트 인터 페이스내에서 각 Target 함수 명에 따라
         * 호출 되어 지고 그 이후에 호출된 부분에서 전달 받은 데이터와 병합 하여
         * 웹 HTML 쪽 정의된 자바 스크립트 함수로 재호출 한다.
         */
        fun sendMessageToWebViewBridge(webView: WebView, jsonString: String) {
            Log.d("WebAppScriptFCLoader", "sendMessageToWebViewBridge :: $jsonString")
            webView.post {
                webView.evaluateJavascript(
                    returnDispatcherEventString(
                        WebAppInterfaceJsonPayload.getJSONCommon(
                            jsonString, true, null
                        )
                    ), null
                )
            }
        }

        /**
         * 웹으로 부터 전달 받은 JSON 데이터 기준 으로 data 를 key 로 하는 JSONObject
         *
         * 안에 값이 가변 으로 변경 되어야 하는 경우 즉 고정 되지 않는 JSONObject 를
         *
         * 가공 하여 사용 할때 현재의 함수를 사용 합니다.
         */
        fun sendMessageToWebViewBridgeBase(webView: WebView, functionStr: String) {
            webView.post {
                webView.evaluateJavascript(
                    returnDispatcherEventString(functionStr), null
                )
            }
        }

        /**
         * 로컬 웹으로 부터 전달 받은 Data 를 Custom Event 를 통하여
         * 전달 하는 문자열 형식 이다
         * 현재 사항의 대형 절대 유지 한다.
         */
        private fun returnDispatcherEventString(jsonString: String): String {
            return "window.document.dispatchEvent(new CustomEvent('$CUSTOM_DISPATCH_LISTENER_NAME',{detail: '${
                jsonString
            }'}));"
        }

        // Native 단에서 현재의 함수를 이용 해서 웹쪽 으로 잘 전달 되는지 데이터 가공 없이
        // 확인을 위한 함수 테스트 용
//        private fun sendMessageToWeb(webView: WebView, jsonString: String) {
//            webView.post {
//                Log.d("WebAppInterface", "sendMessageToWeb :: $jsonString")
//                // Test 1 Success
//                webView.evaluateJavascript(
//                    "window.document.dispatchEvent(new CustomEvent('custom-listen',{detail: {name: 'hello', age: 12}}));",
//                    null
//                )
//            }
//        }
    }
}