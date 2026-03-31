import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import RopeToggle from './RopeToggle';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavSection {
  id: string;
  label: string;
}

// ─── Nav Sections ─────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  { id: 'hero',         label: 'Hero'         },
  { id: 'blog',         label: 'Blog'         },
  { id: 'tech-stack',   label: 'TechStack'    },
  { id: 'projects',     label: 'Projects'     },
  { id: 'experience',   label: 'Experience'   },
  { id: 'github-stats', label: 'GitHub'       },
  { id: 'contact',      label: 'Contact'      },
  { id: 'footer',       label: 'Footer'       },
];


// ─── Scroll spy hook ──────────────────────────────────────────────────────────

function useScrollSpy(sectionIds: string[]): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleMap = new Map<string, number>();

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            visibleMap.set(id, entry.intersectionRatio);
          });
          // Pick the one with highest intersection ratio
          let bestId = sectionIds[0];
          let bestRatio = -1;
          visibleMap.forEach((ratio, sid) => {
            if (ratio > bestRatio) { bestRatio = ratio; bestId = sid; }
          });
          setActive(bestId);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sectionIds]);

  return active;
}

// ─── Smooth scroll helper ─────────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── Logo SVG (inline fallback) ───────────────────────────────────────────────

const LogoFallback: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: '1rem',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      flexShrink: 0,
      boxShadow: isDark
        ? '0 2px 12px rgba(59,130,246,0.4)'
        : '0 2px 12px rgba(59,130,246,0.25)',
    }}
  >
    A
  </div>
);

// ─── Hamburger ────────────────────────────────────────────────────────────────

const HamburgerIcon: React.FC<{ open: boolean; isDark: boolean }> = ({ open, isDark }) => {
  const lineStyle: React.CSSProperties = {
    display: 'block',
    width: 22,
    height: 2,
    borderRadius: 9999,
    background: isDark ? 'rgba(241,245,249,0.8)' : 'rgba(30,41,59,0.8)',
    transition: 'transform 0.3s ease, opacity 0.2s',
  };
  return (
    <button
      id="navbar-hamburger"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 6,
        borderRadius: 8,
        transition: 'background 0.2s',
      }}
    >
      <span style={{
        ...lineStyle,
        transform: open ? 'translateY(7px) rotate(45deg)' : undefined,
      }} />
      <span style={{
        ...lineStyle,
        opacity: open ? 0 : 1,
      }} />
      <span style={{
        ...lineStyle,
        transform: open ? 'translateY(-7px) rotate(-45deg)' : undefined,
      }} />
    </button>
  );
};

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

const MobileDrawer: React.FC<{
  sections: NavSection[];
  active: string;
  isDark: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}> = ({ sections, active, isDark, onClose, onNavigate }) => (
  <motion.div
    key="mobile-drawer"
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      padding: '0.75rem 1.25rem 1.25rem',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      background: isDark ? 'rgba(6,9,16,0.96)' : 'rgba(248,250,252,0.97)',
      zIndex: 200,
    }}
  >
    <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {sections.map(sec => (
        <li key={sec.id}>
          <button
            id={`nav-mobile-${sec.id}`}
            onClick={() => { onNavigate(sec.id); onClose(); }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '0.65rem 0.85rem',
              background: active === sec.id
                ? (isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)')
                : 'none',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: active === sec.id ? 700 : 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: active === sec.id
                ? '#3B82F6'
                : (isDark ? 'rgba(148,163,184,0.85)' : 'rgba(71,85,105,0.9)'),
              transition: 'all 0.2s',
            }}
          >
            {sec.label}
          </button>
        </li>
      ))}
    </ul>
  </motion.div>
);

