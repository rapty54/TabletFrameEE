package com.vsdisp.tabletframeee.permission

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.vsdisp.tabletframeee.R
import com.vsdisp.tabletframeee.utils.VersionCondition

/**
 * Permission 요청 로직 일체
 */
class PermissionFrame {

    companion object {
        /**
         * when called if nothing to deal with history for granted process
         * request Permission and check Permission
         */
        fun checkPmsAllAtAOneTime(
            ctx: AppCompatActivity,
            callPermissionState: (Boolean) -> Unit,
        ): Boolean {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

                if (VersionCondition.isOverTarget13()) {
                    val hasFilePermission = isPermissionChangedGrantSingleTypeCheckForFile(ctx)
                    callPermissionState(hasFilePermission)
                    return if (hasFilePermission) {
                        true
                    } else {
                        reqPmsALLAtATime(ctx)
                        false
                    }
                } else {
                    val hasFilePermission = isPermissionChangedGrantSingleTypeCheckForFile(ctx)
                    callPermissionState(hasFilePermission)
                    return if (hasFilePermission) {
                        true
                    } else {
                        reqPmsALLAtATime(ctx)
                        false
                    }
                }
            } else {
                callPermissionState(false)
                return false
            }
        }

        /**
         * request All SDK Target Permission At Once
         * N 개 이상에 Permission 한번에 요청
         */
        private fun reqPermissionAllAsSdkTarget(): Array<String> {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                arrayOf(
                    Manifest.permission.READ_MEDIA_VIDEO,
                    Manifest.permission.READ_MEDIA_IMAGES,
                    Manifest.permission.READ_MEDIA_AUDIO
                )
            } else {
                arrayOf(
                    Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.READ_EXTERNAL_STORAGE
                )
            }
        }

        /**
         * SDK 버전별 File 권한 유무 체크
         * SDK >= 33 / SDK < 33
         */
        private fun isPermissionChangedGrantSingleTypeCheckForFile(ctx: AppCompatActivity): Boolean {
            return if (VersionCondition.isOverTarget13()) {
                val hasMediaPermission =
                    ContextCompat.checkSelfPermission(ctx, Manifest.permission.READ_MEDIA_IMAGES)
                val hasAudioPermission =
                    ContextCompat.checkSelfPermission(ctx, Manifest.permission.READ_MEDIA_AUDIO)
                val hasVideoPermission =
                    ContextCompat.checkSelfPermission(ctx, Manifest.permission.READ_MEDIA_VIDEO)
                (hasMediaPermission == PackageManager.PERMISSION_GRANTED) && (hasAudioPermission == PackageManager.PERMISSION_GRANTED) && (hasVideoPermission == PackageManager.PERMISSION_GRANTED)
            } else {
                val hasReadExternalPermission = ContextCompat.checkSelfPermission(
                    ctx, Manifest.permission.READ_EXTERNAL_STORAGE
                )
                val hasWriteExternalPermission = ContextCompat.checkSelfPermission(
                    ctx, Manifest.permission.WRITE_EXTERNAL_STORAGE
                )
                (hasReadExternalPermission == PackageManager.PERMISSION_GRANTED) && (hasWriteExternalPermission == PackageManager.PERMISSION_GRANTED)
            }
        }

        /**
         * 요청 Permission (현재 앱 내에서 처리 하는 Permission 일체)
         * 사용자가 허락하지 않은 Permission 이 하나라도 있다면
         */
        private fun reqPmsALLAtATime(ctx: AppCompatActivity) {
//            val mCtx = ctx as Activity
//            mCtx.runOnUiThread {
                ActivityCompat.requestPermissions(
                    ctx as Activity,
                    reqPermissionAllAsSdkTarget(),
                    ConstantsPermission.REQUEST_CODE_PERMISSION_ALL
                )
//            }
        }

        /**
         * 권한 요청 된 이후로 MainActivity 에서 onRequestPermissionsResult
         * 쪽으로 최종 전달값 전달 받아 누락된  Permission 재요청
         */
        fun grantProcessAfterRequestPermission(
            requestCode: Int,
            permissions: Array<out String>,
            grantResults: IntArray,
            acts: AppCompatActivity,
            callback: ((states: Boolean) -> Unit),
        ) {
            if (grantResults.isNotEmpty()) {
                var isAllGranted = true
                // 요청한 권한 허용/거부 상태 한번에 체크
                for (grant in grantResults) {
                    if (grant != PackageManager.PERMISSION_GRANTED) {
                        isAllGranted = false
                        break;
                    }
                }

                // 요청한 권한을 모두 허용했음.
                if (isAllGranted) {
                    // 다음 step으로 ~
                    // All Pass Granted
                    callback(true)
                }
                // 허용하지 않은 권한이 있음. 필수권한/선택권한 여부에 따라서 별도 처리를 해주어야 함.
                else {
                    if (isPermissionALLGrantCheckAtActivityEnds(acts)) {
                        // 다시 묻지 않기 체크하면서 권한 거부 되었음.
                        callback(false)
                    } else {
                        // 접근 권한 거부하였음.
                        callback(false)
                    }
                }
            }
        }

        /**
         * MainActivity 처리 끝단 에서 Permission 허락 상태 여부에 따라
         * 처리 여부 결과 반환
         */
        private fun isPermissionALLGrantCheckAtActivityEnds(acts: AppCompatActivity): Boolean {
            if (VersionCondition.isOverTarget13()) {
                return !ActivityCompat.shouldShowRequestPermissionRationale(
                    acts, Manifest.permission.READ_MEDIA_IMAGES
                ) || !ActivityCompat.shouldShowRequestPermissionRationale(
                    acts, Manifest.permission.READ_MEDIA_AUDIO
                ) || !ActivityCompat.shouldShowRequestPermissionRationale(
                    acts, Manifest.permission.READ_MEDIA_VIDEO
                )
            } else {
                return !ActivityCompat.shouldShowRequestPermissionRationale(
                    acts, Manifest.permission.READ_EXTERNAL_STORAGE
                ) || !ActivityCompat.shouldShowRequestPermissionRationale(
                    acts, Manifest.permission.WRITE_EXTERNAL_STORAGE
                )
            }
        }

        /**
         * Permission 권한 하나 라도 거절 했을 시에 처리 루틴
         * MainActivity => onRequestPermissionsResult
         * AndroidX Dialog
         */
        fun showRefusePermission(ctx: Activity, callback: (states: Boolean) -> Unit) {
            // 사용자가 해당권한을 거부했을때 해주어야 할 동작을 수행합니다
            val msg = String.format(
                """
          권한이 거부되어 작업이 취소되었습니다.
          권한은 [설정] > [애플리케이션] > [%s] > [권한] 에서 설정 가능합니다.
          지금 바로 이동하시겠습니까?
          """.trimIndent(), ctx.resources.getString(R.string.app_name)
            )
            androidx.appcompat.app.AlertDialog.Builder(ctx).setTitle(R.string.app_name)
                .setMessage(msg).setPositiveButton(
                    R.string.str_ok
                ) { dialog, which ->
                    callback(true)
                }.setNegativeButton(
                    R.string.str_cancel
                ) { dialog, which -> dialog.dismiss() }.show()
                .setCanceledOnTouchOutside(false) // 바깥터치 종료 막기
        }
    }
}