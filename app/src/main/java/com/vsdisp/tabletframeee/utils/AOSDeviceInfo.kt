package com.vsdisp.tabletframeee.utils

import android.util.Log

/**
 * AOS Device Info
 */
class AOSDeviceInfo {
    companion object {
        private const val TAG = "AOSDeviceInfo"

        private val VS_DEVICE: String = android.os.Build.DEVICE
        private val VS_MODEL = android.os.Build.MODEL
        private val VS_PRODUCT = android.os.Build.PRODUCT

        private val modelList = arrayOf("SM-X700")

        /**
         * Support Device
         * 사용 제한 건다. 나중에 필요 하다 싶을때
         */
//        fun isSupportDevice(): Boolean {
//            modelList.forEach Break@{
//                if (VS_MODEL == it) return@Break
//            }
//        }

        fun isSupportDevice(): Boolean {
            return VS_MODEL.equals(modelList[0])
        }

        fun getDeviceInfoAll() {
            Log.d(TAG, "${vsDevice()}\n${vsModel()}\n${vsProduct()}")
        }

        private fun vsDevice(): String {
            return VS_DEVICE
        }

        /**
         * 단말 모델 명칭
         */
        private fun vsModel(): String {
            return VS_MODEL
        }

        private fun vsProduct(): String {
            return VS_PRODUCT
        }
    }
}