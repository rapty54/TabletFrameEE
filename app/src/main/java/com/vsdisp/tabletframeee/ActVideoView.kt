package com.vsdisp.tabletframeee

import android.annotation.SuppressLint
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.PlaybackException
import com.google.android.exoplayer2.Player
import com.google.android.exoplayer2.util.Util
import com.vsdisp.tabletframeee.actbase.ActCoroutineBase
import com.vsdisp.tabletframeee.actbase.ActHelper
import com.vsdisp.tabletframeee.actbase.model.ActParcelMultiTypeExtraData
import com.vsdisp.tabletframeee.databinding.ActVideoViewerBinding
import com.vsdisp.tabletframeee.network.ConnectionStatusListener
import com.vsdisp.tabletframeee.utils.ProviderUtil

class ActVideoView : ActCoroutineBase() {

    private var playWhenReady = true // 재생,일시정지 정보

    private var currentWindow = 0 // 현재 윈도우 지수

    private var playbackPosition = 0L // 현재 재생 위치

    private lateinit var binding: ActVideoViewerBinding

    private var simpleExoPlayer: ExoPlayer? = null

    private var uris: String = ""

    private var currents: ActVideoView = this

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActVideoViewerBinding.inflate(layoutInflater)
        setContentView(binding.root)
        // 현재의 사항 반드시 선언
        setListenNetworkStatus(object : ConnectionStatusListener {
            override fun onConnectionStatus(isConnected: Boolean) {
                isRealTimeNTStatus = isConnected
            }
        })

        val pageInfo = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra(
                ActHelper.ACT_PAGE_MOVE_INFO_KEY, ActParcelMultiTypeExtraData::class.java
            )
        } else {
            intent.getParcelableExtra<ActParcelMultiTypeExtraData>(ActHelper.ACT_PAGE_MOVE_INFO_KEY)
        }
        //Toast.makeText(currents, "ActVideoView Init ... ${pageInfo!!.path}", Toast.LENGTH_SHORT)
        // get Path Uri From Other Activity
        uris = ProviderUtil.getUriFromFile(
            this,
            pageInfo!!.path
        ).toString()

    }

    private fun initPlayer(uri: String) {
        simpleExoPlayer = ExoPlayer.Builder(this).build()
        simpleExoPlayer.also { exoPlayer ->
            binding.playerView.player = exoPlayer
            val mediaItem = MediaItem.fromUri(uri)
            exoPlayer?.setMediaItem(mediaItem)
            if (exoPlayer != null) {
                exoPlayer.playWhenReady = playWhenReady
                exoPlayer.seekTo(currentWindow, playbackPosition)
                exoPlayer.prepare()
            }

        }

        simpleExoPlayer!!.addListener(object : Player.Listener {

            override fun onPlayerError(error: PlaybackException) {
                super.onPlayerError(error)
                // 4001 MediaCodecVideoRenderer error, index=0, format=Format(1, null, null, video/av01, null, -1, null, [7680, 4086, 25.0], [-1, -1]), format_supported=NO_EXCEEDS_CAPABILITIES
                android.util.Log.e(
                    "ActVideoView", "${error.errorCode} ${error.message} ${error.message}"
                )

                if (error.errorCode == 4001) {
                    Toast.makeText(
                        currents, "해당 영상은 단말 내에서 지원 되지 않는 코덱 입니다.", Toast.LENGTH_SHORT
                    ).show()
                }
            }
        })

//        simpleExoPlayer!!.addAnalyticsListener(object : EventLogger(MappingTrackSelector) {
//
//        })
    }

    override fun onResume() {
        super.onResume()
        hideSystemUi()
        if (Util.SDK_INT <= 23 || simpleExoPlayer == null) {
            initPlayer(uris)
        }
    }

    override fun onPause() {
        super.onPause()
        if (Util.SDK_INT <= 23) {
            releasePlayer()
        }
    }

    override fun onStart() {
        super.onStart()
        if (Util.SDK_INT > 23) {
            initPlayer(uris)
        }
    }

    override fun onStop() {
        super.onStop()
        if (Util.SDK_INT >= 24) {
            releasePlayer()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
    }

    private fun releasePlayer() {
        simpleExoPlayer?.let { exoPlayer ->
            playbackPosition = exoPlayer.currentPosition
            currentWindow = exoPlayer.currentMediaItemIndex
            playWhenReady = exoPlayer.playWhenReady
            exoPlayer.release()
        }
        simpleExoPlayer = null
    }

    /**
     * Hide system UI
     */
    @SuppressLint("InlinedApi")
    private fun hideSystemUi() {
        WindowCompat.setDecorFitsSystemWindows(window, false)
        WindowInsetsControllerCompat(window, binding.playerView).let { controller ->
            controller.hide(WindowInsetsCompat.Type.systemBars())
            controller.systemBarsBehavior =
                WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }
    }
}