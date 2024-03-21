package com.vsdisp.tabletframeee.ui.multilist.online

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.vsdisp.tabletframeee.ActDownList
import com.vsdn.VSTDownloader
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.ActVideoView
import com.vsdisp.tabletframeee.databinding.ViewHolderHeaderBinding
import com.vsdisp.tabletframeee.databinding.ViewHolderItemsBinding
import com.vsdisp.tabletframeee.ui.dialogs.CustomBaseDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomContentsDNDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomFileDeleteStateDialog
import com.vsdisp.tabletframeee.ui.multilist.online.model.HeaderItem
import com.vsdisp.tabletframeee.ui.multilist.online.model.ItemDetail
import com.vsdisp.tabletframeee.utils.ActUtil
import com.vsdisp.tabletframeee.utils.FileUtil
import com.vsdisp.tabletframeee.utils.NetworkUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch


/**
 * Category Header Adapter
 */
class CustomHeaderAdapter(private val items: List<Any?>, val ctx: AppCompatActivity) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        const val TAG = "CustomHeaderAdapter"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return if (viewType == DataConverterForAdapter.TYPE_HEADER) {
            // pdfview layout
            return HeaderViewHolder(
                ViewHolderHeaderBinding.inflate(
                    LayoutInflater.from(parent.context), parent, false
                )
            )
        } else {
            // mp4view layout
            return ItemViewHolder(
                ViewHolderItemsBinding.inflate(
                    LayoutInflater.from(parent.context), parent, false
                )
            )
        }
    }

    override fun getItemViewType(position: Int): Int {
        return if (items.get(position) is HeaderItem) {
            DataConverterForAdapter.TYPE_HEADER
        } else {
            DataConverterForAdapter.TYPE_CONTENTS
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        if (holder is HeaderViewHolder) {
            (holder as HeaderViewHolder).bindPostView(
                items.get(holder.absoluteAdapterPosition) as HeaderItem,
                ctx,
                holder.absoluteAdapterPosition
            )
        } else {
            (holder as ItemViewHolder).bindPostView(
                holder,
                items.get(holder.absoluteAdapterPosition) as ItemDetail,
                ctx,
                holder.absoluteAdapterPosition
            )
        }
    }

    inner class HeaderViewHolder(private val binding: ViewHolderHeaderBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val mItemView = binding

        fun bindPostView(headerInfo: HeaderItem, context: Context, position: Int): Unit {
            mItemView.headerCtType.text = "다운로드 컨텐츠 자료 (" + headerInfo.typeCate + ")"
        }
    }

    inner class ItemViewHolder(private val binding: ViewHolderItemsBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val mItemView = binding

        fun bindPostView(
            holder: ItemViewHolder,
            itemInfo: ItemDetail,
            context: AppCompatActivity,
            position: Int,
        ): Unit {
            // ItemView 전체에 position 값 Setting
            holder.binding.itemView.tag = position

            // Item Row 하나에 대한 모든 Layout Root 값
            val rootLayout = holder.binding.root

            val cl = itemInfo.classLevel

            mItemView.itemTitle.text = itemInfo.title

//            mItemView.itemCourseLeft.text = ctx.getString(R.string.tx_class_course)
//            mItemView.itemCourse.text = itemInfo.course

            when (cl) {
                DataConverterForAdapter.CLASS_LEVEL_ELE -> {
                    mItemView.itemClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemClass.text = ctx.getString(R.string.tx_ele)
                }

                DataConverterForAdapter.CLASS_LEVEL_MID -> {
                    mItemView.itemClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemClass.text = ctx.getString(R.string.tx_mid)
                }

                else -> {
                    mItemView.itemClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemClass.text = ctx.getString(R.string.tx_hig)
                }
            }

            var deviceSavedPath = itemInfo.downloadDevicePath
            var fileNameWithExt = itemInfo.filenameWithExt
            var deviceSavedPathWithFileName = deviceSavedPath + fileNameWithExt

            Log.d(TAG, "======= ItemViewHolder ======")
            // View 갱신 시점
            if (FileUtil.isFileExistByDepthInDeviceByFullPath(
                    context, deviceSavedPathWithFileName
                )
            ) {
                mItemView.itemDownload.isEnabled = false
                mItemView.itemDownload.text = ctx.getString(R.string.download_contents_complete)
                mItemView.itemUpdateLl.visibility = View.GONE
            } else {
                mItemView.itemDownload.isEnabled = true
                mItemView.itemDownload.text = ctx.getString(R.string.download_contents)
                if (itemInfo.isUpdate == "Y") {
                    mItemView.itemUpdateLl.visibility = View.VISIBLE
                    mItemView.itemUpdate.text = ctx.getString(R.string.download_update_exist)
                } else {
                    mItemView.itemUpdateLl.visibility = View.GONE
                }
            }

            // 다운 로드 시작
            mItemView.itemDownload.setOnClickListener { it ->
                Log.d("TAG", "$position")
                Log.d("TAG", "${itemInfo.contentsID}")
                val cInstance = (ctx as ActDownList)
                if (NetworkUtil.isConnectedUseNetwork(context)) {
                    val currentView: View = it
                    cInstance.launch(Dispatchers.Main) {
                        CustomContentsDNDialog(context, itemInfo, downloadComplete = {
                            if (it != null) {
                                if (it.isDownloadSuccess) {
                                    currentView.isEnabled = false
                                    ctx.runOnUiThread {
                                        // notifyItemChanged(position)
                                        notifyDataSetChanged()
                                    }
                                    try {
                                        cInstance.async(Dispatchers.IO) {
                                            VSTDownloader.cancelAll()
                                        }
                                    } catch (e: Exception) {

                                    }
                                } else {
                                    Log.d(TAG, "============${it.networkErrorType}==============")
                                    if (it.networkErrorType == 2) {
                                        cInstance.async(Dispatchers.IO) {
                                            VSTDownloader.cancelAll()
                                        }
                                    }
                                }
                            }
                        })
                    }
                } else {
                    cInstance.launch(Dispatchers.Main) {
                        val dl = CustomBaseDialog(context)
                        dl.setCustomClickListener {
                            if (it) {
                                ActUtil.moveToNetworkSettingScreen(context)
                            }
                        }
                        dl.show(context.getString(R.string.network_state_unstable))
                    }
                }
            }

            // 다운 로드 받은 파일 삭제
            mItemView.itemDelete.setOnClickListener {
                val cInstance = (ctx as ActDownList)
                if (FileUtil.isFileExistByDepthInDeviceByFullPath(
                        context, deviceSavedPathWithFileName
                    )
                ) {
                    CustomFileDeleteStateDialog(ctx, itemInfo, deleteComplete = {
                        if (it.isDeleteSuccess) {
                            // File Deleted After Action
                            cInstance.launch(Dispatchers.Main) {
                                mItemView.itemDownload.isEnabled = true
                                notifyItemChanged(position)
                            }
                        } else {
                            // File Delete Failed
                            cInstance.launch(Dispatchers.Main) {

                            }
                        }
                    })
                } else {
                    cInstance.launch(Dispatchers.Main) {
                        // 파일이 존재 하지 않음
                        // 지울 파일이 없다 라는 문구 한번 띄워 준다.
                        Toast.makeText(
                            context, ctx.getString(R.string.delete_file_none), Toast.LENGTH_LONG
                        ).show()
                    }
                }
            }

            // 다운 로드 받은 파일 보기
            mItemView.itemView.setOnClickListener {
                // 다운 로드 된 컨텐츠 보기
                var deviceSavedPath = itemInfo.downloadDevicePath
                var reqDownloadPath = itemInfo.downloadFSFullPath
                var fileNameWithExt = itemInfo.filenameWithExt
                var deviceSavedPathWithFileName = deviceSavedPath + fileNameWithExt
                var vt = itemInfo.viewType
                if (FileUtil.isFileExistByDepthInDeviceByFullPath(
                        context, deviceSavedPathWithFileName
                    )
                ) {
                    val cInstance = (ctx as ActDownList)
                    if (vt == "mp4" || vt == "mp3") {
                        Log.e("VIDEO CHECK", "$deviceSavedPathWithFileName $vt")
                        cInstance.mActHelper.moveOtherActivityForLaunch(
                            ctx, ActVideoView::class.java, ActParcelMultiTypeExtraData(
                                "", "", "", "", deviceSavedPathWithFileName, ""
                            )
                        )
                    } else {
                        Log.e("DOCUMENT CHECK", "$deviceSavedPathWithFileName $vt")
                        cInstance.mActHelper.loadFilesFromStorageUsingProviderForLaunchAsBrowser(
                            context,
                            deviceSavedPathWithFileName,
                            failMsg = {
                                cInstance.launch(Dispatchers.Main) {
                                    Toast.makeText(
                                        context,
                                        ctx.getString(R.string.file_load_failed),
                                        Toast.LENGTH_LONG
                                    ).show()
                                }
                            })

                    }
                } else {
                    Toast.makeText(
                        context, ctx.getString(R.string.downloaded_file_none), Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    }


    /**
     * Data Change
     */
    fun setData(items: List<Any?>, position: Int) {
        notifyItemChanged(position)
    }
}