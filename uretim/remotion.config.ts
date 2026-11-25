// Remotion ayarları. Tarayıcı: bu makinede önceden kurulu headless Chromium (indirme yok).
import { Config } from "@remotion/cli/config";
import fs from "node:fs";

const yerel = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (fs.existsSync(yerel)) Config.setBrowserExecutable(yerel);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setConcurrency(3);
Config.setChromiumOpenGlRenderer("swangle");
