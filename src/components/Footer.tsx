import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abunesh@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openResume = () => {
    window.open('/assets/resume.pdf', '_blank'); // Placeholder path
  };

  return (
    <footer id="footer" className="footer-wrapper">
      <div className="footer-gradient-overlay" />

      <div className="footer-container">
        
        {/* ── TOP SECTION: CTA ── */}
        <motion.div 
          className="footer-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="footer-cta__text">
            <h2 className="footer-cta__heading">Let’s Build Something Amazing Together</h2>
            <p className="footer-cta__subtext">
              I’m available for freelance, full-time roles, and exciting collaborations.<br className="hidden md:block"/>
              Let’s turn your ideas into powerful digital experiences.
            </p>
          </div>
          
          <div className="footer-cta__actions">
            <button className="btn-primary" onClick={() => handleNavClick('contact')}>
              Hire Me
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="btn-secondary" onClick={openResume}>
              View Resume
            </button>
          </div>
        </motion.div>

        <div className="footer-divider" />

        {/* ── MIDDLE SECTION: Links & Contact ── */}
        <div className="footer-grid">
          
          {/* Column 1: Contact & Availability */}
          <div className="footer-col footer-col--contact">
            <div className="footer-availability">
              <span className="availability-dot" />
              Available for work
            </div>
            
            <button className="footer-email-copy" onClick={handleCopyEmail}>
              <span className="email-text">abunesh@example.com</span>
              <div className="copy-icon-wrap">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                  ) : (
                    <motion.svg key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </button>
            
            <p className="footer-trust">Trusted by clients & collaborators worldwide.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links">
              <li><button onClick={() => handleNavClick('hero')}>Home</button></li>
              <li><button onClick={() => handleNavClick('projects')}>Projects</button></li>
              <li><button onClick={() => handleNavClick('tech-stack')}>Tech Stack</button></li>
              <li><button onClick={() => handleNavClick('experience')}>Experience</button></li>
              <li><button onClick={() => handleNavClick('contact')}>Contact</button></li>
            </ul>
          </div>

          {/* Column 3: Socials */}
          <div className="footer-col">
            <h3 className="footer-col-title">Socials</h3>
            <div className="footer-socials">
              <a href="#" aria-label="GitHub" className="social-icon-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" aria-label="Portfolio" className="social-icon-btn">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                 </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Abunesh. All rights reserved.</p>
          <p className="footer-built-with">
            Designed & Built with <span className="heart">❤</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
