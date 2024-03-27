package com.vsdisp.tabletframeee.utils

import android.os.Build
import android.os.Environment
import android.os.StatFs
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import java.text.DecimalFormat
import kotlin.math.round

/**
 * AOS Device Storage Util
 *
 * For External On Current App
 */
object AOSDeviceStorageUtil {
    /**
     * MaxLimit 는
     * 단말에 총용량 기준이 아니라
     * 단말 총용량 기준 에서 우리쪽 기준 으로 정함
     *
     * 단말 가용 총 용량이 512 GB 이라 가정 하면
     * 내부 단말 가용 Limit 500
     * 단말 가용 총 용량이 256 GB 이라 가정 하면
     * 내부 단말 가용 Limit 200
     * 단말 가용 총 용량이 128 GB 이라 가정 하면
     * 내부 단말 가용 Limit 100
     */
    fun isStorageSpaceLimitForVSEdu(ctx: AppCompatActivity): Boolean {
        if (externalMemoryAvailable()) {
            val path = FileUtil.getRootDirPath(ctx)
            val deviceTotal = StrUtil.strDotFront(fileFormatWithoutUnits(getTotalStorageInfo(path)))

            val usedSpace = StrUtil.strDotFront(fileFormatWithoutUnits(getUsedStorageInfo(path)))

            var limitMax = if (deviceTotal.toInt() > 500) {
                "510"
            } else if (deviceTotal.toInt() > 200) {
                "230"
            } else if (deviceTotal.toInt() > 100) {
                "120"
            } else {
                "120"
            }

            Log.d("Storage Space Compare", "======= $limitMax $usedSpace")

            return limitMax.toInt() < usedSpace.toInt()
        } else {
            return false
        }
    }

    /**
     * MaxLimit 는
     * 단말에 총용량 기준
     * 현재 저장소 사용 가능 한지 체크 한다.
     * 용량과 Mount State 기준 모두를 Check 한다.
     */
    private fun isStorageSpaceUseAvailable(ctx: AppCompatActivity): Boolean {
        if (externalMemoryAvailable()) {
            val path = FileUtil.getRootDirPath(ctx)
            val totalSpace = getTotalStorageInfo(path)
            val usedSpace = getUsedStorageInfo(path)
            Log.d(
                "Storage Space", "${StrUtil.strDotAppend(fileFormatWithoutUnits(totalSpace))} ${
                    StrUtil.strDotAppend(
                        fileFormatWithoutUnits(usedSpace)
                    )
                }"
            )
            if (StrUtil.strDotAppend(fileFormatWithoutUnits(usedSpace))
                    .toInt() < StrUtil.strDotAppend(
                    fileFormatWithoutUnits(totalSpace)
                ).toInt()
            ) {
                return true
                Log.d("Storage Space", "Able to use Storage")
            } else {
                Log.d("Storage Space", "No Able to use Storage")
                return false
            }
        } else {
            Log.d("Storage Space", "Memory Not Available")
            return false
        }
    }

    /**
     * 단말 내부 저장 정보
     */
    fun storageSpaceInDevice(ctx: AppCompatActivity, option: Int): String {
        val path = FileUtil.getRootDirPath(ctx)
        val totalSpace = getTotalStorageInfo(path)
        val usedSpace = getUsedStorageInfo(path)
        val availableSpace = round((totalSpace - usedSpace).toDouble())
        if (option == 1) {
            return fileFormat(totalSpace)
        }

        if (option == 2) {
            return fileFormat(usedSpace)
        }

        if (option == 3) {
            return fileFormat(availableSpace.toLong())
        }
        return ""
    }

    /**
     * Checks weather external memory is available or not
     */
    private fun externalMemoryAvailable(): Boolean {
        return Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED
    }

    /**
     * File Format 에 뒤에 단위 붙여서 String 으로 리턴
     */
    private fun fileFormat(availableSpace: Long): String {
        if (availableSpace <= 0) return "0"
        val units = arrayOf("B", "kB", "MB", "GB", "TB")
        val digitGroups = (Math.log10(availableSpace.toDouble()) / Math.log10(1024.0)).toInt()
        return DecimalFormat("#,##0.#").format(
            availableSpace / Math.pow(
                1024.0, digitGroups.toDouble()
            )
        ) + " " + units[digitGroups]
    }

    /**
     * File Format 에 뒤에 단위 표기 없이 String 으로 리턴
     */
    private fun fileFormatWithoutUnits(availableSpace: Long): String {
        if (availableSpace <= 0) return "0"
        val digitGroups = (Math.log10(availableSpace.toDouble()) / Math.log10(1024.0)).toInt()
        return DecimalFormat("#,##0.#").format(
            availableSpace / Math.pow(
                1024.0, digitGroups.toDouble()
            )
        )
    }

    private fun getUsedStorageInfo(path: String?): Long {
        val statFs = StatFs(path)
        val u: Long = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            statFs.totalBytes - statFs.availableBytes
        } else {
            (statFs.blockCount * statFs.blockSize - statFs.availableBlocks * statFs.blockSize).toLong()
        }
        return u // remember to convert in GB,MB or KB.
    }

    private fun getTotalStorageInfo(path: String?): Long {
        val statFs = StatFs(path)
        val t: Long = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            statFs.totalBytes
        } else {
            (statFs.blockCount * statFs.blockSize).toLong()
        }
        return t // remember to convert in GB,MB or KB.
    }
}
