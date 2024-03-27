package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.os.FileObserver
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.ActSettings
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.actbase.model.ActDeleteResultData
import com.vsdisp.tabletframeee.common.LogTagName
import com.vsdisp.tabletframeee.databinding.DialogContentsDeleteAllBinding
import com.vsdisp.tabletframeee.fileobs.RxFileObserver
import com.vsdisp.tabletframeee.utils.FileUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.File

/**
 * 다운 로드 된 컨텐츠 전체 삭제
 *
 * 누적된 모든 컨텐츠 모두 삭제
 */
class CustomFileDeleteCTAll(
    ctx: AppCompatActivity,
    deleteComplete: (ActDeleteResultData) -> Unit,
) {

    var devicePathRoot = FileUtil.getRootDirPath(ctx) + "/VST"

    private val cInstance = (ctx as ActSettings)

    private var binding: DialogContentsDeleteAllBinding =
        DialogContentsDeleteAllBinding.inflate(ctx.layoutInflater)

    private lateinit var rxf: RxFileObserver

    private val dL = Dialog(ctx)

    private val callReturn = deleteComplete

    init {
        val layer = returnLayer()
        val txContentTitle = layer.deleteContentTitleAll
        val txDescription = layer.deleteTextDescription

        cInstance.launch(Dispatchers.Main) {
            txContentTitle.text = ctx.getString(R.string.tx_downloaded_all_title)
            txDescription.text = ctx.getString(R.string.tx_downloaded_all_description)
        }
        cInstance.launch(Dispatchers.IO) {
            Handler(Looper.getMainLooper()).postDelayed({
                try {
                    // File Delete Action After 1 sec
                    FileUtil.deleteDirectory(File(devicePathRoot))
                } catch (e: Exception) {

                }
            }, 900)
            startFileWatching(devicePathRoot, callDelete = {
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

    private fun returnLayer(): DialogContentsDeleteAllBinding {
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