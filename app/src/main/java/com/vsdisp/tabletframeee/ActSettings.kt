package com.vsdisp.tabletframeee

import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.multidex.BuildConfig
import com.vsdisp.tabletframeee.actbase.ActCoroutineBase
import com.vsdisp.tabletframeee.actbase.ActHelper
import com.vsdisp.tabletframeee.apis.Constant
import com.vsdisp.tabletframeee.apis.main.ReqMain
import com.vsdisp.tabletframeee.common.AppCurrentInfo
import com.vsdisp.tabletframeee.common.model.VSettings
import com.vsdisp.tabletframeee.common.model.VersionRVModel
import com.vsdisp.tabletframeee.databinding.VersionFramePlateBinding
import com.vsdisp.tabletframeee.network.ConnectionStatusListener
import com.vsdisp.tabletframeee.ui.dialogs.CustomBaseDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomSelectDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomVersionDNDialog
import com.vsdisp.tabletframeee.utils.AOSDeviceStorageUtil
import com.vsdisp.tabletframeee.utils.AOSDeviceStorageUtil.storageSpaceInDevice
import com.vsdisp.tabletframeee.utils.APKVersionCheckAndDNUtil
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.FileUtil
import com.vsdisp.tabletframeee.utils.StrUtil
import com.vsdisp.tabletframeee.utils.StrUtil.Companion.isAlreadyUpdateAPK
import com.vsdisp.tabletframeee.writer.JSONNodeInfo
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch


/**
 * App Setting
 */
class ActSettings : ActCoroutineBase() {

    private lateinit var current: ActSettings

    private lateinit var mActHelper: ActHelper

    private lateinit var binding: VersionFramePlateBinding

    companion object {
        const val TAG = "ActSettings"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        init()
        // 현재의 사항 반드시 선언
        setListenNetworkStatus(object : ConnectionStatusListener {
            override fun onConnectionStatus(isConnected: Boolean) {
                isRealTimeNTStatus = isConnected
                whenNetworkConnected()
            }
        })
    }

    /**
     * Init
     */
    private fun init() {
        try {
            current = this
            binding = VersionFramePlateBinding.inflate(layoutInflater)
            setContentView(binding.root)
            updateStateCheckAndDeployLayout()
            initActHelper()
            getStorageInfo()
        } catch (e: Exception) {
            Log.w(TAG, "==============${e.message}")
        }
    }

    private fun getStorageInfo() {
        try {
            val target_1 = storageSpaceInDevice(current, 1)
            val target_2 = storageSpaceInDevice(current, 2)
            val target_3 = storageSpaceInDevice(current, 3)
            Log.w(TAG, "$target_1 $target_2 $target_3")
        } catch (e: Exception) {

        }
    }

