package com.vsdisp.tabletframeee.actbase

import android.content.pm.ActivityInfo
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.network.ConnectionState
import com.vsdisp.tabletframeee.network.ConnectionStatusListener
import com.vsdisp.tabletframeee.network.ConnectivityListener
import com.vsdisp.tabletframeee.network.ConstantsNetwork
import com.vsdisp.tabletframeee.network.checkConnection
import com.vsdisp.tabletframeee.permission.ConstantsPermission
import com.vsdisp.tabletframeee.permission.PermissionFrame
import com.vsdisp.tabletframeee.permission.PermissionListener
import com.vsdisp.tabletframeee.utils.NetworkUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers.Main
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlin.coroutines.CoroutineContext

/**
 * coroutine scope 위에 Activity 를 올린 Activity Base
 */
open class ActCoroutineBase() : AppCompatActivity(), CoroutineScope, ConnectivityListener {

    private lateinit var connectionStatusListener: ConnectionStatusListener

    private var permissionListener: PermissionListener? = null

    private lateinit var job: Job

    override val coroutineContext: CoroutineContext
        get() = job + Main

    var isCurrentNTStatus: Boolean = false

    var isRealTimeNTStatus: Boolean = false

    var permissionState: Boolean = false

    lateinit var currentLife: ActCoroutineBase
    protected fun setListenNetworkStatus(listener: ConnectionStatusListener) {
        this.connectionStatusListener = listener
    }

    fun setListenPermissionState(listener: PermissionListener) {
        this.permissionListener = listener
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        job = SupervisorJob()
        // 네트 워크 실시간
        currentLife = this
        checkConnection(currentLife)
//        PermissionFrame.checkPmsAllAtAOneTime(this, callPermissionState = {
//            Log.d("ActCoroutineBase", "Grant :: $it")
//            if (!it) {
//                Log.d("ActCoroutineBase", "showRefusePermission :: $it")
//                if (permissionListener != null) {
//                    permissionListener!!.isPermissionGrant(it)
//                }
//            }
//            permissionState = it
//        })
        currentStateNT()
        setOrientation()
    }

    override fun onResume() {
        super.onResume()
        currentStateNT()
    }

    override fun onStop() {
        super.onStop()
    }

    override fun onStart() {
        super.onStart()
        currentStateNT()
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        try {
            if (job != null) {
                job.cancel()
            }
        } catch (e: Exception) {

        }
    }

    private fun currentStateNT() {
        try {
            isCurrentNTStatus = NetworkUtil.isConnectedUseNetwork(applicationContext)
        } catch (e: Exception) {

        }
    }

    /**
     * Fixed LandScape
     */
    private fun setOrientation() {
        try {
            requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
        } catch (e: Exception) {

        }
    }

    /**
     * Status 값 Shared 로 처리 합니다.
     * 그니까 최초 한번 값이 설정 되면
     * 그 이후서 부터는 연차 호출 안되게
     * 그리고 저장된 값을 기준 으로 처리를 합니다.
     */
    override fun onConnectionState(state: ConnectionState) {
        Log.d("CHECKER", "$state")
        if (ConstantsNetwork.NETWORK_SHOW_STATE) {
            val callB = when (state) {
                ConnectionState.CONNECTED -> {
                    if (this.connectionStatusListener != null) {
                        this.connectionStatusListener.onConnectionStatus(true)
                    }
                    true
                }

                ConnectionState.SLOW -> {
                    if (this.connectionStatusListener != null) {
                        this.connectionStatusListener.onConnectionStatus(false)
                    }
                    false
                }

                else -> {
                    if (this.connectionStatusListener != null) {
                        this.connectionStatusListener.onConnectionStatus(false)
                    }
                    false
                }
            }

            Log.d("CHECKER When Return :: ", "$callB")
        } else {
            // State Save and Cut
            val ntStatus = when (state) {

                ConnectionState.CONNECTED -> {
                    if (this.connectionStatusListener != null) {
                        // Connected
                        this.connectionStatusListener.onConnectionStatus(true)
                    }
                    true
                }

                ConnectionState.SLOW -> {
                    // Connected But Slow
                    if (this.connectionStatusListener != null) {
                        this.connectionStatusListener.onConnectionStatus(false)
                    }
                    false
                }

                else -> {
                    if (this.connectionStatusListener != null) {
                        this.connectionStatusListener.onConnectionStatus(false)
                    }
                    false
                }
            }
            Log.d("Checker When STATUS", "$ntStatus")
        }
    }

    /**
     * Permission Result
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray,
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            ConstantsPermission.REQUEST_CODE_PERMISSION_ALL -> {
//                try {
//                    PermissionFrame.grantProcessAfterRequestPermission(requestCode,
//                        permissions,
//                        grantResults,
//                        this,
//                        callback = {
//                            permissionState = it
//                            if (permissionListener != null) {
//                                permissionListener!!.isPermissionGrant(it)
//                            }
//                        })
//                } catch (e: Exception) {
//
//                }
            }
        }
    }
}