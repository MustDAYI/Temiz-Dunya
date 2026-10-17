import React from 'react';
import { Coins, Trees } from 'lucide-react';

interface HeaderProps {
  activeTab: 'para' | 'cevre';
  onSelectTab: (tab: 'para' | 'cevre') => void;
  isHeroDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isHeroDark = false,
}) => {
  return (
    <header className={`site-header ${isHeroDark ? 'is-hero-theme' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <button
            type="button"
            className="brand-title"
            onClick={() => onSelectTab('para')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Dumana Giden Fırsatlar Ana Sayfa"
          >
            <span className="brand-dot" aria-hidden="true" />
            <span>Dumana Giden Fırsatlar</span>
          </button>

          {/* Sadece iki bağlantı: Para ve Çevre */}
          <nav className="header-nav" aria-label="Ana Menü">
            <button
              type="button"
              id="nav-tab-para"
              className={`nav-link-btn ${activeTab === 'para' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('para')}
              aria-current={activeTab === 'para' ? 'page' : undefined}
            >
              <Coins size={16} style={{ marginRight: '6px' }} aria-hidden="true" />
              <span>Para</span>
            </button>
            <button
              type="button"
              id="nav-tab-cevre"
              className={`nav-link-btn ${activeTab === 'cevre' ? 'is-active' : ''}`}
              onClick={() => onSelectTab('cevre')}
              aria-current={activeTab === 'cevre' ? 'page' : undefined}
            >
              <Trees size={16} style={{ marginRight: '6px' }} aria-hidden="true" />
              <span>Çevre</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
