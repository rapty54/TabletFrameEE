package com.vsdisp.tabletframeee.apis.rq

import com.vsdisp.tabletframeee.apis.model.supplier.APKVersionModel
import com.vsdisp.tabletframeee.apis.model.vstedu.APKAllDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKEleDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKMidHigDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.APKVersionAll
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo
import com.vsdisp.tabletframeee.apis.model.vstedu.TimeApiInfo
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.HeaderMap
import retrofit2.http.Url

/**
 * RetroFit Request Interface
 */
interface RetroReqInterface {

    /*----------------------비상 자사-------------------------------*/
    /**
     * 비상 에듀 테크 (자사 라인)
     * APK Version Info All
     */
    @GET
    fun getVSEduAPKVersionInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<APKVersionAll>

    /**
     * APK 초등 Download Info
     */
    @GET
    fun getVSEduEleAPKDNInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<APKEleDownloadInfo>


    /**
     * APK 중고등 Download Info
     */
    @GET
    fun getVSEduMidHigAPKDNInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<APKMidHigDownloadInfo>

    /**
     * APK 초/중고등 통합 Download Info
     */
    @GET
    fun getVSEduALLAPKDNInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<APKAllDownloadInfo>

    /**
     * MIME Download Info
     */
    @GET
    fun getVSEduMIMEDNInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<MimeDownloadInfo>

    /**
     * Global Time API
     */
    @GET
    fun getTimeInfoFromGlobalAPI(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<TimeApiInfo>

    /*----------------------외주-------------------------------*/
    /**
     * 외주 라인
     */
    @GET
    fun getAPKVersionInfoFromFileServer(
        @HeaderMap headers: Map<String, String>,
        @Url fullUrl: String,
    ): Call<APKVersionModel>
}