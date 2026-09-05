package com.example

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.example.service.ScreenMirroringService
import com.example.ui.screens.MiniAppHomeScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.viewmodel.MiniAppViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File

class MainActivity : ComponentActivity() {

    private val miniAppViewModel: MiniAppViewModel by viewModels()

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        permissions.entries.forEach {
            Log.d("Permissions", "${it.key} = ${it.value}")
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Background Initialization to prevent main thread frame drops
        lifecycleScope.launch(Dispatchers.IO) {
            initializeEcosystem()
        }

        checkAndRequestPermissions()

        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                MiniAppHomeScreen(viewModel = miniAppViewModel)
            }
        }
    }

    private suspend fun initializeEcosystem() = withContext(Dispatchers.IO) {
        // Clean up stale / corrupted WebView code cache directories on startup
        try {
            val webViewCacheDir = File(cacheDir, "WebView/Default/HTTP Cache/Code Cache/js")
            if (webViewCacheDir.exists() && webViewCacheDir.isDirectory) {
                val files = webViewCacheDir.listFiles()
                files?.forEach { file ->
                    if (!file.canRead() || file.length() == 0L) {
                        file.delete()
                    }
                }
            } else if (!webViewCacheDir.exists()) {
                webViewCacheDir.mkdirs()
            }
        } catch (e: Exception) {
            Log.e("Init", "WebView cache cleanup failed", e)
        }
    }

    private fun checkAndRequestPermissions() {
        val permissionsToRequest = mutableListOf<String>()
        
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            permissionsToRequest.add(Manifest.permission.RECORD_AUDIO)
        }
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(Manifest.permission.BLUETOOTH_CONNECT)
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                permissionsToRequest.add(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        if (permissionsToRequest.isNotEmpty()) {
            requestPermissionLauncher.launch(permissionsToRequest.toTypedArray())
        }
    }

    override fun onResume() {
        super.onResume()
        miniAppViewModel.onResumeWebView()
    }

    override fun onPause() {
        miniAppViewModel.onPauseWebView()
        super.onPause()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 2001 && resultCode == Activity.RESULT_OK && data != null) {
            ScreenMirroringService.resultCode = resultCode
            ScreenMirroringService.resultData = data
            val intent = Intent(this, ScreenMirroringService::class.java)
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                startForegroundService(intent)
            } else {
                startService(intent)
            }
        }
    }
}

