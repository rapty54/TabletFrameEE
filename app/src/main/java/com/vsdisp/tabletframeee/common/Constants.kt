package com.vsdisp.tabletframeee.common

const val FILE_ASSET_ROOT_PATH_NO_DASH = "file:///android_asset"
const val TAG_MAIN_APP_INFO_COMMON = "APP_INFO_LOG"
const val FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH =
    "$FILE_ASSET_ROOT_PATH_NO_DASH/index_sample.html"
const val FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH = "$FILE_ASSET_ROOT_PATH_NO_DASH/index.html"
const val TOAST_ERR_LOG = "TOAST_ERR_LOG"
const val WEB_APP_INTERFACE_SUB = "WAIS_LOG"
const val WEB_INTERFACE_BRIDGE_NAME = "AndroidVST" // WebInterfaceBridge Name (유지)
const val TAG_WV_CR_INFO = "TAG_WV_CR_INFO"
const val ACTIVATE_PO_VIEW = true // POPUP WebView 활성화 (유지)
const val ACTIVATE_CONCENTRATE_MODE = false // Android 화면 집중화 모드 활성화 (현재 기준 으로는 없음)
const val ACTIVATE_PERMISSION = false // Permission 사용 하고자 할때 (현재 기준 으로는 없음)
const val ACTIVATE_WV_CHROME_DEBUGGER =
    true // chrome://inspect 사용 하여 크롬 브라우저 에서 디버깅을 하고자 할때 배포때는 false
const val ACTIVATE_PLAYBACK_GESTURE = false // 유지
const val ACTIVATE_IS_JS_CONFIRM_WV = true // 유지
const val ACTIVATE_IS_JS_ALERT_WV = true // 유지
const val ACTIVATE_IS_CHROME_DEBUGGER = true // chrome console debugger 배포 때는 false
var ACTIVATE_IS_FORGING_ON =
    AppCurrentInfo.isBuildRelease() // Rooting 과 위변조 방지 처리 로직을 사용 하겠 느냐 배포 떄는 무조건 true 입니다.

// Request Permission Code
const val REQUEST_CODE_PERMISSION_ALL = 10004

// Service Task Command key
const val BACK_TASK_SERVICE_KEY = "ID"
const val BACK_TASK_OPTION_WV_CLEAR_CACHE = 1
const val BACK_TASK_OPTION_ROOT_CHECK = 2
const val BACK_TASK_OPTION_WV_CLEAR_ALL_RESET = 3




