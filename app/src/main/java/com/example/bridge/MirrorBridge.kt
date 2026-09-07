package com.example.bridge

import android.content.Context
import android.content.Intent
import android.webkit.JavascriptInterface
import com.example.MainActivity
import com.example.service.ScreenMirroringService

class MirrorBridge(private val context: Context, private val activity: MainActivity) {

    @JavascriptInterface
    fun startMirroring() {
        activity.requestScreenCapture()
    }

    @JavascriptInterface
    fun stopMirroring() {
        val intent = Intent(context, ScreenMirroringService::class.java)
        context.stopService(intent)
    }

    @JavascriptInterface
    fun isMirroring(): Boolean {
        return ScreenMirroringService.isRunning
    }

    @JavascriptInterface
    fun generatePairingCode(): String {
        val part1 = (100..999).random()
        val part2 = (100..999).random()
        return "$part1 - $part2"
    }
}