    /**
     * 업데이트 가능 여부 통신을 통하여 확인후 결과 값에 따라
     *
     * 표기를 달리 한다.
     */
    private fun initLayout(isUpdateNeed: Boolean, appVersion: String, serverAppVersion: String) {
        // From Root Plate into add child View
        try {
            launch(Dispatchers.Main) {
                binding.llPlate.removeAllViews()
                val topLayout = layoutInflater.inflate(R.layout.version_frame_title, null)
                binding.llPlate.addView(topLayout)

                val lists = mutableListOf<VSettings>(
                    VSettings(
                        0,
                        getString(R.string.tx_setting_app_version),
                        AppCurrentInfo.getVersionName(),
                        "안내 : ",
                        "현재 단말에 설치 되어 있는 현재 앱 버전 입니다."
                    ),
                    VSettings(
                        1,
                        getString(R.string.tx_setting_app_version_update),
                        "실행",
                        "안내 : ",
                        "앱 업데이트 실행을 누르면 앱 업데이트 진행됩니다.단 업데이트가 최신이거나 실행 가능 상태가 아닌 경우는 제외됩니다."
                    ),
                    VSettings(
                        2,
                        getString(R.string.tx_setting_app_storage_title),
                        storageSpaceInDevice(current, 3),
                        "안내 : ",
                        "현재 단말 저장 가능 공간 표기"
                    ),
                )

                lists.forEachIndexed { index, vSettings ->
                    val customLayout = layoutInflater.inflate(R.layout.version_frame_detail, null)

                    customLayout.tag = index
                    when (index) {
                        0 -> {
                            customLayout.findViewById<TextView>(R.id.version_title).text =
                                vSettings.version_text
                            customLayout.findViewById<TextView>(R.id.version_contents).text =
                                vSettings.version_contents
                            customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                vSettings.version_info_left
                            customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                vSettings.version_info_right
                        }

                        1 -> {
                            customLayout.findViewById<TextView>(R.id.version_title).text =
                                vSettings.version_text
                            customLayout.findViewById<TextView>(R.id.version_contents).visibility =
                                View.GONE

                            if (isUpdateNeed) {
                                customLayout.findViewById<TextView>(R.id.version_up_execute).visibility =
                                    View.VISIBLE
                                customLayout.findViewById<TextView>(R.id.version_up_execute).isEnabled =
                                    true
                                customLayout.findViewById<TextView>(R.id.version_up_execute).text =
                                    vSettings.version_contents
                                customLayout.findViewById<TextView>(R.id.version_up_execute)
                                    .setOnClickListener {
                                        reqApkVersionHttp()
                                    }
                                customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                    vSettings.version_info_left
                                customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                    vSettings.version_info_right
                            } else {
                                customLayout.findViewById<TextView>(R.id.version_up_execute).visibility =
                                    View.VISIBLE
                                customLayout.findViewById<TextView>(R.id.version_up_execute).isEnabled =
                                    false

                                if (!isAppVersionUpdateNeed(appVersion, serverAppVersion)) {
                                    if (isAlreadyUpdateAPK(StrUtil.strDotAppend(appVersion), StrUtil.strDotAppend(serverAppVersion))) {
                                        // 여기서 조건 하나 추가함 업데이트 필요한지? 안한지?
                                        customLayout.findViewById<TextView>(R.id.version_up_execute).text =
                                            "업데이트 최신 상태"
                                        customLayout.findViewById<TextView>(R.id.version_up_execute)
                                            .setTextColor(Color.BLACK)
                                        customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                            vSettings.version_info_left
                                        customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                            "업데이트가 최신 상태입니다."
                                    } else {
                                        customLayout.findViewById<TextView>(R.id.version_up_execute).text =
                                            "업데이트 필요 없음"
                                        customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                            vSettings.version_info_left
                                        customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                            vSettings.version_info_right
                                    }
                                } else {
                                    customLayout.findViewById<TextView>(R.id.version_up_execute).text =
                                        "업데이트 실행 가능 상태 아님"
                                    customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                        vSettings.version_info_left
                                    customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                        vSettings.version_info_right
                                }
                            }
                        }

                        2 -> {
                            customLayout.findViewById<TextView>(R.id.version_title).text =
                                vSettings.version_text
                            customLayout.findViewById<TextView>(R.id.version_contents).text =
                                vSettings.version_contents
                            customLayout.findViewById<TextView>(R.id.version_info_left).text =
                                vSettings.version_info_left
                            customLayout.findViewById<TextView>(R.id.version_info_right).text =
                                vSettings.version_info_right
                            customLayout.findViewById<LinearLayout>(R.id.version_frame_detail_row)
                                .setOnClickListener {
                                    if (mActHelper != null) {
                                        mActHelper.moveStorageDetail(current)
                                    }
                                }
                        }

                        else -> {

                        }
                    }

                    binding.llPlate.addView(customLayout)
                    val customBottomLine =
                        layoutInflater.inflate(R.layout.version_frame_divider, null)
                    binding.llPlate.addView(customBottomLine)
                }
            }
        } catch (e: Exception) {
            Log.d(TAG, "===========${e.message}")
        }
    }

    /**
     * Network Connected State
     * 실시간 Network + 현재 바로 체크 해서 발생 되는 Network
     * 모두 true 일때 Main UI 에서의 동작을 기술 한다.
     */
    private fun whenNetworkConnected() {
        Log.d(ActMain.TAG, "============whenNetworkConnected=========")
        updateStateCheckAndDeployLayout()
    }

