import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techStackData } from '../data/techStackData';
import type { TechItem, TechCategory } from '../data/techStackData';
import '../styles/TechStack.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURED_COUNT = 12;

// ─── Flat list of all skills for "featured" view ──────────────────────────────

const ALL_SKILLS: TechItem[] = techStackData.categories.flatMap(c => c.items);

// Hand-pick 12 most recognisable skills as featured
const FEATURED_SKILLS: TechItem[] = (() => {
  const picks = [
    'Python','JavaScript','TypeScript','React','Next.js','TensorFlow',
    'FastAPI','Node.js','MongoDB','Docker','Tailwind CSS','Scikit-learn',
  ];
  const found: TechItem[] = [];
  for (const name of picks) {
    const s = ALL_SKILLS.find(i => i.name === name);
    if (s) found.push(s);
    if (found.length === FEATURED_COUNT) break;
  }
  // fill remaining slots if any
  if (found.length < FEATURED_COUNT) {
    for (const s of ALL_SKILLS) {
      if (!found.includes(s)) { found.push(s); if (found.length === FEATURED_COUNT) break; }
    }
  }
  return found;
})();

// ─── SVG sidebar icons ────────────────────────────────────────────────────────

const SvgIcon: React.FC<{ k: string; size?: number }> = ({ k, size = 16 }) => {
  const paths: Record<string, React.ReactNode> = {
    grid:     <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    code:     <><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></>,
    monitor:  <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
    server:   <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="18" r="1" fill="currentColor"/></>,
    brain:    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.7-3.29 3 3 0 0 1-1.84-4.42A3 3 0 0 1 5 6.5a2.5 2.5 0 0 1 4.5-4.5M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.7-3.29 3 3 0 0 0 1.84-4.42A3 3 0 0 0 19 6.5a2.5 2.5 0 0 0-4.5-4.5"/>,
    chart:    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></>,
    cloud:    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>,
    wrench:   <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    star:     <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
    x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevron:  <polyline points="9,6 15,12 9,18"/>,
    sparks:   <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
  };
  const fill = k === 'star';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[k] ?? <circle cx="12" cy="12" r="5"/>}
    </svg>
  );
};

// ─── Animated Background ─────────────────────────────────────────────────────

