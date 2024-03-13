package com.vsdisp.tabletframeee.apis.model

import androidx.annotation.Keep

/**
 * 네트 워크 기본 스펙에 의한 응답값 모델
 */
@Keep
data class ResCommon(val code: Int, val isSuccess: Boolean, val msg: String)
