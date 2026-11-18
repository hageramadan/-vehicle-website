import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/mobile",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    browserName: "chromium",
    channel: process.platform === "win32" ? "msedge" : undefined,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [320, 360, 390, 430].map((width) => ({
    name: `Mobile ${width}px`,
    use: { viewport: { width, height: 844 } },
  })),
  webServer: {
    command:
      "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
