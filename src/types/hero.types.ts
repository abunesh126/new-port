// ─── Hero Page Data Types ────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href:  string;
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'other';
  url:      string;
  label:    string;
}

export interface HeroUser {
  /** Full display name */
  name:      string;
  /** Job title / role */
  role:      string;
  /** Short bio paragraph */
  bio:       string;
  /** Path or URL to profile / avatar image */
  avatarUrl: string;
  /** Path or URL to logo image (used in navbar) */
  logoUrl:   string;
  /** Path or URL to downloadable resume PDF */
  resumeUrl: string;
  /** Personal website */
  website:   string;
  /** Social profile links */
  socials:   SocialLink[];
}

export interface HeroContent {
  /** Main bold headline */
  headline:       string;
  /** Softer subheadline sentence */
  subheadline:    string;
  /** Highlight / tag pills */
  highlights:     string[];
  /** Primary CTA */
  primaryCta:     string;
  primaryCtaHref: string;
  /** Secondary CTA */
  secondaryCta:     string;
  secondaryCtaHref: string;
}

export interface HeroPageData {
  nav:     NavItem[];
  user:    HeroUser;
  content: HeroContent;
}
