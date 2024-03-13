package com.vsdisp.tabletframeee.wv

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.common.IntentCaller
import com.vsdisp.tabletframeee.common.ToastUtil
import com.vsdisp.tabletframeee.common.WEB_APP_INTERFACE_SUB

/**
 * WebInterface SubUtil
 */
class WebAppInterfaceSub {
    companion object {

        private const val pkgSmartPro = "com.visang.smart_teaching"

        /**
         * 외부 APP Contents Call
         */
        fun callContentsSets(mContext: AppCompatActivity, data: String, dataType: String) {
            try {
                // 해당 App 호출
                val da = "$data||$dataType"
                Log.d(WEB_APP_INTERFACE_SUB, "------called----- $da")
                if (data == pkgSmartPro) {
                    IntentCaller.callAppByPackageNameWithTaskOptions(mContext, data, 3)
                } else {
                    IntentCaller.callAppByPackageNameWithTaskOptions(mContext, data, 1)
                }
            } catch (e: Exception) {
                Log.d(WEB_APP_INTERFACE_SUB, "------called exceptions----- $e")
                ToastUtil.callToastWithText(mContext, R.string.str_app_un)
            }
        }
    }
}