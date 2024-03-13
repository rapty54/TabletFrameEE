package com.vsdisp.tabletframeee.utils

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import androidx.activity.result.ActivityResultLauncher
import androidx.appcompat.app.AppCompatActivity

class ActUtil {

    companion object {

        /**
         * 구 방식
         *
         * 다운로드를 모두 마친 이후
         * 단말내 해당 경로 안에 다운 로드 받은 APK 를 설치 하는 과정을
         * 현재의 사항 으로 처리 한다.
         */
        fun openNewVersion(
            downloadedApkInternalPath: String,
            ctx: AppCompatActivity,
        ) {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.setDataAndType(
                ProviderUtil.getUriFromFile(ctx, downloadedApkInternalPath),
                "application/vnd.android.package-archive"
            )
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            ctx.startActivity(intent)
        }

        /**
         * 구 방식
         * Move To Setting Detail
         */
        fun moveSettingDetail(
            act: AppCompatActivity,
            actsLauncher: ActivityResultLauncher<Intent>,
        ) {
            actsLauncher.launch(
                Intent(
                    Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                    Uri.parse("package:" + act.packageName)
                ).apply {
                    this.addCategory(Intent.CATEGORY_DEFAULT)
                    //this.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
        }

        /**
         * 구 방식
         * Network 설정 화면 으로 이동
         */
        fun moveToNetworkSettingScreen(act: AppCompatActivity) {
            act.startActivity(Intent(Settings.ACTION_WIRELESS_SETTINGS));
        }
    }
}