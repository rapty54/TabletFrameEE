package com.vsdisp.tabletframeee.apis.model.vstedu

import androidx.annotation.Keep

/**
 * APK Version Node Model
 * Main URL : https://smart-dn.visang.com
 * Full URL : https://smart-dn.visang.com/appData/vstedu/info/version/version_all.json
 */
@Keep
data class APKVersionAll(
    val version_apk: VersionApk,
) {
    data class VersionApk(
        val version_ele: VersionEle,
        val version_mid_hig: VersionMidHig,
        val version_all: VersionAll,
        val version_all_e: VersionAllE
    ) {
        data class VersionEle(
            val is_force_update: String,
            val new_apk_recent_release_date: String,
            val new_apk_release_version_code: String,
            val new_apk_release_version_name: String,
        )

        data class VersionMidHig(
            val is_force_update: String,
            val new_apk_recent_release_date: String,
            val new_apk_release_version_code: String,
            val new_apk_release_version_name: String,
        )

        data class VersionAll(
            val is_force_update: String,
            val new_apk_recent_release_date: String,
            val new_apk_release_version_code: String,
            val new_apk_release_version_name: String,
        )

        data class VersionAllE(
            val is_force_update: String,
            val new_apk_recent_release_date: String,
            val new_apk_release_version_code: String,
            val new_apk_release_version_name: String,
        )
    }
}