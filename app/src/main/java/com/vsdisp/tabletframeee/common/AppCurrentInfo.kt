package com.vsdisp.tabletframeee.common

import android.util.Log
import com.vsdisp.tabletframeee.BuildConfig


/**
 * App Common Info => BuildConfig Action
 * Build Config Info get from local.properties
 * 현재 Native 단 코드 어디 서든 가져올 수 있는 상태 설정값
 * local.properties 안에 들어가 있는 값은 외부에 절대 노출 되어선 안되는
 * 민감한 값들만 넣어서 처리 합니다.
 *
 */
class AppCurrentInfo {

    companion object {
        // Active Build Variants => Release / Debug / sample 3 개의 Target 을 기준 으로 합니다.
        private const val BUILD_TARGET = BuildConfig.BUILD_TYPE

        // build.gradle => defaultConfig debuggable (build.gradle)
        private val DEBUG_STATE = BuildConfig.DEBUG

        // Application Id (현 APP package 명칭)
        private const val APPLICATION_IDS = BuildConfig.APPLICATION_ID

        // build.gradle => defaultConfig (VERSION CODE)
        private const val VERSION_CO = BuildConfig.VERSION_CODE

        // build.gradle => defaultConfig (VERSION NAME)
        private const val VERSION_NM = BuildConfig.VERSION_NAME

        // build.gradle => defaultConfig (SHA256KP) => local.properties 에 선언된 값
        private const val SHA256KP = BuildConfig.sha256KP

        // build.gradle => defaultConfig (MD5) => local.properties 에 선언된 값
        private const val MD5 = BuildConfig.md5

        // build.gradle => defaultConfig (SHA1) => local.properties 에 선언된 값
        private const val SHA1 = BuildConfig.sha1

        /**
         * 현재 Build Target 이 Debug Mode 이냐 True
         */
        fun isBuildSample(): Boolean {
            return when (BUILD_TARGET) {
                "sample" -> true
                else -> false
            }
        }

        /**
         * 현재 Build Target 이 Debug Mode 이냐 True
         */
        fun isBuildDev(): Boolean {
            return when (BUILD_TARGET) {
                "debug" -> true
                else -> false
            }
        }

        /**
         * 현재 Build Target 이 Release Mode 이냐 True
         */
        fun isBuildRelease(): Boolean {
            return when (BUILD_TARGET) {
                "release" -> true
                else -> false
            }
        }

        /**
         * 현재 debug Log 가 개방된 상태 이냐 / 아니냐
         */
        fun isDebuggableState(): Boolean {
            return when (DEBUG_STATE) {
                true -> true
                else -> false
            }
        }

        /**
         * Version Name
         */
        fun getVersionName(): String {
            return VERSION_NM
        }

        /**
         * Version Code
         */
        fun getVersionCode(): Int {
            return VERSION_CO
        }

        fun getApplicationIDS(): String {
            return APPLICATION_IDS
        }

        /**
         * SHA256 (FingerPrint)
         */
        fun getSHA256KP(): String {
            return SHA256KP.lowercase()
        }

        /**
         * MD5 (FingerPrint)
         */
        fun getMD5(): String {
            return MD5.lowercase()
        }

        /**
         * SHA1 (FingerPrint)
         */
        fun getSHA1(): String {
            return SHA1.lowercase()
        }

        /**
         * default Config 전체 내용 확인용
         */
        fun appCurrentInfoOut() {
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "BUILD_TARGET :: $BUILD_TARGET")
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "DEBUG_STATE :: $DEBUG_STATE")
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "APPLICATION_IDS :: $APPLICATION_IDS")
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "VERSION CODE :: $VERSION_CO")
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "VERSION NAME :: $VERSION_NM")
            Log.d(
                LogTagName.TAG_MAIN_APP_INFO_COMMON,
                "SHA256KP :: ${getSHA256KP()}"
            )
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "SHA1 :: ${getSHA1()}")
            Log.d(LogTagName.TAG_MAIN_APP_INFO_COMMON, "MD5 :: ${getMD5()}")
            Log.d(
                LogTagName.TAG_MAIN_APP_INFO_COMMON,
                "Get Application IDS :: ${getApplicationIDS()}"
            )
        }
    }
}