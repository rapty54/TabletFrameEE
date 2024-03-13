package com.vsdisp.tabletframeee.wv

import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.gson.JsonObject
import com.vsdisp.tabletframeee.common.WVLoadActions

/**
 * WebAppInterface Bridge (WebView <=> App 간 상호 통신 전문)
 *
 * 양방향 (JSON 기반)
 *
 * src/main/assets/js/webview-local-bridge.js 파일 내에 함수와 연동
 *
 * 단방향
 *
 * src/main/assets/js/callFromWVToApp.js 파일 내에 함수와 연동
 */
class WebAppInterface(
    private val mContext: AppCompatActivity,
    private val webView: WebView,
    private val listener: WebInterfaceStateListener,
) {

    companion object {
        var receiveData = ""
        private var TAG = "WebAppInterface"
    }

    interface WebInterfaceStateListener {
        fun onPageOpen(type: String)
    }

    private var mWebInterfaceListener: WebInterfaceStateListener? = listener

    @JavascriptInterface
    fun postMessage(json: String) {
        Log.d(TAG, json)
        receiveData = json
        val data = Gson().fromJson<MutableMap<String, String>>(json, MutableMap::class.java)
        when (data["targetFunc"]) {

            WebAppScriptFCLoader.JAVASCRIPT_FUNC_GET_PAGE_INFO -> {
                // 해당 다운 로드 Page 내에 서의 전체 정보 (여기가 Entry 라 일단은 생각을 하고)
                webView.post {
                    // PAGE A 데이터 로드 <전달 주는 PAGE 유형에 따른>
                    // PAGE B 데이터 로드 <전달 주는 PAGE 유형에 따른>
                    // PAGE C 데이터 로드 <전달 주는 PAGE 유형에 따른>
                    // .....
                    //Toast.makeText(mContext, "reqPageInfo $receiveData", Toast.LENGTH_LONG).show()
                    var pageType: String = ""
                    val functionBody =
                        WebAppInterfaceJsonPayload.getJSONDataPageResultCallbackAndReturn(
                            receiveData,
                            true,
                            null,
                            onResultPage = {
                                pageType = it!!
                                //Toast.makeText(mContext, "onResultPage : $it", Toast.LENGTH_LONG).show()
                                mWebInterfaceListener!!.onPageOpen(it)
                            })
                    // 웹으로 전송 Script
                    WebAppScriptFCLoader.sendMessageToWebViewBridgeBase(webView, functionBody)
                    // call FTP Server JSON Node
                    // Toast.makeText(mContext, "PAGE TYPE : $pageType", Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    /**
     * Test
     */
    @JavascriptInterface
    fun sendTest(data: String) {
        //Toast.makeText(mContext, data, Toast.LENGTH_SHORT).show()
    }

    /**
     * Test
     */
    @JavascriptInterface
    fun recvData(data: String) {
        //Toast.makeText(mContext, data, Toast.LENGTH_SHORT).show()
    }

    /**
     * Test
     */
    @JavascriptInterface
    fun recvMessageObj(json: String) {
        val convertedObject = Gson().fromJson(json, JsonObject::class.java)
        val ids = convertedObject.get("idx").toString()
        val name = convertedObject.get("name").toString()
        //Toast.makeText(mContext, ids, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun recvDataWithType(data: String, dataType: String) {
        when (dataType) {
            "pdf" -> {
                WebAppInterfaceSub.callContentsSets(mContext, data, dataType)
            }

            "app" -> {
                WebAppInterfaceSub.callContentsSets(mContext, data, dataType)
            }

            else -> {
                Log.d("PDF TAG", "------other Type called-----")
            }
        }
    }

    /**
     * Just in Case
     */
    @JavascriptInterface
    fun recvCallGOWhere(type: String) {
        // type = h Home
        when (type) {
            "h" -> {
                Log.d("recvCallGOWhere", "------Type h-----")
                mContext.runOnUiThread {
                    WVLoadActions.goHomeDirect(mContext, webView)
                }
            }
        }
    }
}