package com.vsdisp.tabletframeee.prefs

import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.vsdisp.tabletframeee.BuildConfig


/**
 * PrefUtil EncryptedSharedPreferences
 * Android 권고 보안 Preferences
 * 내부 에서 사용 하는 키값 기준 으로 저장된 데이터
 * 현재의 Util 을 이용 하여 사용 합니다.
 */
class PrefUtil {
    /**
     * 사용 용법에 대한 예시 이며
     * 이렇게 사용 해야 한다는 예시 입니다.
     * 객체 선언 자체가 싱글턴 객체 이기에 어디 서든
     * 하기와 같이 설정 및 가져 옵니다.
     */
    fun usageInstance(currents: AppCompatActivity) {
        // currents => AppCompatActivity or Context
        // KEY => Unique String (중복 허용 안됨.)
        // PrefUtil.getInstance(currents)?.put(KEY, "")
        // KEY => Unique String (중복 허용 안됨.)
        // 설정 할때 넣었던 데이터 유형을 잘보고 설정 하고 가져 옵니다.
        // PrefUtil.getInstance(ctx)?.getValue(KEY, false)
        // PrefUtil.getInstance(currents)?.put("TEST", "123456qweqwe^&")
    }

    fun put(key: String?, value: String) {
        try {
            editor!!.putString(key, value)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        editor!!.commit()
    }

    fun clearByKey(key: String?) {
        try {
            pref!!.edit().remove(key).apply()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    fun put(key: String?, value: Int) {
        try {
            editor!!.putInt(key, value)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        editor!!.commit()
    }

    fun put(key: String, value: Boolean) {
        try {
            editor!!.putBoolean(key, value)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        editor!!.commit()
    }

    fun put(key: String, value: Long) {
        try {
            editor!!.putLong(key, value)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        editor!!.commit()
    }

    fun put(key: String, value: Float) {
        try {
            editor!!.putFloat(key, value)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        editor!!.commit()
    }

    fun getValue(key: String, defaultValue: String): String? {
        return if (isEmpty(key)) {
            defaultValue
        } else {
            pref!!.getString(key, "")
        }
    }

    fun getValue(key: String, defaultValue: Boolean): Boolean {
//        return if (key.isEmpty()) {
//            Log.d("CHECK PRE (EMPTY Key)", "KEY / VALUE : ${key} ${defaultValue}")
//            defaultValue
//        } else {
//            Log.d("CHECK PRE BOOLEAN", "KEY / VALUE : ${key} ${defaultValue}")
//            pref!!.getBoolean(key, defaultValue)
//        }
        return pref!!.getBoolean(key, defaultValue)
    }

    fun getValue(key: String, defaultValue: Long = 0L): Long {
        return if (isEmpty(key)) {
            defaultValue
        } else {
            pref!!.getLong(key, defaultValue)
        }
    }

    fun getValue(key: String, defaultValue: Int = 0): Int {
        return if (isEmpty(key)) {
            defaultValue
        } else {
            pref!!.getInt(key, defaultValue)
        }
    }

    fun getValue(key: String, defaultValue: Float = 0f): Float {
        return if (isEmpty(key)) {
            defaultValue
        } else {
            pref!!.getFloat(key, defaultValue)
        }
    }

    private fun isEmpty(key: String?): Boolean {
        return !pref!!.contains(key) || pref!!.getString(
            key,
            ""
        ) == ""
    }


    /**
     * Clear All
     */
    fun clear() {
        editor!!.clear().commit()
    }

    /**
     * WebView Bridge
     */
    companion object {
        private const val SHARED_PREF_NAME = BuildConfig.APPLICATION_ID + ".pref"

        @SuppressLint("StaticFieldLeak")
        private var preferenceManager: PrefUtil? = null

        private var pref: SharedPreferences? = null

        @SuppressLint("StaticFieldLeak")
        private var context: Context? = null

        private var editor: SharedPreferences.Editor? = null

        fun getInstance(c: Context): PrefUtil? {
            val masterKey = MasterKey.Builder(c, MasterKey.DEFAULT_MASTER_KEY_ALIAS)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            //Log.d(LogTagName.TAG_ENC_SHARE, "Master Key : $masterKey")

            if (pref == null) {
                preferenceManager = PrefUtil()
                context = c
                pref = EncryptedSharedPreferences.create(
                    context!!,
                    SHARED_PREF_NAME,
                    masterKey,
                    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
                )
                editor = pref?.edit()
            }
            return preferenceManager
        }
    }
}