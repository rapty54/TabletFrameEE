package com.vsdisp.tabletframeee.wv

import android.app.Activity
import android.content.Context
import android.webkit.WebView
import androidx.appcompat.app.AlertDialog
import org.json.JSONObject

/**
 * Script Bridge Handle
 * Just In Case
 * JSON 기반 으로 웹 브릿지 처리를 한다면....
 * 현재는 사용 하지 않으며
 * 현재의 방식 으로 사용을 할려고 한다면
 * src / main / assets / js / 웹뷰 통신 로직이 들어 가야 한다.
 * 현재는 callFromWVToApp.js 와 통신 하는 로직이
 * src / main / java / wv / WebAppInterface 쪽에 사항과 통신 하게 되어 있다.
 * 방식은 현재의 사항 과는 다르다. 참고
 */
class JSONScriptBridge {
    companion object {
        /**
         * 웹 >> 앱
         */
        fun sendMessage(wv: WebView, json: String) {
            wv.post {
                wv.evaluateJavascript(
                    "window.document.dispatchEvent(new CustomEvent('message', {detail : '${json}'}));",
                    null
                )
            }
        }

        /**
         * 전달할 JSON data
         */
        fun getJson(data: String, value: String, reason: String? = null): String {
            val jsonObj = JSONObject(data)

            jsonObj.put("isSuccessfull", "true")

            val valueJson = JSONObject()
            valueJson.put("value", value)
            jsonObj.put("args", valueJson)
            jsonObj.put("reason", reason)

            return jsonObj.toString()

        }

        /**
         * callLinkingOpenUrl (a link 관련) 인터 페이스 브릿지 함수
         *
         * 호출될때 JSON 데이터 안에 URL 정보를 가져와서
         *
         * 외부 브라우져 띄움
         */
        fun loadOuterBrowser(context: Context, json: String, webView: WebView) {
            try {
                val jsonObject = JSONObject(json)
                val data = jsonObject.getJSONObject("data")
                val message = if (data.has("value")) {
                    data.get("value") as String
                } else {
                    null
                }

                //Log.d("loadOuterBrowser", "$message")
                // elvis expression
                val urls: String = message ?: ""
                // url 앞뒤 공백 제거
                //Log.d("loadOuterBrowser", urls)

                if (urls.isNotEmpty()) {
//                    ActsUtil.moveToOuterBrowser(
//                        context as Activity,
//                        urls.trim(),
//                        SYS_WB_NORMAL_CALL,
//                    )
                }
            } catch (e: Exception) {
//                Log.d("loadOuterBrowser_exception", e.toString())
            }
        }

        fun showDialog(context: Context, json: String) {
            try {
                val jsonObject = JSONObject(json)

                val data = jsonObject.getJSONObject("data")
                val title = if (data.has("title")) {
                    data.get("title") as String
                } else {
                    null
                }
                val message = if (data.has("value")) {
                    data.get("value") as String
                } else {
                    null
                }
//                val title = data.get("title") as String
//                val message = data.get("value") as String

                val ct = context as Activity
                ct.runOnUiThread {
                    AlertDialog.Builder(ct)
                        .setTitle(title)
                        .setMessage(message)
                        .setPositiveButton("확인") { dialog, which -> }
                        .create()
                        .show()
                }
            } catch (e: Exception) {
                //Log.d("showDialog_exception", e.toString())
            }

        }
    }
}