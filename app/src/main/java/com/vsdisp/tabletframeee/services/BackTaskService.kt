package com.vsdisp.tabletframeee.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import com.vsdisp.tabletframeee.caches.WVCacheControl
import com.vsdisp.tabletframeee.common.BACK_TASK_OPTION_ROOT_CHECK
import com.vsdisp.tabletframeee.common.BACK_TASK_OPTION_WV_CLEAR_ALL_RESET
import com.vsdisp.tabletframeee.common.BACK_TASK_OPTION_WV_CLEAR_CACHE
import com.vsdisp.tabletframeee.common.BACK_TASK_SERVICE_KEY
import com.vsdisp.tabletframeee.protection.RootUtils
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch

/**
 * Work Service On Back Process
 */
class BackTaskService : Service() {

    private val job = SupervisorJob()

    private val scope = CoroutineScope(Dispatchers.IO + job)

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent!!.getIntExtra(BACK_TASK_SERVICE_KEY, 0)) {
            BACK_TASK_OPTION_WV_CLEAR_CACHE -> {
//                Log.d(
//                    LogTagName.TAG_TASK_SERVICE,
//                    "Back Task Work $BACK_TASK_OPTION_WV_CLEAR_CACHE"
//                )
                clearCacheOnWebView()
            }
            BACK_TASK_OPTION_ROOT_CHECK -> {
//                Log.d(
//                    LogTagName.TAG_TASK_SERVICE,
//                    "Back Task Work $BACK_TASK_OPTION_ROOT_CHECK"
//                )
                rootingCheckComplete()
            }
            BACK_TASK_OPTION_WV_CLEAR_ALL_RESET -> {
//                Log.d(
//                    LogTagName.TAG_TASK_SERVICE,
//                    "Back Task Work $BACK_TASK_OPTION_WV_CLEAR_ALL_RESET"
//                )
                clearAllResetOnWebView()
            }
        }
        return START_NOT_STICKY
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        //super.onTaskRemoved(rootIntent)
        //activate work automatically when application suppose be destroy
        clearCacheOnWebView()
        stopSelf()
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    override fun onBind(p0: Intent?): IBinder? {
        return null
    }

    /**
     * clear cache with all step
     */
    private fun clearCacheOnWebView() {
        scope.launch(coroutineExceptionHandler) {
            try {
                WVCacheControl.clearCacheCurrentCtx(applicationContext, null)
                WVCacheControl.clearFilesDir(applicationContext, null)
                applicationContext.deleteDatabase("webview.db");
                applicationContext.deleteDatabase("webviewCache.db");
            } catch (e: Exception) {
                throw e
            }
        }
    }

    /**
     * Clear Reset on WebView (which means all reset completely)
     */
    private fun clearAllResetOnWebView() {
        scope.launch(coroutineExceptionHandler) {
            try {
                WVCacheControl.clearCacheRemoveAllReset(applicationContext, null)
            } catch (e: Exception) {
                throw e
            }
        }
    }

    /**
     * Root Check Using Back Task Just In Case
     */
    private fun rootingCheckComplete() {
        scope.launch {
            val isRooted = RootUtils.isRootedCert(applicationContext)
            //Log.d(TAG, "isRooted :: $isRooted")
        }
    }

    private val coroutineExceptionHandler =
        CoroutineExceptionHandler { coroutineContext, exception ->
            //Log.d(TAG, "Coroutine Exception Handler Exception: $exception")
            if (exception.message?.isNotEmpty() == true) {
                //Log.d(TAG, "Coroutine Exception...")
                scope.cancel()
            }
        }

}