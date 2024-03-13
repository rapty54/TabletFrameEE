package com.vsdisp.tabletframeee.apis.model.vstedu

import androidx.annotation.Keep

/**
 * Main URL : https://smart-dn.visang.com
 * Full URL : https://smart-dn.visang.com/appData/vstedu/info/mime/contents_mime_vtype_a.json
 */
@Keep
data class MimeDownloadInfo(
    val contentRootPath: String,
    val contents: List<Content>,
    val modDate: String,
    val page: String,
    val pageTitle: String,
    val regDate: String,
    val isContentsOpen: String
) {
    data class Content(
        val classLevel: String,
        val contentsID: String,
        val course: String,
        val downloadPath: String,
        val filename: String,
        val isContentUse: String,
        val isUpdate: String,
        val title: String,
        val viewType: String,
    )
}