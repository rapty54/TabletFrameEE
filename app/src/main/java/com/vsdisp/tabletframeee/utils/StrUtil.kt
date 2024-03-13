package com.vsdisp.tabletframeee.utils

import android.util.Log
import kotlin.text.StringBuilder

/**
 * String 문자열 내 처리 사항 Util
 */
class StrUtil {
    companion object {
        /**
         * String Validation Check
         */
        fun isStrEmpty(str: String): Boolean {
            return str.isNullOrEmpty()
        }

        /**
         * 문자열 내 . 기준 분해후 결합
         */
        fun strDotAppend(str: String): String {
            return StringBuilder().apply {
                str.split(".").forEach {
                    this.append(it)
                }
            }.toString()
        }

        /**
         * . 기준 분해 이후 맨 처음 Index 사항만
         */
        fun strDotSplitFrontAppend(str: String): String {
            return StringBuilder().apply {
                str.split(".").forEach {
                    Log.d("strDotSplitFrontAppend", "$it ${it[0]}")
                    this.append(it)
                }
            }.toString()
        }

        fun strDotFront(str: String): String {
            return StringBuilder().apply {
                str.split(".").forEachIndexed { index, s ->
                    Log.d("strDotSplitFrontAppend ", "=======$index $s")
                    if (index == 0) {
                        this.append(s)
                    }
                }
            }.toString()
        }

        /**
         * 추출 기준 delimiter
         * 처리할 문자열
         */
        fun strRegExtra(str: String, delimiter: String): String {
            return StringBuilder().apply {
                str.split(delimiter).forEach {
                    this.append(it)
                }
            }.toString()
        }

        /**
         * true is update or not
         * 현내의 app version 과 server 쪽에 버전이 같다면
         */
        fun isUpdate(clientAppVersion: String, serverAppVersion: String): Boolean {
            return strToInt(clientAppVersion) === strToInt(serverAppVersion)
        }

        /**
         * true is update or not
         * 서버에 기재 되어 있는 APK 버전이 현재 설치 되어 있는 APK 버전 보다 높을 경우 (업데이트 필요)
         */
        fun isUpdateAPKCondition(clientAppVersion: String, serverAppVersion: String): Boolean {
            return strToInt(clientAppVersion) < strToInt(serverAppVersion)
        }

        /**
         * 이미 앱이 설치가 되었고 업데이트 된 상태임
         */
        fun isAlreadyUpdateAPK(clientAppVersion: String, serverAppVersion: String): Boolean {
            Log.d("isAlreadyUpdateAPK", "$clientAppVersion | $serverAppVersion")
            return strToInt(clientAppVersion) == strToInt(serverAppVersion)
        }

        /**
         * force update check 필수
         */
        fun isForceUpdate(forceUpdate: String): Boolean {
            return !forceUpdate.isNullOrEmpty() && forceUpdate == "Y"
        }

        /**
         * String To Integers
         */
        private fun strToInt(str: String): Int {
            return str.toInt()
        }
    }
}