package com.vsdisp.tabletframeee.apis.main

import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.apis.Constant
import com.vsdisp.tabletframeee.apis.Constant.Companion.REQ_GLOBAL_TIME_API_SEOUL_URL
import com.vsdisp.tabletframeee.apis.model.supplier.APKVersionModel
import com.vsdisp.tabletframeee.apis.model.vstedu.APKAllDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKAllEEDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKEleDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKMidHigDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKVersionAll
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.TimeApiInfo

class ReqMain {

    /*----------------비상 자사---------------------------*/
    /**
     * 비상 에듀 테크
     * <자사 라인>
     */
    fun reqVSEduGetApkVersionInfo(ctx: AppCompatActivity, callData: (APKVersionAll?) -> Unit) {
        Requester().reqVersionInfoVSEdu(Constant.REQ_VS_EDU_APK_VERSION_INFO_FULL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    callData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
                    ctx.runOnUiThread {
                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                    }
                }
                callData(null)
            })
    }

    fun reqVSEduGetApkEleDNInfo(ctx: AppCompatActivity, callData: (APKEleDownloadInfo?) -> Unit) {
        Requester().reqVSEduEleAPKDNInfo(Constant.REQ_VS_EDU_APK_ELE_DN_INFO_FULL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    callData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
                    ctx.runOnUiThread {
                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                    }
                }
                callData(null)
            })
    }

    fun reqVSEduGetApkMidHigDNInfo(
        ctx: AppCompatActivity,
        callData: (APKMidHigDownloadInfo?) -> Unit,
    ) {
        Requester().reqVSEduMidHigAPKDNInfo(Constant.REQ_VS_EDU_APK_MID_HIG_DN_INFO_FULL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    callData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
                    ctx.runOnUiThread {
                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                    }
                }
                callData(null)
            })
    }

    fun reqVSEduGetApkALLDNInfo(
        ctx: AppCompatActivity,
        callData: (APKAllEEDownloadInfo) -> Unit,
    ) {
        Requester().reqVSEduALLAPKDNInfo(Constant.REQ_VS_EDU_APK_ALL_DN_INFO_FULL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    callData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
                    ctx.runOnUiThread {
                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                    }
                }
                callData(null!!)
            })
    }

    fun reqVSEduMIMEDNInfo(
        ctx: AppCompatActivity,
        callData: (MimeDownloadInfo?) -> Unit,
    ) {
        Requester().reqVSEduMIMEInfo(Constant.REQ_VS_MIME_DN_INFO_FULL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    callData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
//                    ctx.runOnUiThread {
//                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
//                    }
                }
                callData(null)
            })
    }

    fun apiGlobalTime(
        ctx: AppCompatActivity,
        callContentsData: (TimeApiInfo?) -> Unit,
    ) {
        Requester().checkGlobalTimeAPI("https://www.timeapi.io",
            REQ_GLOBAL_TIME_API_SEOUL_URL,
            ctx,
            onResultSuccess = {
                if (it !== null) {
                    // 실제 내부에 작성 되어야 하는 Path
                    callContentsData(it)
                }
            },
            onResultFail = {
                val one = it?.code
                val two = it?.msg
                val three = it?.isSuccess
                Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
                if (one == Requester.NETWORK_FAILED_CODE) {
                    ctx.runOnUiThread {
                        Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                    }
                }
                callContentsData(null)
            })
    }
    /*------------------외주------------------------------*/
    /**
     * 외주 라인
     */
    fun reqGetApkVersionInfo(ctx: AppCompatActivity, callData: (APKVersionModel?) -> Unit) {

        Requester().reqVersionInfo(Constant.REQ_APK_VERSION_INFO_FULL_URL, ctx, onResultSuccess = {
            if (it !== null) {
                callData(it)
            }
        }, onResultFail = {
            val one = it?.code
            val two = it?.msg
            val three = it?.isSuccess
            Log.d("MAIN ACT LOADER (Fail)", "$one" + "$two" + "$three")
            if (one == Requester.NETWORK_FAILED_CODE) {
                ctx.runOnUiThread {
                    Toast.makeText(ctx, "네트워크를 확인 하세요.", Toast.LENGTH_LONG).show()
                }
            }
            callData(null)
        })
    }
}