const AnimatedBackground: React.FC = () => (
  <div className="ts-bg" aria-hidden="true">
    <div className="ts-bg__grid" />
    <div className="ts-bg__orb ts-bg__orb--1" />
    <div className="ts-bg__orb ts-bg__orb--2" />
    <div className="ts-bg__orb ts-bg__orb--3" />
    <div className="ts-bg__geo ts-bg__geo--1" />
    <div className="ts-bg__geo ts-bg__geo--2" />
    <div className="ts-bg__geo ts-bg__geo--3" />
    <div className="ts-bg__particles">
      {Array.from({ length: 19 }).map((_, i) => (
        <span key={i} className="ts-bg__particle" style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  </div>
);

// ─── Skill Card ───────────────────────────────────────────────────────────────

interface CardProps {
  skill: TechItem;
  index: number;
  onSelect: (skill: TechItem) => void;
}

const SkillCard: React.FC<CardProps> = ({ skill, index, onSelect }) => {
  const displayedLearned = skill.learned.slice(0, 3);

  return (
    <motion.div
      className="ts-card"
      style={{ '--accent': skill.fgColor } as React.CSSProperties}
      initial={{ opacity: 0, rotateX: -60, y: 30 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(skill)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${skill.name}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(skill); }}
    >
      <div className="ts-card__inner">
        {/* ── Front face ── */}
        <div className="ts-card__face ts-card__front">
          <div
            className="ts-card__icon-wrap"
            style={{ background: skill.bgColor }}
          >
            <img
              src={skill.iconSrc}
              alt={skill.name}
              className="ts-card__icon-img"
              draggable={false}
              loading="lazy"
            />
          </div>
          <span className="ts-card__name">{skill.name}</span>
          <span className="ts-card__click-hint">click for details</span>
        </div>

        {/* ── Back face ── */}
        <div className="ts-card__face ts-card__back">
          <p className="ts-card__back-title">What I&apos;ve Learned</p>
          <ul className="ts-card__back-list">
            {displayedLearned.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Skill Detail Modal ───────────────────────────────────────────────────────

interface ModalProps {
  skill: TechItem;
  onClose: () => void;
}

const SkillModal: React.FC<ModalProps> = ({ skill, onClose }) => {
  // ESC to close + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="ts-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${skill.name} details`}
    >
      <div
        className="ts-modal"
        onClick={e => e.stopPropagation()}
        style={{ '--accent': skill.fgColor } as React.CSSProperties}
      >
        {/* Close */}
        <button className="ts-modal__close" onClick={onClose} aria-label="Close modal">
          <SvgIcon k="x" size={14} />
        </button>

        {/* Header */}
        <div className="ts-modal__header">
          <div className="ts-modal__icon-wrap" style={{ background: skill.bgColor }}>
            <img src={skill.iconSrc} alt={skill.name} className="ts-modal__icon-img" />
          </div>
          <h3 className="ts-modal__title">{skill.name}</h3>
        </div>

        {/* Description */}
        {skill.description && (
          <>
            <p className="ts-modal__desc">{skill.description}</p>
            <div className="ts-modal__divider" style={{ background: skill.fgColor }} />
          </>
        )}

        {/* Achievements */}
        <p className="ts-modal__section-title">Key Achievements</p>
        <ul className="ts-modal__achievements">
          {skill.learned.map((pt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.1 }}
            >
              <span className="ts-ach-dot" style={{ background: skill.fgColor }} />
              {pt}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ─── Sidebar button ───────────────────────────────────────────────────────────

interface SidebarItemProps {
  cat: TechCategory;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ cat, active, onClick }) => (
  <button
    id={`ts-cat-${cat.id}`}
    className={`ts-sidebar__item${active ? ' ts-sidebar__item--active' : ''}`}
    onClick={onClick}
    role="tab"
    aria-selected={active}
  >
    <span className="ts-sidebar__item-icon"><SvgIcon k={cat.iconKey} /></span>
    <span className="ts-sidebar__item-label">{cat.label}</span>
    <span className="ts-sidebar__item-count">{cat.items.length}</span>
    <span className="ts-sidebar__item-chevron"><SvgIcon k="chevron" size={12} /></span>
  </button>
);

// ─── Category header strip ────────────────────────────────────────────────────

const CategoryHeader: React.FC<{ cat: TechCategory }> = ({ cat }) => (
  <motion.div
    className="ts-cat-header"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="ts-cat-header__icon"><SvgIcon k={cat.iconKey} size={20} /></span>
    <span className="ts-cat-header__name">{cat.label}</span>
    <span className="ts-cat-header__badge">{cat.items.length} skills</span>
  </motion.div>
);

// ─── Skills grid wrapper ──────────────────────────────────────────────────────

interface GridProps {
  skills: TechItem[];
  featured?: boolean;
  onSelect: (s: TechItem) => void;
  animKey: number;
}

const SkillGrid: React.FC<GridProps> = ({ skills, featured, onSelect, animKey }) => (
  <div key={animKey} className={`ts-grid${featured ? ' ts-grid--featured' : ''}`}>
    {skills.map((skill, i) => (
      <SkillCard key={skill.name} skill={skill} index={i} onSelect={onSelect} />
    ))}
  </div>
);

// ─── Main TechStack component ─────────────────────────────────────────────────

const TechStack: React.FC = () => {
  const [activeCatId, setActiveCatId]   = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<TechItem | null>(null);
  const [animKey, setAnimKey]            = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Derived data ──────────────────────────────────────────────────────────
  const activeCat = useMemo(
    () => techStackData.categories.find(c => c.id === activeCatId) ?? null,
    [activeCatId]
  );

  const displaySkills = activeCat ? activeCat.items : FEATURED_SKILLS;

  // ── Smart UX Reset — IntersectionObserver + scroll ────────────────────────
  const resetAll = useCallback(() => {
    setActiveCatId(null);
    setSelectedSkill(null);
  }, []);

  useEffect(() => {
    // Reset when section leaves viewport
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) resetAll(); },
      { threshold: 0 }
    );
    observer.observe(sectionEl);

    // Reset when Hero or Projects section becomes visible
    const watchIds = ['hero', 'projects'];
    const observers: IntersectionObserver[] = [observer];
    watchIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) resetAll(); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [resetAll]);

  // ── Category toggle ───────────────────────────────────────────────────────
  const handleCatClick = (catId: string) => {
    setActiveCatId(prev => {
      const next = prev === catId ? null : catId;
      setAnimKey(k => k + 1);
      return next;
    });
    setSelectedSkill(null);
  };

  // ── Skill selection ───────────────────────────────────────────────────────
  const handleSkillSelect = useCallback((skill: TechItem) => {
    setSelectedSkill(skill);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="ts-section"
      aria-label="Technical Skills"
    >
      <AnimatedBackground />

      <div className="ts-container">

        {/* ── Section Header ── */}
        <motion.header
          className="ts-header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="ts-header__eyebrow">
            <SvgIcon k="sparks" size={13} />
            Technical Expertise
          </div>
          <h2 className="ts-header__title">
            {techStackData.sectionTitle}
          </h2>
          <p className="ts-header__subtitle">
            {techStackData.sectionSubtitle}
          </p>
          <div className="ts-header__accent" />
        </motion.header>

        {/* ── Body (Sidebar + Content) ── */}
        <div className="ts-body">

          {/* ── Sidebar ── */}
          <motion.aside
            className="ts-sidebar"
            role="tablist"
            aria-label="Skill categories"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="ts-sidebar__heading">Categories</p>

            {/* All / Featured button */}
            <button
              id="ts-cat-all"
              className={`ts-sidebar__all-btn${activeCatId === null ? ' ts-sidebar__all-btn--active' : ''}`}
              onClick={() => { setActiveCatId(null); setAnimKey(k => k + 1); setSelectedSkill(null); }}
            >
              <SvgIcon k="star" size={14} />
              <span>Featured</span>
            </button>

            <div className="ts-sidebar__divider" />

            {techStackData.categories.map(cat => (
              <SidebarItem
                key={cat.id}
                cat={cat}
                active={activeCatId === cat.id}
                onClick={() => handleCatClick(cat.id)}
              />
            ))}
          </motion.aside>

          {/* ── Content Area ── */}
          <motion.div
            className="ts-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Category header (only when a category is selected) */}
            <AnimatePresence mode="wait">
              {activeCat ? (
                <CategoryHeader key={activeCat.id} cat={activeCat} />
              ) : (
                <motion.div
                  key="featured-label"
                  className="ts-featured-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SvgIcon k="star" size={13} />
                  <span className="ts-featured-label__text">Featured Skills</span>
                  <div className="ts-featured-label__line" />
                  <span className="ts-featured-label__text" style={{ opacity: .55 }}>{FEATURED_COUNT} of {ALL_SKILLS.length}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skill grid */}
            <AnimatePresence mode="wait">
              <SkillGrid
                key={animKey}
                skills={displaySkills}
                featured={activeCatId === null}
                onSelect={handleSkillSelect}
                animKey={animKey}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* ── Skill Detail Modal ── */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            key={selectedSkill.name}
            skill={selectedSkill}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechStack;
