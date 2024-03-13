package com.vsdisp.tabletframeee.utils

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build

/**
 * WIFI / Cell / others
 */
class NetworkUtil {
    companion object {
        /**
         * 현재의 시항은 Network 요청을 할 당시에 때마다
         * 건당 요청시 단발성
         * 즉 API 를 요청 하기 직전 지속적 으로 체크 하기 때문에 효율적 이다.
         */
        fun isConnectedUseNetwork(mCtx: Context): Boolean {

            var netKinds = "none"

            val connectivityManager =
                mCtx.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val networkCapabilities = connectivityManager.activeNetwork

                if (networkCapabilities != null) {
                    connectivityManager.getNetworkCapabilities(networkCapabilities)?.run {
                        // 결과값 리턴 (WIFI / CELL / ETHERNET)
                        netKinds = when {
                            hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "wifi"
                            hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "cellular"
                            hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "unknown"
                            else -> "none"
                        }
                    }
                }
            } else {
                connectivityManager.activeNetworkInfo?.run {
                    netKinds = when (type) {
                        ConnectivityManager.TYPE_WIFI -> "wifi"
                        ConnectivityManager.TYPE_MOBILE -> "cellular"
                        ConnectivityManager.TYPE_ETHERNET -> "unknown"
                        else -> "none"
                    }
                }
            }

            if (netKinds == "none" || netKinds == "unknown") {
                return false
            }
            return true
        }
    }
}