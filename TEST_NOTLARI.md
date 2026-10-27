# TEST NOTLARI

| # | Girdi / İşlem | Beklenen sonuç | Gerçekleşen sonuç | Sonuç |
|---|---------------|----------------|-------------------|-------|
| 1 | Arama kutusuna `Legends`, sonra `48 Saatlik Kampüs Game Jam` yazdım | Yalnızca eşleşen kartlar görünür; sayaç doğru sayıyı gösterir | `Legends` → 2 kart (Wild Rift ve Mobile Legends), sayaç "2 etkinlik gösteriliyor". Tam başlık → 1 kart, sayaç "1 etkinlik gösteriliyor" | GEÇTİ |
| 2 | `UNITY`, `unity` ve `Unity` yazdım | Üçünde de aynı kartlar görünür | Üçünde de aynı 1 kart (Visual Studio Code ile Unity'ye Giriş) göründü | GEÇTİ |
| 3 | `arda667` yazdım | Sayaç 0 olur; sonuç bulunamadı mesajı görünür | Sayaç "0 etkinlik gösteriliyor", "Aradığın kriterlere uygun etkinlik bulunamadı." mesajı göründü | GEÇTİ |
| 4a | Sadece boşluk (`   `) yazdım | Tüm etkinlikler görünür | 5 kart göründü, sayaç "5 etkinlik gösteriliyor", mesaj gizli | GEÇTİ |
| 4b | `unity` yazıp **Temizle**'ye bastım | Arama kutusu boşalır, tüm etkinlikler görünür | Kutu boşaldı, 5 kart göründü, kategori "Tümü" seçili hale döndü | GEÇTİ |
| 5 | Ana Sayfa, Etkinlikler, Hakkımızda menü bağlantılarına tıkladım (üç sayfanın her birinde, toplam 9 tıklama) | Tüm bağlantılar doğru sayfalara gider | Üç sayfanın her birinde de Ana Sayfa → `index.html`, Etkinlikler → `etkinlikler.html`, Hakkımızda → `hakkimizda.html` açıldı. 404 veya yanlış sayfa yok. Mobil görünümde menü düğmesi (☰) ile açılan listedeki bağlantılar da doğru sayfalara gitti | GEÇTİ |
| 6 | Tarayıcıda 390 px genişlik (F12 → cihaz modu) + Tab tuşu | Yatay taşma olmaz; arama alanına ve düğmeye ulaşılır | Üç sayfada da sayfa genişliği 390 px'i geçmedi, yatay kaydırma çıkmadı. `etkinlikler.html`'de Tab sırası: menü düğmesi → arama kutusu → Temizle → Tümü → Turnuva → Eğitim ... Arama alanına ve Temizle düğmesine klavyeyle ulaşıldı, odak çerçevesi görünüyor | GEÇTİ |
| 7a | `leg` yazdım | Altta öneri kutusu açılır; yalnızca kelime başında eşleşen başlıklar (Wild Rift ve Mobile Legends) önerilir, eşleşen kısım vurgulanır | Kutuda 2 öneri göründü, "Leg" kısmı vurgulandı | GEÇTİ |
| 7b | Öneri kutusu açıkken ↓ ve Enter tuşlarına bastım | İlk öneri seçilir; arama kutusu o başlıkla dolar, kutu kapanır, yalnızca o kart görünür | Başlık kutuya yazıldı, öneri kutusu kapandı, 1 kart göründü | GEÇTİ |
| 7c | `leg` yazıp Esc'ye bastım; sonra bir öneriye fareyle tıkladım | Esc ile kutu kapanır; tıklayınca öneri seçilir ve kart filtrelenir | Esc kutuyu kapattı; tıklayınca ilgili başlık seçildi ve filtre uygulandı | GEÇTİ |

## Bulunan sorun ve düzeltme
- İlk sürümde arama başlıkla sınırlı değildi (açıklama, yer ve etiket metninde de arıyordu) ve **Temizle** düğmesi yoktu. Arama yalnızca başlıkta yapacak şekilde düzeltildi, Temizle düğmesi eklendi ve testler yeniden yapıldı.
- Temizle düğmesi eklenirken kategori düğmeleriyle karışma riski vardı (ikisi de `.filter-btn` sınıfını kullanıyor); kategori düğmeleri `.filter-btn[data-filter]` ile ayrıştırıldı.
- Test 7b'de Enter ile bir öneri seçince öneri kutusu açık kalıyordu: `oneriSec` kutuyu kapatıyor, ardından gönderdiği `input` olayı `oneriGoster`'i çalıştırıp kutuyu yeniden açıyordu. `oneriKapat()` çağrısı `input` olayından sonraya taşındı.
- Test 4b'de öneri kutusu açıkken Temizle'ye fareyle tıklayınca düğmeye değil, üstüne binen öneriye tıklanıyordu. Temizle düğmesi arama kutusunun yanına taşındı (`etkinlikler.html`, `style.css`); öneri kutusu artık düğmenin altında açılıyor. Düzeltmeden sonra 4b (kutu açıkken fare ve klavye, kutu kapalıyken fare), 7a, 7b ve 7c yeniden çalıştırıldı ve geçti.

## Bilinen küçük fark
- Filtre başlığın herhangi bir yerinde eşleşir (ör. `egends` kartı bulur), öneri kutusu ise yalnızca kelime başındaki eşleşmeleri önerir. Bu bilinçli bir tercihtir, hata değildir.

## Ekran görüntüleri
`ekran_goruntuleri/` klasöründe: `arama.jpg` (normal arama), `bos_sonuc.jpg` (sonuç bulunamadı), `mobil.jpg` (390 px görünüm).
