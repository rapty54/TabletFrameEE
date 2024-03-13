package com.vsdisp.tabletframeee.apis.model.vstedu

import androidx.annotation.Keep

/**
 * Main URL : https://smart-dn.visang.com
 * Full URL : https://smart-dn.visang.com/appData/vstedu/info/apk/mid_hig/apk_mid_hig_info.json
 */
@Keep
data class APKMidHigDownloadInfo(
    val apk: Apk,
    val contentRootPath: String,
    val contentsType: String,
) {
    data class Apk(
        val dInfo: DInfo,
    ) {
        data class DInfo(
            val ext: String,
            val filename: String,
            val path: String,
            val version: String,
        )
    }
}