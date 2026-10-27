# E-Spor & Oyun Geliştirme Kulübü Web Sitesi

Bartın Üniversitesi E-Spor ve Oyun Geliştirme Kulübü için hazırlanmış, sadece HTML, CSS ve JavaScript kullanan statik web sitesi. Backend, veritabanı veya giriş sistemi yoktur.

**Amaç:** Kampüsteki e-spor ve oyun geliştirme meraklılarını tanıtım, etkinlik takvimi ve arama özelliğiyle tek bir sitede buluşturmak. (BPR201 Haftalık Proje Ödevi 1)

**GitHub repository:** https://github.com/ArdaAkyuz667/Kampus_Projesi  <!-- kendi bağlantını yaz -->  
**Canlı site (GitHub Pages):** https://ArdaAkyuz667.github.io/Kampus_Projesi/

## Sayfalar
- `index.html`: Ana sayfa (geri sayım, kulüp tanıtımı, fotoğraf galerisi)
- `etkinlikler.html`: Etkinlik listesi, JavaScript ile arama, kategori filtresi ve "Kayıt Ol" butonları
- `hakkimizda.html`: Amaç, değerler, sıkça sorulan sorular ve iletişim

## Çalıştırma adımları
1. Repository'yi indir (**Code → Download ZIP**) ve klasöre çıkar; ya da Codespaces'te aç.
2. `index.html` dosyasına çift tıklayarak tarayıcıda aç (Codespaces'te sağ tık → *Open with Live Server*).
3. Menüden **Etkinlikler** sayfasına geçip arama kutusunu dene. Ek kurulum veya sunucu gerekmez.

## Özellikler
- Tüm sayfalarda ortak menü ve tek `style.css`
- Etkinlik **başlıklarında** anlık arama (büyük/küçük harf, baştaki/sondaki boşluk ve Türkçe karakter duyarsız), görünen etkinlik sayısı ve "bulunamadı" mesajı, **Temizle** düğmesi
- Yazdıkça çıkan öneri kutusu (↑ ↓ Enter Esc ile klavyeden de kullanılır)
- Kategori filtresi
- Fotoğrafa tıklayınca büyütme (bilgisayarda ← → ve Esc tuşları çalışır)
- Ana sayfada yaklaşan etkinliğe geri sayım
- Mobil, tablet ve bilgisayar uyumlu (responsive) tasarım

## Klasör yapısı
```
index.html
etkinlikler.html
hakkimizda.html
style.css
script.js
images/   ← tüm fotoğraflar burada
AI_NOTLARI.md
TEST_NOTLARI.md
ekran_goruntuleri/   ← arama, bos_sonuc, mobil
```

## GitHub Pages ile yayınlama
1. Dosyaları ve `images` klasörünü GitHub'daki depoya yükle.
2. **Settings → Pages** bölümüne gir.
3. **Source** olarak `Deploy from a branch`, branch olarak `main` ve klasör olarak `/ (root)` seç, **Save** de.
4. Birkaç dakika sonra site yukarıdaki adreste açılır.
