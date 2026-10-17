import React, { useState } from 'react';
import { Eye, Grid } from 'lucide-react';

export const FootballPitchGraphic: React.FC = () => {
  const [viewMode, setViewMode] = useState<'photo' | 'vector'>('photo');

  return (
    <div className="pitch-graphic-wrapper">
      <div className="pitch-view-toggle-bar">
        <button
          type="button"
          className={`pitch-mode-btn ${viewMode === 'photo' ? 'is-active' : ''}`}
          onClick={() => setViewMode('photo')}
        >
          <Eye size={14} aria-hidden="true" />
          <span>Gerçek Saha Fotoğrafı</span>
        </button>
        <button
          type="button"
          className={`pitch-mode-btn ${viewMode === 'vector' ? 'is-active' : ''}`}
          onClick={() => setViewMode('vector')}
        >
          <Grid size={14} aria-hidden="true" />
          <span>Vektörel Ölçek Şeması</span>
        </button>
      </div>

      {viewMode === 'photo' ? (
        <div className="pitch-photo-container">
          <img
            src="./assets/football_pitch_photo.jpg"
            alt="Fotoğraf: 105 × 68 metre standartlarında profesyonel futbol stadyumu ve çim sahası"
            className="pitch-photo-img"
          />
          <div className="pitch-photo-badge">
            1 Standart Saha: 7.140 m² (105 × 68 m)
          </div>
        </div>
      ) : (
        <svg
          viewBox="0 0 800 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pitch-svg-stage"
          aria-hidden="true"
        >
          {/* Soft Background */}
          <rect width="800" height="480" rx="16" fill="#F6F8F2" />

          {/* Dense dots matrix around the pitch representing the scale of butts */}
          <defs>
            <pattern id="scaleDots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.5" fill="#287D80" opacity="0.35" />
            </pattern>
            <pattern id="microPitchGrid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="none" stroke="#D3DFD5" strokeWidth="0.5" opacity="0.6" />
            </pattern>
          </defs>

          {/* Dot field representing scale */}
          <rect x="20" y="20" width="760" height="440" rx="12" fill="url(#scaleDots)" opacity="0.75" />

          {/* Clear center backdrop for single pitch */}
          <rect x="120" y="70" width="560" height="340" rx="10" fill="#FFFFFF" stroke="#D3DFD5" strokeWidth="1.5" />
          <rect x="120" y="70" width="560" height="340" fill="url(#microPitchGrid)" />

          {/* Football pitch boundaries */}
          <rect
            x="150"
            y="90"
            width="500"
            height="300"
            rx="4"
            fill="#E4F1E8"
            fillOpacity="0.45"
            stroke="#0D2D22"
            strokeWidth="3"
          />

          {/* Halfway line */}
          <line x1="400" y1="90" x2="400" y2="390" stroke="#0D2D22" strokeWidth="2.5" />

          {/* Center circle & spot */}
          <circle cx="400" cy="240" r="50" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <circle cx="400" cy="240" r="3.5" fill="#0D2D22" />

          {/* Left Penalty Area */}
          <rect x="150" y="160" width="85" height="160" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <rect x="150" y="195" width="35" height="90" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <path d="M 235 210 A 45 45 0 0 1 235 270" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <circle cx="210" cy="240" r="3" fill="#0D2D22" />

          {/* Right Penalty Area */}
          <rect x="565" y="160" width="85" height="160" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <rect x="615" y="195" width="35" height="90" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <path d="M 565 210 A 45 45 0 0 0 565 270" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <circle cx="590" cy="240" r="3" fill="#0D2D22" />

          {/* Corner Arcs */}
          <path d="M 150 102 A 12 12 0 0 1 162 90" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <path d="M 150 378 A 12 12 0 0 0 162 390" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <path d="M 638 90 A 12 12 0 0 1 650 102" stroke="#0D2D22" strokeWidth="2" fill="none" />
          <path d="M 638 390 A 12 12 0 0 0 650 378" stroke="#0D2D22" strokeWidth="2" fill="none" />

          {/* Goal Mouths */}
          <rect x="138" y="215" width="12" height="50" stroke="#0D2D22" strokeWidth="2" fill="#FFFFFF" />
          <rect x="650" y="215" width="12" height="50" stroke="#0D2D22" strokeWidth="2" fill="#FFFFFF" />
        </svg>
      )}

      <p className="pitch-caption-tag">
        Temsili görsel · 1 standart futbol sahası (105 × 68 m = 7.140 m²) ölçeği üzerinden 100.840 adet eşdeğer saha alanı hesaplanmıştır.
      </p>
    </div>
  );
};
