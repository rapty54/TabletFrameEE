package com.vsdisp.tabletframeee

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.view.View.OnTouchListener
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import com.vsdisp.tabletframeee.actbase.ActCoroutineBase
import com.vsdisp.tabletframeee.actbase.ActHelper
import com.vsdisp.tabletframeee.actbase.model.ActParcelInfoBase
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.apis.main.ReqMain
import com.vsdisp.tabletframeee.common.ACTIVATE_CONCENTRATE_MODE
import com.vsdisp.tabletframeee.common.ACTIVATE_IS_FORGING_ON
import com.vsdisp.tabletframeee.common.ACTIVATE_WV_CHROME_DEBUGGER
import com.vsdisp.tabletframeee.common.ActsUtil
import com.vsdisp.tabletframeee.common.AppCurrentInfo
import com.vsdisp.tabletframeee.common.BACK_TASK_OPTION_WV_CLEAR_CACHE
import com.vsdisp.tabletframeee.common.ConcentrateModeUtil
import com.vsdisp.tabletframeee.common.FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH
import com.vsdisp.tabletframeee.common.FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH
import com.vsdisp.tabletframeee.common.WEB_INTERFACE_BRIDGE_NAME
import com.vsdisp.tabletframeee.databinding.ActMainBinding
import com.vsdisp.tabletframeee.dialogs.DialogUtil
import com.vsdisp.tabletframeee.network.ConnectionStatusListener
import com.vsdisp.tabletframeee.permission.PermissionFrame
import com.vsdisp.tabletframeee.permission.PermissionListener
import com.vsdisp.tabletframeee.protection.ForgingDetection
import com.vsdisp.tabletframeee.protection.RootUtils
import com.vsdisp.tabletframeee.ui.dialogs.CustomBaseDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomDialogSingle
import com.vsdisp.tabletframeee.ui.dialogs.CustomWaitingDialog
import com.vsdisp.tabletframeee.utils.AOSDeviceInfo
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.NetworkUtil
import com.vsdisp.tabletframeee.utils.StrUtil
import com.vsdisp.tabletframeee.writer.JSONNodeInfo
import com.vsdisp.tabletframeee.wv.CommonWebView
import com.vsdisp.tabletframeee.wv.WebAppInterface
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch

/**
 * ActMain Extends
 */
class ActMain : ActCoroutineBase() {

    private lateinit var binding: ActMainBinding

    private lateinit var current: ActMain

    private lateinit var mActHelper: ActHelper

    private lateinit var wv: CommonWebView

    companion object {
        const val TAG = "ActMain"
    }

