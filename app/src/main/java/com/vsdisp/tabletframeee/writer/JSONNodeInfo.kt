package com.vsdisp.tabletframeee.writer

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.TimeApiInfo
import com.vsdisp.tabletframeee.prefs.PrefUtil
import com.vsdisp.tabletframeee.utils.FileUtil


/**
 * 네트워크 차단 되었을 때 마지막 으로 네트워크를 통하여
 *
 * 전딜빋은 컨텐츠 다운로드 정보 JSON Node 를 내부에 저장 한다.
 *
 * JSON Node 를 저장하는 시점은 최종 통신 끝난 이후
 *
 */
class JSONNodeInfo(ctx: AppCompatActivity) {

    private var mCtx = ctx

    companion object {
        const val TAG = "JSONNodeInfo"
        const val MIME_JSON_NODE_KEY = "MIME_JSON_NODE"
        const val NETWORK_TIME_KEY = "NETWORK_TIME_KEY"
    }

    /**
     * JSON Node Set
     */
    fun savedMIMEInfoIntoPreference(
        jsonNodeObject: MimeDownloadInfo,
        callSavedStateCallFn: ((Boolean) -> Unit),
    ) {
        try {
            if (!jsonNodeObject.equals(null)) {
                // to JSON
                val json = Gson().toJson(jsonNodeObject)
                PrefUtil.getInstance(mCtx)?.put(MIME_JSON_NODE_KEY, json)
                callSavedStateCallFn(true)
            } else {
                Log.w(TAG, "NotSaved MIME Info is null")
                callSavedStateCallFn(false)
            }
        } catch (e: Exception) {
            Log.w(TAG, "====${e.message}")
            callSavedStateCallFn(false)
        }
    }

    /**
     * JSON Node Set
     */
    fun savedNTTimeIntoPreference(
        jsonNodeObject: TimeApiInfo,
        callSavedStateCallFn: ((Boolean) -> Unit),
    ) {
        try {
            if (!jsonNodeObject.equals(null)) {
                // to JSON
                val json = Gson().toJson(jsonNodeObject)
                PrefUtil.getInstance(mCtx)?.put(NETWORK_TIME_KEY, json)
                callSavedStateCallFn(true)
            } else {
                Log.w(TAG, "NotSaved MIME Info is null")
                callSavedStateCallFn(false)
            }
        } catch (e: Exception) {
            Log.w(TAG, "====${e.message}")
            callSavedStateCallFn(false)
        }
    }

    /**
     * JSON Node Get
     */
    fun getMIMEInfoFromPreferences(): MimeDownloadInfo? {
        // from JSON
        val getJsonString = PrefUtil.getInstance(mCtx)?.getValue(MIME_JSON_NODE_KEY, "")
        return if (!getJsonString.isNullOrEmpty()) {
            Log.w(TAG, "$getJsonString")
            Gson().fromJson(getJsonString, MimeDownloadInfo::class.java)
        } else {
            null
        }
    }

    fun getSavedNetworkTimeFromPreferences(): TimeApiInfo? {
        // from JSON
        val getJsonString = PrefUtil.getInstance(mCtx)?.getValue(NETWORK_TIME_KEY, "")
        return if (!getJsonString.isNullOrEmpty()) {
            Log.w(TAG, "$getJsonString")
            Gson().fromJson(getJsonString, TimeApiInfo::class.java)
        } else {
            null
        }
    }

    /**
     * Check Saved MIME JSON NODE
     */
    fun isSavedMIMEInfo(): Boolean {
        val getJsonString = PrefUtil.getInstance(mCtx)?.getValue(MIME_JSON_NODE_KEY, "")
        return !getJsonString.isNullOrEmpty()
    }

    /**
     * 저장된 JSON 기준 으로
     */
    fun isExistDownloadMIMEInfoFromDeviceUsingPreference(): Boolean {
        try {
            var devicePathRoot = FileUtil.getRootDirPath(mCtx) + "/VST"
            val mimeInfo = getMIMEInfoFromPreferences()!!
            mimeInfo?.contents?.forEach { it ->
                var vt = it.viewType // 출력
                var fn = it.filename
                var fp = it.downloadPath
                var downloadPathInDeviceFull =
                    "$devicePathRoot$fp$fn.${vt}" // 단말내 저장 풀경로 (파일이름 + 확장자명)

                if (isAlreadyFileExistCheckForInternalDevice(mCtx, downloadPathInDeviceFull)) {
                    return true
                    return@forEach
                }
            }
        } catch (e: Exception) {
            return false
        }
        return false
    }

    /**
     * 단말 내에 저장된 파일이 있느냐
     */
    private fun isAlreadyFileExistCheckForInternalDevice(
        mCtx: AppCompatActivity,
        deviceSavedPathFull: String,
    ): Boolean {
        var deviceSavedPathWithFileName = deviceSavedPathFull
        return FileUtil.isFileExistByDepthInDeviceByFullPath(mCtx, deviceSavedPathWithFileName)
    }
}