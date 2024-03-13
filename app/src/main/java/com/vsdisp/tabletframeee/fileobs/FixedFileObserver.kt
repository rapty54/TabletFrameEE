package com.vsdisp.tabletframeee.fileobs

import android.os.Build
import android.os.FileObserver
import java.io.File

var sObserverLists = mutableMapOf<File, MutableSet<FixedFileObserver>>()

abstract class FixedFileObserver(
    path: String,
    private val eventMask: Int = FileObserver.ALL_EVENTS
) {
    private var fileObserver: FileObserver? = null
    private val rootPath: File = File(path)

    abstract fun onEvent(event: Int, relativePath: String?)

    fun startWatching() {
        synchronized(sObserverLists) {
            if (!sObserverLists.containsKey(rootPath)) {
                sObserverLists[rootPath] = mutableSetOf()
            }

            val fixedObservers = sObserverLists[rootPath]

            fileObserver = if (fixedObservers!!.isNotEmpty()) {
                fixedObservers.iterator().next().fileObserver
            } else {
                if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    // new version
                    object : FileObserver(File(rootPath.path)) {
                        override fun onEvent(event: Int, path: String?) {
                            for (fixedObserver in fixedObservers) {
                                if (event and fixedObserver.eventMask != 0) {
                                    fixedObserver.onEvent(event, path)
                                }
                            }
                        }
                    }
                }else{
                    // old version
                    object : FileObserver(rootPath.path) {
                        override fun onEvent(event: Int, path: String?) {
                            for (fixedObserver in fixedObservers) {
                                if (event and fixedObserver.eventMask != 0) {
                                    fixedObserver.onEvent(event, path)
                                }
                            }
                        }
                    }
                }
            }
            fixedObservers.add(this)
            fileObserver!!.startWatching()
        }
    }

    fun stopWatching() {
        synchronized(sObserverLists) {
            val fixedObservers = sObserverLists[rootPath]
            if (fixedObservers == null || fileObserver == null) {
                return
            }

            fixedObservers.remove(this)
            if (fixedObservers.isEmpty()) {
                fileObserver!!.stopWatching()
            }

            fileObserver = null
        }
    }
}