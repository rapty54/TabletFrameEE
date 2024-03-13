package com.vsdisp.tabletframeee.dialogs

import android.app.AlertDialog
import android.app.Dialog
import android.content.Context
import android.content.DialogInterface
import android.webkit.JsResult
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.R

/**
 * App Android System Dialog
 */
class DialogUtil {

    companion object {

        private lateinit var finishDialog: Dialog

        /**
         * Finish Dialog init
         */
        fun initFinishDialog(ctx: AppCompatActivity, callFnBack: (() -> Unit)) {
            finishDialog = AlertDialog.Builder(ctx)
                .setTitle(R.string.app_name)
                .setMessage(R.string.str_do_you_want_finish)
                .setNegativeButton(
                    R.string.str_cancel,
                    DialogInterface.OnClickListener { dialogInterface, i -> })
                .setNeutralButton(
                    R.string.str_ok,
                    DialogInterface.OnClickListener { dialogInterface, i ->
                        callFnBack.invoke()
                    })
                .create()
        }

        /**
         * Finish Dialog Show
         */
        fun showFinishDialog() {
            finishDialog.show()
        }

        /**
         * For JS alert on WebView
         */
        fun jsAlertUseAosInterface(
            context: Context,
            msg: String?,
            result: JsResult?,
            isUseSingle: Boolean
        ) {
            if (isUseSingle) {
                AlertDialog.Builder(context)
                    .setTitle(R.string.app_name)
                    .setMessage(msg)
                    .setPositiveButton(
                        R.string.str_confirm
                    ) { dialog, which -> result!!.confirm() }
                    .setCancelable(false)
                    .create()
                    .show()
            } else {
                AlertDialog.Builder(context)
                    .setTitle(R.string.app_name)
                    .setMessage(msg)
                    .setPositiveButton(
                        R.string.str_confirm
                    ) { dialog, which -> result!!.confirm() }
                    .setNegativeButton(R.string.str_abort) { dialog, which ->
                        result!!.cancel()
                    }
                    .setCancelable(false)
                    .create()
                    .show()
            }
        }

        fun jsConfirmDialog(
            context: Context, message: String?,
            result: JsResult?
        ) {
            val bd = AlertDialog.Builder(context)
            bd.setTitle(R.string.app_name)
            bd.setMessage(message)
            bd.setPositiveButton(R.string.str_confirm) { _, _ ->
                result!!.confirm()
            }
            bd.setNegativeButton(R.string.str_abort) { _, _ ->
                result!!.cancel()
            }
            bd.show()
        }
    }
}