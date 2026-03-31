
import type { HeroPageData } from '../types/hero.types';

// ─── ABUNESH R P — HERO DATA ──────────────────────────────────────────────────

const base = import.meta.env.BASE_URL;

export const heroData: HeroPageData = {
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'Education', href: '/education' },
    { label: 'Contact', href: '/contact' },
  ],

  user: {
    name: 'Abunesh R P',
    role: 'Full Stack AI Engineer',
    bio: 'Passionate B.Tech AI & Data Science student specializing in full-stack development and machine learning. Focused on building impactful AI-powered systems across accessibility, defense, and environmental domains.',
    avatarUrl: `${base}assets/profile/profile.webp`,
    logoUrl: `${base}assets/profile/logo.svg`,
    resumeUrl: `${base}assets/profile/Abunesh_R_P_Resume.pdf`,
    website: 'https://abuneshrp.netlify.app',
    socials: [
      {
        platform: 'github',
        url: 'https://github.com/Abunesh126',
        label: 'GitHub',
      },
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/abunesh-r-p-803677278',
        label: 'LinkedIn',
      },
    ],
  },

  content: {
    headline: 'Abunesh R P — Full Stack AI Engineer',
    subheadline: 'Building intelligent, scalable web applications that integrate AI, automation, and real-world impact',
    highlights: ['AI', 'Full Stack', 'Computer Vision', 'Data Science'],
    primaryCta: 'View Projects',
    primaryCtaHref: '/projects',
    secondaryCta: 'Contact Me',
    secondaryCtaHref: '/contact',
  },
};
