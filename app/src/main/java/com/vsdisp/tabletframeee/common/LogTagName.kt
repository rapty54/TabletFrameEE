package com.vsdisp.tabletframeee.common

/**
 * Log Tagging Name Info Constants
 */
class LogTagName {
    companion object {
        // Debug Name For Current Project VISANG TABLET
        private const val VS_TABLET_TAG = "VISANG_TABLET"

        // For MainActivity
        const val TAG_MAIN_ACT = "$VS_TABLET_TAG MainAct"

        // For AppCurrentInfo
        const val TAG_MAIN_APP_INFO_COMMON = "$VS_TABLET_TAG AppInfo"

        // For WebViewInfo
        const val TAG_WV_INFO = "$VS_TABLET_TAG WV Info"

        // For WV Cache Control
        const val TAG_WV_CACHE_CONTROL = "$VS_TABLET_TAG WV CACHE"

        // For Text Analyzer
        const val TAG_TEXT_ANALYZER = "$VS_TABLET_TAG TEXT ANALZ"

        // For FORGING
        const val TAG_FORGING_FLAG = "$VS_TABLET_TAG FORGING"

        // For Tag ENC
        const val TAG_ENC_SHARE = "$VS_TABLET_TAG TAG ENC"

        // For File OBS TAG
        const val TAG_FILE_OBSERVER = "$VS_TABLET_TAG TAG FILE_OBS"
    }
}