package com.vsdisp.tabletframeee.utils

import android.os.Build

/**
 * https://developer.android.com/reference/android/os/Build.VERSION_CODES
 * VERSION_CODES
 */
class VersionCondition {
    companion object {
        /**
         * Target Over 8
         */
        fun isOverTarget8(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
        }

        /**
         * Target Over 11
         */
        fun isOverTarget11(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
        }

        /**
         * Target Over 12
         */
        fun isOverTarget12V(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.S_V2
        }

        /**
         * Target Over 13
         */
        fun isOverTarget13(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
        }

        /**
         * Target Over 6
         */
        fun isOverTarget6(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
        }

        /**
         * Target Pie
         */
        fun isOverTargetPie(): Boolean {
            return Build.VERSION.SDK_INT >= Build.VERSION_CODES.P
        }
    }
}