// ─── Main Navbar ──────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const sectionIds = NAV_SECTIONS.map(s => s.id);
  const active = useScrollSpy(sectionIds);

  const handleNavClick = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  }, [location.pathname, navigate]);

  // ── Close mobile menu on outside click ────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  // ── Scroll detection for glass shadow ─────────────────────────────────────
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // ── Tokens ────────────────────────────────────────────────────────────────
  const base = import.meta.env.BASE_URL;
  const logoUrl = `${base}assets/profile/logo.svg`;

  const navBg = isDark
    ? `rgba(6,9,16,${scrolled ? 0.88 : 0.6})`
    : `rgba(248,250,252,${scrolled ? 0.96 : 0.8})`;
  const navBorder = isDark
    ? `rgba(255,255,255,${scrolled ? 0.09 : 0.06})`
    : `rgba(0,0,0,${scrolled ? 0.08 : 0.05})`;
  const navShadow = scrolled
    ? (isDark ? '0 4px 32px rgba(0,0,0,0.55)' : '0 4px 24px rgba(0,0,0,0.12)')
    : 'none';

  return (
    <motion.nav
      ref={navRef}
      id="main-navbar"
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        height: 64,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: navBg,
        borderBottom: `1px solid ${navBorder}`,
        boxShadow: navShadow,
        fontFamily: 'Inter, system-ui, sans-serif',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* ── LEFT: Logo + Name ─────────────────────────────────────────── */}
      <motion.button
        id="nav-logo"
        aria-label="Scroll to top"
        onClick={() => handleNavClick('hero')}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginRight: 'auto',
          flexShrink: 0,
          textDecoration: 'none',
        }}
      >
        {logoError ? (
          <LogoFallback isDark={isDark} />
        ) : (
          <img
            src={logoUrl}
            alt="Abunesh R P logo"
            onError={() => setLogoError(true)}
            style={{ width: 88, height: 40, objectFit: 'contain', objectPosition: 'left center', flexShrink: 0 }}
          />
        )}
        {logoError && (
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              color: isDark ? '#f0f6ff' : '#0f172a',
              letterSpacing: '-0.01em',
            }}>
              Abunesh R P
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 500,
              color: '#60A5FA',
              letterSpacing: '0.04em',
              fontFamily: 'Fira Code, monospace',
            }}>
              Full Stack AI Engineer
            </span>
          </div>
        )}
      </motion.button>

      {/* ── CENTER: Nav Links (desktop) ───────────────────────────────── */}
      <ul
        role="list"
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.15rem',
          margin: '0 1.5rem',
        }}
        className="navbar-desktop-links"
      >
        {NAV_SECTIONS.map(sec => {
          const isActive = active === sec.id;
          return (
            <li key={sec.id}>
              <button
                id={`nav-link-${sec.id}`}
                onClick={() => handleNavClick(sec.id)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: isActive
                    ? '#3B82F6'
                    : (isDark ? 'rgba(148,163,184,0.85)' : 'rgba(71,85,105,0.9)'),
                  padding: '0.45rem 0.8rem',
                  borderRadius: '0.5rem',
                  transition: 'color 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#f1f5f9' : '#0f172a';
                    (e.currentTarget as HTMLButtonElement).style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.color = isDark ? 'rgba(148,163,184,0.85)' : 'rgba(71,85,105,0.9)';
                    (e.currentTarget as HTMLButtonElement).style.background = 'none';
                  }
                }}
              >
                {sec.label}
                {/* Active underline slide */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: 2,
                      borderRadius: 9999,
                      background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                      display: 'block',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── RIGHT: Rope Toggle ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexShrink: 0 }}>
        {/* Rope toggle container - positioned to hang from navbar bottom */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RopeToggle />
        </div>

        {/* Mobile hamburger */}
        <div
          className="navbar-hamburger-wrap"
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', cursor: 'pointer' }}
        >
          <HamburgerIcon open={menuOpen} isDark={isDark} />
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <MobileDrawer
            sections={NAV_SECTIONS}
            active={active}
            isDark={isDark}
            onClose={() => setMenuOpen(false)}
            onNavigate={handleNavClick}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
