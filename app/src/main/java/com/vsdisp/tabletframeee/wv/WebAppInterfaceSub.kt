package com.vsdisp.tabletframeee.wv

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
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

        const val EE_ACTION = "action.v22ebook.home" // 초등 교과서
        const val EE_BOOK_ACTION = "action.v22ebook.home_media" // 초등 전자 저작물
        const val HIG_ACTION = "action.v22ebook.midhigh" // 중등 / 교과서 호출

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

        /**
         * 교과서 이북 관련 호출 Action
         */
        @RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
        fun callContentsWithAction(
            mContext: AppCompatActivity,
            data: String,
            dataType: String,
            dataAction: String
        ) {
            try {
                IntentCaller.callAppByPackageNameEBookWithTaskOptionsAndActionAndExtra(
                    mContext,
                    data,
                    2,
                    dataAction
                )
            } catch (e: Exception) {
                Log.d(WEB_APP_INTERFACE_SUB, "------called exceptions----- $e")
                ToastUtil.callToastWithText(mContext, R.string.str_app_un)
            }
        }
    }
}