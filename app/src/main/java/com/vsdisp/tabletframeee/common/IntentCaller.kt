package com.vsdisp.tabletframeee.common

import android.app.ActivityManager
import android.content.Context
import android.content.Context.ACTIVITY_SERVICE
import android.content.Intent
import android.content.pm.ResolveInfo
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity


/**
 * Intent Caller (Intent 를 이용한 호출 함수 용도별 정의)
 */
class IntentCaller {
    companion object {
        /**
         * App To App 호출 (Package 명)
         * 연관 정의
         */
        fun callAppByPackageName(mContext: AppCompatActivity, packageName: String) {
            val it = mContext.packageManager.getLaunchIntentForPackage(packageName)
            it!!.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            mContext.startActivity(it)
        }

        /**
         * App To App 호출 (Task option 선택)
         */
        fun callAppByPackageNameWithTaskOptions(
            mContext: AppCompatActivity,
            packageName: String,
            options: Int,
        ) {
            val it = mContext.packageManager.getLaunchIntentForPackage(packageName)
            when (options) {
                0 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                }

                1 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                }

                2 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_SINGLE_TOP
                }

                else -> {
                    // No Options
                    it!!.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
            }
            mContext.startActivity(it)
        }

        /**
         * App To App 호출 (Task option 선택 With Action)
         */
        fun callAppByPackageNameWithTaskOptionsAndAction(
            mContext: AppCompatActivity,
            packageName: String,
            options: Int,
            actions: String
        ) {
            // mContext.packageManager.getLaunchIntentForPackage(packageName)
            val it = mContext.packageManager.getLaunchIntentForPackage(packageName)
            when (options) {
                0 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                }

                1 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK
                }

                2 -> {
                    it!!.flags = Intent.FLAG_ACTIVITY_SINGLE_TOP
                }

                else -> {
                    // No Options
                    it!!.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
            }
            Log.d("ACTIONS", "$actions $packageName")
            // "PACKAGE_NAME" / "PACKAGE_NAME.TARGET_ACTIVITY"
            // it.setClassName("","") When need Target Activity With Action
            it.action = actions
            mContext.startActivity(it)
        }

        /**
         * runningAppProcesses
         */
        @RequiresApi(Build.VERSION_CODES.O)
        fun getRunningRecentApps(context: Context) {
            val activityManager = context.getSystemService(ACTIVITY_SERVICE) as ActivityManager
            val probInfo = activityManager.runningAppProcesses
            for (info in probInfo) {
                Log.d("getRunningRecentApps Using List", info.processName)
            }
        }

        /**
         * Using Intent
         */
        @RequiresApi(Build.VERSION_CODES.O)
        fun getInstalledAppsInfo(context: Context) {
            val mainIntent = Intent(Intent.ACTION_MAIN, null)
            mainIntent.addCategory(Intent.CATEGORY_LAUNCHER)
            val pkgAppsList: List<ResolveInfo> =
                context.packageManager.queryIntentActivities(mainIntent, 0)
            for (pkg in pkgAppsList) {
                val va = pkg.isInstantAppAvailable
                val vb = pkg.resolvePackageName
                val vc = pkg.activityInfo.processName
                val vd = pkg.activityInfo.packageName
                val vn = pkg.activityInfo.taskAffinity
                val vt = pkg.activityInfo.exported
                val vs = pkg.activityInfo.enabled
                Log.d("getRunningRecentApps Using Intent", "$va $vb $vc $vd $vn $vt $vs")
            }
        }
    }
}