import React, { useState } from 'react';
import { ProjectData } from '../types/index.ts';
import {
  CalculationPeriod,
  calculateRatio,
  formatRatioSentence,
  formatKarapinarRatioSentence,
} from '../lib/calculations.ts';
import { MapPin, TrendingUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectData;
  nationalRevenue: number;
  selectedPeriod: CalculationPeriod;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  nationalRevenue,
  selectedPeriod,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isKarapinar = project.id === 'karapinar-ges';
  const karapinarData = isKarapinar ? formatKarapinarRatioSentence(selectedPeriod) : null;

  const ratio = isKarapinar && karapinarData
    ? karapinarData.ratio
    : calculateRatio(nationalRevenue, project.costTL);

  const ratioSentence = isKarapinar && karapinarData
    ? karapinarData.sentence
    : formatRatioSentence(ratio);

  const highlightMessage = isKarapinar && karapinarData ? karapinarData.highlightMessage : undefined;

  // Çubuğun görsel doluluğu en fazla %100 olsun
  const barPercentage = Math.min(Math.max(ratio * 100, 3.9), 100);

  const isRealPhoto =
    project.id === 'samsun-icme-suyu' ||
    project.id === 'karapinar-ges' ||
    project.id === 'deprem-bolgesi-saglik';

  return (
    <article
      className={`project-card ${project.isFeatured ? 'is-featured' : 'is-standard'}`}
      tabIndex={0}
      aria-label={`${project.title}, ${project.location}`}
    >
      {!project.isFeatured && (
        <div className="card-visual-wrap standard-thumb">
          <img
            src={project.imageSrc}
            alt={project.imageAlt}
            className="card-visual-img"
            loading="lazy"
          />
          <span className="card-visual-tag">
            {isRealPhoto ? 'Gerçek Tesis Fotoğrafı' : 'Temsili Fotoğraf'}
          </span>
        </div>
      )}

      <div className="card-main-col">
        <div className="card-header-row">
          <span className="card-location">
            <MapPin size={15} aria-hidden="true" />
            <span>{project.location}</span>
          </span>
          <span className={`card-status-badge ${project.statusType}`}>
            <span className="status-dot" aria-hidden="true" />
            {project.statusBadge}
          </span>
        </div>

        <h3 className="card-title">{project.title}</h3>

        {project.note && <p className="card-note">{project.note}</p>}

        {/* 3 Mini Indicators */}
        <div className="mini-indicators-grid" aria-label="Proje göstergeleri">
          {project.indicators.map((ind, i) => (
            <div key={i} className="mini-indicator-item">
              <span className="mini-indicator-label">{ind.label}</span>
              <span className="mini-indicator-value num-tabular">{ind.value}</span>
              {ind.subLabel && (
                <span className="mini-indicator-sublabel">{ind.subLabel}</span>
              )}
            </div>
          ))}
        </div>

        {/* Highlight message for 30 days if Karapınar */}
        {highlightMessage && (
          <div className="card-highlight-alert">
            <CheckCircle2 size={16} className="highlight-icon" aria-hidden="true" />
            <span>{highlightMessage}</span>
          </div>
        )}

        {/* Ratio Bar & Ratio Sentence */}
        <div className="card-ratio-box">
          <div
            className="ratio-bar-wrap"
            role="progressbar"
            aria-valuenow={Math.round(ratio * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Seçilen döneme ait hasılatın proje maliyetine oranı"
          >
            <div
              className="ratio-bar-fill"
              style={{ width: `${barPercentage}%` }}
            />
          </div>
          <p className="ratio-sentence-text">
            <TrendingUp size={16} className="ratio-icon" aria-hidden="true" />
            <span>{ratioSentence}</span>
          </p>
        </div>

        {/* Açılır Hesap Detayı / Kaynak Bölümü */}
        {project.detailsNote && (
          <div className="card-details-accordion">
            <button
              type="button"
              className="card-details-toggle"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              aria-expanded={isDetailsOpen}
            >
              <span>Hesap Detayı ve Kur Bilgisi</span>
              <ChevronDown
                size={16}
                style={{
                  transform: isDetailsOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
                aria-hidden="true"
              />
            </button>
            {isDetailsOpen && (
              <div className="card-details-content">
                <p>{project.detailsNote}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {project.isFeatured && (
        <div className="card-visual-col">
          <div className="card-visual-wrap featured-thumb">
            <img
              src={project.imageSrc}
              alt={project.imageAlt}
              className="card-visual-img"
              loading="lazy"
            />
            <span className="card-visual-tag">
              {isRealPhoto ? 'Gerçek Tesis Fotoğrafı' : 'Temsili Fotoğraf'}
            </span>
          </div>
        </div>
      )}
    </article>
  );
};
