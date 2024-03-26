package com.vsdisp.tabletframeee

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.vsdisp.tabletframeee.actbase.ActCoroutineBase
import com.vsdisp.tabletframeee.actbase.ActHelper
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.apis.main.ReqMain
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo

import com.vsdisp.tabletframeee.network.ConnectionStatusListener
import com.vsdisp.tabletframeee.ui.dialogs.CustomBaseDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomDialogSingle
import com.vsdisp.tabletframeee.ui.multilist.offline.OffCustomHeaderAdapter
import com.vsdisp.tabletframeee.ui.multilist.offline.OffDataConverterForAdapter
import com.vsdisp.tabletframeee.ui.multilist.offline.OffDividerItemDecoration
import com.vsdisp.tabletframeee.ui.multilist.online.CustomHeaderAdapter
import com.vsdisp.tabletframeee.ui.multilist.online.DataConverterForAdapter
import com.vsdisp.tabletframeee.ui.multilist.online.DividerItemDecoration
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.DateUtil
import com.vsdisp.tabletframeee.writer.JSONNodeInfo
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.databinding.ActDownListBinding
import com.vsdn.VSTDownloader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch

/**
 * DownloadList 전면을 이쪽 Activity 로 그린다.
 */
class ActDownList : ActCoroutineBase() {

    private lateinit var binding: ActDownListBinding

    private lateinit var currents: ActDownList

    lateinit var mActHelper: ActHelper

    var isTop = true

    companion object {
        private const val TAG = "ActDownList"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        init()
        // 현재의 사항 반드시 선언
        setListenNetworkStatus(object : ConnectionStatusListener {
            override fun onConnectionStatus(isConnected: Boolean) {
                isRealTimeNTStatus = isConnected
            }
        })
    }

    /**
     * init
     */
    private fun init() {
        try {
            binding = ActDownListBinding.inflate(layoutInflater)
            currents = this
            setContentView(binding.root)
            // 전달 받은 Page 유형
            getParcelableData()
            initActControl()
        } catch (e: Exception) {
            Log.w(TAG, "======${e.message}")
        }
    }

    /**
     * NETWORK ON 이 었을때 마지막 으로 저장한 MIME Node 전체 저장 한다.
     */
    private fun trySavedJSONNode(jsonMIME: MimeDownloadInfo) {
        launch(Dispatchers.IO) {
            JSONNodeInfo(currents).savedMIMEInfoIntoPreference(jsonMIME, callSavedStateCallFn = {

            })
        }
    }

    /**
     * Network ON 일때 저장된 MIME 전체 Node 가져 온다.
     */
    private fun getSavedJSONNode(): MimeDownloadInfo? {
        return JSONNodeInfo(currents).getMIMEInfoFromPreferences()
    }

    /**
     * ActControl Init
     */
    private fun initActControl() {
        mActHelper = ActHelper(currents)
        mActHelper.setActHelperListener(object : ActHelper.ActHelperListener {
            override fun onBackPressedReact() {
                launch {
                    finish()
                }
            }

            override fun registerActivityResult(mUri: Uri?, intents: Intent?) {
                // 외부 에서 갔다 왔을때 Return
                launch(Dispatchers.Main) {
                    if (intents != null) {
                        // RESULT_OK
                        //Toast.makeText(currents, "Act RESULT_OK ", Toast.LENGTH_LONG).show()
                        callSettingReBack()
                    } else {
                        // RESULT_CANCEL
                        //Toast.makeText(currents, "Act RESULT_CANCEL ", Toast.LENGTH_LONG).show()
                        callSettingReBack()
                    }
                }
            }
        })
    }

    fun callSettingReBack() {
        //Toast.makeText(currents, "ACT REBACK ", Toast.LENGTH_LONG).show()
    }

    /**
     * 현 페이지 내에서 Parcelable 으로 삽입한 데이터 가져옴.
     */
    private fun getParcelableData() {
        val pageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra(
                ActHelper.ACT_PAGE_MOVE_INFO_KEY, ActParcelMultiTypeExtraData::class.java
            )
        } else {
            intent.getParcelableExtra<ActParcelMultiTypeExtraData>(ActHelper.ACT_PAGE_MOVE_INFO_KEY)
        }

