const { app } = require("electron");

/**
 * Hardware acceleration switches for older Intel Macs (darwin-x64).
 * Electron 43.8.13 ships Chromium 150.0.7871.250 — preserving hardware
 * acceleration on Intel macOS GPUs where Chromium 152+ dropped it.
 */
if (process.platform === "darwin" && process.arch === "x64") {
  if (process.env.T3CODE_DISABLE_GPU === "1") {
    app.disableHardwareAcceleration();
  } else {
    // Keep older Intel Iris / AMD GPUs off Chromium's software blocklist.
    app.commandLine.appendSwitch("ignore-gpu-blocklist");
    app.commandLine.appendSwitch("enable-gpu-rasterization");
    app.commandLine.appendSwitch("enable-zero-copy");
    app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
    app.commandLine.appendSwitch("enable-features", "CanvasOopRasterization");
  }
}

require("./compileCache.cjs");
require("./main.cjs");
