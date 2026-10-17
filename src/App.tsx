import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ProjectCard } from './components/ProjectCard.tsx';
import { PersonalCalculator } from './components/PersonalCalculator.tsx';
import { EnvironmentalPage } from './components/EnvironmentalPage.tsx';
import { SourcesAccordion } from './components/SourcesAccordion.tsx';
import { Footer } from './components/Footer.tsx';
import { CalculationPeriod, getNationalRevenueForPeriod } from './lib/calculations.ts';
import { PROJECTS_DATA } from './data/projects.ts';
import { ArrowRight, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'para' | 'cevre'>('para');
  const [selectedPeriod, setSelectedPeriod] = useState<CalculationPeriod>('1day');

  const currentRevenue = getNationalRevenueForPeriod(selectedPeriod);

  const handleTabChange = (tab: 'para' | 'cevre') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-wrapper">
      {/* Top Header - exactly two links: Para and Çevre */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        isHeroDark={activeTab === 'para'}
      />

      <main id="main-content">
        {activeTab === 'para' ? (
          <div className="money-page" id="para-sayfasi">
            {/* The ONLY dark section: HERO */}
            <Hero
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />

            {/* Light Paper Background Section */}
            <section className="main-content-section" aria-labelledby="projects-heading">
              <div className="container">
                <div className="section-head">
                  <span className="section-badge">
                    <Sparkles size={14} aria-hidden="true" />
                    Ölçek Karşılaştırması
                  </span>
                  <h2 id="projects-heading" className="section-title">
                    Aynı para, başka karşılıklar
                  </h2>
                  <p className="section-sub">
                    Seçtiğin süredeki hasılat tutarının açıklanmış kamu yatırımlarıyla karşılaştırması.
                    (Bu bir ölçek kıyaslamasıdır; doğrudan yatırım önerisi veya tahsis iddiası değildir.)
                  </p>
                </div>

                {/* 4 Cards Grid (Featured card is larger) */}
                <div className="projects-grid">
                  {PROJECTS_DATA.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      nationalRevenue={currentRevenue}
                      selectedPeriod={selectedPeriod}
                    />
                  ))}
                </div>

                {/* Optional Collapsible Personal Calculator */}
                <PersonalCalculator />

                {/* Page 1 CTA to Page 2 */}
                <div className="cta-row">
                  <button
                    type="button"
                    id="btn-goto-environment"
                    className="btn-primary-action"
                    onClick={() => handleTabChange('cevre')}
                  >
                    <span>Çevredeki izi gör</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* Page 2: Çevre */
          <EnvironmentalPage onBackToMoney={() => handleTabChange('para')} />
        )}

        {/* Veri Kaynakları ve Yöntem Açıklamaları (Her iki sayfada da mevcut) */}
        <SourcesAccordion />
      </main>

      {/* Alt Bilgi */}
      <Footer />
    </div>
  );
};

export default App;
