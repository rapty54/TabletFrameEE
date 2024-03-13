package com.vsdisp.tabletframeee.ui.multilist.online.model

data class ItemDetail(
    val contentsID: String,
    val classLevel: String,
    val course: String,
    val title: String,
    val viewType: String,
    val filenameWithExt: String,
    val downloadFSFullPath: String,
    val downloadDevicePath: String,
    val categoryType: Int,
    val isContentUse: String,
    val isUpdate: String,
)
//{
//    companion object {
//        val compareByTitle = compareBy(ItemDetail::title)
//        val compareByClassLevel = compareBy(ItemDetail::classLevel)
//        val compareByContentID = compareBy(ItemDetail::contentsID)
//        val compareByCourse = compareBy(ItemDetail::course)
//    }
//}
