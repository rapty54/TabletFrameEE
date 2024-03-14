package com.vsdisp.tabletframeee.apis.model.vstedu

import androidx.annotation.Keep

/**
 * EE 계정 APK Info
 */
@Keep
data class APKAllEEDownloadInfo(
    val apk: Apk,
    val contentRootPath: String,
    val contentsType: String
) {
    data class Apk(
        val dInfo: DInfo,
    ) {
        data class DInfo(
            val ext: String, // 확장자 <apk>
            val filename: String, // app-release 고정 실제 단말에 다운로드 되어지는 최종 파일 명은 끝에 version 붙여서 결합
            val path: String, // 상세 경로
            val version: String, // app-release 고정 실제 단말에 다운로드 되어지는 최종 파일 명은 끝에 version 붙여서 결합
        )
    }
}
