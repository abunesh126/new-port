import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── URL builders ─────────────────────────────────────────────────────────────

const USERNAME = 'Abunesh126';

const buildUrls = (dark: boolean) => ({
  stats: dark
    ? `https://abunesh126-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=github_dark&hide_border=true&count_private=true`
    : `https://abunesh126-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&theme=default&hide_border=true&count_private=true`,

  topLangs: dark
    ? `https://abunesh126-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=github_dark&hide_border=true`
    : `https://abunesh126-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&theme=default&hide_border=true`,

  streak: dark
    ? `https://streak-stats.demolab.com/?user=${USERNAME}&theme=dark&hide_border=true`
    : `https://streak-stats.demolab.com/?user=${USERNAME}&theme=default&hide_border=true`,

  activity: dark
    ? `https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=github-dark&hide_border=true`
    : `https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}&theme=github-light&hide_border=true`,

  profileDetails: dark
    ? `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${USERNAME}&theme=github_dark`
    : `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${USERNAME}&theme=github`,

  reposPerLang: dark
    ? `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${USERNAME}&theme=github_dark`
    : `https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${USERNAME}&theme=github`,

  commitLang: dark
    ? `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${USERNAME}&theme=github_dark`
    : `https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${USERNAME}&theme=github`,

  summaryStats: dark
    ? `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${USERNAME}&theme=github_dark`
    : `https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${USERNAME}&theme=github`,

  productiveTime: dark
    ? `https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${USERNAME}&theme=github_dark`
    : `https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${USERNAME}&theme=github`,
});

// ─── Design tokens (synced with existing palette) ─────────────────────────────

const tokens = {
  dark: {
    sectionBg:     'transparent',
    cardBg:        'rgba(255,255,255,0.03)',
    cardBorder:    'rgba(255,255,255,0.08)',
    cardBorderHov: 'rgba(99,179,255,0.28)',
    titleGrad:     'linear-gradient(135deg,#f0f6ff 20%,#60A5FA)',
    subtitleColor: '#94a3b8',
    accentBlue:    '#3B82F6',
    accentPurple:  '#8B5CF6',
    dividerGlow:   'rgba(59,130,246,0.5)',
    pillBg:        'rgba(59,130,246,0.10)',
    pillColor:     '#60A5FA',
    pillBorder:    'rgba(59,130,246,0.25)',
    skeletonBase:  'rgba(255,255,255,0.06)',
    skeletonShine: 'rgba(255,255,255,0.11)',
    glassBlur:     'blur(16px)',
    shadow:        '0 8px 32px rgba(0,0,0,0.45)',
    shadowHov:     '0 16px 48px rgba(59,130,246,0.2)',
    tagBg:         'rgba(59,130,246,0.12)',
    tagColor:      '#93c5fd',
  },
  light: {
    sectionBg:     'transparent',
    cardBg:        'rgba(255,255,255,0.85)',
    cardBorder:    'rgba(0,0,0,0.07)',
    cardBorderHov: 'rgba(59,130,246,0.4)',
    titleGrad:     'linear-gradient(135deg,#0f172a 20%,#3B82F6)',
    subtitleColor: '#64748b',
    accentBlue:    '#2563EB',
    accentPurple:  '#7C3AED',
    dividerGlow:   'rgba(59,130,246,0.35)',
    pillBg:        'rgba(59,130,246,0.07)',
    pillColor:     '#2563EB',
    pillBorder:    'rgba(59,130,246,0.20)',
    skeletonBase:  'rgba(0,0,0,0.06)',
    skeletonShine: 'rgba(0,0,0,0.03)',
    glassBlur:     'blur(16px)',
    shadow:        '0 4px 24px rgba(0,0,0,0.10)',
    shadowHov:     '0 12px 36px rgba(59,130,246,0.15)',
    tagBg:         'rgba(37,99,235,0.08)',
    tagColor:      '#1d4ed8',
  },
};

// ─── Skeleton shimmer ─────────────────────────────────────────────────────────

