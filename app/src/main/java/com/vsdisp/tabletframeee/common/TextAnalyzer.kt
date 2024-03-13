package com.vsdisp.tabletframeee.common

import android.util.Log
import com.vsdisp.tabletframeee.common.LogTagName.Companion.TAG_TEXT_ANALYZER

/**
 * Text Analyzer
 * Just In Case
 */
class TextAnalyzer {

    companion object {

        /**
         * 문자열 Count Check
         * String 문자열 전체 에서 하나씩 불러 들이고 체크함
         */
        fun getTextCount(res: String) {
            for (i in res.indices step (1)) {
                val strIdx = i.toString()
                Log.d(TAG_TEXT_ANALYZER, strIdx + " 번째 : " + res[i])
            }
            //Log.d(TAG_TEXT_ANALYZER, "Text Count All : ${res.length}")
        }

        /**
         * Object Type Check
         */
        fun isTypeName(obj: Any) {
            when (obj) {
                is Int -> {
                    Log.d(TAG_TEXT_ANALYZER, "Type = Integer")
                }
                is Float -> {
                    Log.d(TAG_TEXT_ANALYZER, "Type = Float")
                }
                is String -> {
                    Log.d(TAG_TEXT_ANALYZER, "Type = String")
                }
            }
        }

        /**
         * if compare Equal return true
         */
        fun isCompareEqual(res: String, new: String): Boolean {
            return res.compareTo(new) == 0
        }
    }
}