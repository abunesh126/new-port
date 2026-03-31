import React, { useState, useEffect } from 'react';
import { techStackData } from '../data/techStackData';
import type { TechItem } from '../data/techStackData';
import '../styles/TechStackPage.css';



// ── Sidebar icon SVGs ─────────────────────────────────────────────────────────
const SidebarIcon: React.FC<{ k: string }> = ({ k }) => {
  const p: Record<string, React.ReactElement> = {
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />,
    code: <><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></>,
    monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    server: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /></>,
    brain: <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.7-3.29 3 3 0 0 1-1.84-4.42A3 3 0 0 1 5 6.5a2.5 2.5 0 0 1 4.5-4.5M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.7-3.29 3 3 0 0 0 1.84-4.42A3 3 0 0 0 19 6.5a2.5 2.5 0 0 0-4.5-4.5" />,
    chart: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></>,
    cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
    wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  };
  const isFilled = k === 'star';
  return (
    <svg width="15" height="15" viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth="2">
      {p[k] ?? <circle cx="12" cy="12" r="5" />}
    </svg>
  );
};

// ── Tech Card ─────────────────────────────────────────────────────────────────
const TechCard: React.FC<{ item: TechItem; index: number; onClick: () => void }> = ({ item, index, onClick }) => (
  <button
    className="tsg-card"
    style={{ '--delay': `${index * 35}ms`, '--accent': item.fgColor } as React.CSSProperties}
    onClick={onClick}
    aria-label={`View ${item.name} details`}
  >
    <div className="tsg-card__icon-wrap" style={{ background: item.bgColor }}>
      <img src={item.iconSrc} alt={item.name} className="tsg-card__icon-img" draggable={false} />
    </div>
    <span className="tsg-card__name">{item.name}</span>
  </button>
);

// ── Skill Detail Modal ────────────────────────────────────────────────────────
const SkillModal: React.FC<{ item: TechItem; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="tsg-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="tsg-modal"
        onClick={e => e.stopPropagation()}
        style={{ '--accent': item.fgColor } as React.CSSProperties}
      >
        {/* Close */}
        <button className="tsg-modal__close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Icon + name */}
        <div className="tsg-modal__header">
          <div className="tsg-modal__icon-wrap" style={{ background: item.bgColor }}>
            <img src={item.iconSrc} alt={item.name} className="tsg-modal__icon-img" />
          </div>
          <h3 className="tsg-modal__name">{item.name}</h3>
        </div>

        {/* Description */}
        {item.description && <p className="tsg-modal__desc">{item.description}</p>}

        <div className="tsg-modal__divider" style={{ background: item.fgColor + '33' }} />

        {/* Key Achievements */}
        <h4 className="tsg-modal__kh-title">Key Achievements</h4>
        <ul className="tsg-modal__kh-list">
          {item.learned.map((pt, i) => (
            <li key={i} style={{ '--ac': item.fgColor } as React.CSSProperties}>{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── Sidebar Button ─────────────────────────────────────────────────────────────
const SidebarBtn: React.FC<{ id: string; label: string; iconKey: string; active: boolean; onClick: () => void }> = ({ id, label, iconKey, active, onClick }) => (
  <button
    id={`tsg-sb-${id}`}
    className={`tsg-sidebar__item${active ? ' tsg-sidebar__item--active' : ''}`}
    onClick={onClick} role="tab" aria-selected={active}
  >
    <span className="tsg-sidebar__item-icon"><SidebarIcon k={iconKey} /></span>
    <span className="tsg-sidebar__item-label">{label}</span>
    <svg className="tsg-sidebar__item-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9,6 15,12 9,18" />
    </svg>
  </button>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const TechStackPage: React.FC = () => {
  const { sectionTitle, sectionSubtitle, categories } = techStackData;
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? '');
  const [selected, setSelected] = useState<TechItem | null>(null);
  const [animKey, setAnimKey] = useState(0);

  const switchTab = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setAnimKey(k => k + 1);
  };

  const activeCat = categories.find(c => c.id === activeId);
  const displayItems = activeCat?.items ?? [];

  return (
    <section id="tech-stack" className="tsg-section" aria-label="Technical Skills">
      {/* BG */}
      <div className="tsg-bg" aria-hidden="true">
        <div className="tsg-bg__grid" />
        <div className="tsg-bg__glow tsg-bg__glow--blue" />
        <div className="tsg-bg__glow tsg-bg__glow--purple" />
      </div>

      <div className="tsg-container">
        <header className="tsg-header">
          <h2 className="tsg-header__title">{sectionTitle}</h2>
          <p className="tsg-header__subtitle">{sectionSubtitle}</p>
        </header>

        <div className="tsg-body">
          {/* Sidebar */}
          <aside className="tsg-sidebar" role="tablist">
            <p className="tsg-sidebar__heading">Categories</p>
            {categories.map(cat => (
              <SidebarBtn key={cat.id} id={cat.id} label={cat.label} iconKey={cat.iconKey} active={cat.id === activeId} onClick={() => switchTab(cat.id)} />
            ))}
          </aside>

          {/* Grid */}
          <div className="tsg-grid-wrap" key={animKey} role="tabpanel">

            <div className="tsg-grid">
              {displayItems.map((item, i) => (
                <TechCard key={item.name} item={item} index={i} onClick={() => setSelected(item)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && <SkillModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default TechStackPage;