    private fun initActHelper() {
        mActHelper = ActHelper(this)
        mActHelper.setActHelperListener(object : ActHelper.ActHelperListener {
            override fun onBackPressedReact() {
                launch {
                    finish()
                }
            }

            override fun registerActivityResult(mUri: Uri?, intents: Intent?) {
                if (mUri == null && intents == null) {
                    Log.d(TAG, "==================ActivityResult CANCEL===============")
//                    Toast.makeText(current, "ActivityResult CANCEL", Toast.LENGTH_LONG).show()
                } else {
//                    Toast.makeText(current, "ActivityResult OK", Toast.LENGTH_LONG).show()
                    Log.d(TAG, "==================ActivityResult OK===============")
                }
            }
        })
    }

    /**
     * Update 상태 체크
     */
    private fun updateStateCheckAndDeployLayout() {
        if (isCurrentNTStatus || isRealTimeNTStatus) {
            async(Dispatchers.IO) {
                ReqMain().reqVSEduGetApkVersionInfo(current, callData = { it ->
                    if (it != null) {
                        var isForceUpdate = it.version_apk.version_all.is_force_update
                        var verN = it.version_apk.version_all.new_apk_release_version_name

                        if (StrUtil.isForceUpdate(isForceUpdate)) {
                            // Update Yes 이면 파일 서버에 기재된 Version 이 현재의 앱버전보다 크면 업데이트
                            // getBuildConfigForCustomProperties()
                            if (isAppVersionUpdateNeed(
                                    AppCurrentInfo.getVersionName(), verN
                                )
                            ) {
                                // Update 있다고 판단
                                initLayout(true, AppCurrentInfo.getVersionName(), verN)
                            } else {
                                // Update 없다고 판단
                                initLayout(false, AppCurrentInfo.getVersionName(), verN)
                            }
                        } else {
                            // Update 없다고 판단
                            initLayout(false, AppCurrentInfo.getVersionName(), verN)
                        }
                    } else {
                        // Update 없다고 판단
                        initLayout(
                            false, AppCurrentInfo.getVersionName(), AppCurrentInfo.getVersionName()
                        )
                    }
                })
            }
        } else {
            val timesInfo = JSONNodeInfo(current).getSavedNetworkTimeFromPreferences()
            Log.w(TAG, "======$timesInfo")
            // Network 가 열리지 않은 상태 에서는 임의로 Update 필요 하다고 간주 하고 버튼 눌렀을때 네트워크 유도하고 사용자가 자가 처리 하도록
            // 업데이트가 필요한 상황에서는 버전 비교가 필요 없다는 전재로
            initLayout(true, AppCurrentInfo.getVersionName(), AppCurrentInfo.getVersionName())
        }
    }

