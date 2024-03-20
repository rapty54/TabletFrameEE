package com.vsdisp.tabletframeee.ui.multilist.online

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.apis.Constant.Companion.REQ_VSF_SERVER_MAIN_URL
import com.vsdisp.tabletframeee.apis.model.vstedu.MimeDownloadInfo
import com.vsdisp.tabletframeee.ui.multilist.online.model.HeaderItem
import com.vsdisp.tabletframeee.ui.multilist.online.model.ItemDetail
import com.vsdisp.tabletframeee.utils.DateUtil
import com.vsdisp.tabletframeee.utils.FileUtil

/**
 * ViewAdapter 에 들어갈 데이터 가공 단계
 */
class DataConverterForAdapter(
    currents: AppCompatActivity,
    data: MimeDownloadInfo,
    mToday: String,
) {
    private val acts = currents
    val it = data
    private val today = mToday
    var devicePathRoot = FileUtil.getRootDirPath(acts) + "/VST"
    private var lists = mutableListOf<ItemDetail>()

    companion object {
        const val CLASS_LEVEL_ELE = "ele"
        const val CLASS_LEVEL_MID = "mid"
        const val CLASS_LEVEL_HIG = "hig"
        const val CLASS_LEVEL_ALL = "all"
        const val TYPE_HEADER = 10
        const val TYPE_CONTENTS = 20
    }

    init {
        // request https (응답 으로 다운 로드 목록 가져옴)
        // 1. 가져온 데이터 기준 으로 데이터 가공
        // 2. 가공할 데이터 컨텐츠 유형 분류별 리스트 목록
        // 3. 가공이 모두 완료 되었 다면 해당 목록을 RecycleList 컴포에 건다.
        // 4. 근데 지금은 RecycleList 가 없기 때문에 만들 어야 한다.
        val rp = it?.contentRootPath
        val pa = it?.page
        val md = it?.modDate
        val rd = it?.regDate
        val cmpD = DateUtil.pastDays(today!!, md!!) // 업데 이트 한지 몇일 지났다.
        Log.d("ViewAdapter Top / Date Compare", "$pa  $md $rd $cmpD")

        it?.contents?.forEach { it ->
            var ci = it.contentsID
            var cl = it.classLevel
            var co = it.course // 출력
            var tl = it.title // 출력
            var vt = it.viewType // 출력
            var fn = it.filename
            var fp = it.downloadPath
            var cID = it.contentsID
            // (현재 하기 3 개의 값은 다운 로드 시 필요한 값이다.)
            var mFileName = fn + ".${vt}" // fileNameWithExt
            var mDownloadFullPath =
                REQ_VSF_SERVER_MAIN_URL + rp + fp + fn + ".${vt}" // 파일 서버 다운 로드 풀경로
            // $cID/
            var downloadPathInDevice = "$devicePathRoot$fp" // 단말내 저장 풀경로
            var use = it.isContentUse
            var upt = it.isUpdate
            Log.d(
                "ViewAdapter",
                "$ci\n$cl\n$co\n$tl\n$vt\n$mFileName\n$mDownloadFullPath\n$downloadPathInDevice\n$use\n$upt"
            )
            lists.add(
                ItemDetail(
                    ci,
                    cl,
                    co,
                    tl,
                    vt,
                    mFileName,
                    mDownloadFullPath,
                    downloadPathInDevice,
                    0,
                    use,
                    upt
                )
            )
        }
    }

    /**
     *  분류 대상 1 => 초등 (ele) / 중등 (mid) / 고등 (hig)
     *  분류 대상 2 => pdf / mp4 (MIME Type)
     */
    fun groupByClassAndViewType(filterClassLevel: String): MutableList<Any?> {
        // 기준 정해서 정렬은 이쪽 에서 한다.
        // 조건 두개 이상 복합적 으로 걸때는 sortWith
        // 내림은 - 붙인다 (Int 일 경우). 오름은 앞에 없음
//        lists.sortWith(
//            compareBy({ it.classLevel }, { -it.contentsID.toInt() })
//        )
        // 단일로 걸때는 sortBy
        lists.sortBy {
            it.contentsID
        }
        // 단일 내림 정렬 (역순)
//        lists.sortByDescending {
//            it.contentsID
//        }

        if (filterClassLevel != CLASS_LEVEL_ALL) {
            // 전달 받은 list 에서 각 요소 안에 사항을 조건 Filter (학급 Level)
            val mapGroupBy = lists.filter {
                it.classLevel == filterClassLevel && it.isContentUse == "Y"
            }.groupBy {
                it.viewType // (MIME Type)
            }

            var listItem = mutableListOf<Any?>()
            // 결과 확인
            mapGroupBy.forEach { entry ->
                Log.d("ViewAdapter Group By groupByViewType", "${entry.key} ${entry.value}")
                // result.get(entry.key)!!.map { it }
                when (entry.key) {
                    "pdf" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_HEADER, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    "mp4" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    "mp3" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    else -> {

                    }
                }
            }
            Log.d("ViewAdapter Group By New List", "${listItem.size}")
            listItem.forEach {
                if (it is ItemDetail) {
                    Log.d("ViewAdapter Group By New List", "${it.toString()}")

                }
            }
            return listItem
        } else {
            val mapGroupBy = lists.filter { it.isContentUse == "Y" }.groupBy {
                it.viewType // (MIME Type)
            }

            var listItem = mutableListOf<Any?>()
            // 결과 확인
            mapGroupBy.forEach { entry ->
                Log.d("ViewAdapter Group By groupByViewType", "${entry.key} ${entry.value}")
                // result.get(entry.key)!!.map { it }
                when (entry.key) {
                    "pdf" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_HEADER, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    "mp4" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    "mp3" -> {
                        // Object 하나에
                        listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                        // Array 풀어 헤친 Object 여러개
                        entry.value.forEach {
                            listItem.add(
                                ItemDetail(
                                    it.contentsID,
                                    it.classLevel,
                                    it.course,
                                    it.title,
                                    it.viewType,
                                    it.filenameWithExt,
                                    it.downloadFSFullPath,
                                    it.downloadDevicePath,
                                    it.categoryType,
                                    it.isContentUse,
                                    it.isUpdate
                                )
                            )
                        }
                    }

                    else -> {

                    }
                }
            }

            listItem.forEach {
                Log.d("ViewAdapter Group By New List", "${it.toString()}")
            }
            Log.d("ViewAdapter Group By New List", "${listItem.size}")
            return listItem
        }
    }

    /**
     * class Level 한 개 이상 조건 으로 병합 할 경우
     */
    fun groupByDoubleClassAndViewType(
        filterClassLevel_1: String,
        filterClassLevel_2: String,
    ): MutableList<Any?> {
        // 기준 정해서 정렬은 이쪽 에서 한다.
        // 조건 두개 이상 복합적 으로 걸때는 sortWith
        // 내림은 - 붙인다. 오름은 앞에 없음
//        lists.sortWith(
//            compareBy({ it.course }, { it.filenameWithExt })
//        )
        // 단일로 걸때는 sortBy
        lists.sortBy {
            it.classLevel
        }
        // 전달 받은 list 에서 각 요소 안에 사항을 조건 Filter (학급 Level)
        val mapGroupBy = lists.filter {
            (it.classLevel == filterClassLevel_1 || it.classLevel == filterClassLevel_2) && it.isContentUse == "Y"
        }.groupBy {
            it.viewType // (MIME Type)
        }

        val listItem = mutableListOf<Any?>()
        // 결과 확인
        mapGroupBy.forEach { entry ->
            Log.d("ViewAdapter Group By groupByViewType", "${entry.key} ${entry.value}")
            // result.get(entry.key)!!.map { it }
            when (entry.key) {
                "pdf" -> {
                    // Object 하나에
                    listItem.add(HeaderItem(TYPE_HEADER, entry.key))
                    // Array 풀어 헤친 Object 여러개
                    entry.value.forEach {
                        listItem.add(
                            ItemDetail(
                                it.contentsID,
                                it.classLevel,
                                it.course,
                                it.title,
                                it.viewType,
                                it.filenameWithExt,
                                it.downloadFSFullPath,
                                it.downloadDevicePath,
                                it.categoryType,
                                it.isContentUse,
                                it.isUpdate
                            )
                        )
                    }
                }

                "mp4" -> {
                    // Object 하나에
                    listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                    // Array 풀어 헤친 Object 여러개
                    entry.value.forEach {
                        listItem.add(
                            ItemDetail(
                                it.contentsID,
                                it.classLevel,
                                it.course,
                                it.title,
                                it.viewType,
                                it.filenameWithExt,
                                it.downloadFSFullPath,
                                it.downloadDevicePath,
                                it.categoryType,
                                it.isContentUse,
                                it.isUpdate
                            )
                        )
                    }
                }

                "mp3" -> {
                    // Object 하나에
                    listItem.add(HeaderItem(TYPE_CONTENTS, entry.key))
                    // Array 풀어 헤친 Object 여러개
                    entry.value.forEach {
                        listItem.add(
                            ItemDetail(
                                it.contentsID,
                                it.classLevel,
                                it.course,
                                it.title,
                                it.viewType,
                                it.filenameWithExt,
                                it.downloadFSFullPath,
                                it.downloadDevicePath,
                                it.categoryType,
                                it.isContentUse,
                                it.isUpdate
                            )
                        )
                    }
                }

                else -> {

                }
            }
        }

        listItem.forEach {
            Log.d("ViewAdapter Group By New List", "${it.toString()}")
        }
        Log.d("ViewAdapter Group By New List", "${listItem.size}")
        return listItem

    }

    /**
     * List Clear
     */
    fun mutableListClear(lists: MutableList<Any?>) {
        try {
            if (!lists.isNullOrEmpty()) {
                lists.clear()
            }
        } catch (e: Exception) {

        }
    }

    /**
     * List Clear
     */
    fun listClear() {
        if (!lists.isNullOrEmpty()) {
            lists.clear()
        }
    }

//    /**
//     * 전달 받은 List 정보 Get Test
//     */
//    private fun getListInfo() {
////      여기서 viewType 별로 Data Mapping 한 대형을 가공 해서 만듭 니다.
//        val mSize = lists?.size
////        Log.d("ViewAdapter Top / Date Compare", "$mSize")
//        var gb = lists.groupBy {
//            it.viewType
//        }
//        // 지정한 view type 으로 배열 그룹핑
//        Log.d("ViewAdapter Group By pdf", "${gb.get("pdf")}")
////        gb.get("pdf")!!.forEach {
////
////        }
////        var ab = lists.associateBy({ it.viewType }, { it })
//
////        Log.d("ViewAdapter Associated By", "${ab.get("pdf").}")
//    }

//    /**
//     * Group By ViewType
//     */
//    private fun getMapListAsGroupByViewType(): Map<String, List<ItemDetail>> {
//        var gb = lists.groupBy {
//            it.viewType
//        }
//        return gb
//    }

    /**
     * 가공 하지 않은 순수 List
     */
    fun getPureList(): List<ItemDetail> {
        return if (!lists.isNullOrEmpty()) {
            lists
        } else emptyList()
    }
}