package com.vsdisp.tabletframeee.protection

import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import com.vsdisp.tabletframeee.common.AppCurrentInfo
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

/**
 * 위변조 Protection Hash / FingerPrint
 * SHA256 / MD5 / SHA1
 */
class ForgingDetection {

    companion object {
        // SHA256
        const val SHA_256 = "SHA-256"

        // MD5
        const val MD5 = "MD5"

        // SHA
        const val SHA = "SHA"

        /**
         * SHA256
         */
        fun isNotForgingTypeCompare(acts: AppCompatActivity, type: String): Boolean {
            if (type === SHA_256) {
                return isNotForgingCompareWithSHA256(acts)
            }

            if (type === MD5) {
                return isNotForgingCompareWithMD(acts)
            }

            if (type === SHA) {
                return isNotForgingCompareWithSHA1(acts)
            }

            return false
        }

        /**
         * SHA256
         */
        private fun isNotForgingCompareWithSHA256(acts: AppCompatActivity): Boolean {
            return if (AppCurrentInfo.isBuildDev()) {
                // Dev
                AppCurrentInfo.getSHA256KP() == getHashForTypes(
                    acts,
                    acts.packageName,
                    SHA_256
                )
            } else {
                // Prod
                AppCurrentInfo.getSHA256KP() == getHashForTypes(
                    acts,
                    acts.packageName,
                    SHA_256
                )
            }
        }

        /**
         * SHA1 / MD5 / SHA256
         * At Now Use Only SHA256
         */
        @SuppressLint("PackageManagerGetSignatures")
        private fun getHashForTypes(
            acts: AppCompatActivity,
            packageName: String,
            type: String
        ): String {

            try {
                // Version Target As Deprecation
                val packageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    acts.packageManager.getPackageInfo(
                        packageName,
                        PackageManager.PackageInfoFlags.of(PackageManager.GET_SIGNING_CERTIFICATES.toLong())
                    )
                } else {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                        acts.packageManager.getPackageInfo(
                            packageName,
                            PackageManager.GET_SIGNING_CERTIFICATES
                        )
                    } else {
                        acts.packageManager.getPackageInfo(
                            packageName,
                            PackageManager.GET_SIGNATURES
                        )
                    }
                }

                //Log.d(TAG_FORGING_FLAG, "packageInfo :: $packageInfo")

                val signature = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    packageInfo.signingInfo.apkContentsSigners
                } else {
                    @Suppress("UNREACHABLE_CODE")
                    packageInfo.signatures
                }

                var s = ""

                for (signEle in signature) {
                    val md = MessageDigest.getInstance(type)
                    md.update(signEle.toByteArray())
                    val digest = md.digest()
                    val toRet = StringBuilder()
                    for (i in digest.indices) {
                        if (i != 0) toRet.append(":")
                        val b = digest[i].toInt() and 0xff
                        val hex = Integer.toHexString(b)
                        if (hex.length == 1) toRet.append("0")
                        toRet.append(hex)
                    }
                    s = toRet.toString()
                    //Log.e(TAG_FORGING_FLAG, " FORGING Key  $type => $s")
                }
                return s
            } catch (e1: PackageManager.NameNotFoundException) {
                //Log.e("name not found", e1.toString())
            } catch (e2: NoSuchAlgorithmException) {
                //Log.e("no such an algorithm", e2.toString())
            } catch (e: Exception) {
                //Log.e("exception", e.toString())
            }
            return ""
        }

//        /**
//         * Hash Origin Key
//         * can be occur as current Key
//         */
//        private fun getHashKeyOrigin(acts: AppCompatActivity, packageName: String): String {
//
//            val packageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
//                acts.packageManager.getPackageInfo(
//                    packageName,
//                    PackageManager.PackageInfoFlags.of(PackageManager.GET_SIGNING_CERTIFICATES.toLong())
//                )
//            } else {
//                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
//                    acts.packageManager.getPackageInfo(
//                        packageName,
//                        PackageManager.GET_SIGNING_CERTIFICATES
//                    )
//                } else {
//                    acts.packageManager.getPackageInfo(
//                        packageName,
//                        PackageManager.GET_SIGNATURES
//                    )
//                }
//            }
//
//            val signature = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
//                packageInfo.signingInfo.apkContentsSigners[0]
//            } else {
//                @Suppress("UNREACHABLE_CODE")
//                packageInfo.signatures[0]
//            }
//            val messageDigest = MessageDigest.getInstance("SHA")
//            messageDigest.update(signature.toByteArray())
//            return Base64.encodeToString(messageDigest.digest(), Base64.DEFAULT).trimEnd()
//        }
//    /**
//     * getHashKey Origin Key on BASE64
//     */
//    fun getOriginKeyFromHash(acts: AppCompatActivity): Boolean {
//        val resK = getHashKeyOrigin(acts, acts.packageName)
//        //Log.d(TAG_FORGING_FLAG, "HashKey Origin : $resK")
//        TextAnalyzer.getTextCount(resK)
//        return TextAnalyzer.isCompareEqual(resK, AppCurrentInfo.getORIGIN_KEY())
//    }
//
        /**
         * MD5
         */
        private fun isNotForgingCompareWithMD(acts: AppCompatActivity): Boolean {
            return if (AppCurrentInfo.isBuildDev()) {
                // Dev
                AppCurrentInfo.getMD5() == getHashForTypes(
                    acts,
                    acts.packageName,
                    MD5
                )
            } else {
                // Prod
                AppCurrentInfo.getMD5() == getHashForTypes(
                    acts,
                    acts.packageName,
                    MD5
                )
            }
        }

        /**
         * SHA1
         */
        private fun isNotForgingCompareWithSHA1(acts: AppCompatActivity): Boolean {
            return if (AppCurrentInfo.isBuildDev()) {
                // Dev
                AppCurrentInfo.getSHA1() == getHashForTypes(
                    acts,
                    acts.packageName,
                    SHA
                )
            } else {
                // Prod
                AppCurrentInfo.getSHA1() == getHashForTypes(
                    acts,
                    acts.packageName,
                    SHA
                )
            }
        }
    }
}