# AI NOTLARI

Kullandığım AI aracı: Claude (Anthropic). GitHub Copilot bana istediğim sonuçları vermediği için sohbet tabanlı bir AI aracı kullandım; kod incelemesini, açıklamaları ve testleri kendim yaptım.

## 1. Promptlar ve amaçları
1. **Prompt:** "HTML ve JavaScript öğrenmeye yeni başladım. etkinlikler.html ve style.css dosyalarını incele. Mevcut tasarımı koruyarak etkinlik başlıklarında arama yapabileceğim bir özellik için kısa bir plan öner. Henüz dosyaları değiştirme. Hangi dosyalarda değişiklik gerektiğini ve özelliği nasıl test edeceğimi açıkla."
   **Amaç:** Kod yazdırmadan önce arama özelliğinin planını almak; hangi dosyaların değişeceğini ve nasıl test edeceğimi anlamak.
2. **Prompt:** "Planı uygula: script.js içine etkinlik kartlarının başlıklarında yazdıkça arama yapan kod ekle. Büyük/küçük harf ve baştaki/sondaki boşluklar sonucu etkilemesin. Görünen etkinlik sayısını yaz, eşleşme yoksa açıklayıcı bir mesaj göster."
   **Amaç:** Kabul ölçütlerindeki arama, harf/boşluk işleme, sayaç ve boş sonuç mesajını çalışan kod olarak almak.
3. **Prompt:** "Etkinlik sayfasındaki arama kutusu için Temizle düğmesi ekle ve aramayı yalnızca başlıkla sınırla. Arama kutusuna erişilebilir bir label ekle."
   **Amaç:** Temizle düğmesini, başlıkla sınırlı aramayı ve label gereksinimini tamamlamak.
4. **Prompt:** "Etkinlikler sayfasındaki arama kutusuna yazdıkça altta öneri çıksın. Öneriler başlıklardan gelsin, yazdığım kısım kalın görünsün. Aşağı/yukarı ok tuşlarıyla seçip Enter ile onaylayabileyim, Esc ile kapansın."
   **Amaç:** Arama kutusuna otomatik tamamlama (öneri kutusu) ve klavyeyle kullanım eklemek.
5. **Prompt:** "Galerideki ve etkinlik kartlarındaki fotoğraflara tıklayınca büyüsün. Kapatma düğmesi olsun, bilgisayarda ok tuşlarıyla diğer fotoğrafa geçebileyim, Esc ile kapansın."
   **Amaç:** Fotoğraf büyütme (lightbox) özelliğini eklemek.
6. **Prompt:** "Ana sayfaya yaklaşan etkinliğe kalan günü, saati, dakikayı ve saniyeyi gösteren bir geri sayım ekle. Süre bitince bir mesaj yazsın."
   **Amaç:** Ana sayfadaki geri sayım sayacını eklemek.

## 2. Kabul ettiğim veya değiştirdiğim bir AI önerisi
Arama ilk haliyle kartın bütün metninde (başlık, yer, açıklama) arıyordu. Ödev yalnızca başlıkları filtrelemeyi istediği için bunu değiştirdim; artık sadece `h3` başlık metni aranıyor. Temizle düğmesini küçük bir düzeltmeyle kabul ettim: kategori düğmeleriyle karışmasın diye seçiciyi `.filter-btn[data-filter]` olarak değiştirdim.

## 3. Bir event listener'ı kendi cümlelerimle açıklama
Koddan satır (`script.js`):
```js
searchInput.addEventListener('input', applyFilters);
```
Bu satır arama kutusunu dinler. `input` olayı kutunun içeriği her değiştiğinde çalışır (harf yazma, silme, yapıştırma); bu yüzden kullanıcı Enter'a basmadan sonuçlar anında güncellenir. `applyFilters` parantezsiz yazıldı, çünkü fonksiyonu şimdi çalıştırmak istemiyorum, tarayıcıya "olay olunca bu fonksiyonu çağır" diyorum. Parantez koysaydım fonksiyon sayfa açılırken bir kez çalışır ve dinleyici düzgün kurulmazdı.

## 4. Bir filtreleme koşulunu kendi cümlelerimle açıklama
Koddan satır (`script.js`):
```js
const matchText = kartMetni.get(card).includes(query);
```
`kartMetni`, her kartın başlığını sayfa açılırken bir kez küçük harfe çevirip Türkçe karakterleri sadeleştirerek (`normalize`) sakladığım listedir. `includes(query)` başlığın içinde aranan ifade geçiyorsa `true`, geçmiyorsa `false` verir; yani başlığın bir parçasını yazmak da yeter. Kullanıcının yazdığı metin de aynı `normalize` işleminden geçtiği için büyük/küçük harf fark etmez, `trim()` ise baştaki ve sondaki boşlukları siler. Sorgu boşsa `includes('')` her zaman `true` döner, bu yüzden tüm kartlar görünür.

## 5. Kod incelemesi (diff)
- Gereksiz değişiklik yapılmadı; bu ödev için değişen dosyalar: `etkinlikler.html` (Temizle düğmesi, label/placeholder), `script.js` (başlıkla sınırlı arama, Temizle), `hakkimizda.html` (mail bağlantı metni), `README.md`.
- Yazdıkça çıkan öneri kutusu (`.oneri-kutusu`), fotoğraf büyütme (lightbox) ve ana sayfadaki geri sayımı da yapay zekadan (Claude) yardım alarak ekledim. Kodu inceledim ve tarayıcıda test ettim. Öneri kutusu için `style.css` dosyasına da stil eklendiği için bu dosya da değişmiş sayılır.
