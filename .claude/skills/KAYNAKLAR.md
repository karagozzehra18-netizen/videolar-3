# Skill kaynakları ve lisansları

Dışarıdan gelen skill'ler kurulmadan önce okundu (ağ çağrısı, ücretli servis, lisans). Kurulum `npx`/`npm` ile değil, skill klasörleri elle kopyalanarak yapıldı; `.mp4/.gif/.mov/.webm` tanıtım dosyaları dışarıda bırakıldı.
**Kural:** Bir skill ücretli bir API (ElevenLabs, OpenAI, Gemini, Runway, Kling, Replicate, OpusClip…) kullanmak isterse önce maliyet kullanıcıya söylenir, onay alınır.

| Skill(ler) | Kaynak | Lisans | Not |
|---|---|---|---|
| remotion-* (13) | remotion-dev/skills | Remotion lisansı (birey/≤3 kişi ücretsiz) | resmî |
| algorithmic-art, canvas-design, theme-factory, frontend-design | anthropics/skills | Apache-2.0 | resmî |
| ffmpeg-skill | kajisho5/ffmpeg-skill | MIT | yerel ffmpeg |
| threejs-* (13) | CloudAI-X/threejs-skills | MIT | |
| animation-principles, motion-art-direction, shot-composition, color-motion, motion-background, logo-animation | iart-ai/motion-design-skills | MIT | |
| logo-design | kaankiziltug/logo-design-skill | MIT | |
| brand-identity | fatihaydost/brand-identity-skill | MIT | yalnız yerel tarayıcı |
| svg-creator | upbrew-tech/svg-creator-skill | Apache-2.0 | cairosvg 2.7.1 önceden kuruldu |
| spotkit | Devesh-Shirsath/spotkit | MIT | |
| bb-brand-voice, bb-brand-guidelines, bb-brand-story | arnabbagxd/Brand-building-skills | MIT | ad çakışmasın diye bb- öneki |
| yt-* (11) | Jakeschincariol/youtube-agent-skill | MIT | |
| rea-video | JuneYaooo/rea-video | Apache-2.0 | başkasının videosu yalnız teknik öğrenmek için; yeniden paylaşılmaz |
| video-shotcraft | Vincentwei1021/video-shotcraft | Apache-2.0 | BGM lisansları `assets/audio/ATTRIBUTION.md` |
| animation-styles | deenukhan/animation-styles | MIT | 39 kodla çizilmiş stil |
| rossark-motion-skill | rossark0/rossark-motion-skill | MIT | SVG → 60 fps animasyon |
| video-use, manim-video | browser-use/video-use | MIT | |
| lemo-opuscar | lemomo-ai/lemo-opuscar | kod MIT, belgeler CC BY-NC + film yapma izni | "Yaptığın filmler senindir, ticari dahil". Kütüphaneyi kullanınca `scripts/setup.sh` ~/lemo-opuscar'a indirir |
| alpha-cutout, cursor-rig, exploded-view, frame-capture, motion-assets, scroll-film, site-check, threejs-scene | Moh4696/open-3d-skills | MIT | |
| hyperframes, hyperframes-cli, reverse-any-video, style-sampling, remotion-to-hyperframes, hyperframes-registry, media-use | heygen-com/hyperframes | Apache-2.0 | |
| ui-redline-walkthrough | rjmahesh/ui-redline-walkthrough | MIT | |

## Kurulmayanlar (bilerek)
| Depo | Neden |
|---|---|
| lemomo-ai/lemo-wake | CC BY-NC 4.0: **yalnız ticari olmayan kullanım**. Para kazanan kanalda lisansa aykırı (yazardan ticari izin alınırsa kurulabilir) |
| opus-pro/opus-skills | Ücretli OpusClip servisi + sosyal medyaya otomatik paylaşım (kanal kuralı: yükleme/yayın her seferinde kullanıcıya sorulur) |
| hetpatel-11/Adobe_Premiere_Pro_MCP | Bilgisayarda Adobe Premiere Pro gerektirir; bu ortamda çalışmaz |
| calesthio/OpenMontage | Tek başına kurulan bir skill değil, AGPL lisanslı bütün bir uygulama (93 MB); işlevleri Remotion/HyperFrames ile zaten var |
| barefootford/buttercut | Kendi Ruby uygulaması ve ham kamera çekimi kütüphanesi gerektirir; bizim videolar kodla çiziliyor |
