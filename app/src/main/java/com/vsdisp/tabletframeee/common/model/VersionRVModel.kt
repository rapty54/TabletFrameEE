package com.vsdisp.tabletframeee.common.model

/**
 * Version Update APK Download 시 필요한 정보 모델
 */
data class VersionRVModel(
    val downLoadUrl: String,
    val downloadFilePathInDevice: String,
    val downloadFileNameInDeviceWithExt: String,
    val serverAPKVersion: String,
    val descriptions: String,
)
