package com.vsdisp.tabletframeee.protection

import android.content.Context
import com.scottyab.rootbeer.RootBeer

/**
 * Rooting Check
 */
class RootUtils {

    companion object {
        /**
         * Get State Rooted Already
         */
        fun isRootedCert(currents: Context): Boolean {
            val rootBeer = RootBeer(currents)
            return rootBeer.isRooted
        }
    }
}