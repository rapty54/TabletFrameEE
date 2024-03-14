package com.vsdisp.tabletframeee

import android.content.Context
import android.util.Log
import androidx.multidex.MultiDex
import androidx.multidex.MultiDexApplication
import com.vsdn.VSTDownloader
import com.vsdn.VSTDownloaderConfig

/**
 * Extends By MultiDexApplication (현 상태 대형 유지)
 */
class TabletVSApplication : MultiDexApplication() {

    init {
        instance = this
    }

    companion object {
        var instance: TabletVSApplication? = null
        fun context(): Context {
            return instance!!.applicationContext
        }

        private const val TAG = "TabletVSApplication"
    }

    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
        MultiDex.install(this)
        Log.w(TAG, "=======attachBaseContext=======")
        initVSTDownloader()
    }

    override fun onCreate() {
        super.onCreate()
        // do something if you need
        Log.w(TAG, "=======onCreate=======")
    }

    override fun onTrimMemory(level: Int) {
        super.onTrimMemory(level)
        // do something if you need
        Log.w(TAG, "=======onTrimMemory=======")
    }

    override fun onTerminate() {
        super.onTerminate()
        // do something if you need
        Log.w(TAG, "=======onTerminate=======")
    }

    private fun initVSTDownloader() {
        try {
            val config: VSTDownloaderConfig =
                VSTDownloaderConfig.newBuilder().setDatabaseEnabled(true).build()
            VSTDownloader.initialize(this, config)
        } catch (e: Exception) {
            Log.w(TAG, "=======initVSTDownloader=======")
        }
    }
}