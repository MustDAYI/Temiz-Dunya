import React, { useState } from 'react';
import { SOURCES_LIST, COMMON_DISCLAIMER_NOTE, LAST_VERIFIED_DATE } from '../data/sources.ts';
import { BookOpen, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

export const SourcesAccordion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="sources-section" aria-label="Veri Kaynakları ve Yöntem Notları">
      <div className="container">
        <div className="sources-box">
          <button
            type="button"
            id="sources-accordion-trigger"
            className="sources-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="sources-accordion-content"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={20} color="var(--water)" aria-hidden="true" />
              <span>Veri Kaynakları, Yöntem ve Açıklamalar</span>
            </span>
            <ChevronDown
              size={20}
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div id="sources-accordion-content" className="sources-content" role="region" aria-labelledby="sources-accordion-trigger">
              {/* Ortak Yöntem Notu */}
              <div className="sources-common-note">
                <p>
                  <strong>Önemli Yöntem Notu: </strong>
                  {COMMON_DISCLAIMER_NOTE}
                </p>
              </div>

              {/* Kaynaklar Listesi */}
              <ul className="sources-list">
                {SOURCES_LIST.map((source) => (
                  <li key={source.id} className="source-item">
                    <div className="source-item-header">
                      <span className="source-item-title">{source.title}</span>
                      <span className="source-item-date">{source.organization} · {source.date}</span>
                    </div>
                    <p className="source-item-desc">{source.description}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-item-link"
                    >
                      <span>Resmi Kaynağı İncele</span>
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="sources-footer-meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--water)" aria-hidden="true" />
                  Son kontrol: {LAST_VERIFIED_DATE}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