    @RequiresApi(Build.VERSION_CODES.R)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initForgingCheckAfter()
        // 현재의 사항 반드시 선언
        setListenNetworkStatus(object : ConnectionStatusListener {
            override fun onConnectionStatus(isConnected: Boolean) {
                isRealTimeNTStatus = isConnected
                whenNetworkConnected()
            }
        })
    }

    override fun onResume() {
        super.onResume()
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onStart() {
        super.onStart()
    }

    override fun onStop() {
        super.onStop()
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    @RequiresApi(Build.VERSION_CODES.R)
    private fun initForgingCheckAfter() {
        try {
            binding = ActMainBinding.inflate(layoutInflater)
            setContentView(binding.root)
            if (ACTIVATE_CONCENTRATE_MODE) {
                ConcentrateModeUtil.fullConcentrate(window)
            }
            current = this
            if (ACTIVATE_IS_FORGING_ON) {
                if (!RootUtils.isRootedCert(this) || ((ForgingDetection.isNotForgingTypeCompare(
                        this, ForgingDetection.SHA_256
                    ) && ForgingDetection.isNotForgingTypeCompare(this, ForgingDetection.MD5)))
                ) {
                    initWV()
                    permissionStateCheck()
                    initActLaunch()
                    doTaskAtFirst(this)
                    whenFirstEntryCheckNetworkOn()
                    initMoveToActSetting()
                } else {
                    ActsUtil.exitProcess(this, false)
                }
            } else {
                initWV()
                initActLaunch()
                permissionStateCheck()
                doTaskAtFirst(this)
                whenFirstEntryCheckNetworkOn()
                initMoveToActSetting()
            }
            AOSDeviceInfo.getDeviceInfoAll()
        } catch (e: Exception) {
            Log.w(TAG, "==============${e.message}")
        }
    }

    private fun initCategory(viewStatus: Int) {
        launch(Dispatchers.Main) {
            binding.allCategoryTitle.visibility = viewStatus
        }
    }

    /**
     * WebView Clear Cache with coroutine
     */
    private fun doTaskAtFirst(currents: AppCompatActivity) {
        ActsUtil.startBasicService(currents, BACK_TASK_OPTION_WV_CLEAR_CACHE)
    }

    @SuppressLint("JavascriptInterface")
    private fun initWV() {
        wv = binding.wvMainFramePlate
        if (ACTIVATE_WV_CHROME_DEBUGGER) {
            WebView.setWebContentsDebuggingEnabled(true)
        }
        if (Build.VERSION.SDK_INT >= 19) {
            wv.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        } else {
            wv.setLayerType(View.LAYER_TYPE_SOFTWARE, null)
        }

        wv.apply {
            this.addJavascriptInterface(
                WebAppInterface(current, this, object : WebAppInterface.WebInterfaceStateListener {

                    override fun onPageOpen(type: String) {
                        // Parcel 넣어서 전달할 데이터 있으면 아래 Parameter 에서 보이는 것처럼 넣어서 전달 하면 된다.
                        // 웹에서 보내는 형식의 데이터
                        //
                        pageOpenAndMove(type)
                    }
                }), WEB_INTERFACE_BRIDGE_NAME
            )
            this.setWebViewListener(object : CommonWebView.WebViewListener {
                override fun onDePageStarted(url: String?, favicon: Bitmap?) {

                }

                override fun onDePageFinished(url: String?, view: WebView?) {

                }

                override fun onDeLoadResource(url: String?) {

                }

                override fun shouldOverrideUrlLoadingDe(
                    view: WebView?,
                    request: WebResourceRequest?,
                ): Boolean {
                    return false
                }

                override fun shouldOverrideUrlLoadingDe(view: WebView?, url: String?): Boolean {
                    return false
                }

                override fun onReceivedErrorDe(
                    request: WebResourceRequest?,
                    error: WebResourceError?,
                ) {

                }

                override fun onPageCommitVisibleDe(view: WebView?, url: String?) {

                }

                override fun onProgressChangedFinish(view: WebView?, newProgress: Int) {

                }

                override fun onShowFileChooserDe(
                    webView: WebView?,
                    filePathCallback: ValueCallback<Array<Uri?>>,
                    fileChooserParams: WebChromeClient.FileChooserParams?,
                ): Boolean {
                    return false
                }

                override fun onReceivedErrorOldM(
                    view: WebView?,
                    errorCode: Int,
                    description: String?,
                    failingUrl: String?,
                ) {

                }

                override fun onEntryUrlNotification(isMainEntry: Boolean) {
                    if (isMainEntry) {
                        showAppSetting(true)
                    } else {
                        showAppSetting(false)
                    }
                }

            })

            current.launch(Dispatchers.Main) {
                if (AppCurrentInfo.isBuildSample()) {
                    wv.loadUrl(FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH)
                } else {
                    wv.loadUrl(FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH)
                }
            }
        }
    }

    /**
     * Move To DownList
     */
    private fun pageOpenAndMove(type: String) {
        launch(Dispatchers.Main) {
            // 여기서 안내 다이얼 로그 하나 띄우고 하단의 프로세스를 진행합니다.
            val dl = CustomBaseDialog(current)
            dl.setCustomClickListener {
                if (it) {
                    if (NetworkUtil.isConnectedUseNetwork(applicationContext)) {
                        val cd = CustomWaitingDialog(current)
                        cd.returnLayer().cdWait.text = getString(R.string.tx_waiting)
                        cd.showDL()
                        callGetDate { it ->
                            if (it!!.length !== 0) {
                                var today = it
                                cd.dismissCease()
                                mActHelper.moveOtherActivityForLaunch(
                                    current, ActDownList::class.java, ActParcelMultiTypeExtraData(
                                        "", "", today!!, "", "", type
                                    )
                                )
                            } else {
                                cd.dismissCease()
//                                mActHelper.moveOtherActivityForLaunch(
//                                    current,
//                                    ActDownList::class.java,
//                                    ActParcelMultiTypeExtraData("", "", "", "", "", type)
//                                )
                                CustomDialogSingle(current,
                                    current.getString(R.string.tx_network_err_message),
                                    callClick = {
                                        if (it == false) {
//                                            current.finish()
                                        }
                                    })
                            }
                        }
                    } else {
                        // Network OFF 였을때 이전에 저장된 MIME 정보 노드가 없으면
                        // 사용자 에게 Network 를 개방 해서 컨텐츠 다운로드를 하도록 유도 한다.
                        if (!JSONNodeInfo(current).isSavedMIMEInfo()) {
                            val dl = CustomBaseDialog(current)
                            dl.setCustomClickListener {
                                if (it) {
                                    ActUtil.moveToNetworkSettingScreen(current)
                                } else {

                                }
                            }
                            dl.show(getString(R.string.tx_need_download_online))
                        } else {
                            if (JSONNodeInfo(current).isExistDownloadMIMEInfoFromDeviceUsingPreference()) {
                                mActHelper.moveOtherActivityForLaunch(
                                    current,
                                    ActDownList::class.java,
                                    ActParcelMultiTypeExtraData("", "", "", "", "", type)
                                )
                            } else {
                                var jData = JSONNodeInfo(current).getMIMEInfoFromPreferences()
                                if (jData!!.isContentsOpen == "N") {
                                    CustomDialogSingle(current,
                                        current.getString(R.string.tx_not_exist_contents_block_message),
                                        callClick = {
//                                            if (it == false) {
//                                                current.finish()
//                                            }
                                        })
                                } else {
                                    val dl = CustomBaseDialog(current)
                                    dl.setCustomClickListener {
                                        if (it) {
                                            ActUtil.moveToNetworkSettingScreen(current)
                                        } else {

                                        }
                                    }
                                    dl.show(getString(R.string.tx_need_download_online))
                                }
                            }
                        }
                    }
                }
            }
            dl.show(getString(R.string.tx_download_service_notification))
        }

    }

    /**
     * Show App Settings Layout
     */
    private fun showAppSetting(isShow: Boolean) {
        current.launch(Dispatchers.Main) {
            if (isShow) {
                binding.appSettingsLl.visibility = View.VISIBLE
                binding.appSettings.setImageResource(com.google.android.exoplayer2.R.drawable.exo_ic_settings)
            } else {
                binding.appSettingsLl.visibility = View.INVISIBLE
                binding.appSettings.setImageResource(0)
            }
        }
    }

    /**
     * Current Date From Global API
     */
    private fun callGetDate(date: (String?) -> Unit) {
        launch(Dispatchers.IO) {
            ReqMain().apiGlobalTime(current, callContentsData = { it ->
                if (it != null) {
                    JSONNodeInfo(current).savedNTTimeIntoPreference(it, callSavedStateCallFn = {
                        if (it) {
                            // Saved Success TIMEApiInfo
                        }
                    })
                    var dateArr = it!!.date.split("/")
                    var dates = dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1]
                    Log.d(TAG, "$dates")
                    date(dates)
                } else {
                    date("")
                }
            })
        }
    }

    /**
     * Act Launch Init
     */
    private fun initActLaunch() {
        mActHelper = ActHelper(this)
        mActHelper.setActHelperListener(object : ActHelper.ActHelperListener {
            override fun onBackPressedReact() {
                launch {
                    if (wv.canGoBack()) {
                        wv.goBack()
                    } else {
                        runOnUiThread {
                            DialogUtil.initFinishDialog(current, callFnBack = {
                                ActsUtil.startBasicService(current, BACK_TASK_OPTION_WV_CLEAR_CACHE)
                                finish()
                            })
                            DialogUtil.showFinishDialog()
                        }
                    }
                }
            }

            override fun registerActivityResult(mUri: Uri?, intents: Intent?) {
                if (mUri == null && intents == null) {
                    Log.d(TAG, "==================ActivityResult CANCEL===============")
//                    Toast.makeText(current, "ActivityResult CANCEL", Toast.LENGTH_LONG).show()
                    permissionCheckUp()
                } else {
//                    Toast.makeText(current, "ActivityResult OK", Toast.LENGTH_LONG).show()
                    Log.d(TAG, "==================ActivityResult OK===============")
                }
            }
        })
        initCategory(View.GONE)
    }

    /**
     * 네트워크가 열려 있다면 Update 상태 인지 아닌지 확인 하는 Noti 출력
     */
    private fun whenFirstEntryCheckNetworkOn() {
        if (isCurrentNTStatus || isRealTimeNTStatus) {
            // 통신후 결과값 기준 으로 Notification 출력
            updateStateCheck()
        }else{
            updateStatusShow(false)
        }
    }

    /**
     * Network Connected State
     * 실시간 Network + 현재 바로 체크 해서 발생 되는 Network
     * 모두 true 일때 Main UI 에서의 동작을 기술 한다.
     */
    private fun whenNetworkConnected() {
//        if (isCurrentNTStatus && isRealTimeNTStatus) {
//            Log.d(TAG, "============whenNetworkConnected=========")
//            updateStateCheck()
//        } else {
//            updateStatusShow(false)
//        }
    }

    /**
     * Setting
     */
    private fun initMoveToActSetting() {
        if (binding.appSettingsLl.isVisible) {
            binding.appSettingsLl.setOnClickListener {
                if (mActHelper != null) {
                    mActHelper.moveOtherActivityForLaunch(
                        current, ActSettings::class.java, ActParcelInfoBase(
                            "ActMain", "ActSetting"
                        )
                    )
                }
            }
        }
    }

    /**
     * Check Current Permission
     * Check RealTime Permission
     */
    private fun permissionStateCheck() {
        launch(Dispatchers.Main) {
            viewCoverAsShowState(binding, permissionState)
        }

        setListenPermissionState(object : PermissionListener {
            override fun isPermissionGrant(isGrantedALL: Boolean) {
                Log.d(TAG, "======$isGrantedALL========")
                launch(Dispatchers.Main) {
                    viewCoverAsShowState(binding, isGrantedALL)
                    if (!isGrantedALL) {
                        PermissionFrame.showRefusePermission(current, callback = {
                            if (it) {
                                mActHelper.moveSettingDetail(current)
                            }
                        })
                    }
                }
            }
        })
    }

    private fun permissionCheckUp() {
        PermissionFrame.checkPmsAllAtAOneTime(current, callPermissionState = { it ->
            //Log.d(TAG, "Grant :: $it")
            launch(Dispatchers.Main) {
                if (!it) {
                    PermissionFrame.showRefusePermission(current, callback = {
                        if (it) {
                            mActHelper.moveSettingDetail(current)
                        }
                    })
                } else {
                    permissionState = true
                    // block cover layout gone
                    viewCoverAsShowState(binding, true)
                }
            }
        })
    }

    /**
     * Permission 모두 Accept 되기 전 까지는 Main Page 에서
     * Cover Page 출력
     */
    private fun viewCoverAsShowState(binding: ActMainBinding, isNotShow: Boolean) {
        if (isNotShow) {
            binding.viewCover.visibility = View.GONE
        } else {
            binding.viewCover.visibility = View.VISIBLE
            binding.viewCover.setOnTouchListener(
                object : OnTouchListener {
                    override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                        return true
                    }
                })
        }
    }

    /**
     * Update 상태 체크
     */
    private fun updateStateCheck() {
        async(Dispatchers.IO) {
            ReqMain().reqVSEduGetApkVersionInfo(current, callData = { it ->
                if (it != null) {
                    var isForceUpdate = it.version_apk.version_all_e.is_force_update
                    var verN = it.version_apk.version_all_e.new_apk_release_version_name

                    if (StrUtil.isForceUpdate(isForceUpdate)) {
                        // Update Yes 이면 파일 서버에 기재된 Version 이 현재의 앱버전보다 크면 업데이트
                        // getBuildConfigForCustomProperties()
                        if (isAppVersionUpdateNeed(
                                AppCurrentInfo.getVersionName(), verN
                            )
                        ) {
                            // Update 있다고 판단
                            updateStatusShow(true)
                        } else {
                            // Update 없다고 판단
                            updateStatusShow(false)
                        }
                    } else {
                        // Update 없다고 판단
                        updateStatusShow(false)
                    }
                } else {
                    // Update 없다고 판단
                    updateStatusShow(false)
                }
            })
        }
    }

    /**
     * Update Button 처리
     * 반드시 네트워크가 열려 있을때만 상태를 체크할 수 있습니다.
     */
    private fun updateStatusShow(isUpdateBtShow: Boolean) {
        launch(Dispatchers.Main) {
            Log.d(TAG, "============updateStatusShow=========${isUpdateBtShow}")
            if (isUpdateBtShow) {
                binding.btAppUpdateStateShow.text = current.getString(R.string.apk_update_yes)
                binding.btAppUpdateStateShow.visibility = View.VISIBLE
            } else {
                binding.btAppUpdateStateShow.visibility = View.INVISIBLE
            }
        }
    }

    /**
     * App Update 조건 Check
     */
    private fun isAppVersionUpdateNeed(versionFromApp: String, versionFromServer: String): Boolean {
        return StrUtil.isUpdateAPKCondition(
            StrUtil.strDotAppend(versionFromApp), StrUtil.strDotAppend(versionFromServer)
        )
    }
}