import React, { useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// ─── Constants ────────────────────────────────────────────────────────────────

const ROPE_SEGMENTS = 8;       // Number of rope knot beads
const PULL_THRESHOLD = 44;     // px drag distance to trigger toggle
const IDLE_SWING_INTENSITY = 5; // degrees of idle sway

// ─── Rope Bead (small knot decoration) ───────────────────────────────────────

const RopeBead: React.FC<{ index: number; isDark: boolean }> = ({ index, isDark }) => (
  <motion.div
    style={{
      width: index === 0 ? 3 : 2,
      height: index === 0 ? 3 : 2,
      borderRadius: '50%',
      background: isDark
        ? `rgba(203,213,225,${0.3 + index * 0.04})`
        : `rgba(100,116,139,${0.3 + index * 0.04})`,
      alignSelf: 'center',
      flexShrink: 0,
    }}
  />
);

// ─── Sun / Moon Icon ──────────────────────────────────────────────────────────

const SunIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
    stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// ─── Tooltip ─────────────────────────────────────────────────────────────────

const Tooltip: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <AnimatePresence>
    <motion.div
      key="rope-tooltip"
      initial={{ opacity: 0, x: 8, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 8, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        right: '110%',
        top: '50%',
        transform: 'translateY(-50%)',
        whiteSpace: 'nowrap',
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        padding: '4px 10px',
        borderRadius: '6px',
        color: isDark ? '#94a3b8' : '#64748b',
        background: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(248,250,252,0.95)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none',
      }}
    >
      {isDark ? '☀ Light mode' : '☾ Dark mode'}
    </motion.div>
  </AnimatePresence>
);

// ─── Main RopeToggle ─────────────────────────────────────────────────────────

const RopeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const controls = useAnimation();
  const ropeControls = useAnimation();
  const dragY = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPulled, setIsPulled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const hasTriggered = useRef(false);

  // ── Idle pendulum swing ───────────────────────────────────────────────────
  const startIdle = useCallback(() => {
    controls.start({
      rotate: [0, IDLE_SWING_INTENSITY, -IDLE_SWING_INTENSITY, IDLE_SWING_INTENSITY * 0.5, 0],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    });
  }, [controls]);

  React.useEffect(() => {
    startIdle();
  }, [startIdle]);

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const onDragStart = useCallback(() => {
    setIsDragging(true);
    hasTriggered.current = false;
    controls.stop();
    controls.set({ rotate: 0 });
  }, [controls]);

  const onDrag = useCallback(
    (_: unknown, info: { offset: { y: number } }) => {
      const dy = Math.max(0, info.offset.y);
      dragY.set(dy);

      if (dy >= PULL_THRESHOLD && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsPulled(true);

        // Flash / pulse the bulb
        ropeControls.start({
          scale: [1, 1.35, 0.9, 1.1, 1],
          transition: { duration: 0.4 },
        });

        toggleTheme();
      }
    },
    [dragY, ropeControls, toggleTheme],
  );

  const onDragEnd = useCallback(async () => {
    setIsDragging(false);
    setIsPulled(false);
    hasTriggered.current = false;
    dragY.set(0);

    // Snap rope back with slight bounce
    await controls.start({
      y: 0,
      rotate: [-3, 3, -1.5, 1, 0],
      transition: { duration: 0.55, ease: 'easeOut' },
    });

    setTimeout(() => startIdle(), 300);
  }, [controls, dragY, startIdle]);

  // ── Click handler (tap without drag) ──────────────────────────────────────
  const onBulbClick = useCallback(() => {
    if (isDragging) return;
    setIsPulled(true);

    ropeControls.start({
      scale: [1, 1.35, 0.9, 1.1, 1],
      transition: { duration: 0.4 },
    });
    toggleTheme();

    setTimeout(() => setIsPulled(false), 400);
  }, [isDragging, ropeControls, toggleTheme]);

  // ── Style tokens ──────────────────────────────────────────────────────────
  const ropeColor = isDark ? 'rgba(148,163,184,0.6)' : 'rgba(100,116,139,0.5)';
  const bulbBg = isDark
    ? 'radial-gradient(circle at 35% 35%, #f59e0b, #d97706 60%, #92400e)'
    : 'radial-gradient(circle at 35% 35%, #fbbf24, #f59e0b 60%, #d97706)';
  const bulbGlow = isDark
    ? '0 0 12px 4px rgba(251,191,36,0.55), 0 0 28px 8px rgba(251,191,36,0.2)'
    : '0 0 8px 2px rgba(251,191,36,0.3)';
  const glowOpacity = isDark ? 1 : 0;
  const capColor = isDark ? '#475569' : '#94a3b8';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'default',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && !isDragging && <Tooltip isDark={isDark} />}

      {/* ── Nail / anchor ────────────────────────────────────────────── */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isDark ? '#475569' : '#94a3b8',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          flexShrink: 0,
          zIndex: 1,
        }}
      />

      {/* ── Rope + bulb assembly (draggable) ───────────────────────── */}
      <motion.div
        animate={controls}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          transformOrigin: 'top center',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 80 }}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onClick={onBulbClick}
        whileHover={{ scale: 1.02 }}
      >
        {/* Rope segments */}
        {Array.from({ length: ROPE_SEGMENTS }).map((_, i) => (
          <React.Fragment key={i}>
            {/* Line segment */}
            <div
              style={{
                width: 1.5,
                height: isPulled ? 7 : 5,
                background: ropeColor,
                borderRadius: 1,
                transition: 'height 0.15s ease',
              }}
            />
            {/* Bead / knot */}
            <RopeBead index={i} isDark={isDark} />
          </React.Fragment>
        ))}

        {/* Bulb cap (socket) */}
        <div
          style={{
            width: 12,
            height: 5,
            borderRadius: '3px 3px 0 0',
            background: capColor,
            flexShrink: 0,
          }}
        />

        {/* Bulb */}
        <motion.div
          animate={ropeControls}
          style={{
            width: 26,
            height: 32,
            borderRadius: '50% 50% 60% 60% / 40% 40% 60% 60%',
            background: bulbBg,
            boxShadow: bulbGlow,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDark ? '#fff8e1' : '#92400e',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Filament / inner highlight */}
          <div
            style={{
              position: 'absolute',
              top: '22%',
              left: '30%',
              width: '18%',
              height: '35%',
              background: 'rgba(255,255,255,0.35)',
              borderRadius: '50%',
              filter: 'blur(1px)',
              opacity: isDark ? 0.9 : 0.5,
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'moon' : 'sun'}
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 30 }}
              transition={{ duration: 0.25 }}
              style={{ zIndex: 1 }}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Glow halo below bulb */}
        <motion.div
          animate={{ opacity: glowOpacity }}
          transition={{ duration: 0.4 }}
          style={{
            width: 40,
            height: 14,
            background: 'radial-gradient(ellipse, rgba(251,191,36,0.55) 0%, transparent 70%)',
            filter: 'blur(4px)',
            marginTop: -4,
            flexShrink: 0,
          }}
        />
      </motion.div>
    </div>
  );
};

export default RopeToggle;
