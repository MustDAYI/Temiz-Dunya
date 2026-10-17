# Temiz Dünya / Dumana Giden Fırsatlar

> **Gönüllülük Çalışması · Türkiye**  
> Amaç sigara kullananları suçlamak değil; sigaraya ayrılan paranın fırsat maliyetini ve izmaritin çevresel izini birkaç dakikada anlaşılır kılmaktır.  
> **Hazırlayan:** Mustafa Dayıbaş · Gönüllülük Çalışması

---

## 🚀 Proje Hakkında ve Tasarım Felsefesi: "Anti-Gravite"
- **Hafif ve Ağırlıksız:** Duman yere çökmez, yukarı yükselir. Para dumana gittiğinde kaybolurken; aynı kaynak suya, tarıma ve sağlığa dönüştüğünde hafifler ve toplumu yukarı taşır.
- **Yüzey Dengesi:** Sayfa yüzeylerinin yaklaşık %80'i kırık beyaz (`#F6F8F2`) ve koyu mürekkep (`#14271D`); yeşil yalnızca vurgu öğelerinde (büyük sayılar, birincil buton, oran çubuğu) kullanılmıştır. Tek koyu bölüm Hero alanıdır.
- **Duyarlı ve Erişilebilir:** 320 px mobil ekranlardan 1440 px+ masaüstü ekranlara kadar sıfır yatay taşma, WCAG AA renk kontrastı, `prefers-reduced-motion` tam desteği ve en az 44 px dokunma hedefleri.
- **Objektif Dil:** Ahlak dersi, utandırma, "bu tesis yapılır" gibi spekülatif veya "bıraktın kazandın" gibi yönlendirici ifadeler içermez; saf oran ve ölçek kıyaslaması sunar.

---

## 🛠️ Teknolojiler
- **React 18 + TypeScript + Vite**
- **Vanilla CSS (Özel Tasarım Sistemi & CSS Değişkenleri)**
- **Vitest** (Arayüzden bağımsız çalışan saf hesaplama testleri)
- **Lucide React** (Tutarlı çizgi kalınlığında vektör ikonlar)
- **Statik Barındırmaya Uygun Çıktı:** Backend, veritabanı veya üyelik gerektirmez.

---

## 📦 Kurulum ve Çalıştırma

### 1. Gereksinimler
- Node.js (v18 veya üzeri önerilir)
- npm veya pnpm / yarn

### 2. Bağımlılıkları Yükleme
```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```
Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

### 4. Testleri Çalıştırma
Tüm parasal oranlar, kişisel harcama fonksiyonları ve çevresel ölçek formülleri saf fonksiyonlar (`calculations.ts`) içinde test edilmiştir:
```bash
npm test
```

### 5. Statik Üretim Derlemesi (Build)
```bash
npm run build
```
Derleme çıktısı `dist/` klasörüne aktarılır.

---

## 🌐 Yayına Alma (Deployment) & Canva QR Kodu

Bu proje saf statik bir ön yüz uygulaması olduğundan dilediğiniz platformda tek tıkla ücretsiz yayınlanabilir:

### Seçenek A: Vercel / Netlify ile Yayınlama (Önerilen)
1. Projeyi GitHub reponuza yükleyin.
2. [vercel.com](https://vercel.com) veya [netlify.com](https://netlify.com) üzerinde `New Project` diyerek GitHub reponuzu seçin.
3. Derleme komutu (`npm run build`) ve çıktı klasörü (`dist`) otomatik algılanır.
4. `Deploy` butonuna tıkladığınızda projeniz birkaç saniye içinde canlıya alınır (Örn: `https://temiz-dunya.vercel.app`).
5. Bu bağlantıyı Canva'da **Uygulamalar > QR Kod** aracına yapıştırarak afiş veya broşürleriniz için QR kod üretebilirsiniz.

### Seçenek B: GitHub Pages ile Yayınlama
1. GitHub reponuzda **Settings > Pages** sekmesine gidin.
2. Source olarak **GitHub Actions** seçin ve Vite şablonunu etkinleştirin.
3. Dağıtım tamamlandığında `https://kullaniciadi.github.io/repo-adi/` adresinden yayınlanacaktır.

---

## 📊 Veri Güncelleme Rehberi

Tüm veriler modüler ve tek merkezden yönetilebilir şekilde ayrıştırılmıştır:

1. **Yıllık Hasılat Verisi (`src/lib/calculations.ts`):**
   - Yeni TADAB tütün iç satış verisi açıklandığında:
     ```typescript
     export const TADAB_2025_ANNUAL_REVENUE = 695_220_183_645; // Yeni tutarı buraya girin
     ```
   - Günlük, haftalık ve 30 günlük ortalamalar otomatik olarak tam hassasiyetle hesaplanacaktır.

2. **Karşılaştırma Projeleri (`src/data/projects.ts`):**
   - Projelerin maliyet tutarları (`costTL`), tamamlanma durumları (`statusBadge`) veya yeni proje eklemeleri bu dosyadaki nesnelere eklenir.

3. **Kaynak ve Yöntem Notları (`src/data/sources.ts`):**
   - Rapor bağlantıları, resmi açıklamalar ve son kontrol tarihi (`LAST_VERIFIED_DATE`) buradan güncellenir.

4. **Çevresel Göstergeler (`src/data/environmental.ts`):**
   - DSÖ ve UNEP resmi verilerine dayanan izmarit, toksik atık, mikroplastik ve su ayak izi parametreleri bu dosyada yer alır.

---

## ⚖️ Yasal Uyarı ve Bağımsızlık Beyanı
Parasal karşılıklar, açıklanmış yatırım tutarlarıyla yapılan ölçek karşılaştırmalarıdır; doğrudan bir yatırım vaadi veya tahsis iddiası anlamına gelmez. Bu çalışma hiçbir kamu veya özel kurum ortaklığı ya da onayı içermez; bilgilendirme ve farkındalık amaçlı bağımsız bir gönüllülük çalışmasıdır.
