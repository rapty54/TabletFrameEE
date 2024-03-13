package com.vsdisp.tabletframeee.apis.rq

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.GsonBuilder
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

/**
 * Retrofit 으로 API 요청시 메인 빌더
 *
 * 현재의 Builder 는 재사용 가능 하게 끔 (요청부 제너릭 선언) 작성함.
 */
object NetworkReqBuilder {

    private var instance: Retrofit? = null

    private const val CONNECT_TIMEOUT_SEC = 20000L

    private const val IS_API_DEBUGGER_ON = true

    private fun getInstance(baseURL: String, ctx: AppCompatActivity): Retrofit {
        // API 요청시 Logger (무엇을 어떻게 보냈 는지 로그캣 에서 확인 가능)
        // Debug Mode 일때만 허용
        val clientHttp: OkHttpClient =
            if (IS_API_DEBUGGER_ON) {
                Log.d("NetworkReqBuilder", "OkHttpClient Logger")
                val inter = HttpLoggingInterceptor()
                inter.setLevel(HttpLoggingInterceptor.Level.BODY)
                OkHttpClient.Builder().addInterceptor(inter).addInterceptor(NetworkInterceptor(ctx))
                    .connectTimeout(CONNECT_TIMEOUT_SEC, TimeUnit.SECONDS)
                    .cache(null)
                    .build()
            } else {
                OkHttpClient.Builder()
                    .connectTimeout(CONNECT_TIMEOUT_SEC, TimeUnit.SECONDS)
                    .cache(null)
                    .build()
            }

        try {
            instance = Retrofit.Builder()
                .baseUrl(baseURL)
                .addConverterFactory(
                    GsonConverterFactory.create(
                        GsonBuilder().setLenient().create()
                    )
                ).client(clientHttp)
                .build()
        } catch (e: Exception) {
            Log.d("NetworkReqBuilder", "Network Exception :: ${e.message}")
        }
        return instance!!
    }

    /**
     * 외부에 공개되어져 사용하는 함수는 이함수 하나임
     * 엄한거 선택할 필요 없음.
     */
    fun <T> buildService(ctx: AppCompatActivity, baseUrl: String, service: Class<T>): T {
        return getInstance(baseUrl, ctx).create(service)
    }
}