package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.databinding.DialogSelectBinding

/**
 * 선택 다이얼로그
 */
class CustomSelectDialog(
    ctx: AppCompatActivity,
    description: String,
    callClick: (Boolean?) -> Unit,
) {

    private var binding: DialogSelectBinding = DialogSelectBinding.inflate(ctx.layoutInflater)

    private val dlg = Dialog(ctx)

    init {
        dlg.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dlg.setContentView(binding.root)
        dlg.setCancelable(false)
        binding.content.text = description
        binding.ok.setOnClickListener {
            if (callClick != null) {
                callClick(true)
            }
            dlg.dismiss()
        }

        binding.cancel.setOnClickListener {
            if (callClick != null) {
                callClick(false)
            }
            dlg.dismiss()
        }
        dlg.show()
    }
}

