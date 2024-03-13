package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.databinding.DialogWaitingBinding

/**
 * Waiting Dialog (기다려 주세요 출력 특정 상황 에서 내린다.)
 */
class CustomWaitingDialog(private val ctx: AppCompatActivity) {

    private var binding: DialogWaitingBinding =
        DialogWaitingBinding.inflate(ctx.layoutInflater)

    private val dL = Dialog(ctx)

    init {
        dL.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dL.setContentView(binding.root)
        dL.setCancelable(false)
    }

    fun returnLayer(): DialogWaitingBinding {
        return binding
    }

    fun showDL() {
        dL.show()
    }

    fun dismissCease() {
        if (dL != null) {
            dL.dismiss()
        }
    }

}