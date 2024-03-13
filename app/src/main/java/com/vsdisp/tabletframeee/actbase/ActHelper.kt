package com.vsdisp.tabletframeee.actbase

import android.content.Intent
import android.net.Uri
import android.os.Parcelable
import android.provider.Settings
import android.util.Log
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.actbase.model.ActSerialMultiStringData
import com.vsdisp.tabletframeee.utils.ProviderUtil

/**
 * onBackPressed Listener
 *
 * registerActivityResult Listener
 */
class ActHelper(ctx: AppCompatActivity) {

    companion object {
        const val ACT_SERIAL: String = "ActSerial"
        const val ACT_PARCEL: String = "ActParcel"
        const val TAG: String = "ActHelper"
        const val ACT_PAGE_MOVE_INFO_KEY: String = "ActPageInfo"
    }

    interface ActHelperListener {
        /**
         * onBackPressed React
         */
        fun onBackPressedReact()

        /**
         * registerForActivityResult
         */
        fun registerActivityResult(mUri: Uri?, intents: Intent?)
    }

    private var mCtx: AppCompatActivity? = ctx

    private lateinit var activityResultListener: ActivityResultLauncher<Intent>

    private var mActHelperListener: ActHelperListener? = null

    // 외부 선언
    fun setActHelperListener(listener: ActHelperListener) {
        this.mActHelperListener = listener
    }