    /**
     * Req Apk Version Http
     */
    private fun reqApkVersionHttp() {
        if (isCurrentNTStatus || isRealTimeNTStatus) {
            launch(Dispatchers.IO) {
                // 여기서 사용자 권고 사항 표기
                ReqMain().reqVSEduGetApkVersionInfo(current, callData = { it ->
                    if (it != null) {
//                        Log.d(TAG, "=============STR_1")
                        var isForceUpdate = it.version_apk.version_all.is_force_update
                        var verN = it.version_apk.version_all.new_apk_release_version_name

                        if (StrUtil.isForceUpdate(isForceUpdate)) {
//                            Log.d(TAG, "=============STR")
                            val dl = CustomBaseDialog(current)
                            dl.setCustomClickListener {
                                if (it) {
                                    // Update Yes 이면 파일 서버에 기재된 Version 이 현재의 앱버전보다 크면 업데이트
                                    reqAPKPathInfo(AppCurrentInfo.getVersionName(), verN)
                                }
                            }
                            dl.show(getString(R.string.tx_download_entry_desc))
                        }
                    } else {
                        // Update No
                        var versionName = AppCurrentInfo.getVersionName() // Version Name
                        //Toast.makeText(current, "UPDATE NO $versionName", Toast.LENGTH_LONG).show()
                    }
                })
            }
        } else {
            launch(Dispatchers.Main) {
                // 네크 워크 세팅 이동
                val dl = CustomBaseDialog(current)
                dl.setCustomClickListener {
                    if (it) {
                        // 네트워크 설정 화면 이동?
                        ActUtil.moveToNetworkSettingScreen(current)
                    } else {

                    }
                }
                dl.show(getString(R.string.network_state_unstable))
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

    /**
     * 단말 안에 이전에 다운로드 저장된 파일이 있는지 확인
     */
    private fun isAlreadyDownloadInDevice(savedPathInDevice: String): Boolean {
        return APKVersionCheckAndDNUtil.isFileExistByDepthInDeviceByFullPath(
            current, savedPathInDevice
        )
    }

    /**
     * Storage 사용 여부 전체 체크
     * 다운로드 전에 일순위 조건 사항 이다.
     */
    private fun isStorageAvailableCheck(): Boolean {
        return !AOSDeviceStorageUtil.isStorageSpaceLimitForVSEdu(this)
    }

    /**
     * APK 다운로드 정보 전달받고 다운로드 실행
     */
    private fun reqAPKPathInfo(versionFromApp: String, versionFromServer: String) {
        if (isStorageAvailableCheck()) {
            if (isAppVersionUpdateNeed(versionFromApp, versionFromServer)) {
                ReqMain().reqVSEduGetApkALLDNInfo(current, callData = { it ->
                    val crPath = it!!.contentRootPath
                    val ct = it!!.contentsType
                    val di = it!!.apk.dInfo
                    val vs = di.version
                    val ext = di.ext
                    val fn = di.filename
                    val pa = di.path

                    val dnURL = "${Constant.REQ_VSF_SERVER_MAIN_URL}${crPath}${pa}${fn}.${ext}"
                    val dnDevicePath = "${FileUtil.getRootDirPath(current)}${pa}"
                    val dnFileNameWithExt = "${fn}-${vs}.${ext}"
                    // 단말 내부에 다운 로드 받은 APK 파일 Full Path
                    val dnDeviceFullPathWithFName = "$dnDevicePath$dnFileNameWithExt"

                    val strDescription = getString(R.string.tx_downloading_sub)

                    Log.d(
                        ActMain.TAG,
                        "$dnURL\n$dnDevicePath\n$dnFileNameWithExt\n$dnDeviceFullPathWithFName\n$strDescription"
                    )

                    launch(Dispatchers.Main) {
                        if (!isAlreadyDownloadInDevice(dnDeviceFullPathWithFName)) {
                            CustomVersionDNDialog(current, VersionRVModel(
                                dnURL, dnDevicePath, dnFileNameWithExt, vs, strDescription
                            ), downloadComplete = {
                                if (it!!.isDownloadSuccess) {
                                    mActHelper.openNewVersion(
                                        dnDeviceFullPathWithFName, current
                                    )
                                } else {
                                    if (it!!.networkErrorType == 2) {
                                        Toast.makeText(
                                            current,
                                            current.getString(R.string.tx_download_server_fail),
                                            Toast.LENGTH_LONG
                                        ).show()
                                    } else {
                                        Toast.makeText(
                                            current,
                                            current.getString(R.string.tx_download_error),
                                            Toast.LENGTH_LONG
                                        ).show()
                                    }
                                }
                            })
                        } else {
                            CustomSelectDialog(current,
                                current.getString(R.string.before_already_downloaded),
                                callClick = {
                                    if (it == true) {
                                        mActHelper.openNewVersion(
                                            dnDeviceFullPathWithFName, current
                                        )
                                    }
                                })
                        }
                    }
                })
            }
        } else {

            launch(Dispatchers.Main) {
                Toast.makeText(
                    current, current.getString(R.string.storage_state_check_need), Toast.LENGTH_LONG
                ).show()
            }
        }
    }


    private fun versionShow() {
        launch(Dispatchers.Main) {
//            binding.versionShow.text = "설치 버전 => ${com.vsdisp.tabletframeee.BuildConfig.VERSION_NAME}"
        }
    }

    /*----------------------------------------Build Info---------------------------------------------*/
    /**
     * 지향 하는 방햘 MultiDex
     */
    private fun getBuildConfigForBase() {
        var bt = BuildConfig.BUILD_TYPE
    }

//    /**
//     * 현 패키지 명칭 기준 BuildConfig
//     */
//    private fun getBuildConfigForCustomProperties(): String {
//        var versionNumber = com.vsdisp.tabletframeee.BuildConfig.VERSION_NUMBER
//        var versionName = com.vsdisp.tabletframeee.BuildConfig.VERSION_BUILD // Version Name
//        Log.d(
//            "ActMain getBuildConfigForCustomProperties", "======$versionName========$versionNumber"
//        )
//        //Toast.makeText(current, "$versionName", Toast.LENGTH_LONG).show()
//        return versionName.toString()
//    }
}