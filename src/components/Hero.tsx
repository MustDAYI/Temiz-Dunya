import React from 'react';
import { CalculationPeriod, getNationalRevenueForPeriod, formatCurrencyFull, formatRevenueShort } from '../lib/calculations.ts';
import { Sparkles, Calendar } from 'lucide-react';

interface HeroProps {
  selectedPeriod: CalculationPeriod;
  onPeriodChange: (period: CalculationPeriod) => void;
}

export const Hero: React.FC<HeroProps> = ({ selectedPeriod, onPeriodChange }) => {
  const currentRevenue = getNationalRevenueForPeriod(selectedPeriod);
  const formattedFull = formatCurrencyFull(currentRevenue);
  const formattedShort = formatRevenueShort(currentRevenue);

  return (
    <section className="hero-section" aria-labelledby="hero-main-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} aria-hidden="true" />
              <span>Gönüllülük Çalışması · Tütün Fırsat Maliyeti</span>
            </div>

            <h1 id="hero-main-title" className="hero-title">
              <span className="hero-title-gradient-full">
                Bir Paket Sigaranın Görünmeyen Maliyeti
              </span>
            </h1>

            <p className="hero-description">
              Tütün tüketiminin hem kişisel bütçedeki hem de doğadaki gerçek karşılığını keşfedin: Dumana savrulan her kaynak, temiz suya, verimli toprağa ve toplum sağlığına kök salabilecek somut bir fırsattır.
            </p>

            <div className="hero-revenue-box">
              <div className="revenue-period-selector" role="tablist" aria-label="Zaman dilimi seçimi">
                <button
                  type="button"
                  role="tab"
                  id="tab-1day"
                  aria-selected={selectedPeriod === '1day'}
                  className={`period-tab-btn ${selectedPeriod === '1day' ? 'is-active' : ''}`}
                  onClick={() => onPeriodChange('1day')}
                >
                  <Calendar size={14} style={{ marginRight: '6px' }} aria-hidden="true" />
                  1 Gün
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-7days"
                  aria-selected={selectedPeriod === '7days'}
                  className={`period-tab-btn ${selectedPeriod === '7days' ? 'is-active' : ''}`}
                  onClick={() => onPeriodChange('7days')}
                >
                  <Calendar size={14} style={{ marginRight: '6px' }} aria-hidden="true" />
                  1 Hafta
                </button>
                <button
                  type="button"
                  role="tab"
                  id="tab-30days"
                  aria-selected={selectedPeriod === '30days'}
                  className={`period-tab-btn ${selectedPeriod === '30days' ? 'is-active' : ''}`}
                  onClick={() => onPeriodChange('30days')}
                >
                  <Calendar size={14} style={{ marginRight: '6px' }} aria-hidden="true" />
                  30 Gün
                </button>
              </div>

              <div className="hero-number-display">
                <span className="hero-number-main num-tabular">
                  {formattedFull}
                </span>
                <span className="hero-number-sub">
                  ({formattedShort}) — Türkiye genelinde sigara iç satış hasılatından hesaplanan {selectedPeriod === '1day' ? 'günlük' : selectedPeriod === '7days' ? 'haftalık' : '30 günlük'} ortalama
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual-col">
            <div className="hero-visual-card">
              <div className="hero-img-wrap">
                <img
                  src="./assets/samsun_19mayis_baraj_sulama.jpg"
                  alt="Kapak Fotoğrafı: Samsun 19 Mayıs Barajı gövdesi, göl rezervuarı ve çevresindeki verimli doğa"
                  className="hero-img"
                  loading="eager"
                />
              </div>
              <p className="hero-visual-caption">
                Kapak Fotoğrafı · 19 Mayıs Barajı ve Su Havzası, Samsun — Sigaraya ayrılan kaynağın topluma dönüşebileceği devasa ölçek
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