const SkeletonCard: React.FC<{ isDark: boolean; aspectRatio?: string }> = ({
  isDark,
  aspectRatio = '2 / 1',
}) => {
  const t = isDark ? tokens.dark : tokens.light;
  return (
    <div
      style={{
        width: '100%',
        aspectRatio,
        borderRadius: '1rem',
        background: t.skeletonBase,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, transparent 0%, ${t.skeletonShine} 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};

// ─── Stat image card ──────────────────────────────────────────────────────────

interface StatImgProps {
  src: string;
  alt: string;
  isDark: boolean;
  delay?: number;
  fullWidth?: boolean;
  aspectRatio?: string;
}

const StatImg: React.FC<StatImgProps> = ({
  src, alt, isDark, delay = 0, fullWidth = false, aspectRatio = '2/1',
}) => {
  const t = isDark ? tokens.dark : tokens.light;
  const [loaded, setLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Reset loaded state when src changes (theme switch)
  useEffect(() => { setLoaded(false); }, [src]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{
        position: 'relative',
        width: '100%',
        gridColumn: fullWidth ? '1 / -1' : undefined,
        borderRadius: '1rem',
        border: `1px solid ${t.cardBorder}`,
        background: t.cardBg,
        backdropFilter: t.glassBlur,
        WebkitBackdropFilter: t.glassBlur,
        boxShadow: t.shadow,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        scale: fullWidth ? 1.005 : 1.022,
        boxShadow: t.shadowHov,
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              top: 10,
              right: 12,
              zIndex: 10,
              background: isDark ? 'rgba(6,9,16,0.92)' : 'rgba(255,255,255,0.95)',
              border: `1px solid ${t.cardBorder}`,
              borderRadius: '0.5rem',
              padding: '4px 10px',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: t.subtitleColor,
              backdropFilter: 'blur(8px)',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {/* Live dot */}
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#22d3ee',
              boxShadow: '0 0 6px #22d3ee',
              display: 'inline-block',
            }} />
            Live GitHub Data
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skeleton while loading */}
      {!loaded && <SkeletonCard isDark={isDark} aspectRatio={aspectRatio} />}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: 'auto',
          display: loaded ? 'block' : 'none',
          borderRadius: '1rem',
        }}
      />
    </motion.div>
  );
};

// ─── Section title decoration ─────────────────────────────────────────────────

const SectionTag: React.FC<{ label: string; isDark: boolean; delay?: number }> = ({
  label, isDark, delay = 0,
}) => {
  const t = isDark ? tokens.dark : tokens.light;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: t.pillColor,
        background: t.pillBg,
        border: `1px solid ${t.pillBorder}`,
        borderRadius: '9999px',
        padding: '0.28rem 0.9rem',
      }}
    >
      {label}
    </motion.div>
  );
};

// ─── Sub-section header ───────────────────────────────────────────────────────

const SubHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  isDark: boolean;
  delay?: number;
}> = ({ icon, title, isDark, delay = 0 }) => {
  const t = isDark ? tokens.dark : tokens.light;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        marginBottom: '1.5rem',
      }}
    >
      {/* Diamond icon */}
      <span style={{
        color: t.accentBlue,
        fontSize: '1rem',
        flexShrink: 0,
      }}>
        {icon}
      </span>

      <div style={{
        fontFamily: '"Fira Code", monospace',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: isDark ? 'rgba(241,245,249,0.9)' : 'rgba(15,23,42,0.85)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ color: t.accentBlue }}>{'{'}</span>
        <span>{title}</span>
        <span style={{ color: t.accentBlue }}>{'}'}</span>
      </div>

      {/* Thin horizontal rule */}
      <div style={{
        flex: 1,
        height: 1,
        background: `linear-gradient(90deg, ${t.dividerGlow}, transparent)`,
      }} />
    </motion.div>
  );
};

// ─── Glowing divider ─────────────────────────────────────────────────────────

const GlowDivider: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const t = isDark ? tokens.dark : tokens.light;
  return (
    <div style={{
      width: '100%',
      height: 1,
      background: `linear-gradient(90deg, transparent, ${t.dividerGlow}, transparent)`,
      margin: '3rem 0',
      position: 'relative',
    }}>
      {/* Center dot */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: t.accentBlue,
        boxShadow: `0 0 8px 2px ${t.accentBlue}`,
      }} />
    </div>
  );
};

// ─── Animated BG background blobs ─────────────────────────────────────────────

const BgBlobs: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <div style={{
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }} aria-hidden="true">
    {/* Top-right blob */}
    <div style={{
      position: 'absolute',
      top: '-80px',
      right: '-120px',
      width: 480,
      height: 420,
      borderRadius: '50%',
      background: isDark
        ? 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
      filter: 'blur(60px)',
    }} />
    {/* Bottom-left blob */}
    <div style={{
      position: 'absolute',
      bottom: '-60px',
      left: '-80px',
      width: 380,
      height: 340,
      borderRadius: '50%',
      background: isDark
        ? 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
      filter: 'blur(60px)',
    }} />
  </div>
);

// ─── Scroll parallax hook ─────────────────────────────────────────────────────

function useParallax(factor = 0.04) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const onScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    setOffset(center * factor);
  }, [factor]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return { ref, offset };
}

// ─── Main GithubStats ─────────────────────────────────────────────────────────

