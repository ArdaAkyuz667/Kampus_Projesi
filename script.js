
document.documentElement.classList.add('js');


function normalize(metin) {
    return metin
        .toLocaleLowerCase('tr')
        .replace(/ı/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function kelimeler(metin) {
    return normalize(metin).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}
function baslikEslesir(baslik, sorgu) {
    const q = kelimeler(sorgu);
    if (!q.length) return true;
    const b = kelimeler(baslik);
    const baslangiclar = b.map(function (_, i) { return b.slice(i).join(''); });
    return q.every(function (k) {
        return baslangiclar.some(function (x) { return x.startsWith(k); });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            const open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open);
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const cards = document.querySelectorAll('#eventsContainer .card');
        const buttons = document.querySelectorAll('.filter-btn[data-filter]');
        const info = document.getElementById('resultInfo');
        const noResults = document.getElementById('noResults');
        let category = 'hepsi';

        const kartMetni = new Map();
        cards.forEach(function (card) {
            kartMetni.set(card, card.querySelector('h3').textContent.trim());
        });

        function applyFilters() {
            const query = searchInput.value;
            let visible = 0;
            cards.forEach(function (card) {
                const matchText = baslikEslesir(kartMetni.get(card), query);
                const matchCat = category === 'hepsi' || card.dataset.category === category;
                const show = matchText && matchCat;
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });
            info.textContent = visible + ' etkinlik gösteriliyor';
            noResults.style.display = visible === 0 ? 'block' : 'none';
        }

        searchInput.addEventListener('input', applyFilters);
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                category = btn.dataset.filter;
                applyFilters();
            });
        });

        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                searchInput.value = '';
                category = 'hepsi';
                buttons.forEach(function (b) {
                    b.classList.toggle('active', b.dataset.filter === 'hepsi');
                });
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }

        applyFilters();
    }
    const countdown = document.getElementById('countdown');
    if (countdown) {
        const target = new Date(countdown.dataset.date).getTime();
        function tick() {
            const diff = target - Date.now();
            if (diff <= 0) { countdown.innerHTML = '<p>Etkinlik başladı! 🎮</p>'; return; }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor(diff % 86400000 / 3600000);
            const m = Math.floor(diff % 3600000 / 60000);
            const s = Math.floor(diff % 60000 / 1000);
            document.getElementById('cd-d').textContent = d;
            document.getElementById('cd-h').textContent = h;
            document.getElementById('cd-m').textContent = m;
            document.getElementById('cd-s').textContent = s;
        }
        tick();
        setInterval(tick, 1000);
    }
    const aramaKutusu = document.getElementById('searchInput');
    const oneriKutusu = document.getElementById('oneriKutusu');

    if (aramaKutusu && oneriKutusu) {
        const basliklar = [...document.querySelectorAll('#eventsContainer .card h3')]
            .map(function (h) { return h.textContent.trim(); });
        let seciliIndex = -1;
        function kelimeBasiBul(baslik, metin) {
            const kucuk = normalize(baslik);
            let yer = kucuk.indexOf(metin);
            while (yer !== -1) {
                if (yer === 0 || !/[\p{L}\p{N}]/u.test(kucuk[yer - 1])) return yer;
                yer = kucuk.indexOf(metin, yer + 1);
            }
            return -1;
        }

        function oneriKapat() {
            oneriKutusu.hidden = true;
            seciliIndex = -1;
        }

        function oneriSec(baslik) {
            aramaKutusu.value = baslik;
            aramaKutusu.dispatchEvent(new Event('input'));
            oneriKapat(); // input olayı kutuyu yeniden açtığı için kapatma en sonda
        }

        function oneriGoster() {
            const ham = aramaKutusu.value;
            const metin = normalize(ham).trim();
            oneriKutusu.innerHTML = '';
            seciliIndex = -1;

            if (!kelimeler(ham).length) { oneriKapat(); return; }

            const eslesenler = basliklar.filter(function (b) { return baslikEslesir(b, ham); });
            if (eslesenler.length === 0) { oneriKapat(); return; }

            eslesenler.forEach(function (baslik) {
                const li = document.createElement('li');
                li.setAttribute('role', 'option');

                const bas = kelimeBasiBul(baslik, metin);
                if (bas === -1) {
                    li.textContent = baslik;
                } else {
                    li.append(baslik.slice(0, bas));
                    const isaret = document.createElement('mark');
                    isaret.textContent = baslik.slice(bas, bas + metin.length);
                    li.append(isaret, baslik.slice(bas + metin.length));
                }

                li.addEventListener('click', function () { oneriSec(baslik); });
                oneriKutusu.appendChild(li);
            });
            oneriKutusu.hidden = false;
        }

        function secimiGuncelle(yeni) {
            const maddeler = oneriKutusu.querySelectorAll('li');
            if (!maddeler.length) return;
            seciliIndex = (yeni + maddeler.length) % maddeler.length;
            maddeler.forEach(function (li, i) {
                li.classList.toggle('secili', i === seciliIndex);
                li.setAttribute('aria-selected', i === seciliIndex);
            });
            maddeler[seciliIndex].scrollIntoView({ block: 'nearest' });
        }

        aramaKutusu.addEventListener('input', oneriGoster);
        aramaKutusu.addEventListener('keydown', function (e) {
            if (oneriKutusu.hidden) return;
            if (e.key === 'ArrowDown') { e.preventDefault(); secimiGuncelle(seciliIndex + 1); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); secimiGuncelle(seciliIndex - 1); }
            else if (e.key === 'Enter') {
                const maddeler = oneriKutusu.querySelectorAll('li');
                if (seciliIndex >= 0 && maddeler[seciliIndex]) {
                    e.preventDefault();
                    oneriSec(maddeler[seciliIndex].textContent);
                } else { oneriKapat(); }
            }
            else if (e.key === 'Escape') { oneriKapat(); }
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.search-container')) oneriKapat();
        });
    }
    const kucukResimler = [...document.querySelectorAll('.gallery img, .ev-media img')];
    if (kucukResimler.length) {
        const kutu = document.createElement('div');
        kutu.className = 'lightbox';
        kutu.hidden = true;
        kutu.setAttribute('role', 'dialog');
        kutu.setAttribute('aria-modal', 'true');
        kutu.setAttribute('aria-label', 'Fotoğraf büyütme');
        kutu.innerHTML =
            '<button type="button" class="lb-btn lb-close" aria-label="Kapat">✕</button>' +
            '<button type="button" class="lb-btn lb-prev" aria-label="Önceki fotoğraf">‹</button>' +
            '<figure><img alt=""><figcaption></figcaption></figure>' +
            '<button type="button" class="lb-btn lb-next" aria-label="Sonraki fotoğraf">›</button>';
        document.body.appendChild(kutu);

        const buyukResim = kutu.querySelector('img');
        const yazi = kutu.querySelector('figcaption');
        let liste = [];
        let simdiki = 0;
        let acanEleman = null;

        function gorunenler() {
            return kucukResimler.filter(function (r) { return r.offsetParent !== null; });
        }

        function goster(i) {
            simdiki = (i + liste.length) % liste.length;
            const r = liste[simdiki];
            buyukResim.src = r.currentSrc || r.src;
            buyukResim.alt = r.alt;
            yazi.textContent = r.alt;
            const tek = liste.length < 2;
            kutu.querySelector('.lb-prev').hidden = tek;
            kutu.querySelector('.lb-next').hidden = tek;
        }

        function ac(resim) {
            liste = gorunenler();
            acanEleman = resim;
            goster(liste.indexOf(resim));
            kutu.hidden = false;
            document.body.style.overflow = 'hidden';
            kutu.querySelector('.lb-close').focus();
        }

        function kapat() {
            kutu.hidden = true;
            document.body.style.overflow = '';
            buyukResim.removeAttribute('src');
            if (acanEleman) acanEleman.focus();
        }

        kucukResimler.forEach(function (r) {
            r.classList.add('zoomable');
            r.tabIndex = 0;
            r.setAttribute('role', 'button');
            r.addEventListener('click', function () { ac(r); });
            r.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ac(r); }
            });
        });

        kutu.querySelector('.lb-close').addEventListener('click', kapat);
        kutu.querySelector('.lb-prev').addEventListener('click', function () { goster(simdiki - 1); });
        kutu.querySelector('.lb-next').addEventListener('click', function () { goster(simdiki + 1); });
        kutu.addEventListener('click', function (e) { if (e.target === kutu) kapat(); });

        document.addEventListener('keydown', function (e) {
            if (kutu.hidden) return;
            if (e.key === 'Escape') kapat();
            else if (e.key === 'ArrowLeft') goster(simdiki - 1);
            else if (e.key === 'ArrowRight') goster(simdiki + 1);
        });
    }
});