    init {
        mCtx?.let { it ->
            it.onBackPressedDispatcher.addCallback(it, object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    mActHelperListener?.onBackPressedReact()
                }
            })
            activityResultListener =
                it.registerForActivityResult(ActivityResultContracts.StartActivityForResult()) {
                    Log.d(TAG, "${it.resultCode}")
                    if (it.resultCode == AppCompatActivity.RESULT_OK) {
                        // Result OK
                        val mIntent: Intent? = it.data // intent
                        val mUri: Uri? = mIntent!!.data // uri
                        if (mUri != null) {
                            Log.d(TAG, "$mUri")
                            mActHelperListener?.registerActivityResult(mUri, mIntent)
                        }
                    } else {
                        // Result Cancel
                        Log.d(TAG, "Result Cancel :: ${it.resultCode}")
                        mActHelperListener?.registerActivityResult(null, null)
                    }
                }
        }
    }

    /**
     * Move To Setting Detail
     */
    fun moveSettingDetail(
        act: AppCompatActivity,
    ) {
        try {
            activityResultListener.launch(
                Intent(
                    Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                    Uri.parse("package:" + act.packageName)
                ).apply {
                    this.addCategory(Intent.CATEGORY_DEFAULT)
                    //this.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                })
        } catch (e: Exception) {

        }
    }

    /**
     * 현 전체 단말 기준
     */
    fun moveStorageDetail(act: AppCompatActivity) {
        try {
            activityResultListener.launch(Intent(Settings.ACTION_INTERNAL_STORAGE_SETTINGS).apply {
                this.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            })
        } catch (e: Exception) {

        }
    }

    /**
     * 다운로드를 모두 마친 이후
     * 단말내 해당 경로 안에 다운 로드 받은 APK 를 설치 하는 과정을
     * 현재의 사항 으로 처리 한다.
     */
    fun openNewVersion(
        downloadedApkInternalPath: String,
        ctx: AppCompatActivity,
    ) {
        try {
            val intent = Intent(Intent.ACTION_VIEW)
            intent.setDataAndType(
                ProviderUtil.getUriFromFile(ctx, downloadedApkInternalPath),
                "application/vnd.android.package-archive"
            )
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            activityResultListener.launch(intent)
        } catch (e: Exception) {

        }
    }

    /**
     * Network 설정화면 이동
     */
    fun moveToNetworkSettingScreen(act: AppCompatActivity) {
        activityResultListener.launch(Intent(Settings.ACTION_WIRELESS_SETTINGS));
    }


    /**
     * ActivityResultContracts Launch 사용
     *
     * StartActivity 사용 안함 => 구버전
     */
    fun loadFilesFromStorageUsingProviderForLaunch(
        acts: AppCompatActivity,
        paths: String,
        failMsg: (String?) -> Unit,
    ) {
        try {
            val browseStorage = Intent(Intent.ACTION_VIEW)
            browseStorage.data = ProviderUtil.getUriFromFile(acts, paths)
            browseStorage.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            browseStorage.addCategory(Intent.CATEGORY_BROWSABLE)
            activityResultListener.launch(browseStorage)
        } catch (e: Exception) {
            failMsg(e.message)
        }
    }

    /**
     * 다른 Activity 로 이동 전달 데이터 포함
     *
     * launch 로 이동
     */
    fun moveOtherActivityForLaunch(act: AppCompatActivity, clz: Class<*>, dataParcel: Parcelable) {
        val intent = Intent(act, clz)
        intent.putExtra(ACT_PAGE_MOVE_INFO_KEY, dataParcel)
        activityResultListener.launch(intent)
    }

    /**
     * Call Other Activity By ActivityResultLauncher
     * ActivityResultLauncher 를 이용 해서 다른 Activity 를 호출 할때
     * 사용 하는데 여기서 ActivityResultLauncher 를 선언한 시작 시점에
     * Activity 에 ActivityResultLauncher Call 을 통해서 받는 구간이
     * 반드시 있다. (startActivityForResult 를 대체 하는 기능 이다. / 왜냐 deprecated 되었 거든)
     */
    fun actHelperCallOtherActByActivityResultLauncher(
        current: AppCompatActivity,
        toWhere: Class<*>,
    ) {
        if (activityResultListener != null) {
            val intent = Intent(current, toWhere)
            activityResultListener.launch(intent)
        } else {
            Log.d(TAG, "launch is null")
        }
    }

    /**
     * Call From SubActivity with Data
     *
     * Data => Serializable (DataClass 통해서 넘길수 있게끔 만들 어서 구성 필요)
     */
    fun actHelperCallAfterAndReturnWithSerialDataSetResult(
        current: AppCompatActivity,
        toWhere: Class<*>,
        serialData: ActSerialMultiStringData,
    ) {
        val intent = Intent(current, toWhere).apply {
            putExtra(ACT_SERIAL, serialData)
        }
        current.setResult(AppCompatActivity.RESULT_OK, intent)
        if (!current.isFinishing) current.finish()
    }

    /**
     * Call From SubActivity with Data
     *
     * Data => Serializable (DataClass 통해서 넘길수 있게끔 만들 어서 구성 필요)
     */
    fun actHelperCallAfterAndReturnWithParcelDataSetResult(
        current: AppCompatActivity,
        toWhere: Class<*>,
        parcelData: ActParcelMultiTypeExtraData,
    ) {
        val intent = Intent(current, toWhere).apply {
            putExtra(ACT_PARCEL, parcelData)
        }
        current.setResult(AppCompatActivity.RESULT_OK, intent)
        if (!current.isFinishing) current.finish()
    }

    /**
     * 각 Type 명시된
     */
    fun loadFilesFromStorageUsingProviderForLaunchAsBrowser(
        acts: AppCompatActivity,
        paths: String,
        failMsg: (String?) -> Unit,
    ) {
        try {
            var browseStorage = Intent(Intent.ACTION_VIEW)
            browseStorage = uriType(paths, browseStorage, ProviderUtil.getUriFromFile(acts, paths))
            browseStorage.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            browseStorage.addCategory(Intent.CATEGORY_BROWSABLE)
            activityResultListener.launch(browseStorage)
        } catch (e: Exception) {
            failMsg(e.message)
        }
    }

    private fun uriType(url: String, it: Intent, uri: Uri): Intent {
        if (url.toString().contains(".doc") || url.toString().contains(".docx")) {
            // Word document
            it.setDataAndType(uri, "application/msword");
        } else if (url.toString().contains(".pdf")) {
            // PDF file
            it.setDataAndType(uri, "application/pdf");
        } else if (url.toString().contains(".ppt") || url.toString().contains(".pptx")) {
            // Powerpoint file
            it.setDataAndType(uri, "application/vnd.ms-powerpoint");
        } else if (url.toString().contains(".xls") || url.toString().contains(".xlsx")) {
            // Excel file
            it.setDataAndType(uri, "application/vnd.ms-excel");
        } else if (url.toString().contains(".zip")) {
            // ZIP file
            it.setDataAndType(uri, "application/zip");
        } else if (url.toString().contains(".rar")) {
            // RAR file
            it.setDataAndType(uri, "application/x-rar-compressed");
        } else if (url.toString().contains(".rtf")) {
            // RTF file
            it.setDataAndType(uri, "application/rtf");
        } else if (url.toString().contains(".wav") || url.toString().contains(".mp3")) {
            // WAV audio file
            it.setDataAndType(uri, "audio/x-wav");
        } else if (url.toString().contains(".gif")) {
            // GIF file
            it.setDataAndType(uri, "image/gif");
        } else if (url.toString().contains(".jpg") || url.toString()
                .contains(".jpeg") || url.toString().contains(".png")
        ) {
            // JPG file
            it.setDataAndType(uri, "image/jpeg");
        } else if (url.toString().contains(".txt")) {
            // Text file
            it.setDataAndType(uri, "text/plain");
        } else if (url.toString().contains(".3gp") || url.toString()
                .contains(".mpg") || url.toString().contains(".mpeg") || url.toString()
                .contains(".mpe") || url.toString().contains(".mp4") || url.toString()
                .contains(".avi")
        ) {
            // Video files
            it.setDataAndType(uri, "video/*");
        } else {
            it.setDataAndType(uri, "*/*");
        }
        return it
    }
}