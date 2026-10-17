import React, { useState } from 'react';
import { ENVIRONMENTAL_FACTS } from '../data/environmental.ts';
import { FootballPitchGraphic } from './FootballPitchGraphic.tsx';
import { calculateFootballPitchEquivalence } from '../lib/calculations.ts';
import { ArrowLeft, ChevronDown, Sparkles, AlertCircle } from 'lucide-react';

interface EnvironmentalPageProps {
  onBackToMoney: () => void;
}

export const EnvironmentalPage: React.FC<EnvironmentalPageProps> = ({ onBackToMoney }) => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const pitchCalc = calculateFootballPitchEquivalence();

  return (
    <div className="environmental-page" id="cevre-sayfasi">
      {/* Page Title & Main Stat */}
      <section className="main-content-section" style={{ paddingBottom: '32px' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-badge">
              <Sparkles size={14} aria-hidden="true" />
              Gönüllülük Çalışması · Çevresel İz
            </span>
            <h1 className="section-title">
              Sigara bitiyor. Çevredeki izi kalıyor.
            </h1>
            <p className="section-sub">
              Dumanın dağılmasıyla sona ermeyen; toprakta, suda ve ekosistemde yıllarca süren fiziksel ve kimyasal izler.
            </p>
          </div>

          {/* Ana İstatistik Kartı */}
          <div className="environmental-hero-stat-card">
            <span className="env-stat-badge">Küresel Yıllık Tahmin</span>
            <div className="env-mega-number num-tabular">
              Yılda yaklaşık 4,5 trilyon
            </div>
            <p className="env-source-caption">
              izmarit çevreye atılıyor. (DSÖ küresel tahmini, 2022)
            </p>

            <div style={{ marginTop: '24px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
              <div className="card-visual-wrap standard-thumb" style={{ height: '240px', borderRadius: '16px' }}>
                <img
                  src="./assets/turkiye_kul_tablasi_degildir.jpg"
                  alt="Fotoğraf: Türkiye Kül Tablası Değildir! - Pet şişelere toplanmış binlerce izmarit atığı çevre farkındalığı"
                  className="card-visual-img"
                  loading="lazy"
                />
                <span className="card-visual-tag">Türkiye'den Gerçek Farkındalık Örneği</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '8px' }}>
                "Türkiye Kül Tablası Değildir!" — Sokaklardan ve doğadan toplanarak pet şişelere doldurulan on binlerce izmaritin oluşturduğu somut atık dağı.
              </p>
            </div>
          </div>

          {/* İkinci Büyük Sayı ve Saha Ölçeği */}
          <div className="pitch-scale-container">
            <div className="pitch-header-box">
              <h2 className="pitch-number-stat num-tabular">
                Yan yana dizildiğinde yaklaşık 101 bin futbol sahası büyüklüğünde yer.
              </h2>
              <p className="pitch-subtext">
                Ölçülmüş alan değil, ölçek hesabıdır.
              </p>
            </div>

            {/* Vektörel Saha Görseli */}
            <FootballPitchGraphic />

            {/* Hesabı Gör Açılır Bölümü */}
            <div className="scale-calc-accordion">
              <button
                type="button"
                id="pitch-calc-toggle"
                className="scale-accordion-btn"
                onClick={() => setIsCalcOpen(!isCalcOpen)}
                aria-expanded={isCalcOpen}
                aria-controls="pitch-calc-details"
              >
                <span>Hesabı gör (Matematiksel Açıklama)</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isCalcOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                  aria-hidden="true"
                />
              </button>

              {isCalcOpen && (
                <div id="pitch-calc-details" className="scale-calc-content" role="region" aria-labelledby="pitch-calc-toggle">
                  <p>
                    <strong>Hesaplama Adımları ve Standartlar:</strong>
                  </p>
                  <code className="calc-formula-step">
                    4,5 trilyon × (2 cm × 0,8 cm) = 720 km²; saha 105 × 68 m = 7.140 m²; ≈ 100.840 ≈ 101 bin.
                  </code>
                  <p style={{ marginTop: '8px' }}>
                    1. Standart tek bir sigara izmariti yatay izdüşümü: 0,02 m × 0,008 m = 0,00016 m².
                    <br />
                    2. Küresel yıllık 4,5 trilyon adet izmarit alanı: 4,5 × 10¹² × 0,00016 m² = {pitchCalc.totalButtAreaM2.toLocaleString('tr-TR')} m² (720 km²).
                    <br />
                    3. Uluslararası standart futbol sahası boyutu: 105 m × 68 m = {pitchCalc.pitchAreaM2.toLocaleString('tr-TR')} m².
                    <br />
                    4. Eşdeğer saha sayısı: 720.000.000 / 7.140 = {pitchCalc.pitchCountExact.toFixed(2)} ≈ 100.840 ≈ <strong>101 bin futbol sahası</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dört Kısa Kart */}
          <div className="env-facts-grid">
            {ENVIRONMENTAL_FACTS.map((fact) => (
              <div key={fact.id} className="env-fact-card" tabIndex={0}>
                {fact.id === 'filter-material' && (
                  <div className="card-visual-wrap standard-thumb" style={{ height: '140px', marginBottom: '14px' }}>
                    <img
                      src="./assets/cigarette_butt_macro.jpg"
                      alt="Makro fotoğraf: Ayrışmayan selüloz asetat plastik lifleri içeren izmarit filtresi yapısı"
                      className="card-visual-img"
                      loading="lazy"
                    />
                    <span className="card-visual-tag">Makro Detay</span>
                  </div>
                )}
                <span className="fact-badge">
                  <AlertCircle size={15} aria-hidden="true" />
                  {fact.badge}
                </span>
                <h3 className="fact-title num-tabular">{fact.title}</h3>
                <p className="fact-desc">{fact.description}</p>
                <p className="fact-detail">{fact.detail}</p>
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  Kaynak: {fact.sourceNote}
                </div>
              </div>
            ))}
          </div>

          {/* CTA: Geri Dön */}
          <div className="cta-row">
            <button
              type="button"
              className="btn-secondary-action"
              onClick={onBackToMoney}
              id="btn-return-money"
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>← Para karşılıklarına dön</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
