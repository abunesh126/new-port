import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus !== 'idle') return;
    
    setFormStatus('sending');
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setFormStatus('success');
    
    // Reset back to normal after 3 seconds
    setTimeout(() => {
      setFormStatus('idle');
    }, 3000);
  };

  return (
    <div className="contact-wrapper">
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Left Side: Form */}
        <div className="contact-form-side">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">
            Please feel free to contact us and we<br />
            will get back to you as soon as we can.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="Name" required disabled={formStatus === 'sending'} />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email" required disabled={formStatus === 'sending'} />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Message" required disabled={formStatus === 'sending'} />
            </div>
            
            <button 
              type="submit" 
              className={`btn-submit ${formStatus !== 'idle' ? 'btn-submit--active' : ''}`}
              disabled={formStatus !== 'idle'}
            >
              <AnimatePresence mode="wait">
                {formStatus === 'idle' && (
                  <motion.span 
                    key="idle"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    Send
                  </motion.span>
                )}
                
                {formStatus === 'sending' && (
                  <motion.div 
                    key="sending"
                    className="btn-status-content"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sending Message...
                  </motion.div>
                )}
                
                {formStatus === 'success' && (
                  <motion.div 
                    key="success"
                    className="btn-status-content"
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Sent Successfully
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>

        {/* Right Side: Info */}
        <div className="contact-info-side">
          <div className="info-block">
            <h3>Visit us</h3>
            <p>
              263 Homebush Road<br />
              Strathfield South 2136
            </p>
          </div>

          <div className="info-block">
            <h3>Talk to us</h3>
            <p>
              +61 421 307 998<br />
              abunesh@example.com
            </p>
          </div>

          <div className="social-icons">
            {/* Twitter */}
            <a href="#" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.975 13.975 0 0 1 1.671 3.149a4.93 4.93 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084 4.928 4.928 0 0 0 4.6 3.419A9.9 9.9 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.503 14.01-14.01 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838A6.162 6.162 0 1 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0-2.88 0 1.44 1.44 0 0 0 2.88 0z"/>
              </svg>
            </a>
            {/* Dribbble */}
            <a href="#" aria-label="Dribbble">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.372 18.627 0 12 0zm6.574 4.7c1.47 1.42 2.454 3.393 2.744 5.59-1.393-.198-3.04-.265-4.832-.12-.34-1.01-1.12-3.14-1.93-4.57 1.65-.63 2.924-.763 4.018-.9zM12 2.164c1.94 0 3.737.587 5.23 1.58-.937.132-2.12.316-3.69 1.05-.73-1.37-1.4-2.5-1.96-3.27.46-.05.93-.07 1.42-.07V2.164C12.7 2.15 12.35 2.16 12 2.16zm-3.32.74c.48.61 1.02 1.56 1.63 2.72-2.73 1.05-5.33 1.13-7.05 1.15 1.21-1.92 2.98-3.36 5.42-3.87zm-6.28 6.4c1.88-.04 4.38-.13 7.37-1.13.418 1.058.784 2.214 1.082 3.447-4.135 1.258-7.778 3.996-8.583 4.67C1.496 14.86 1.08 13.48 1.08 12c0-1.07.16-2.11.45-3.1m3.61 9.4c.75-.63 4.2-3.2 8.16-4.32.7.4 2.5 1.34 3.78 3.5-1.57 2.06-4 3.3-6.73 3.3-1.97 0-3.8-.62-5.2-1.68zm10.7-1.13c-1.16-1.98-2.78-2.9-3.41-3.27 1.83-.54 3.6-.9 5.2-.95.04 1.4-.4 2.82-1.16 4.02h-.63z"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
