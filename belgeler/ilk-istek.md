Merhaba Claude. Seninle sıfırdan yüzsüz, animasyonlu bir kısa video kanalı (YouTube Shorts, Instagram Reels, TikTok) kuracağız. Videoları sen kodla üreteceksin. Benim hedefim izlenme. Kısa ve Türkçe konuş; uzun adım listeleri yerine işi kendin yap. Yalnız şifre, onay ekranı ve karar gerektiren yerlerde bana sor.

Bu mesaj uzun. Hepsini oku, sonra en alttaki "Sıra" bölümüne göre ilerle.

---

## 1. Önce araştır ve bana seçenek sun (hiçbir şey kurmadan)
Henüz konu, kanal adı ve logo seçmedim.

**Kanal yönü:** 4 seçenek öner:
- korku/gerilim (gerçek olaylar, şehir efsaneleri, açıklanamayan vakalar)
- eğlenceli ilginç bilgiler
- "ya şöyle olsaydı?" senaryoları
- senin önereceğin bir tane

Her biri için şunları yaz:
- kitlesi
- Türkçe Shorts'ta rekabet
- 30 saniyede anlatılabilirliği
- her gün yeni konu bulmanın kolaylığı
- telif/hassasiyet riski

Web'de bu türlerde çok izlenen Türkçe ve yabancı Shorts kanallarına bak; ilk saniyelerini, sürelerini ve kapaklarını karşılaştır. Sonunda bir öneri ver.

**Kanal adı:** Seçtiğim yöne göre 5 ad öner ve her birinin YouTube, Instagram ve TikTok'ta boş olup olmadığını kontrol et.

**Logo:** 3 fikir (sade, küçük boyutta okunur, profil yuvarlağına sığar).

---

## 2. Görsel stil kütüphanesi
Beğendiğim videolar şu tarzda: aynı sahne 10 farklı animasyon stilinde, tamamen kodla çizilmiş. Örnek stiller:
- tahta baskı (woodblock), piksel sanat, noir çizgi roman, 1930'lar çizgi filmi, oyuncak tuğla, kil diorama, CRT vektör, örgü kukla, PS2 dönemi 3D, sumi mürekkebi
- pop art, voxel 3D, risograf baskı, masal kitabı, röntgen, şeker dünyası, VHS bozulması, mozaik, kara tahta, nakış
- parlayan eskiz (siyah üstüne neon çizgi), düz vektör, minimal çizgi, CGI hareket, 3D anlatım karakteri

Bu videolarda ortak olanlar: sürekli ve yumuşak hareket, en az 3 katman derinlik (paralaks), hafif kamera kayması, kusursuz döngü, ekranda gereksiz yazı yok.

Her videoda farklı bir stil kullanacağız; ardışık iki video aynı stilde olmaz. Her stil için kodda tekrar kullanılabilir bir "stil motoru" yaz: palet, doku, çizgi kalınlığı, hareket karakteri, geçişler ve o stile uyan çerçeve.

Marka ya da başkasının karakterini birebir kopyalama; stiller genel olsun (ör. "oyuncak tuğla", ama logo ve minifigür yok).

---

## 3. Skill'leri web'de ARA ve bana listele (kurmadan önce)
Web'de, aşağıdaki kaynaklarda ve aramalarla, işimize yarayacak Claude Code skill'lerini, eklentilerini (plugin) ve MCP sunucularını ara.

