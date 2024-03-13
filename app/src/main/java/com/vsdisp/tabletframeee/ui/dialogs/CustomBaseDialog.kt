package com.vsdisp.tabletframeee.ui.dialogs

import android.app.Dialog
import android.view.Window
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.databinding.DialogBaseBinding

/**
 * Dialog 기본형
 */
class CustomBaseDialog(private val ctx: AppCompatActivity) {

    private lateinit var binding: DialogBaseBinding

    private val dlg = Dialog(ctx)

    private lateinit var listener: ConfirmDialogListener

    fun show(descriptionStr: String) {
        binding = DialogBaseBinding.inflate(ctx.layoutInflater)
        dlg.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dlg.setContentView(binding.root)
        dlg.setCancelable(false)

        binding.content.text = descriptionStr
        binding.ok.setOnClickListener {
            listener.onYesButtonClick(0)
            dlg.dismiss()
        }

        binding.cancel.setOnClickListener {
            listener.onNoButtonClick(0)
            dlg.dismiss()
        }
        dlg.show()
    }

    fun setCustomClickListener(listener: (Boolean) -> Unit) {
        this.listener = object : ConfirmDialogListener {
            override fun onYesButtonClick(resourceId: Int) {
                listener(true)
            }

            override fun onNoButtonClick(resourceId: Int) {
                listener(false)
            }

        }
    }
}

/**
 * Interface Listener
 */
interface ConfirmDialogListener {
    fun onYesButtonClick(resourceId: Int)
    fun onNoButtonClick(resourceId: Int)
}