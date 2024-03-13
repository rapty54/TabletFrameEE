package com.vsdisp.tabletframeee.wv

import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.app.Dialog
import android.content.Context
import android.graphics.Bitmap
import android.net.Uri
import android.os.Message
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.webkit.ConsoleMessage
import android.webkit.JsResult
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader
import com.vsdisp.tabletframeee.common.ACTIVATE_IS_CHROME_DEBUGGER
import com.vsdisp.tabletframeee.common.ACTIVATE_IS_JS_ALERT_WV
import com.vsdisp.tabletframeee.common.ACTIVATE_IS_JS_CONFIRM_WV
import com.vsdisp.tabletframeee.common.ACTIVATE_PLAYBACK_GESTURE
import com.vsdisp.tabletframeee.common.ACTIVATE_PO_VIEW
import com.vsdisp.tabletframeee.common.AppCurrentInfo
import com.vsdisp.tabletframeee.common.FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH
import com.vsdisp.tabletframeee.common.FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH
import com.vsdisp.tabletframeee.common.TAG_WV_CR_INFO
import com.vsdisp.tabletframeee.dialogs.DialogUtil


/**
 * WebView 재정의 Class
 */
@SuppressLint("ObsoleteSdkInt", "SetJavaScriptEnabled", "ClickableViewAccessibility")
class CommonWebView(context: Context, attrs: AttributeSet?, defStyleAttr: Int) :
    WebView(context, attrs, defStyleAttr) {

    // API 20 이상 에서는 allowUniversalAccessFromFileURLs 이거 사용 못함 assetLoader 를 정의 해서 선언 필요
    // 이게 뭔지는 알아서 공부
    val assetLoader =
        WebViewAssetLoader.Builder().addPathHandler(
            "/assets/",
            WebViewAssetLoader.AssetsPathHandler(context)
        )
            .addPathHandler("/res/", WebViewAssetLoader.AssetsPathHandler(context)).build()

    constructor(context: Context) : this(context, null)
    constructor(context: Context, attrs: AttributeSet?) : this(context, attrs, 0)

    init {
        with(settings) {
            javaScriptEnabled = true //자바 스크립트 사용 설정
            javaScriptCanOpenWindowsAutomatically = true //window.open() 동작 설정
            useWideViewPort = true //wide viewport 사용 설정
            loadWithOverviewMode = true // 컨텐츠가 웹뷰보다 클 때, 스크린 크기에 맞추기
            builtInZoomControls = false //줌 컨트롤 사용 여부 설정
            domStorageEnabled = true //로컬 스토리지, 세션 스토리지 사용 여부 설정
            allowFileAccess = true //파일 접근 허용 설정
            defaultTextEncodingName = "UTF-8" //인코딩 설정
            allowContentAccess = true
            mediaPlaybackRequiresUserGesture =
                ACTIVATE_PLAYBACK_GESTURE // Media Player Back gesture Block
            cacheMode = WebSettings.LOAD_NO_CACHE
            if (ACTIVATE_PO_VIEW) {
                setSupportMultipleWindows(true) // 멀티 윈도우 지원 여부 설정
            }
            databaseEnabled = true //Database Storage API 사용 여부 설정
        }
        webViewClient = CommonWebViewClient()
        webChromeClient = WVChromeClientDefine()
    }

    /**
     * Text Editor Flag Need
     */
    override fun onCheckIsTextEditor(): Boolean {
        return true
    }

    /**
     * WebChromeClient
     */
    inner class WVChromeClientDefine : WebChromeClient() {
        // A 태그 혹은 window.open 일 경우 동작 하는 Option Target => Blank 에 대한 별도 처리가 필요한 경우
        override fun onCreateWindow(
            view: WebView?,
            isDialog: Boolean,
            isUserGesture: Boolean,
            resultMsg: Message?,
        ): Boolean {
            Log.d(TAG_WV_CR_INFO, "onCreateWindow ${view!!.url}")
            if (ACTIVATE_PO_VIEW) {
                val newWebView = WebView(context)
                val msettings = newWebView.settings;
                msettings.javaScriptEnabled = true
                msettings.loadWithOverviewMode = true
                msettings.setSupportMultipleWindows(true)
                msettings.useWideViewPort = true
                msettings.defaultTextEncodingName = "UTF-8" //인코딩 설정
                msettings.allowContentAccess = true
                msettings.cacheMode = WebSettings.LOAD_NO_CACHE
                msettings.domStorageEnabled = true //로컬 스토 리지, 세션 스토 리지 사용 여부 설정
                msettings.javaScriptCanOpenWindowsAutomatically = true

                val dl = Dialog(context)
                dl.setContentView(newWebView)

                val params: ViewGroup.LayoutParams = dl.window!!.attributes
                params.width = ViewGroup.LayoutParams.MATCH_PARENT
                params.height = ViewGroup.LayoutParams.MATCH_PARENT

                dl.window!!.attributes = params as WindowManager.LayoutParams?
                dl.show()

                newWebView.webViewClient = object : WebViewClient() {

                    override fun onPageCommitVisible(view: WebView?, url: String?) {
                        super.onPageCommitVisible(view, url)
                    }

                    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                        super.onPageStarted(view, url, favicon)
                        Log.d(TAG_WV_CR_INFO, "onPageStarted $url")
                    }

                    override fun onPageFinished(view: WebView?, url: String?) {
                        Log.d(TAG_WV_CR_INFO, "onPageFinished $url")
                        super.onPageFinished(view, url)
                    }
                }

                newWebView.webChromeClient = object : WebChromeClient() {
                    override fun onCloseWindow(window: WebView?) {
                        super.onCloseWindow(window)
                        Log.d(TAG_WV_CR_INFO, "onCloseWindow on PopupNewWindow")
                        dl.dismiss()
                        window!!.destroy()
                    }

                    override fun onJsAlert(
                        view: WebView?,
                        url: String?,
                        message: String?,
                        result: JsResult?,
                    ): Boolean {
                        return if (ACTIVATE_IS_JS_ALERT_WV) {
                            // Use Alert For Android interface
                            DialogUtil.jsAlertUseAosInterface(context, message, result, true)
                            true
                        } else {
                            // Non Use Alert For Android interface (Just being Use Origin Frame Alert)
                            super.onJsAlert(view, url, message, result)
                        }
                    }

                    override fun onJsConfirm(
                        view: WebView?,
                        url: String?,
                        message: String?,
                        result: JsResult?,
                    ): Boolean {
                        return if (ACTIVATE_IS_JS_CONFIRM_WV) {
                            // 자료 스크랩 하는 쪽에서 호출 된다.
                            DialogUtil.jsConfirmDialog(context, message, result)
                            true
                        } else {
                            super.onJsConfirm(view, url, message, result)
                        }
                    }
                }

                val transport = resultMsg!!.obj as WebViewTransport
                transport.webView = newWebView
                resultMsg.sendToTarget()
                return true
            } else {
                return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg)
            }
        }

        override fun onCloseWindow(window: WebView?) {
            Log.d(TAG_WV_CR_INFO, "onCloseWindow")
            if (ACTIVATE_PO_VIEW) {
                window!!.visibility = View.GONE
                window.destroy()
            }
            super.onCloseWindow(window)
        }

        override fun onJsAlert(
            view: WebView?,
            url: String?,
            message: String?,
            result: JsResult?,
        ): Boolean {
            return if (ACTIVATE_IS_JS_ALERT_WV) {
                // Use Alert For Android interface
                DialogUtil.jsAlertUseAosInterface(context, message, result, true)
                true
            } else {
                // Non Use Alert For Android interface (Just being Use Origin Frame Alert)
                super.onJsAlert(view, url, message, result)
            }
        }

        override fun onJsConfirm(
            view: WebView?,
            url: String?,
            message: String?,
            result: JsResult?,
        ): Boolean {
//            Log.d(LogTagName.TAG_WV_CR_INFO, "onJsConfirm ${view!!.url}")
            return if (ACTIVATE_IS_JS_CONFIRM_WV) {
                DialogUtil.jsConfirmDialog(context, message, result)
                true
            } else {
                super.onJsConfirm(view, url, message, result)
            }
        }

        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {

            consoleMessage?.message()?.let {
                if (AppCurrentInfo.isBuildDev()
                    || ACTIVATE_IS_CHROME_DEBUGGER
                    || AppCurrentInfo.isBuildSample()
                ) {
                    Log.w("Debug", it)
                }
            }

            return super.onConsoleMessage(consoleMessage)
        }

        override fun onProgressChanged(view: WebView?, newProgress: Int) {
            super.onProgressChanged(view, newProgress)
            if (newProgress == 100) {
//                Log.d(LogTagName.TAG_WV_CR_INFO, "onProgressChanged Load Done $newProgress")
                mWebViewListener?.onProgressChangedFinish(view, newProgress)
            }
        }

        override fun onShowFileChooser(
            webView: WebView?,
            filePathCallback: ValueCallback<Array<Uri?>>,
            fileChooserParams: FileChooserParams?,
        ): Boolean {
//            Log.d(
//                LogTagName.TAG_WV_CR_INFO,
//                "onShowFileChooser $filePathCallback $fileChooserParams"
//            )
            return mWebViewListener!!.onShowFileChooserDe(
                webView,
                filePathCallback,
                fileChooserParams
            )
        }
    }

    private var mWebViewListener: WebViewListener? = null

    /**
     * Set Listener References
     */
    fun setWebViewListener(webViewListener: WebViewListener) {
        mWebViewListener = webViewListener
    }

    /**
     * WebViewClient
     */
    inner class CommonWebViewClient : WebViewClient() {

        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            mWebViewListener?.onDePageStarted(url, favicon)
        }

        override fun onPageFinished(view: WebView?, url: String?) {
            mWebViewListener?.onDePageFinished(url, view)
//            Log.d(LogTagName.TAG_WV_INFO, "onPageFinished $url")
            super.onPageFinished(view, url)
        }

        override fun onLoadResource(view: WebView?, url: String?) {
            super.onLoadResource(view, url)
            mWebViewListener?.onDeLoadResource(url)
        }

        override fun shouldOverrideUrlLoading(
            view: WebView?,
            request: WebResourceRequest?,
        ): Boolean {
            return mWebViewListener?.shouldOverrideUrlLoadingDe(view, request)!!
        }

        @Deprecated("Deprecated in Java")
        override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
            return mWebViewListener?.shouldOverrideUrlLoadingDe(view, url)!!
        }

        override fun onPageCommitVisible(view: WebView?, url: String?) {
            super.onPageCommitVisible(view, url)
            mWebViewListener?.onPageCommitVisibleDe(view, url)
        }

        override fun onReceivedError(
            view: WebView?,
            request: WebResourceRequest?,
            error: WebResourceError?,
        ) {
            super.onReceivedError(view, request, error)
            mWebViewListener?.onReceivedErrorDe(request, error)
        }

        @Deprecated(
            "Deprecated in Java", ReplaceWith(
                "super.onReceivedError(view, errorCode, description, failingUrl)",
                "android.webkit.WebViewClient"
            )
        )
        @TargetApi(android.os.Build.VERSION_CODES.M)
        override fun onReceivedError(
            view: WebView?,
            errorCode: Int,
            description: String?,
            failingUrl: String?,
        ) {
            super.onReceivedError(view, errorCode, description, failingUrl)
            mWebViewListener?.onReceivedErrorOldM(view, errorCode, description, failingUrl)
        }

        /**
         * 현재 위치가 지정된 Home Index Url 일떄 누적된 History 로 인해
         * Home 으로 왔음 에도 다른 페이지로 이동 하는 현상 처리
         */
        override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
            // Log.d("doUpdateVisitedHistory" , "$url")
            super.doUpdateVisitedHistory(view, url, isReload)
            if (AppCurrentInfo.isBuildSample()) {
                if (url == FILE_ASSET_SUB_PATH_INDEX_SAMPLE_ENTRY_PATH) {
                    view!!.clearHistory()
                    mWebViewListener?.onEntryUrlNotification(false)
                } else {
                    mWebViewListener?.onEntryUrlNotification(false)
                }
            } else {
                if (url == FILE_ASSET_SUB_PATH_INDEX_ENTRY_PATH) {
                    view!!.clearHistory()
                    mWebViewListener?.onEntryUrlNotification(true)
                } else {
                    mWebViewListener?.onEntryUrlNotification(false)
                }
            }
        }

        override fun shouldInterceptRequest(
            view: WebView?,
            request: WebResourceRequest?,
        ): WebResourceResponse? {
            return return assetLoader.shouldInterceptRequest(request!!.url)
        }
    }

    interface WebViewListener {
        fun onDePageStarted(url: String?, favicon: Bitmap?)
        fun onDePageFinished(url: String?, view: WebView?)
        fun onDeLoadResource(url: String?)
        fun shouldOverrideUrlLoadingDe(view: WebView?, request: WebResourceRequest?): Boolean
        fun shouldOverrideUrlLoadingDe(view: WebView?, url: String?): Boolean
        fun onReceivedErrorDe(request: WebResourceRequest?, error: WebResourceError?)
        fun onPageCommitVisibleDe(view: WebView?, url: String?)
        fun onProgressChangedFinish(view: WebView?, newProgress: Int)
        fun onShowFileChooserDe(
            webView: WebView?,
            filePathCallback: ValueCallback<Array<Uri?>>,
            fileChooserParams: WebChromeClient.FileChooserParams?,
        ): Boolean

        fun onReceivedErrorOldM(
            view: WebView?,
            errorCode: Int,
            description: String?,
            failingUrl: String?,
        )

        fun onEntryUrlNotification(isMainEntry: Boolean)
    }
}