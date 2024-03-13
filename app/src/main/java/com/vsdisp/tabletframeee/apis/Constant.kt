package com.vsdisp.tabletframeee.apis

class Constant {
    companion object {
        // 변동 없음 (Root URL 은 자사/외주 모두 공통)
        const val REQ_VSF_SERVER_MAIN_URL: String = "https://smart-dn.visang.com"

        /*------------------비상 자사-----------------------------*/

        // APK Version 정보 자사 라인
        const val REQ_VS_EDU_APK_VERSION_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstedu/info/version/version_all.json"

        // 초등 APK Download 정보
        const val REQ_VS_EDU_APK_ELE_DN_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstedu/info/apk/ele/apk_ele_info.json"

        // 중고등 APK Download 정보
        const val REQ_VS_EDU_APK_MID_HIG_DN_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstedu/info/apk/mid_hig/apk_mid_hig_info.json"

        // 초/중고 통합 APK Download 정보
        const val REQ_VS_EDU_APK_ALL_DN_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstedu/info/apk/all/apk_all_info.json"

        // 초중고 결합된 MIME Download Info
        const val REQ_VS_MIME_DN_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstedu/info/mime/contents_mime_vtype_a.json"

        const val REQ_GLOBAL_TIME_API_SEOUL_URL: String =
            "https://www.timeapi.io/api/Time/current/coordinate?latitude=37.56667&longitude=126.97806"

        /*------------------외주---------------------------------*/
        // 변동 없음 (외주 라인)
        const val REQ_APK_VERSION_INFO_FULL_URL: String =
            "$REQ_VSF_SERVER_MAIN_URL/appData/vstsupplier/arfilter/info/version/version_all.json"
    }
}