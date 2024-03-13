package com.vsdisp.tabletframeee.common

import android.content.Context
import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import com.vsdisp.tabletframeee.utils.VersionCondition

/**
 * Package Util
 * (Package 기능 관련 Util)
 */
class PkgUtil {

    companion object {
        /**
         * 찾고자 하는 Package Name 을 Parameter 값으로 넣어서 현단말내에 설치가 되어 있는지
         * 알수가 있다.
         * SDK 33 이상 / 이하 지원함수 상이
         */
        fun isAppInstalledByPkgName(ctx: Context, packageName: String): Boolean {
            try {
                val flags = 0
                val packageManager = ctx.packageManager
                val result: PackageInfo

                if (VersionCondition.isOverTarget13()) {
                    result = packageManager.getPackageInfo(
                        packageName,
                        PackageManager.PackageInfoFlags.of(flags.toLong())
                    )
                } else {
                    @Suppress("DEPRECATION")
                    result = packageManager.getPackageInfo(packageName, flags)
                }
                return result.packageName.isNotEmpty()
            } catch (e: Exception) {
                // Activity Not Found Exception
                return false
            }
        }

//        /**
//         * /data/user/0/com.vsdisp.tabletframeee 하위 경로
//         */
//        fun checkAllCurrentAppFileDirs(ctx: Context) {
//            val dir = File(appPackageInternalDir(ctx))
//            val children: Array<File> = dir.listFiles() as Array<File>
//            for (i in children.indices) if (children[i].isDirectory) {
//                val paths = children[i]
////                Log.d(LogTagName.TAG_PKG_UTIL, "${paths.name} + || +${paths.path}")
//            }
//        }
//
//        /**
//         * App 내부 상위 Direction
//         */
//        private fun appPackageInternalDir(ctx: Context): String {
//            return try {
//                val ap = appPackageInstance(ctx)
//                if (ap !== null) {
////                    Log.d(LogTagName.TAG_PKG_UTIL, "AP : $ap")
//                    ap.applicationInfo.dataDir
//                } else {
//                    ""
//                }
//            } catch (e: Exception) {
//                ""
//            }
//        }

//        /**
//         * Application ID Name => Package Name
//         * Context 로 가져오는 방법 / Build Config 에서 가져오는 방법
//         */
//        private fun getApplicationNameID(ctx: Context): String {
//            return ctx.packageName.ifEmpty {
//                AppCurrentInfo.getApplicationIDS()
//            }
//        }

//        /**
//         * SDK 33 Version 별 분기
//         */
//        fun appPackageInstance(ctx: Context): PackageInfo? {
//            try {
//                val flags = 0
//                val mPInfo: PackageInfo
//                val mPackageManager = ctx.packageManager
//                val currentAppPackageName = getApplicationNameID(ctx)
////                Log.d(LogTagName.TAG_PKG_UTIL, "App Package Name : $currentAppPackageName")
//                if (VersionCondition.isOverTarget13()) {
//                    mPInfo = mPackageManager.getPackageInfo(
//                        currentAppPackageName,
//                        PackageManager.PackageInfoFlags.of(flags.toLong())
//                    )
//                } else {
//                    @Suppress("DEPRECATION")
//                    mPInfo = ctx.packageManager.getPackageInfo(currentAppPackageName, flags)
//                }
//                return mPInfo
//            } catch (e: Exception) {
//                return null
//            }
//        }
    }
}