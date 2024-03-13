package com.vsdisp.tabletframeee.apis.headers

/**
 * Rest Api Base Info Common Usage while using RetroFit
 * For Headers Info
 */
class BaseInfo {
    companion object {
        // Encode Options And Each Options
        const val REQ_HEADER_ENCODED = "Content-Type: application/x-www-form-urlencoded"
        const val REQ_HEADER_JSON = "Content-Type: application/json;charset=UTF-8"
        const val REQ_HEADER_JSON_VALUE = "application/json"
        const val RES_RESULT_SUCCESS = 200
    }
}