const GithubStats: React.FC = () => {
  const { isDark } = useTheme();
  const t = isDark ? tokens.dark : tokens.light;
  const urls = buildUrls(isDark);
  const { ref, offset } = useParallax(0.035);

  // Stagger base delays
  const D = (n: number) => n * 0.1;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="github-stats"
      aria-label="GitHub Stats and Achievements"
      style={{
        position: 'relative',
        padding: '5rem 1.5rem 6rem',
        background: t.sectionBg,
        overflow: 'hidden',
      }}
    >
      <BgBlobs isDark={isDark} />

      {/* Subtle top divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${t.dividerGlow}, transparent)`,
      }} />

      {/* ── Parallax content wrapper ── */}
      <motion.div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          y: offset,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '0.85rem' }}
          >
            <SectionTag label="open source" isDark={isDark} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '0.65rem',
              background: t.titleGrad,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GitHub Insights
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: t.subtitleColor,
              letterSpacing: '0.03em',
              fontStyle: 'italic',
            }}
          >
            Stats, Contributions &amp; Achievements
          </motion.p>

          {/* Accent underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              margin: '1.1rem auto 0',
              width: 60,
              height: 3,
              borderRadius: 9999,
              background: `linear-gradient(90deg, ${t.accentBlue}, ${t.accentPurple})`,
              boxShadow: `0 0 10px ${t.accentBlue}55`,
            }}
          />
        </div>

        {/* ══════════════════════════════════════════════
            PART 1: GITHUB STATS
        ══════════════════════════════════════════════ */}
        <SubHeader
          icon={<span style={{ fontSize: '1.1rem' }}>◈</span>}
          title="GITHUB STATS"
          isDark={isDark}
          delay={0.05}
        />

        {/* 2-column grid for stats + top langs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.25rem',
          marginBottom: '1.25rem',
        }}>
          <StatImg
            src={urls.stats}
            alt="GitHub Stats"
            isDark={isDark}
            delay={D(1)}
            aspectRatio="1.9/1"
          />
          <StatImg
            src={urls.topLangs}
            alt="Top Languages"
            isDark={isDark}
            delay={D(2)}
            aspectRatio="1.9/1"
          />
        </div>

        {/* Streak — full width on mobile, centered on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '1.25rem',
          marginBottom: '1.25rem',
          justifyItems: 'center',
        }}>
          <StatImg
            src={urls.streak}
            alt="GitHub Streak"
            isDark={isDark}
            delay={D(3)}
            aspectRatio="2.5/1"
          />
        </div>

        {/* Activity graph — full width */}
        <StatImg
          src={urls.activity}
          alt="GitHub Contribution Graph"
          isDark={isDark}
          delay={D(4)}
          fullWidth
          aspectRatio="3.5/1"
        />

        <GlowDivider isDark={isDark} />

        {/* ══════════════════════════════════════════════
            PART 2: ACHIEVEMENTS & BADGES
        ══════════════════════════════════════════════ */}
        <SubHeader
          icon={<span style={{ fontSize: '1.1rem' }}>◈</span>}
          title="ACHIEVEMENTS &amp; BADGES"
          isDark={isDark}
          delay={0.05}
        />

        {/* Profile details — full width */}
        <div style={{ marginBottom: '1.25rem' }}>
          <StatImg
            src={urls.profileDetails}
            alt="GitHub Profile Details"
            isDark={isDark}
            delay={D(1)}
            fullWidth
            aspectRatio="3.8/1"
          />
        </div>

        {/* 2-column: repos per lang + commit lang */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.25rem',
          marginBottom: '1.25rem',
        }}>
          <StatImg
            src={urls.reposPerLang}
            alt="Repos Per Language"
            isDark={isDark}
            delay={D(2)}
            aspectRatio="1.6/1"
          />
          <StatImg
            src={urls.commitLang}
            alt="Most Commit Language"
            isDark={isDark}
            delay={D(3)}
            aspectRatio="1.6/1"
          />
        </div>

        {/* 2-column: stats + productive time */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1.25rem',
        }}>
          <StatImg
            src={urls.summaryStats}
            alt="GitHub Summary Stats"
            isDark={isDark}
            delay={D(4)}
            aspectRatio="1.6/1"
          />
          <StatImg
            src={urls.productiveTime}
            alt="Productive Time (Commits by Hour)"
            isDark={isDark}
            delay={D(5)}
            aspectRatio="1.6/1"
          />
        </div>

        {/* Bottom tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            marginTop: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.68rem',
            color: t.subtitleColor,
            letterSpacing: '0.06em',
            opacity: 0.7,
          }}
        >
          <span style={{
            display: 'inline-block',
            width: 7, height: 7,
            borderRadius: '50%',
            background: '#22d3ee',
            boxShadow: '0 0 7px #22d3ee',
          }} />
          Live data from GitHub · Updates daily
        </motion.div>
      </motion.div>

      {/* Subtle bottom divider */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '10%',
        right: '10%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${t.dividerGlow}, transparent)`,
      }} />
    </section>
  );
};

export default GithubStats;
