package com.vsdisp.tabletframeee.utils

import android.content.Context
import android.os.Environment
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.vsdisp.tabletframeee.common.model.FileObject
import java.io.File
import java.util.Locale

/**
 * FILE CREATE / DELETE / MODIFY / OVERWRITE
 */
class FileUtil {

    companion object {
        /**
         * Full Path 기준
         */
        fun isFileExistByDepthInDeviceByFullPath(
            ctx: AppCompatActivity,
            fullPath: String,
        ): Boolean {
            return if (!fullPath.isNullOrEmpty()) {
                val file = File(fullPath)
                file.exists()
            } else {
                false
            }
        }

        /**
         * Delete file
         */
        fun deleteFile(path: String) {
            try {
                val file = File(path)
                if (file.exists()) {
                    file.delete()
                }
            } catch (e: Exception) {
                //Log.d(LogTagName.TAG_FILE_CHECKER, "${e.message}")
            }
        }

        /**
         * Delete With Path
         */
        fun deleteFileWithPath(parent: String, child: String) {
            try {
                val file = File(parent, child)
                if (file.exists()) {
                    file.delete()
                }
            } catch (e: Exception) {
                //Log.d(LogTagName.TAG_FILE_CHECKER, "${e.message}")
            }
        }

        /**
         * APP Internal Root Dir Path
         * Mounted 했을때 와 안했을 떄의 경로 처리
         * 지금 현재 앞단 경로만 변경될 것 같은데 고민은 해봐야 할 듯
         */
        fun getRootDirPath(context: Context): String? {
            return if (Environment.MEDIA_MOUNTED == Environment.getExternalStorageState()) {
                //Log.d("MEDIA_MOUNTED", "getRootDirPath")
                val file = ContextCompat.getExternalFilesDirs(
                    context.applicationContext, null
                )[0]
                file.absolutePath
            } else {
                //Log.d("MEDIA_MOUNTED_NOT", "getRootDirPath")
                context.applicationContext.filesDir.absolutePath
            }
        }

        fun deleteAllDirectory(directory: File) {
            directory.listFiles()
                .filterNot { it.isDirectory }
                .forEach { it.delete() }
        }

        fun deleteDirectory(directory: File) {

            if (directory.exists() && directory.isDirectory) {
                directory.listFiles()?.forEach { file ->
                    if (file.isDirectory) {
                        deleteDirectory(file)
                    } else {
                        file.delete()
                    }
                    directory.delete()
                }
            }

        }

        fun getProgressDisplayLine(currentBytes: Long, totalBytes: Long): String? {
            return getBytesToMBString(currentBytes) + "/" + getBytesToMBString(totalBytes)
        }

        private fun getBytesToMBString(bytes: Long): String {
            return String.format(Locale.ENGLISH, "%.2fMb", bytes / (1024.00 * 1024.00))
        }

        fun isExistFromAsset(
            ctx: AppCompatActivity,
            pathFromAsset: String,
            fileName: String,
        ): Boolean {
            return try {
                var mph = "$pathFromAsset/"
                val arrays = ctx!!.assets.list(File(pathFromAsset).parent)!!
                val isExist = arrays.firstOrNull {
                    it == fileName
                }
                Log.d("FileUtil", "$isExist")
                !isExist.isNullOrEmpty()
            } catch (e: Exception) {
                false
            }
        }

        /**
         * File Object Return
         */
        fun getFileNameFromPath(paths: String): FileObject {
            return try {
                val aFile = File(paths)
                val fileNames = aFile.name
                val paths = aFile.path
                val parentPaths = aFile.parent
                Log.d("File Util", "Seperate >>   $fileNames $paths $parentPaths")
                FileObject(paths, parentPaths, fileNames)
            } catch (e: Exception) {
                FileObject("", "", "")
            }
        }
    }
}