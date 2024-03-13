package com.vsdisp.tabletframeee.apis.model.supplier

import com.google.errorprone.annotations.Keep

/**
 * 외주 지정 URL
 * Full URL : https://smart-dn.visang.com/appdata/vstsupplier/arfilter/info/version/version_all.json
 */
@Keep
data class APKVersionModel(
    val version_apk: VersionApk,
) {
    data class VersionApk(
        val version_info: VersionInfo,
    ) {
        data class VersionInfo(
            val is_force_update: String,
            val new_apk_recent_release_date: String,
            val new_apk_release_version_code: String,
            val new_apk_release_version_name: String,
        )
    }
}