**Bakılacak yerler:**
- Remotion'ın resmî yapay zekâ / agent skill'leri (remotion.dev belgelerinde "AI", "Agent Skills", "Claude Code" bölümleri; GitHub'da remotion-dev organizasyonu)
- Anthropic'in resmî skill deposu (GitHub: anthropics/skills). Örneğin algorithmic-art, canvas-design, theme-factory, frontend-design, skill-creator. Hangilerinin hâlâ var olduğunu kontrol et.
- Claude Code eklenti pazarları ve resmî eklenti dizini
- GitHub'da "awesome claude skills", "claude code skills video", "claude skill motion design", "remotion skill", "ffmpeg skill", "elevenlabs mcp", "youtube upload mcp" aramaları

**Aranacak beceri alanları:**
- Remotion ve kodla video (sahne, geçiş, zamanlama, render)
- Motion design, animasyon ilkeleri, easing, kamera hareketi
- Three.js / WebGL / Canvas ile 2D ve 3D sahne
- Generative ve algoritmik sanat, doku, filtre, shader
- Tipografi, renk paleti, marka kimliği, logo ve kapak tasarımı
- Altyazı (kelime kelime zamanlama), ses miksi, loudness ölçümü, ffmpeg
- Seslendirme ve ses efekti (ElevenLabs vb.; MCP ya da API)
- YouTube / Instagram / TikTok yükleme ve planlama, Shorts algoritması
- Görsel kontrol: videodan kare çıkarıp inceleme, ekran görüntüsü

**Listeleme kuralları:** Bulduklarını tek bir tabloda göster: ad, ne işe yarar, kim yayımlamış (resmî mi, topluluk mu), son güncelleme, yıldız/indirme sayısı, güvenilirlik notun, önerin (kur/kurma).
- Yalnız resmî ya da çok kullanılan, kaynağı belli olanları öner.
- Kurulum komutunu çalıştırmadan önce içeriğini oku.
- Ben onaylamadan hiçbir şey kurma.

---

## 4. Kendi skill'lerini YAZ (onaydan sonra)
Web'den kurduklarına ek olarak, bu kanala özel aşağıdaki skill'leri `.claude/skills/<ad>/SKILL.md` olarak yaz. Her birinin başında ne zaman kullanılacağını söyleyen kısa bir açıklama olsun. Proje kökünde bir `CLAUDE.md` yaz: kanalın kimliği, değişmez kurallar, hangi iş için hangi skill'in okunacağı tablosu, klasör düzeni. Her yeni oturumda önce onu oku.

1. **video-uretim:** Bir videonun baştan sona adımları ve "kapılar":
   - Adımlar: konu → araştırma → senaryo → ses → sahne kodu → görüntü kontrolü → ses kontrolü → final render → kapak → yükleme metni → takvim.
   - Her kapıda ölçmeden geçme.
   - Sonuna "bilinen tuzaklar" tablosu ekle (karşılaştığımız her hatayı ve çözümünü buraya yaz).
2. **senaryo:**
   - Konu puanlama ölçütü (0-2 arası beş ölçüt: izleyiciye "sen" diye dokunuyor mu, kanca gücü, ilk kare gücü, sürekli hareket olanağı, sonda şaşırtma/döngü; 8 ve üstü üretilir).
   - Kanıtlanmış kanca kalıpları ("Sana ... olsa ne olur?", "Bildiğin yanlış: ...", küçük ama şaşırtıcı gerçek, "bedenin" kancası).
   - 5-6 satırlık senaryo yapısı: kanca → ilk şaşkınlık → gelişme → "ama" → döngüye bağlanan son. Sayılar yazıyla yazılır.
   - Puanlı bir konu havuzu dosyası.
3. **stil-kutuphanesi:**
   - Her stil için bir sayfa: palet, doku, hareket, geçiş, ses tarifi, "yapma" listesi.
   - Hangi stilin hangi tarihte kullanıldığını tutan bir geçmiş dosyası.
4. **ses:**
   - Seslendirme (sabit kanal sesi), kelime zaman damgaları, gerçekçi efekt tarifi yazma kuralları.
   - Efektleri baştaki sessizliği kırparak hazırlama ve "yalnız efekt" render'ıyla zamanlamayı ölçme.
   - Müziği konuşmanın altında çok kısık tutma.
   - Son ses: yaklaşık -14 LUFS, tepe en fazla -1 dBTP.
5. **altyazi:**
   - Kelime kelime akan altyazı; asla çizimin üstüne binmez.
   - Sayıları ekranda rakamla gösterme.
   - Platform düğmelerinin altında kalan güvenli alanlar.
6. **kanal-kimligi:** Ad, ton, renkler, yazı tipleri, logo, açılış ve bitiş ekranı, kapak düzeni.
7. **yukleme-ve-takvim:**
   - Her güne tek video.
   - Takvim dosyası (planın asıl kaydı) ve onu denetleyen küçük bir betik ("ilk boş gün" ve "aynı güne iki video var mı").
   - Başlık, açıklama, etiket ve sabit yorum biçimi.
8. **olcum:** 48 saat sonra "izlemeye devam edenler" oranı, ortalama izlenme süresi, izlenme tablosu ve bir sonraki videoya çıkarılan ders.

Ayrıca yardımcı araçlar yaz (her dosyanın başında kullanımı yazsın):
- videodan seçili kareleri tek bir ızgara görsele dizen "kontrol panosu"
- yalnız efektleri render edip her efektin hangi saniyede yükseldiğini ölçen "ses denetimi"
- render + loudness normalizasyonu + kapak çıkaran "final render"
- takvim denetimi

---

## 5. Her videonun "profesyonel" standardı
Bunları benzer bir kanalda deneyerek öğrendik; baştan uygula:
- **Kanca:** İzleyicilerin neredeyse yarısı ilk saniyede kaydırıyor. İlk cümle en fazla 7 kelime olsun: şaşırtıcı bir iddia ya da doğrudan soru, mümkünse "sen" diye hitap. Tarihle, yerle ya da "Bir zamanlar" diye başlama.
- **İlk kare:** Videonun en çarpıcı ve parlak görüntüsü olsun. İlk 0,5 saniyede büyük bir hareket olsun. Karanlık, boş ya da yavaş açılan kare olmasın. Korku konusunda bile ilk kare net ve okunur olsun.
- **Süre ve tempo:** 25-35 saniye. Her 2 saniyede yeni bir görsel olay olsun; ekran hiç durmasın; hiçbir anda boş panel ya da boş köşe görünmesin.
- **Son:** Son cümle başa bağlansın ki video döngüye girip tekrar izlensin. Ardından 2-3 saniyelik markalı bitiş ekranı (logo, kanal adı, takip et).
- **Üst bant:** İnce bir ilerleme çubuğu (bölümlere ayrılmış) ve kısa başlık. Altyazı kelime kelime aksın ama hiçbir zaman çizimin üstüne binmesin.
- **Ses:**
  - Az (5-8) ve gerçekçi efekt; çizgi film ya da komik ses yok.
  - Her efekt ekrandaki olayla aynı karede başlasın. Bunu ölçerek doğrula.
  - Bir efekt kaydı neredeyse sessiz çıkarsa tarifini değiştirip yeniden üret.
  - Müzik çok kısık olsun.
- **Doğruluk:**
  - Her bilgiyi web'den doğrula, kesin olmayanı "yaklaşık" ya da "anlatılır" de.
  - Senaryodaki her sayının hesabını ve kaynağını kaydet.
  - Korku konularında gerçek kişileri karalama, ölümleri istismar etme, kimseyi tehlikeli bir şeye özendirme.
- **Kontrol:**
  - "Bitti" demeden önce videodan en az 15 kare çıkarıp kendin bak: taşan yazı, boş alan, karanlık kare, üst üste binen yazı.
  - Kapağı da gör. Sesi ölç.
  - Ölçemediğin şeyi açıkça söyle (ör. "sesi dinleyemedim, ölçtüm").
- **Kapak:** 2 satır, satır başına en fazla 10 karakter. Anlatımdan daha kesin bir iddia kurmasın.
- **Yükleme ve takvim:**
  - Her güne tek video.
  - Yükleme, yayın, silme ve tarih değiştirme için her seferinde önce bana sor.
  - YouTube başlığında emoji ve #shorts yok.
  - "AI ile oluşturulmuş" etiketini açma; animasyon kodla çiziliyor.
- **Ölçüm:** Her videodan 48 saat sonra "izlemeye devam edenler" oranını ve izlenmeyi tabloya yaz. Bir sonraki videoyu buna göre değiştir.

---

## 6. Güvenlik
- API anahtarları yalnız `.env` dosyasında durur. Anahtarı sohbete yazdırma, okuma, ekrana basma; dosyaya ben kendim yazarım.
- Şifre girmeyeceksin; giriş ve onay ekranlarını ben yaparım.
- Ücretli bir servise üye olmadan ya da kredi harcamadan önce maliyeti söyle.

---

## 7. Çalışma ortamı
Ben tabletten çalışıyorum. En başta dürüstçe söyle:
- Bu ortamda video render'ı yapılabilir mi, yoksa bir bilgisayar mı gerekir?
- Bitmiş videoyu tablete nasıl alırım?
- Projeyi kaybetmemek için yedeği nasıl tutacağız? (ör. gizli bir GitHub deposu; `.env` ve büyük videolar hariç)

---

## Sıra
1. 7. bölümdeki ortam sorusunu cevapla.
2. 1. bölümdeki seçenekleri hazırla. Benim konu, ad ve logo kararımı bekle.
3. 3. bölümdeki skill araştırmasını tabloyla göster. Onayladıklarımı kur.
4. 4. bölümdeki kendi skill'lerini, CLAUDE.md'yi ve araçları yaz.
5. Bir deneme videosu üret: 5. bölümdeki standartla, kendi kontrollerinden geçmiş olsun. Bana videoyu, kapağı ve kontrol sonuçlarını göster.
