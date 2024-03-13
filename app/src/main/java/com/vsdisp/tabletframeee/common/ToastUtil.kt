package com.vsdisp.tabletframeee.common

import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

/**
 * Toast Util
 */
class ToastUtil {
    companion object {
        /**
         * Call Toast With Text
         */
        fun callToastWithText(mContext : AppCompatActivity, msgIDS : Int){
            try {
                mContext.runOnUiThread {
                    Toast.makeText(mContext, msgIDS, Toast.LENGTH_SHORT).show()
                }
            }catch (e: Exception){
                Log.d(TOAST_ERR_LOG, e.message.toString())
            }
        }
    }
}