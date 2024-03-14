package com.vsdisp.tabletframeee.apis.main

import android.content.Context
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.apis.Constant
import com.vsdisp.tabletframeee.apis.headers.BaseInfo
import com.vsdisp.tabletframeee.apis.model.supplier.APKVersionModel
import com.vsdisp.tabletframeee.apis.model.ResCommon
import com.vsdisp.tabletframeee.apis.model.vstedu.APKAllDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKAllEEDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKEleDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKMidHigDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKVersionAll
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.TimeApiInfo
import com.vsdisp.tabletframeee.apis.rq.NetworkReqBuilder
import com.vsdisp.tabletframeee.apis.rq.RetroReqInterface
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Https Requester
 */
class Requester {

    companion object {
        private const val NETWORK_FAILED = "No Internet Exceptions"
        const val NETWORK_FAILED_CODE = -10
    }

    /*----------------------비상 자사------------------------*/
    /**
     * 비상 에듀 테크 자사 라인
     * Request Version Info
     */
    fun reqVersionInfoVSEdu(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (APKVersionAll?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getVSEduAPKVersionInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<APKVersionAll> {
                    override fun onResponse(
                        p0: Call<APKVersionAll>,
                        p1: Response<APKVersionAll>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res)
                    }

                    override fun onFailure(p0: Call<APKVersionAll>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }

    /**
     * 비상 에듀 초등 APK Download Info
     */
    fun reqVSEduEleAPKDNInfo(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (APKEleDownloadInfo?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getVSEduEleAPKDNInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<APKEleDownloadInfo> {
                    override fun onResponse(
                        p0: Call<APKEleDownloadInfo>,
                        p1: Response<APKEleDownloadInfo>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res)
                    }

                    override fun onFailure(p0: Call<APKEleDownloadInfo>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }

    /**
     * 비상 에듀 중고등 APK Download Info
     */
    fun reqVSEduMidHigAPKDNInfo(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (APKMidHigDownloadInfo?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getVSEduMidHigAPKDNInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<APKMidHigDownloadInfo> {
                    override fun onResponse(
                        p0: Call<APKMidHigDownloadInfo>,
                        p1: Response<APKMidHigDownloadInfo>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res)
                    }

                    override fun onFailure(p0: Call<APKMidHigDownloadInfo>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }

    /**
     * 비상 에듀 초/중고등 통합 APK Download Info
     */
    fun reqVSEduALLAPKDNInfo(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (APKAllEEDownloadInfo) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getVSEduALLAPKDNInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<APKAllEEDownloadInfo> {
                    override fun onResponse(
                        p0: Call<APKAllEEDownloadInfo>,
                        p1: Response<APKAllEEDownloadInfo>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res!!)
                    }

                    override fun onFailure(p0: Call<APKAllEEDownloadInfo>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }


    /**
     * 비상 에듀 MIME Download Info
     */
    fun reqVSEduMIMEInfo(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (MimeDownloadInfo?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getVSEduMIMEDNInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<MimeDownloadInfo> {
                    override fun onResponse(
                        p0: Call<MimeDownloadInfo>,
                        p1: Response<MimeDownloadInfo>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res)
                    }

                    override fun onFailure(p0: Call<MimeDownloadInfo>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }

    /**
     * Global Time API
     */
    fun checkGlobalTimeAPI(
        baseUrl: String,
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (TimeApiInfo?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, baseUrl, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getTimeInfoFromGlobalAPI(header, fullUrl).enqueue(object : Callback<TimeApiInfo> {
                override fun onResponse(
                    p0: Call<TimeApiInfo>,
                    p1: Response<TimeApiInfo>,
                ) {
                    val res = p1.body()
                    val msg = p1.message()
                    val codeStatus = p1.code()
                    Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                    onResultSuccess(res)
                }

                override fun onFailure(p0: Call<TimeApiInfo>, p1: Throwable) {
                    try {
                        Log.d("RESPONSE Failed", "${p1.message}")
                        if (p1.message == NETWORK_FAILED) {
                            Log.d("RESPONSE Failed Match", "${p1.message}")
                            onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                        }
                    } catch (e: Exception) {

                    }
                }
            })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }

    /*-----------------외주----------------------*/
    /**
     * Request Version Info
     */
    fun reqVersionInfo(
        fullUrl: String,
        ctx: AppCompatActivity,
        onResultSuccess: (APKVersionModel?) -> Unit,
        onResultFail: (ResCommon?) -> Unit,
    ) {
        try {
            val reqT = NetworkReqBuilder.buildService(
                ctx, Constant.REQ_VSF_SERVER_MAIN_URL, RetroReqInterface::class.java
            )
            // Base Header Spec
            val header = HashMap<String, String>()
            header["Accept"] = BaseInfo.REQ_HEADER_JSON_VALUE
            reqT.getAPKVersionInfoFromFileServer(header, fullUrl)
                .enqueue(object : Callback<APKVersionModel> {
                    override fun onResponse(
                        p0: Call<APKVersionModel>,
                        p1: Response<APKVersionModel>,
                    ) {
                        val res = p1.body()
                        val msg = p1.message()
                        val codeStatus = p1.code()
                        Log.d("RESPONSE Success", "$res" + "$msg" + "$codeStatus")
                        onResultSuccess(res)
                    }

                    override fun onFailure(p0: Call<APKVersionModel>, p1: Throwable) {
                        try {
                            Log.d("RESPONSE Failed", "${p1.message}")
                            if (p1.message == NETWORK_FAILED) {
                                Log.d("RESPONSE Failed Match", "${p1.message}")
                                onResultFail(ResCommon(NETWORK_FAILED_CODE, false, NETWORK_FAILED))
                            }
                        } catch (e: Exception) {

                        }
                    }
                })
        } catch (e: Exception) {
            Log.d("RESPONSE Exception", "${e.message}")
        }
    }
}