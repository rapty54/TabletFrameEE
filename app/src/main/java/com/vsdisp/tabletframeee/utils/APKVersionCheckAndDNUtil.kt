package com.vsdisp.tabletframeee.utils

import androidx.appcompat.app.AppCompatActivity
import java.io.File

/**
 * APKVersionCheckUtil
 */
class APKVersionCheckAndDNUtil {

    companion object {
        /**
         * 단말 내부 경로에 찾고자 하는 파일이 있는지 존재 여부
         */
        fun isFileExistByDepthInDeviceByFullPath(
            ctx: AppCompatActivity,
            fullPath: String,
        ): Boolean {
            return if (!fullPath.isNullOrEmpty()) {
                val file = File(fullPath)
                file.exists()
            } else {
                false
            }
        }
    }
}