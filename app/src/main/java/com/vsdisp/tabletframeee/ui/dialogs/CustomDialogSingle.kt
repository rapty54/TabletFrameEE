package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.databinding.DialogSingleBinding

class CustomDialogSingle(
    ctx: AppCompatActivity,
    description: String,
    callClick: (Boolean?) -> Unit,
) {
    private var binding: DialogSingleBinding = DialogSingleBinding.inflate(ctx.layoutInflater)

    private val dlg = Dialog(ctx)

    init {
        dlg.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dlg.setContentView(binding.root)
        dlg.setCancelable(false)
        binding.content.text = description
        binding.cancel.setOnClickListener {
            if (callClick != null) {
                callClick(false)
            }
            dlg.dismiss()
        }
        dlg.show()
    }
}