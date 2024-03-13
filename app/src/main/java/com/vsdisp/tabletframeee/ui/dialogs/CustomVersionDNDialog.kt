package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.graphics.Color
import android.view.ViewGroup
import android.view.Window
import android.view.WindowManager
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.common.model.VersionRVModel
import com.vsdisp.tabletframeee.common.model.ActDownloadResultData
import com.vsdisp.tabletframeee.databinding.DialogUpdateBinding
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.FileUtil
import com.vsdisp.tabletframeee.utils.NetworkUtil
import com.vsdn.Error
import com.vsdn.OnDownloadListener
import com.vsdn.Status
import com.vsdn.VSTDownloader

/**
 * APK 버전 다이 얼로그
 */
class CustomVersionDNDialog(
    ctx: AppCompatActivity,
    rvModel: VersionRVModel,
    downloadComplete: (ActDownloadResultData?) -> Unit,
) {

    private var binding: DialogUpdateBinding = DialogUpdateBinding.inflate(ctx.layoutInflater)

    private val dL = Dialog(ctx)

    var downloadID = 0

    init {
        dL.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dL.setContentView(binding.root)
        dL.setCancelable(false)

        val params: ViewGroup.LayoutParams = dL.window!!.attributes
        params.width = ViewGroup.LayoutParams.MATCH_PARENT
        params.height = ViewGroup.LayoutParams.MATCH_PARENT
        dL.window!!.attributes = params as WindowManager.LayoutParams?

        var downloadURL = rvModel.downLoadUrl
        var downloadFileInDevicePath = rvModel.downloadFilePathInDevice
        var fName = rvModel.downloadFileNameInDeviceWithExt
        var serverAPKVersion = rvModel.serverAPKVersion

        var descriptionTX = rvModel.descriptions

        val layer = returnLayer()
        val progressB = layer.dlDownloadProgressBar
        val progressTx = layer.dlTvProgress
        val dnInfoDescTx = layer.dlDownloadDescription

        dnInfoDescTx.text = descriptionTX

        val startUpdateBT = layer.dlStartOk
        startUpdateBT.setOnClickListener {
            if (NetworkUtil.isConnectedUseNetwork(ctx)) {
                if (Status.RUNNING == VSTDownloader.getStatus(downloadID)) {
                    VSTDownloader.pause(downloadID)
                    return@setOnClickListener
                }

                startUpdateBT.isEnabled = false
                progressB.isIndeterminate = true
                progressB.indeterminateDrawable.setColorFilter(
                    Color.BLUE, android.graphics.PorterDuff.Mode.SRC_IN
                )

                if (Status.PAUSED == VSTDownloader.getStatus(downloadID)) {
                    VSTDownloader.resume(downloadID)
                    return@setOnClickListener
                }

                downloadID =
                    VSTDownloader.download(downloadURL, downloadFileInDevicePath, fName).build()
                        .setOnStartOrResumeListener {
                            progressB.isIndeterminate = false
                            startUpdateBT.isEnabled = false
                            startUpdateBT.text = ctx.getString(R.string.tx_bt_downloading)
                            dnInfoDescTx.text = ctx.getString(R.string.tx_download_desc)
                        }.setOnProgressListener {
                            val progressPercent: Long = it.currentBytes * 100 / it.totalBytes
                            progressB.progress = progressPercent.toInt()
                            progressTx.text = FileUtil.getProgressDisplayLine(
                                it.currentBytes, it.totalBytes
                            )
                            progressB.isIndeterminate = false
                        }.start(object : OnDownloadListener {
                            override fun onDownloadComplete() {
                                downloadID = 0
                                downloadComplete(ActDownloadResultData(true, -1))
                                dismissCease()
                            }

                            override fun onError(error: Error?) {
                                progressB.progress = 0
                                progressB.isIndeterminate = false
                                downloadID = 0
                                if (!NetworkUtil.isConnectedUseNetwork(ctx)) {
                                    startUpdateBT.text = ctx.getString(R.string.tx_bt_network_check)
                                    startUpdateBT.isEnabled = true
                                }

                                if (error!!.isConnectionError) {
                                    dnInfoDescTx.text = ctx.getString(R.string.tx_download_error)
                                    startUpdateBT.text = ctx.getString(R.string.tx_bt_network_check)
                                    startUpdateBT.isEnabled = true
                                    downloadComplete(ActDownloadResultData(false, 1))
                                } else {
                                    if (error!!.isServerError) {
                                        dnInfoDescTx.text =
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
                ActUtil.moveToNetworkSettingScreen(ctx)
            }
        }
        eventBringOutUsingPerformClick(startUpdateBT, "")
        showDL()
    }

    /**
     * Perform Action Click itself
     */
    private fun eventBringOutUsingPerformClick(bt: Button, tx: String) {
        // Perform is here
        bt.performClick()
        bt.isPressed = true
        bt.invalidate()
//        bt.text = tx
    }

    /**
     * Return Layer All Layout
     */
    private fun returnLayer(): DialogUpdateBinding {
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