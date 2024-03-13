package com.vsdisp.tabletframeee.wv

import org.json.JSONObject

/**
 * 전달 받은 JSON Payload 가공 처리
 */
class WebAppInterfaceJsonPayload {

    companion object {
        /**
         * 전달 객체 공통
         * data parameter =>
         */
        fun getJSONCommon(data: String, value: Boolean, reason: String? = null): String {
            val jsonObjTopNode = JSONObject(data)
            jsonObjTopNode.put("isSuccessful", "true")

            val valueJsonInner = JSONObject()
            valueJsonInner.put("value", value)
            jsonObjTopNode.put("args", valueJsonInner) // args 쪽에 데이터를 합쳐서 JSON 으로 Return
            jsonObjTopNode.put("reason", reason)

            return jsonObjTopNode.toString()
        }

        /**
         * Page Data By JSON
         */
        fun getJSONDataPageResultCallbackAndReturn(
            data: String,
            value: Boolean,
            reason: String? = null,
            onResultPage: (String?) -> Unit,
        ): String {
            val jsonObjTopNode = JSONObject(data)
            jsonObjTopNode.put("isSuccessful", "true")

            try {
                var pageInfo = jsonObjTopNode.getJSONObject("data")
                if (pageInfo.has("page")) {
                    onResultPage(pageInfo.get("page").toString())
                }
            } catch (e: Exception) {

            }

            val valueJsonInner = JSONObject()
            valueJsonInner.put("value", value)
            jsonObjTopNode.put("args", valueJsonInner) // args 쪽에 데이터를 합쳐서 JSON 으로 Return
            jsonObjTopNode.put("reason", reason)
            return jsonObjTopNode.toString()
        }

        /**
         * 웹으로부터 전달받은 데이터에 데이터를 추가하여 리턴 하는 방식
         */
        fun getJsonDataManipulatorCallBackAndReturn() {

        }
    }
}