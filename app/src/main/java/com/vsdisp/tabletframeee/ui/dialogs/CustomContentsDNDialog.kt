package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.graphics.Color
import android.view.Window
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.common.model.ActDownloadResultData
import com.vsdisp.tabletframeee.databinding.DialogContentsDownloadBinding
import com.vsdisp.tabletframeee.ui.multilist.online.model.ItemDetail
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.FileUtil
import com.vsdisp.tabletframeee.utils.NetworkUtil
import com.vsdn.Error
import com.vsdn.OnDownloadListener
import com.vsdn.Status
import com.vsdn.VSTDownloader

/**
 * 컨텐트 다운로드 다이얼로그
 */
class CustomContentsDNDialog(
    ctx: AppCompatActivity,
    itemInfo: ItemDetail,
    downloadComplete: (ActDownloadResultData?) -> Unit,
) {

    var downloadID = 0

    var mItemsInfo = itemInfo

    private var binding: DialogContentsDownloadBinding =
        DialogContentsDownloadBinding.inflate(ctx.layoutInflater)

    private val dL = Dialog(ctx)

    init {
        dL.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dL.setContentView(binding.root)
        dL.setCancelable(false)

        val layer = returnLayer()
        val progressBar = layer.ctAssetWriteProgressBar
        val progressStatusTx = layer.ctTvProgress
        val contentsDescriptionTV = layer.ctTextDescription
        val resumeBt = layer.ctResumeBt
        val errorDescription = layer.ctTvErrorDescription

        var deviceSavedPath = mItemsInfo.downloadDevicePath
        var reqDownloadPath = mItemsInfo.downloadFSFullPath
        var fileNameWithExt = mItemsInfo.filenameWithExt
        // 컨텐츠 표기
        contentsDescriptionTV.text = itemInfo.title
        resumeBt.setOnClickListener {
            if (NetworkUtil.isConnectedUseNetwork(ctx)) {
                // 자동 이벤트 발생 Trigger
                // Toast.makeText(ctx, "CLICK PERFORM", Toast.LENGTH_SHORT).show()
                // 여기로 다운 로드 옮긴다.
                if (Status.RUNNING == VSTDownloader.getStatus(downloadID)) {
                    VSTDownloader.pause(downloadID)
                    return@setOnClickListener
                }

                resumeBt.isEnabled = false
                progressBar.isIndeterminate = true
                progressBar.indeterminateDrawable.setColorFilter(
                    Color.BLUE, android.graphics.PorterDuff.Mode.SRC_IN
                )

                errorDescription.text = ""

                if (Status.PAUSED == VSTDownloader.getStatus(downloadID)) {
                    VSTDownloader.resume(downloadID)
                    return@setOnClickListener
                }

                downloadID = VSTDownloader.download(
                    reqDownloadPath, deviceSavedPath, fileNameWithExt
                ).build().setOnStartOrResumeListener {
                    progressBar.isIndeterminate = false
                    resumeBt.isEnabled = false
                    resumeBt.text = ctx.getString(R.string.tx_bt_downloading)
                    errorDescription.text = ctx.getString(R.string.tx_download_desc)
                }.setOnProgressListener {
                    val progressPercent: Long = it.currentBytes * 100 / it.totalBytes
                    progressBar.progress = progressPercent.toInt()
                    progressStatusTx.text = FileUtil.getProgressDisplayLine(
                        it.currentBytes, it.totalBytes
                    )
                    progressBar.isIndeterminate = false
                }.start(object : OnDownloadListener {
                    override fun onDownloadComplete() {
                        downloadID = 0
                        downloadComplete(ActDownloadResultData(true, -1))
                        dismissCease()
                    }

                    override fun onError(error: Error?) {
                        progressBar.progress = 0
                        progressBar.isIndeterminate = false
                        downloadID = 0

                        if (!NetworkUtil.isConnectedUseNetwork(ctx)) {
                            resumeBt.text = ctx.getString(R.string.tx_bt_network_check)
                            resumeBt.isEnabled = true
                        }

                        if (error!!.isConnectionError) {
                            errorDescription.text = ctx.getString(R.string.tx_download_error)
                            resumeBt.text = ctx.getString(R.string.tx_bt_network_check)
                            resumeBt.isEnabled = true
                            downloadComplete(ActDownloadResultData(false, 1))
                        } else {
                            if (error!!.isServerError) {
                                errorDescription.text =
                                    ctx.getString(R.string.tx_download_server_fail)
                                downloadComplete(ActDownloadResultData(false, 2))
                                dismissCease()
                            } else {
                                downloadComplete(ActDownloadResultData(false, 3))
                            }
                        }
                    }
                })
            } else {
                // 여기서 바로 네트워크 설정 페이지로 넘긴다.
                ActUtil.moveToNetworkSettingScreen(ctx)
            }
        }
        eventBringOutUsingPerformClick(resumeBt)
        showDL()
    }

    /**
     * Perform Action
     */
    private fun eventBringOutUsingPerformClick(bt: Button) {
        // Perform is here
        bt.performClick()
        bt.isPressed = true
        bt.invalidate()
    }

    private fun returnLayer(): DialogContentsDownloadBinding {
        return binding
    }

    private fun showDL() {
        dL.show()
    }

    private fun dismissCease() {
        if (dL != null) {
            downloadID = 0
            dL.dismiss()
        }
    }

}