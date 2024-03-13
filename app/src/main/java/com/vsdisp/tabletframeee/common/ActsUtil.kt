package com.vsdisp.tabletframeee.common

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import androidx.activity.result.ActivityResultLauncher
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.services.BackTaskService

/**
 * Activity 에서 부가적 으로 사용 하는 사항만 이쪽 으로 뺌
 */
class ActsUtil {
    companion object{
        /**
         * BackTaskService Start by ID Key
         */
        fun startBasicService(ctx: AppCompatActivity, type: Int) {
            Intent(ctx, BackTaskService::class.java).run {
                this.putExtra(BACK_TASK_SERVICE_KEY, type)
                ctx.startService(this)
            }
        }

        /**
         * APP Task Terminate
         */
        fun exitProcess(act: AppCompatActivity, isTerminateProcess: Boolean) {
            try {
                if (isTerminateProcess) {
                    act.finishAffinity();
                    android.os.Process.killProcess(android.os.Process.myPid());
                } else {
                    act.moveTaskToBack(true)
                    act.finishAndRemoveTask()
                }
            } catch (e: Exception) {
                //Log.d("exitProcess", e.message.toString())
            }
        }

        /**
         * Move To Setting Detail
         */
        fun moveSettingDetail(
            act: AppCompatActivity,
            actsLauncher: ActivityResultLauncher<Intent>
        ) {
            actsLauncher.launch(Intent(
                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                Uri.parse("package:" + act.packageName)
            ).apply {
                this.addCategory(Intent.CATEGORY_DEFAULT)
                this.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            })
        }
    }
}