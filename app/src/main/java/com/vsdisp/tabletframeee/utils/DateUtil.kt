package com.vsdisp.tabletframeee.utils

import android.os.Build
import android.util.Log
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Date


/**
 * Date Util
 */
class DateUtil {

    companion object {

        private const val TAG = "DateUtil"

        /**
         * 오늘 날짜 / 수정 날짜
         */
        fun pastDays(currentDate: String, modDate: String): Long {
            try {

                var dateForm = "yyyyMMdd"

                if (!currentDate.isNullOrEmpty() && !modDate.isNullOrEmpty()) {
                    Log.d(TAG, "Date : $currentDate $modDate")
                    val sdf = SimpleDateFormat(dateForm)
                    var startDates = currentDate.split("-")
                    var startMerge = startDates[0] + startDates[1] + startDates[2]
                    var today = sdf.parse(startMerge).time

                    var modDates = modDate.split("-")
                    var modMerge = modDates[0] + modDates[1] + modDates[2]
                    var past = sdf.parse(modMerge).time

                    val calDate = ((today - past) / (24 * 60 * 60 * 1000))
                    Log.d(TAG, "Date Cal : $calDate")
                    return calDate
                }
            } catch (e: Exception) {
                return 0L
            }
            return 0L
        }

        /**
         * 단말 내에서 가져옴
         */
        fun currentDateOnDevice(compareDate: String) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val current = LocalDateTime.now()
                val formatter = DateTimeFormatter.ofPattern("YYYY-MM-DD")
                var answer: String = current.format(formatter)
                Log.d(TAG, answer)
                // 전달 받은 Date
            } else {
                var date = Date()
                val formatter = SimpleDateFormat("YYYY-MM-DD")
                val answer: String = formatter.format(date)
                Log.d(TAG, answer)
            }
        }
    }
}