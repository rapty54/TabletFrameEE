package com.vsdisp.tabletframeee.apis.rq

import android.content.Context
import com.vsdisp.tabletframeee.utils.NetworkUtil
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import java.io.IOException

/**
 * 통신전 Android 단말 네트 워크 상태를 확인 합니다.
 * Network Interceptor
 */
open class NetworkInterceptor(ctx: Context) : Interceptor {

    private var mCtx: Context = ctx

    /**
     * When bring Network State equally loss Connectivity
     *
     * @param chain
     * @return
     * @throws IOException
     */
    @Throws(IOException::class)
    override fun intercept(chain: Interceptor.Chain): Response {
        if (!NetworkUtil.isConnectedUseNetwork(mCtx)) {
            throw NoConnectivityException()
        }
        val builder: Request.Builder = chain.request().newBuilder()
        return chain.proceed(builder.build())
    }

}