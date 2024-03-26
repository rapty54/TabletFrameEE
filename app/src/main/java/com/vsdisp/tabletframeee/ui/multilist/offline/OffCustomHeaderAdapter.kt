package com.vsdisp.tabletframeee.ui.multilist.offline

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.vsdisp.tabletframeee.ActDownList
import com.vsdisp.tabletframeee.ActVideoView
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.databinding.ViewHolderOfflineHeaderBinding
import com.vsdisp.tabletframeee.databinding.ViewHolderOfflineItemsBinding
import com.vsdisp.tabletframeee.ui.dialogs.CustomFileDeleteStateDialog
import com.vsdisp.tabletframeee.ui.dialogs.CustomOffFileDeleteDialog
import com.vsdisp.tabletframeee.ui.multilist.offline.model.OffHeaderItem
import com.vsdisp.tabletframeee.ui.multilist.offline.model.OffItemDetail
import com.vsdisp.tabletframeee.utils.FileUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


/**
 * Category Header Adapter
 */
class OffCustomHeaderAdapter(private val items: MutableList<Any?>, val ctx: AppCompatActivity) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        const val TAG = "OffCustomHeaderAdapter"
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return if (viewType == OffDataConverterForAdapter.TYPE_HEADER) {
            // pdfview layout
            return OffHeaderViewHolder(
                ViewHolderOfflineHeaderBinding.inflate(
                    LayoutInflater.from(parent.context), parent, false
                )
            )
        } else {
            // mp4view layout
            return OffItemViewHolder(
                ViewHolderOfflineItemsBinding.inflate(
                    LayoutInflater.from(parent.context), parent, false
                )
            )
        }
    }

    override fun getItemViewType(position: Int): Int {
        return if (items.get(position) is OffHeaderItem) {
            OffDataConverterForAdapter.TYPE_HEADER
        } else {
            OffDataConverterForAdapter.TYPE_CONTENTS
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        if (holder is OffHeaderViewHolder) {
            (holder as OffHeaderViewHolder).bindPostView(
                items.get(holder.absoluteAdapterPosition) as OffHeaderItem,
                ctx,
                holder.absoluteAdapterPosition
            )
        } else {
            (holder as OffItemViewHolder).bindPostView(
                holder,
                items.get(holder.absoluteAdapterPosition) as OffItemDetail,
                ctx,
                holder.absoluteAdapterPosition
            )
        }
    }

    inner class OffHeaderViewHolder(private val binding: ViewHolderOfflineHeaderBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val mItemView = binding

        fun bindPostView(headerInfo: OffHeaderItem, context: Context, position: Int): Unit {
            mItemView.headerCtOfflineType.text = "다운로드 콘텐츠(" + headerInfo.typeCate.uppercase() + ")"
        }
    }

    inner class OffItemViewHolder(private val binding: ViewHolderOfflineItemsBinding) :
        RecyclerView.ViewHolder(binding.root) {

        private val mItemView = binding

        fun bindPostView(
            holder: OffItemViewHolder,
            itemInfo: OffItemDetail,
            context: AppCompatActivity,
            position: Int,
        ): Unit {
            // ItemView 전체에 position 값 Setting
            holder.binding.itemOfflineView.tag = position
            // Item Row 하나에 대한 모든 Layout Root 값
            val rootLayout = holder.binding.root

            val cl = itemInfo.classLevel

            mItemView.itemOfflineTitle.text = itemInfo.title
//            mItemView.itemOfflineCourseLeft.text = ctx.getString(R.string.tx_class_course)
//            mItemView.itemOfflineCourse.text = itemInfo.course

            when (cl) {
                OffDataConverterForAdapter.CLASS_LEVEL_ELE -> {
                    mItemView.itemOfflineClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemOfflineClass.text = ctx.getString(R.string.tx_ele)
                }

                OffDataConverterForAdapter.CLASS_LEVEL_MID -> {
                    mItemView.itemOfflineClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemOfflineClass.text = ctx.getString(R.string.tx_mid)
                }

                else -> {
                    mItemView.itemOfflineClassLeft.text = ctx.getString(R.string.tx_class_step)
                    mItemView.itemOfflineClass.text = ctx.getString(R.string.tx_hig)
                }
            }

            var deviceSavedPath = itemInfo.downloadDevicePath
            var reqDownloadPath = itemInfo.downloadFSFullPath
            var fileNameWithExt = itemInfo.filenameWithExt
            var deviceSavedPathWithFileName = deviceSavedPath + fileNameWithExt

            // 다운 로드 받은 파일 보기
            mItemView.itemOfflineView.setOnClickListener {
                // 다운 로드 된 컨텐츠 보기
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

            mItemView.itemOfflineDelete.setOnClickListener {
                val cInstance = (ctx as ActDownList)
                if (FileUtil.isFileExistByDepthInDeviceByFullPath(
                        context, deviceSavedPathWithFileName
                    )
                ) {
                    CustomOffFileDeleteDialog(ctx, itemInfo, deleteComplete = {
                        if (it.isDeleteSuccess) {
                            // File Deleted After Action
                            cInstance.launch(Dispatchers.Main) {
                                items.removeAt(position)
                                notifyDataSetChanged()
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
        }
    }


    /**
     * Data Change
     */
    fun setData(items: List<Any?>, position: Int) {
        notifyItemChanged(position)
    }
}