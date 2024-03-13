package com.vsdisp.tabletframeeeeeee

import android.app.Application
import android.content.Context
import android.util.Log
import com.vsdn.VSTDownloader
import com.vsdn.VSTDownloaderConfig

/**
 * TabletVSNoneMtApplication Without Multidex
 * Multidex 없는 Application
 */
class TabletVSNoneMtApplication : Application() {
    init {
        instance = this
    }

    companion object {
        var instance: TabletVSNoneMtApplication? = null
        fun context(): Context {
            return instance!!.applicationContext
        }

        private const val TAG = "TabletVSApplication"
    }

    override fun attachBaseContext(base: Context?) {
        super.attachBaseContext(base)
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