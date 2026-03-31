import React, { useState } from 'react';
import { techStackData } from '../data/techStackData';
import type { TechItem, TechCategory } from '../data/techStackData';
import '../styles/TechStackPage.css';

// ─── Sidebar Icon (simple SVG outlines) ───────────────────────────────────────

const SidebarIcon: React.FC<{ iconKey: string }> = ({ iconKey }) => {
  switch (iconKey) {
    case 'code':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" />
        </svg>
      );
    case 'monitor':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      );
    case 'brain':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.7-3.29 3 3 0 0 1-1.84-4.42A3 3 0 0 1 5 6.5a2.5 2.5 0 0 1 4.5-4.5" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.7-3.29 3 3 0 0 0 1.84-4.42A3 3 0 0 0 19 6.5a2.5 2.5 0 0 0-4.5-4.5" />
        </svg>
      );
    case 'server':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'database':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'wrench':
      return (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    default:
      return <span style={{ fontSize: '13px' }}>{iconKey[0].toUpperCase()}</span>;
  }
};

// ─── Tech Skill Card ──────────────────────────────────────────────────────────

interface TechCardProps {
  item: TechItem;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ item, index }) => (
  <div
    className="tsg-card"
    style={{ '--delay': `${index * 50}ms`, '--accent': item.fgColor } as React.CSSProperties}
    aria-label={item.name}
  >
    {/* Front */}
    <div className="tsg-card__face tsg-card__face--front">
      <div className="tsg-card__icon-wrap" style={{ background: item.bgColor }}>
        <img
          src={item.iconSrc}
          alt={item.name}
          className="tsg-card__icon-img"
          draggable={false}
        />
      </div>
      <span className="tsg-card__name">{item.name}</span>
    </div>

    {/* Back — "What I've Learned" */}
    <div
      className="tsg-card__face tsg-card__face--back"
      style={{ borderColor: item.fgColor + '66' }}
    >
      <p className="tsg-card__learned-title">What I&apos;ve Learned</p>
      <ul className="tsg-card__learned-list">
        {item.learned.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  </div>
);

// ─── Sidebar Category Item ────────────────────────────────────────────────────

interface SidebarItemProps {
  cat: TechCategory;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ cat, active, onClick }) => (
  <button
    id={`tsg-sidebar-${cat.id}`}
    className={`tsg-sidebar__item${active ? ' tsg-sidebar__item--active' : ''}`}
    onClick={onClick}
    role="tab"
    aria-selected={active}
    aria-controls={`tsg-panel-${cat.id}`}
  >
    <span className="tsg-sidebar__item-icon">
      <SidebarIcon iconKey={cat.iconKey} />
    </span>
    <span className="tsg-sidebar__item-label">{cat.label}</span>
    <svg
      className="tsg-sidebar__item-chevron"
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
    >
      <polyline points="9,6 15,12 9,18" />
    </svg>
  </button>
);

// ─── Main TechStackPage ───────────────────────────────────────────────────────

const TechStackPage: React.FC = () => {
  const { sectionTitle, sectionSubtitle, categories } = techStackData;
  const [activeId, setActiveId] = useState(categories[0].id);
  const [animKey, setAnimKey] = useState(0);

  const handleSwitch = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setAnimKey((k) => k + 1);
  };

  const activeCategory = categories.find((c) => c.id === activeId)!;

  return (
    <section id="tech-stack" className="tsg-section" aria-label="Technical Skills">

      {/* Background */}
      <div className="tsg-bg" aria-hidden="true">
        <div className="tsg-bg__grid" />
        <div className="tsg-bg__glow tsg-bg__glow--blue" />
        <div className="tsg-bg__glow tsg-bg__glow--purple" />
      </div>

      <div className="tsg-container">

        {/* Header */}
        <header className="tsg-header">
          <h2 className="tsg-header__title">{sectionTitle}</h2>
          <p className="tsg-header__subtitle">{sectionSubtitle}</p>
        </header>

        {/* Body */}
        <div className="tsg-body">

          {/* Sidebar */}
          <aside
            className="tsg-sidebar"
            role="tablist"
            aria-label="Technology categories"
          >
            <p className="tsg-sidebar__heading">Categories</p>
            {categories.map((cat) => (
              <SidebarItem
                key={cat.id}
                cat={cat}
                active={cat.id === activeId}
                onClick={() => handleSwitch(cat.id)}
              />
            ))}
          </aside>

          {/* Grid */}
          <div
            id={`tsg-panel-${activeId}`}
            className="tsg-grid-wrap"
            key={animKey}
            role="tabpanel"
            aria-labelledby={`tsg-sidebar-${activeId}`}
          >
            <div className="tsg-grid">
              {activeCategory.items.map((item, i) => (
                <TechCard key={item.name} item={item} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStackPage;