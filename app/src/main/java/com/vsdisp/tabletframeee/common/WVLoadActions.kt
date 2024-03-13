package com.vsdisp.tabletframeee.common

import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

class WVLoadActions {
    companion object{
        /**
         * 웹뷰를 시용중 HOME 이 아닌 다른 위치 에서
         * HOME 으로 이동이 필요할 때 현재의 함수를 사용 한다.
         * go home
         */
        fun goHomeDirect(ctx: AppCompatActivity, wv: WebView){
            if(AppCurrentInfo.isBuildSample()) {
                wv.loadUrl(FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH)
            }else{
                wv.loadUrl(FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH)
            }
        }
    }
}