        var pages = pageInfo!!.page
        var today = pageInfo!!.type
        // Page 유형 기준 으로 통신을 하고 난후 다운 로드 목록을 그립 니다.
        Log.d(TAG, "$isCurrentNTStatus")
        if (isCurrentNTStatus || isRealTimeNTStatus) {
            ReqMain().reqVSEduMIMEDNInfo(currents, callData = { it ->
                if (it != null) {
                    trySavedJSONNode(it)
                    launch(Dispatchers.Main) {
                        if (it.isContentsOpen == "Y") {
                            showNoContentsCover(false)
                            setDateAndTitle(dnInfo = it, today, pages)
                            val list = setMakeList(dnInfo = it, today, true, pages)
                            setRecycleList(list, true)
                        } else {
                            showNoContentsCover(true)
                            CustomDialogSingle(currents,
                                currents.getString(R.string.tx_not_exist_contents_block_message),
                                callClick = {
                                    if (it == false) {
                                        currents.finish()
                                    }
                                })
                        }
                    }
                } else {
                    Log.d(TAG, "DN MIME List Response Data is Null")
                }
            })
        } else {
            val jsonMimeInfo = getSavedJSONNode()
            Log.w(TAG, "=========$jsonMimeInfo")
            launch(Dispatchers.Main) {
                showNoContentsCover(false)
                setDateAndTitle(dnInfo = jsonMimeInfo!!, "", pages)
                val list = setMakeList(dnInfo = jsonMimeInfo, "", false, pages)
                if (!list.isNullOrEmpty()) {
                    setRecycleList(list, false)
                } else {
                    // List Empty / Null
                }
            }
        }
    }

    private fun showNoContentsCover(isShowBlock: Boolean) {
        if (isShowBlock) {
            binding.coverBlock.visibility = View.VISIBLE
            binding.coverBlock.setOnTouchListener(
                object : View.OnTouchListener {
                    override fun onTouch(p0: View?, p1: MotionEvent?): Boolean {
                        return true
                    }
                })
        } else {
            binding.coverBlock.visibility = View.GONE
        }
    }

    /**
     * 다운 로드 목록 상단 데이터 출력
     */
    private fun setDateAndTitle(dnInfo: MimeDownloadInfo, today: String, pages: String) {
        val isUseDateWithTitle = true
        if (isUseDateWithTitle) {
            if (today.isNotEmpty()) {
                if (pages == "M") {
                    binding.contentsTopTl.text = getString(R.string.tx_upTitle_top_mig)
                } else {
                    binding.contentsTopTl.text = getString(R.string.tx_upTitle_top_ele)
                }
                binding.pageTopTitle.text =
                    dnInfo.modDate + " " + dnInfo.pageTitle + " (자료 업데이트 갱신 ${
                        DateUtil.pastDays(
                            today!!, dnInfo.modDate!!
                        )
                    } 일 경과 하였습니다.) ON LINE MODE"
            } else {
                if (pages == "M") {
                    binding.contentsTopTl.text = getString(R.string.tx_upTitle_top_mig)
                } else {
                    binding.contentsTopTl.text = getString(R.string.tx_upTitle_top_ele)
                }
                binding.pageTopTitle.text = dnInfo.pageTitle + " OFF LINE MODE"
            }
        } else {
            binding.pageTopTitle.text = dnInfo.pageTitle + " OFF LINE MODE"
        }
    }

    /**
     * List Set Up Init 이쪽 에서 모두 초기화
     * 전달 받은 응답 값을 기준 으로 데이터 가공 처리 하여 RecycleList 에 설정 가능한 형태의
     * Collection 으로 생성 합니다.
     */
    private fun setMakeList(
        dnInfo: MimeDownloadInfo,
        today: String,
        isOnLine: Boolean,
        pageType: String // pageType A => ALL (초중고 / 모두) E => (초등만) M => (중고)
    ): MutableList<Any?> {
        if (isOnLine) {
            val isClassLevelAll: Boolean = false
            var list: MutableList<Any?>

            if (isClassLevelAll) {
                // 초중고 결합 컨텐츠
                list = DataConverterForAdapter(
                    currents, dnInfo, today
                ).groupByClassAndViewType(DataConverterForAdapter.CLASS_LEVEL_ALL)
                Log.d(TAG, "ALL CLASS : $list")
                return list
            } else {
                if (pageType == "M") {
                    // 중고 결합 컨텐츠만
                    list = DataConverterForAdapter(
                        currents, dnInfo, today
                    ).groupByDoubleClassAndViewType(
                        DataConverterForAdapter.CLASS_LEVEL_MID,
                        DataConverterForAdapter.CLASS_LEVEL_HIG
                    )
                    Log.d(TAG, "MID HIG CLASS : $list")
                    return list
                } else {
                    // 초등만
                    list = DataConverterForAdapter(
                        currents, dnInfo, today
                    ).groupByClassAndViewType(DataConverterForAdapter.CLASS_LEVEL_ELE)
                    Log.d(TAG, "MID HIG CLASS : $list")
                    return list
                }
            }
        } else {
            val isClassLevelAll: Boolean = false
            var list: MutableList<Any?>

            if (isClassLevelAll) {
                // 초중고 결합 컨텐츠
                list = OffDataConverterForAdapter(
                    currents, dnInfo, today
                ).groupByClassAndViewType(OffDataConverterForAdapter.CLASS_LEVEL_ALL)
                Log.d(TAG, "ALL CLASS : $list")
                return list
            } else {
                if (pageType == "M") {
                    // 중고 결합 컨텐츠
                    list = OffDataConverterForAdapter(
                        currents, dnInfo, today
                    ).groupByDoubleClassAndViewType(
                        OffDataConverterForAdapter.CLASS_LEVEL_MID,
                        OffDataConverterForAdapter.CLASS_LEVEL_HIG
                    )
                    Log.d(TAG, "MID HIG CLASS : $list")
                    return list
                } else {
                    list = OffDataConverterForAdapter(
                        currents, dnInfo, today
                    ).groupByClassAndViewType(
                        OffDataConverterForAdapter.CLASS_LEVEL_ELE
                    )
                    Log.d(TAG, "MID HIG CLASS : $list")
                    return list
                }
            }
        }
    }

    /**
     * Recycle List Make Init
     */
    private fun setRecycleList(list: MutableList<Any?>, isOnLine: Boolean) {
        if (isOnLine) {
            // OnLine List
            // RecycleList Apply
            binding.recycleList.apply {
                val adapter = CustomHeaderAdapter(list, currents)
                this.layoutManager = LinearLayoutManager(currents, RecyclerView.VERTICAL, false)
                this.adapter = adapter
                this.addItemDecoration(DividerItemDecoration())
                this.addOnScrollListener(object : RecyclerView.OnScrollListener() {

                    override fun onScrollStateChanged(
                        recyclerView: RecyclerView,
                        newState: Int,
                    ) {
                        super.onScrollStateChanged(recyclerView, newState)
                        if (!binding.recycleList.canScrollVertically(-1) && newState == RecyclerView.SCROLL_STATE_IDLE) {
                            isTop = true
                            binding.floatBtn.visibility = View.GONE
                        } else {
                            if (isTop) {
                                // Move To Top Button Show
                                isTop = false
                                binding.floatBtn.visibility = View.VISIBLE
                            }
                        }
                    }
                })
            }
            // List Up Button
            binding.floatBtn.setOnClickListener {
                binding.recycleList.smoothScrollToPosition(0)
            }
        } else {
            // OFF Line List
            binding.recycleList.apply {
                val adapter = OffCustomHeaderAdapter(list, currents)
                this.layoutManager = LinearLayoutManager(currents, RecyclerView.VERTICAL, false)
                this.adapter = adapter
                this.addItemDecoration(OffDividerItemDecoration())
                this.addOnScrollListener(object : RecyclerView.OnScrollListener() {

                    override fun onScrollStateChanged(
                        recyclerView: RecyclerView,
                        newState: Int,
                    ) {
                        super.onScrollStateChanged(recyclerView, newState)
                        if (!binding.recycleList.canScrollVertically(-1) && newState == RecyclerView.SCROLL_STATE_IDLE) {
                            isTop = true
                            binding.floatBtn.visibility = View.GONE
                        } else {
                            if (isTop) {
                                // Move To Top Button Show
                                isTop = false
                                binding.floatBtn.visibility = View.VISIBLE
                            }
                        }
                    }
                })
            }
            // List Up Button
            binding.floatBtn.setOnClickListener {
                binding.recycleList.smoothScrollToPosition(0)
            }
        }
    }

    /**
     * Network 안 될때 처리 다이얼 로그
     */
    private fun networkShowDL() {
        launch(Dispatchers.Main) {
            val dl = CustomBaseDialog(currents)
            dl.setCustomClickListener {
                if (it) {
                    ActUtil.moveToNetworkSettingScreen(currents)
                } else {

                }
            }
            dl.show(getString(R.string.network_state_unstable))
        }
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
        async(Dispatchers.IO) {
            try {
                VSTDownloader.cancelAll()
            } catch (e: Exception) {

            }
        }
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
    }
}