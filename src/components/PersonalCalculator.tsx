import React, { useState, useId } from 'react';
import {
  calculatePersonalSpending,
  parseTurkishNumber,
} from '../lib/calculations.ts';
import {
  Calculator,
  ShieldCheck,
  HelpCircle,
  Coins,
  Trash2,
  Droplet,
  Sparkles,
} from 'lucide-react';

export const PersonalCalculator: React.FC = () => {
  const [cigarettesPerDay, setCigarettesPerDay] = useState<number>(20);
  const [priceInput, setPriceInput] = useState<string>('120');
  const [periodDays, setPeriodDays] = useState<number>(30);

  const cigSliderId = useId();
  const priceInputId = useId();
  const periodSelectId = useId();

  const parsedPrice = parseTurkishNumber(priceInput);
  const isPriceValid = parsedPrice !== null && parsedPrice > 0;

  // Hesaplamalar
  const monthlyCalc = isPriceValid
    ? calculatePersonalSpending(cigarettesPerDay, parsedPrice, 30, 20)
    : null;

  const annualCalc = isPriceValid
    ? calculatePersonalSpending(cigarettesPerDay, parsedPrice, 365, 20)
    : null;

  // Yıllık izmarit ve su ayak izi (DSÖ 3,7 litre / sigara)
  const annualButts = cigarettesPerDay * 365;
  const annualWaterLiters = Math.round(annualButts * 3.7);

  const presets = [
    { label: 'İçmiyorum (0)', count: 0 },
    { label: 'Yarım Paket (10)', count: 10 },
    { label: '1 Paket (20)', count: 20 },
    { label: '1,5 Paket (30)', count: 30 },
    { label: '2 Paket (40)', count: 40 },
  ];

  return (
    <section className="calculator-section" aria-labelledby="calc-title">
      <div className="simulator-card">
        <div className="simulator-header">
          <div className="sim-badge">
            <Calculator size={15} aria-hidden="true" />
            <span>Kişisel Simülatör</span>
          </div>
          <h3 id="calc-title" className="simulator-title">
            Sigara Tüketimi ve Fırsat Maliyeti Simülatörü
          </h3>
          <p className="simulator-sub">
            Kendi tüketim düzeyinizi belirleyin; dumanla birlikte giden bütçenin, yıllık izmarit atığının ve su ayak izinin boyutunu keşfedin.
          </p>
        </div>

        {/* Preset Butonları */}
        <div className="sim-presets-row" role="group" aria-label="Hızlı sigara tüketim seçimleri">
          {presets.map((preset) => (
            <button
              key={preset.count}
              type="button"
              className={`sim-preset-btn ${cigarettesPerDay === preset.count ? 'is-active' : ''}`}
              onClick={() => setCigarettesPerDay(preset.count)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Giriş Alanları */}
        <div className="sim-controls-grid">
          {/* Slider & Adet */}
          <div className="sim-field-box">
            <div className="sim-field-header">
              <label htmlFor={cigSliderId} className="sim-label">
                Günde Kaç Adet Sigara?
              </label>
              <span className="sim-counter-pill num-tabular">
                {cigarettesPerDay === 0 ? '0 Sigara' : `${cigarettesPerDay} Sigara (${(cigarettesPerDay / 20).toFixed(1)} Paket)`}
              </span>
            </div>
            <input
              id={cigSliderId}
              type="range"
              min="0"
              max="60"
              step="1"
              value={cigarettesPerDay}
              onChange={(e) => setCigarettesPerDay(Number(e.target.value))}
              className="sim-slider"
              aria-valuemin={0}
              aria-valuemax={60}
              aria-valuenow={cigarettesPerDay}
            />
            <div className="sim-slider-marks">
              <span>0 (İçmiyorum)</span>
              <span>20 (1 Paket)</span>
              <span>40 (2 Paket)</span>
              <span>60 (3 Paket)</span>
            </div>
          </div>

          {/* Paket Fiyatı */}
          <div className="sim-field-box">
            <label htmlFor={priceInputId} className="sim-label">
              Paket Fiyatı (TL)
            </label>
            <input
              id={priceInputId}
              type="text"
              inputMode="decimal"
              className="calc-input num-tabular"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="120"
            />
            <span className="calc-help-text">
              Ortalama paket bedeli (Türkçe virgül veya nokta geçerlidir)
            </span>
          </div>

          {/* Karşılaştırma Süresi */}
          <div className="sim-field-box">
            <label htmlFor={periodSelectId} className="sim-label">
              Öncelikli Süre
            </label>
            <select
              id={periodSelectId}
              className="calc-select"
              value={periodDays}
              onChange={(e) => setPeriodDays(Number(e.target.value))}
            >
              <option value={30}>30 Gün (1 Ay)</option>
              <option value={7}>1 Hafta (7 Gün)</option>
              <option value={1}>1 Gün</option>
              <option value={365}>1 Yıl (365 Gün)</option>
            </select>
            <span className="calc-help-text">
              Hesaplama periyodunu belirleyin
            </span>
          </div>
        </div>

        {/* Sonuç Kartları */}
        {isPriceValid && monthlyCalc && annualCalc ? (
          <div className="sim-results-grid">
            {cigarettesPerDay === 0 ? (
              <div className="sim-zero-banner">
                <Sparkles size={22} color="var(--water)" aria-hidden="true" />
                <div>
                  <strong>Bu kullanım düzeyinde sigara tüketiminiz bulunmuyor.</strong>
                  <p>Herhangi bir tütün harcamanız, doğaya izmarit atığınız veya üretim kaynaklı su tüketiminiz oluşmamaktadır.</p>
                </div>
              </div>
            ) : (
              <>
                {/* 30 Günlük Harcama */}
                <div className="sim-stat-card">
                  <div className="sim-stat-icon-wrap" style={{ background: '#E4F1E8', color: '#0D2D22' }}>
                    <Coins size={20} aria-hidden="true" />
                  </div>
                  <span className="sim-stat-title">30 Günlük Harcama</span>
                  <span className="sim-stat-value num-tabular">
                    {new Intl.NumberFormat('tr-TR').format(Math.round(monthlyCalc.totalSpent))} TL
                  </span>
                  <span className="sim-stat-desc">
                    Günde {cigarettesPerDay} sigara ile 1 aylık doğrudan nakit tutar.
                  </span>
                </div>

                {/* 1 Yıllık Harcama */}
                <div className="sim-stat-card">
                  <div className="sim-stat-icon-wrap" style={{ background: '#FEF7EE', color: '#AB7844' }}>
                    <Coins size={20} aria-hidden="true" />
                  </div>
                  <span className="sim-stat-title">1 Yıllık Harcama</span>
                  <span className="sim-stat-value num-tabular">
                    {new Intl.NumberFormat('tr-TR').format(Math.round(annualCalc.totalSpent))} TL
                  </span>
                  <span className="sim-stat-desc">
                    365 günlük toplam tütün bütçesi fırsat maliyeti.
                  </span>
                </div>

                {/* Yıllık İzmarit */}
                <div className="sim-stat-card">
                  <div className="sim-stat-icon-wrap" style={{ background: '#FDF2F2', color: '#9B1C1C' }}>
                    <Trash2 size={20} aria-hidden="true" />
                  </div>
                  <span className="sim-stat-title">Yıllık İzmarit Atığı</span>
                  <span className="sim-stat-value num-tabular">
                    {new Intl.NumberFormat('tr-TR').format(annualButts)} Adet
                  </span>
                  <span className="sim-stat-desc">
                    Plastik bazlı selüloz asetat içeren filtrelerin doğadaki potansiyel izi.
                  </span>
                </div>

                {/* Tütün Su Ayak İzi */}
                <div className="sim-stat-card">
                  <div className="sim-stat-icon-wrap" style={{ background: '#EDF4F7', color: '#287D80' }}>
                    <Droplet size={20} aria-hidden="true" />
                  </div>
                  <span className="sim-stat-title">Gizli Su Ayak İzi</span>
                  <span className="sim-stat-value num-tabular">
                    {new Intl.NumberFormat('tr-TR').format(annualWaterLiters)} Litre
                  </span>
                  <span className="sim-stat-desc">
                    Tarladan pakete tütün üretiminde tüketilen su (DSÖ: 3,7 L / sigara).
                  </span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="calc-result-box has-error">
            <HelpCircle size={18} aria-hidden="true" />
            <span>Lütfen geçerli bir paket fiyatı giriniz (örn. 120 TL).</span>
          </div>
        )}

        <div className="calc-privacy-note">
          <ShieldCheck size={16} color="var(--water)" aria-hidden="true" />
          <span>
            Gizlilik Taahhüdü: Simülatöre girdiğiniz kullanım alışkanlıkları tamamen tarayıcınızda işlenir; hiçbir sunucuya iletilmez veya kaydedilmez.
          </span>
        </div>
      </div>
    </section>
  );
};
