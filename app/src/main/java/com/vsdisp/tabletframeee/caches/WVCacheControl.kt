package com.vsdisp.tabletframeee.caches

import android.content.Context
import android.util.Log
import com.vsdisp.tabletframeee.common.AppCurrentInfo
import com.vsdisp.tabletframeee.common.LogTagName
import java.io.File

/**
 * When need delete
 */
class WVCacheControl {
    companion object {
        // SubPath Directions
        // const val DIR_CACHE_PATH = "cache"
        // const val DIR_CODE_CACHE_PATH = "code_cache"
        // const val DIR_FILES = "files"
        // const val DIR_SHARED_PREFS = "shared_prefs"
        // const val DIR_DATABASES = "databases"
        // const val DIR_NO_BACKUP = "no_backup"
        const val DIR_APP_WEBVIEW = "app_webview"
        // const val DIR_APP_TEXTURE = "app_textures"

        /**
         * Root Path ()
         * - /data/user/0/com.vsdisp.tabletframeee/files
         */
        fun clearFilesDir(ctx: Context, file: File?) {

            var dir: File?

            if (file == null) {
                dir = ctx.filesDir
                if (AppCurrentInfo.isBuildDev()) {
                    Log.d(LogTagName.TAG_WV_CACHE_CONTROL, "clearFilesDir : $dir")
                }
            } else {
                dir = file
            }

            if (dir == null) return

            val children: Array<File> = dir.listFiles() as Array<File>
            if (AppCurrentInfo.isBuildDev()) {
                Log.d(LogTagName.TAG_WV_CACHE_CONTROL, "Children....${children.size}")
            }
            try {
                for (i in children.indices) if (children[i].isDirectory)
                    clearFilesDir(
                        ctx,
                        children[i]
                    ) else confirmedFilePathInfo(
                    LogTagName.TAG_WV_CACHE_CONTROL,
                    children[i].name,
                    children[i].path,
                    children[i]
                )
            } catch (e: Exception) {
                //Log.d(LogTagName.TAG_WV_CACHE_CONTROL, e.toString())
            }
        }

        /**
         * this paths accumulate Http Cache on directly
         * Root Path
         * - /data/user/0/com.vsdisp.tabletframeee/cache
         */
        fun clearCacheCurrentCtx(ctx: Context, file: File?) {
            var dir: File?

            if (file == null) {
                dir = ctx.cacheDir
                if (AppCurrentInfo.isBuildDev()) {
                    Log.d(LogTagName.TAG_WV_CACHE_CONTROL, "clearCacheCurrentCtx :: $dir")
                }
            } else {
                dir = file
            }

            if (dir == null) return

            val children: Array<File> = dir.listFiles() as Array<File>
            if (AppCurrentInfo.isBuildDev()) {
                Log.d(
                    LogTagName.TAG_WV_CACHE_CONTROL,
                    "clearCacheCurrentCtx Children....${children.size}"
                )
            }
            try {
                for (i in children.indices) if (children[i].isDirectory)
                    clearCacheCurrentCtx(
                        ctx,
                        children[i]
                    ) else confirmedFilePathInfo(
                    LogTagName.TAG_WV_CACHE_CONTROL,
                    children[i].name,
                    children[i].path,
                    children[i]
                )
            } catch (e: Exception) {
//                Log.d(LogTagName.TAG_WV_CACHE_CONTROL, e.toString())
            }
        }

        /**
         * 완전 초기화됨 특정 목적이 아니구서는 사용안함
         * app_webview 경로는 WebView SessionStorage Cookies 기타
         * 저장에 필요한 사항들이 누적되는 곳
         * Root Path
         * - /data/user/0/com.vsdisp.tabletframeee/app_webview
         */
        fun clearCacheRemoveAllReset(act: Context, file: File?) {

            var dir: File?

            val dataDir: String = act.packageManager
                .getPackageInfo(act.packageName, 0).applicationInfo.dataDir

            if (file == null) {
                dir = File("$dataDir/app_webview/")
                if (AppCurrentInfo.isBuildDev()) {
                    Log.d(LogTagName.TAG_WV_CACHE_CONTROL, "clearCacheRemoveAllReset :: $dir")
                }
            } else {
                dir = file
            }

            val children: Array<File> = dir.listFiles() as Array<File>
            try {
                for (i in children.indices) if (children[i].isDirectory)
                    clearCacheRemoveAllReset(
                        act,
                        children[i]
                    ) else confirmedFilePathInfo(
                    LogTagName.TAG_WV_CACHE_CONTROL,
                    children[i].name,
                    children[i].path,
                    children[i]
                )
            } catch (e: Exception) {
                //Log.d(LogTagName.TAG_WV_CACHE_CONTROL, e.toString())
            }
        }

        /**
         * if you wanna know where they're locate it by themselves
         */
        private fun confirmedFilePathInfo(
            pathLocationTag: String,
            pathName: String,
            pathDetail: String,
            file: File?,
        ) {
            if (AppCurrentInfo.isBuildDev()) {
                Log.d(
                    pathLocationTag,
                    "$pathName||$pathDetail"
                )
            }
            file!!.delete()
        }

        /**
         * Get to know App Path From ParentsPath of Direction
         * /data/user/0/com.vsdisp.tabletframeee/cache
         * /data/user/0/com.vsdisp.tabletframeee/code_cache
         * /data/user/0/com.vsdisp.tabletframeee/files
         * /data/user/0/com.vsdisp.tabletframeee/shared_prefs
         * /data/user/0/com.vsdisp.tabletframeee/databases
         * /data/user/0/com.vsdisp.tabletframeee/no_backup
         * /data/user/0/com.vsdisp.tabletframeee/app_webview
         * /data/user/0/com.vsdisp.tabletframeee/app_textures
         */
//        fun userDirListCheckAll(act: Context) {
//            val tag = "userDirListCheckAll"
//            val dataDir: String = act.packageManager
//                .getPackageInfo(act.packageName, 0).applicationInfo.dataDir
//
//            val dir = File(dataDir)
//
//            val children: Array<File> = dir.listFiles() as Array<File>
//
//            for (i in children.indices) if (children[i].isDirectory) {
//                val paths = children[i]
//                if (AppCurrentInfo.isBuildDev()) {
//                    Log.d(tag, "${paths.name} + || +${paths.path}")
//                }
//            }
//        }

        /**
         * Root Path
         * /data/user/0/<packageName>
         * Can be set Target Name if you wanna access locate it
         * Just In Case
         */
//        fun userDirListAsTargetPath(act: Context, targetNm: String) {
//            val tag = "userDirListAsTargetPath"
//            val dataDir: String = act.packageManager
//                .getPackageInfo(act.packageName, 0).applicationInfo.dataDir
//
//            val targetDir = if (targetNm.isNotEmpty()) {
//                if (targetNm == DIR_APP_WEBVIEW) {
//                    // Extra Case
//                    "$dataDir/$targetNm/Default"
//                } else {
//                    "$dataDir/$targetNm"
//                }
//            } else {
//                dataDir
//            }
//
//            if (AppCurrentInfo.isBuildDev()) {
//                Log.d(tag, targetDir)
//            }
//
//            val dir = File(targetDir)
//
//            val children: Array<File> = dir.listFiles() as Array<File>
//            Log.d(tag, "${children.size}")
//            for (i in children.indices) if (children[i].isDirectory) {
//                val paths = children[i]
//                if (AppCurrentInfo.isBuildDev()) {
//                    Log.d(tag, "${paths.name} + || +${paths.path}")
//                }
//            }
//        }

        /**
         * 현재의 사항 Option 일뿐 예비용
         *
         * Setting 화면에서 사용자가 직접 선택해서 Cache 를 지우겠끔
         *
         * 유도할떄 방법 1 WebView 를 직접 접근해서 Cache 를 날린다.
         *
         * 그리고 Cookie 를 Sync 한다.
         */
//        private fun refreshWebView(webView: WebView, ctx: AppCompatActivity) {
//            webView.clearCache(true)
//            webView.clearHistory()
//            // 자동완성은 8.0부터는 내장되어 아래 함수 안먹음
//            // 자동완성은 8.0부터는 내장되어 아래 함수 안먹음
//            // webView.clearFormData()
//            val cookieManager: CookieManager = CookieManager.getInstance()
//            cookieManager.removeAllCookies(null)
//            cookieManager.flush()
//        }

        //        /**
//         * Just only For Targeting towards httpCache directory
//         */
//        fun clearHttpCacheCurrentCtx(ctx: Context, file: File?) {
//            var dir: File? = null
//            val ch = PkgUtil.appPackageInstance(ctx)
//            var dataDirs = ""
//
//            if (ch !== null) {
//                dataDirs = ch.applicationInfo.dataDir
//
//                if (file == null) {
//                    dir = File("$dataDirs/cache/WebView/Default/HTTP Cache/Cache_Data")
//                    if (AppCurrentInfo.isBuildDev()) {
//                        Log.d(LogTagName.TAG_WV_CACHE_CONTROL, "clearHttpCacheCurrentCtx :: $dir")
//                    }
//                } else {
//                    dir = file
//                }
//
//                val children: Array<File> = dir.listFiles() as Array<File>
//                if (AppCurrentInfo.isBuildDev()) {
//                    Log.d(
//                        LogTagName.TAG_WV_CACHE_CONTROL,
//                        "clearHttpCacheCurrentCtx Children....${children.size}"
//                    )
//                }
//                try {
//                    for (i in children.indices) if (children[i].isDirectory)
//                        clearHttpCacheCurrentCtx(
//                            ctx,
//                            children[i]
//                        ) else confirmedFilePathInfo(
//                        LogTagName.TAG_WV_CACHE_CONTROL,
//                        children[i].name,
//                        children[i].path,
//                        children[i]
//                    )
//                } catch (e: Exception) {
//                    //Log.d(LogTagName.TAG_WV_CACHE_CONTROL, e.toString())
//                }
//            }
//        }
    }
}