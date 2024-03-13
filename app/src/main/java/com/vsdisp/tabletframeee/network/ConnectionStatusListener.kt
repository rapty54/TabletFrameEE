package com.vsdisp.tabletframeee.network

/**
 * Connection Listener
 */
interface ConnectionStatusListener {
    fun onConnectionStatus(isConnected: Boolean)
}