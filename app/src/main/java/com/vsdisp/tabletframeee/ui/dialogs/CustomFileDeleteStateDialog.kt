package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.os.FileObserver
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.ActDownList
import com.vsdisp.tabletframeee.actbase.model.ActDeleteResultData
import com.vsdisp.tabletframeee.common.LogTagName
import com.vsdisp.tabletframeee.databinding.DialogContentsDeleteBinding
import com.vsdisp.tabletframeee.fileobs.RxFileObserver
import com.vsdisp.tabletframeee.ui.multilist.online.model.ItemDetail
import com.vsdisp.tabletframeee.utils.FileUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * 파일 삭제 Dialog
 */
class CustomFileDeleteStateDialog(
    ctx: AppCompatActivity,
    itemInfo: ItemDetail,
    deleteComplete: (ActDeleteResultData) -> Unit,
) {

    var mItemsInfo = itemInfo

    private var binding: DialogContentsDeleteBinding =
        DialogContentsDeleteBinding.inflate(ctx.layoutInflater)

    private lateinit var rxf: RxFileObserver

    private val dL = Dialog(ctx)

    private val cInstance = (ctx as ActDownList)

    private val callReturn = deleteComplete

    init {

        val layer = returnLayer()
        val txContentTitle = layer.deleteContentTitle
        val txDescription = layer.deleteTextDescription

        cInstance.launch(Dispatchers.Main) {
            txContentTitle.text = "삭제 항목 : " + mItemsInfo.title
            txDescription.text = "잠시만 기다려 주세요\n해당 파일 삭제 중 입니다."
        }

        var deviceSavedPath = mItemsInfo.downloadDevicePath
        var fileNameWithExt = mItemsInfo.filenameWithExt
        var deviceSavedPathWithFileName = deviceSavedPath + fileNameWithExt

        cInstance.launch(Dispatchers.IO) {
            Handler(Looper.getMainLooper()).postDelayed({
                // File Delete Action After 1 sec
                FileUtil.deleteFile(deviceSavedPathWithFileName)
            }, 900)
            startFileWatching(deviceSavedPath, callDelete = {
                if (it) {
                    dismissCease()
                } else {

                }
            })
            // 파일이 존재함 (지움)
        }
        dL.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dL.setContentView(binding.root)
        dL.setCancelable(false)
        showDL()
    }


    /**
     * Start File Watching
     */
    private fun startFileWatching(path: String, callDelete: (Boolean) -> Unit) {
        rxf = RxFileObserver(path)
        rxf.observable.subscribe({ item ->
            Log.d(LogTagName.TAG_FILE_OBSERVER, "${item.event} ${item.relativePath}")
            if (item.event == FileObserver.DELETE) {
                // delete watching start
                callDelete(true)
            }
        }, { throwable ->
            Log.d(LogTagName.TAG_FILE_OBSERVER, "$throwable")
        }, {
            // observer complete
            Log.d(LogTagName.TAG_FILE_OBSERVER, "observer complete")
        })
        rxf.startWatching()
    }


    /**
     * STOP File Watching
     */
    private fun stopRxObj() {
        try {
            if (rxf !== null) {
                rxf.stopWatching()
                if (rxf.observable !== null) {
                    rxf.observable.unsubscribeOn(null)
                }
            }
        } catch (e: Exception) {
            Log.d("TAG", "${e.message}")
        }
    }

    private fun returnLayer(): DialogContentsDeleteBinding {
        return binding
    }

    private fun showDL() {
        dL.show()
    }

    private fun dismissCease() {
        if (dL != null) {
            cInstance.launch(Dispatchers.Main) {
                stopRxObj()
                Handler(Looper.getMainLooper()).postDelayed({
                    callReturn(ActDeleteResultData(true, -1))
                    dL.dismiss()
                }, 1000)
            }
        }
    }
}