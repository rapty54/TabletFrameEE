package com.vsdisp.tabletframeee.apis.rq

import java.io.IOException

/**
 * throw Exception
 *
 *
 * 상황에 따라 추가될 수 있는 데이터가 존재할 수 있다.
 *
 *
 * 해당 사항 대기
 */
class NoConnectivityException : IOException() {
    override val message: String
        get() = "No Internet Exceptions"
}