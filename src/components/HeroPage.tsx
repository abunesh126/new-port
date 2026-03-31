import React from 'react';
import type { NavItem, HeroUser, SocialLink } from '../types/hero.types';
import { heroData } from '../data/heroData';
import './HeroPage.css';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

interface NavbarProps {
  items:     NavItem[];
  user:      HeroUser;
  website:   string;
  resumeUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ items, user, website, resumeUrl }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="hero-nav" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <a href="/" className="hero-nav__logo" aria-label="Go to homepage">
        <div className="hero-nav__logo-img">
          {user.logoUrl
            ? <img src={user.logoUrl} alt={`${user.name} logo`} />
            : <span className="hero-nav__logo-fallback">{user.name[0]}</span>}
        </div>
        <div className="hero-nav__logo-text">
          <span className="hero-nav__logo-name">{user.name}</span>
          <span className="hero-nav__logo-role">{user.role}</span>
        </div>
      </a>

      {/* Desktop links */}
      <ul className="hero-nav__links" role="list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="hero-nav__link">{item.label}</a>
          </li>
        ))}
      </ul>

      {/* Portfolio link */}
      <a
        href={website}
        target="_blank"
        rel="noreferrer"
        className="hero-nav__portfolio"
        aria-label="Visit portfolio website"
      >
        Portfolio <ExternalLinkIcon />
      </a>

      {/* Resume download */}
      <a
        href={resumeUrl}
        target="_blank"
        rel="noreferrer"
        download
        className="hero-nav__resume"
        aria-label="Download resume PDF"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7,10 12,15 17,10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Resume
      </a>

      {/* Mobile hamburger */}
      <button
        className={`hero-nav__hamburger${open ? ' hero-nav__hamburger--open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="hero-nav__drawer" role="dialog" aria-label="Mobile navigation">
          <ul role="list">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hero-nav__drawer-link" onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="hero-nav__drawer-link hero-nav__drawer-resume"
                onClick={() => setOpen(false)}
              >
                ⬇ Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// ─── Highlight Pills ──────────────────────────────────────────────────────────

const HighlightPills: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="hero-pills" role="list" aria-label="Specializations">
    {tags.map((tag) => (
      <span key={tag} className="hero-pill" role="listitem">{tag}</span>
    ))}
  </div>
);

// ─── Social Links ─────────────────────────────────────────────────────────────

const SocialLinks: React.FC<{ socials: SocialLink[] }> = ({ socials }) => (
  <div className="hero-socials" aria-label="Social profiles">
    {socials.map((s) => (
      <a
        key={s.platform}
        href={s.url}
        target="_blank"
        rel="noreferrer"
        className={`hero-social hero-social--${s.platform}`}
        aria-label={s.label}
        title={s.label}
      >
        {s.platform === 'github'   && <GitHubIcon />}
        {s.platform === 'linkedin' && <LinkedInIcon />}
        <span>{s.label}</span>
      </a>
    ))}
  </div>
);

// ─── Decorative Blob ──────────────────────────────────────────────────────────

const BlobDecoration: React.FC = () => (
  <svg className="hero-blob" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="blobGrad1" cx="40%" cy="40%" r="60%">
        <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.50"/>
      </radialGradient>
      <radialGradient id="blobGrad2" cx="70%" cy="60%" r="50%">
        <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <path fill="url(#blobGrad1)"
      d="M430,290Q405,340,372,382Q339,424,288,448Q237,472,186,448Q135,424,98,378Q61,332,57,278Q53,224,88,180Q123,136,168,108Q213,80,270,66Q327,52,374,88Q421,124,442,182Q463,240,430,290Z">
      <animate attributeName="d" dur="10s" repeatCount="indefinite"
        values="
          M430,290Q405,340,372,382Q339,424,288,448Q237,472,186,448Q135,424,98,378Q61,332,57,278Q53,224,88,180Q123,136,168,108Q213,80,270,66Q327,52,374,88Q421,124,442,182Q463,240,430,290Z;
          M450,300Q420,360,374,395Q328,430,278,450Q228,470,180,440Q132,410,96,368Q60,326,58,274Q56,222,94,182Q132,142,178,114Q224,86,276,72Q328,58,376,96Q424,134,448,192Q472,250,450,300Z;
          M430,290Q405,340,372,382Q339,424,288,448Q237,472,186,448Q135,424,98,378Q61,332,57,278Q53,224,88,180Q123,136,168,108Q213,80,270,66Q327,52,374,88Q421,124,442,182Q463,240,430,290Z
        "
      />
    </path>
    <path fill="url(#blobGrad2)"
      d="M360,260Q340,300,300,330Q260,360,220,336Q180,312,168,272Q156,232,180,200Q204,168,244,152Q284,136,318,160Q352,184,360,222Q368,260,360,260Z"
      opacity="0.5">
    </path>
  </svg>
);

// ─── Avatar Frame ──────────────────────────────────────────────────────────────

interface AvatarFrameProps { src: string; name: string; role: string; }

const AvatarFrame: React.FC<AvatarFrameProps> = ({ src, name, role }) => (
  <div className="hero-avatar-wrap">
    {/* Animated rings */}
    <div className="hero-avatar-ring hero-avatar-ring--1" aria-hidden="true" />
    <div className="hero-avatar-ring hero-avatar-ring--2" aria-hidden="true" />
    <div className="hero-avatar-ring hero-avatar-ring--3" aria-hidden="true" />

    {/* Photo */}
    <div className="hero-avatar-clip">
      <img src={src} alt={`${name}, ${role}`} className="hero-avatar-img" />
    </div>

    {/* Bottom badge */}
    <div className="hero-avatar-badge" aria-label="Available for work">
      <span className="hero-avatar-badge__dot" />
      Available for work
    </div>

    {/* Glow */}
    <div className="hero-avatar-glow" aria-hidden="true" />
  </div>
);

// ─── Floating Stat Cards ──────────────────────────────────────────────────────

interface StatCardProps { value: string; label: string; position: 'tl' | 'tr' | 'bl' | 'br'; }

const StatCard: React.FC<StatCardProps> = ({ value, label, position }) => (
  <div className={`hero-stat-card hero-stat-card--${position}`} aria-label={`${value} ${label}`}>
    <span className="hero-stat-card__val">{value}</span>
    <span className="hero-stat-card__lbl">{label}</span>
  </div>
);

// ─── Scroll Cue ───────────────────────────────────────────────────────────────

const ScrollCue: React.FC = () => (
  <div className="hero-scroll-cue" aria-hidden="true">
    <span className="hero-scroll-cue__text">scroll</span>
    <div className="hero-scroll-cue__line">
      <div className="hero-scroll-cue__dot" />
    </div>
  </div>
);

// ─── Main HeroPage ────────────────────────────────────────────────────────────

const HeroPage: React.FC = () => {
  const { nav, user, content } = heroData;

  return (
    <div className="hero-page" id="home">

      {/* ── Background layer ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg__grid" />
        <div className="hero-bg__glow hero-bg__glow--blue" />
        <div className="hero-bg__glow hero-bg__glow--purple" />
        <div className="hero-bg__particles">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="hero-bg__particle" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
      </div>

      <Navbar items={nav} user={user} website={user.website} resumeUrl={user.resumeUrl} />

      <main className="hero-main">

        {/* ── LEFT: Copy ── */}
        <section className="hero-copy" aria-label="Introduction">

          <HighlightPills tags={content.highlights} />

          <h1 className="hero-copy__headline">
            {/* Split name + title for accent styling */}
            <span className="hero-copy__headline-name">
              {user.name}
            </span>
            <span className="hero-copy__headline-sep"> — </span>
            <span className="hero-copy__headline-role">
              {user.role}
            </span>
          </h1>

          <p className="hero-copy__subheadline">{content.subheadline}</p>

          <p className="hero-copy__bio">{user.bio}</p>

          {/* CTA row */}
          <div className="hero-copy__ctas">
            <a
              id="hero-cta-primary"
              href={content.primaryCtaHref}
              className="hero-btn hero-btn--primary"
            >
              {content.primaryCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              id="hero-cta-secondary"
              href={content.secondaryCtaHref}
              className="hero-btn hero-btn--secondary"
            >
              {content.secondaryCta}
            </a>
            <a
              id="hero-cta-resume"
              href={user.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="hero-btn hero-btn--resume"
              aria-label="Download resume PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </div>

          <SocialLinks socials={user.socials} />
        </section>

        {/* ── RIGHT: Visual ── */}
        <div className="hero-visual" aria-hidden="true">
          <BlobDecoration />

          <AvatarFrame src={user.avatarUrl} name={user.name} role={user.role} />

          <StatCard value="10+" label="Projects Built"      position="tr" />
          <StatCard value="3+"  label="Domains Covered"    position="bl" />
        </div>
      </main>

      <ScrollCue />
    </div>
  );
};

export default HeroPage;
