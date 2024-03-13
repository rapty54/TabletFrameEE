package com.vsdisp.tabletframeee.common

import android.os.Build
import android.view.Window
import androidx.annotation.RequiresApi
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat

/**
 * 화면 집중화 모드 관련 Util
 */
class ConcentrateModeUtil {

    companion object {

        @RequiresApi(Build.VERSION_CODES.R)
        fun fullConcentrate(window: Window){
            val windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)
            windowInsetsController!!.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            // Add a listener to update the behavior of the toggle fullscreen button when
            // the system bars are hidden or revealed.
            window.decorView.setOnApplyWindowInsetsListener { view, windowInsets ->
                // You can hide the caption bar even when the other system bars are visible.
                // To account for this, explicitly check the visibility of navigationBars()
                // and statusBars() rather than checking the visibility of systemBars().
                if (windowInsets.isVisible(WindowInsetsCompat.Type.navigationBars())
                    || windowInsets.isVisible(WindowInsetsCompat.Type.statusBars())) {
//                binding.toggleFullscreenButton.setOnClickListener {
                    // Hide both the status bar and the navigation bar.
                    windowInsetsController.hide(WindowInsetsCompat.Type.systemBars())
//                }
                } else {
//                binding.toggleFullscreenButton.setOnClickListener {
                    // Show both the status bar and the navigation bar.
                    //windowInsetsController.show(WindowInsetsCompat.Type.systemBars())
//                }
                }
                view.onApplyWindowInsets(windowInsets)
            }
        }
    }
}