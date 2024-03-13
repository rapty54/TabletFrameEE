package com.vsdisp.tabletframeee.fileobs

import android.os.FileObserver
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject

/**
 * RX File Observer
 * Declare Observable Serial Data
 */
class RxFileObserver(private var path: String, eventMask: Int = FileObserver.ALL_EVENTS) :
    FixedFileObserver(path, eventMask) {
    // Serializable
    private val subject = PublishSubject.create<EventData>().toSerialized()

    // Observable
    val observable: Observable<EventData> =
        subject.doOnSubscribe { startWatching() }
            .doOnDispose { stopWatching() }
            .share()

    override fun onEvent(event: Int, relativePath: String?) {
        // Event Data
        val evData = relativePath?.let { EventData(event, it) }
        if (evData != null) {
            subject.onNext(evData)
        }
    }

}