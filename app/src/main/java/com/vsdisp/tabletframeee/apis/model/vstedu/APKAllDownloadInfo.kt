package com.vsdisp.tabletframeee.apis.model.vstedu

/**
 * 통합
 */
data class APKAllDownloadInfo(
    val apk: Apk, // 다운 로드 받을 APK 상세 정보
    val contentRootPath: String, // host 뒤쪽 자원 위치 Root Path
    val contentsType: String,
) // 초등(ele) / 중고등(mid_hig) / ALL (통합) 구분)
{
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
