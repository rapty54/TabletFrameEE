package com.vsdisp.tabletframeee.utils

import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import java.io.File

/**
 * Provider Util
 *
 * 버전 호환 별로 파일 보안 레벨에 따른 정책 분기
 */
class ProviderUtil {

    companion object {

        private const val PROVIDER_FILE_NAME: String = ".fileprovider"

        /**
         * Uri From File
         */
        fun getUriFromFile(ctx: AppCompatActivity, filePath: String): Uri {
            return if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
                Uri.fromFile(File(filePath))
            } else {
                FileProvider.getUriForFile(
                    ctx, ctx.packageName + PROVIDER_FILE_NAME, File(filePath)
                )
            }
        }
    }
}