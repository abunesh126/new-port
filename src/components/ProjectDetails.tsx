import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import '../styles/Projects.css';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // Find the exact project by ID
  const project = projectsData.find((p) => p.id === projectId);

  // Scroll to top upon mounting the details page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="project-detail-error">
        <h2>Project not found</h2>
        <button className="project-btn-back" onClick={() => navigate('/')}>
          <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
             <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="project-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="project-details__container">
        {/* Back navigation */}
        <button className="project-btn-back" onClick={() => navigate('/')}>
          <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
             <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
          Back to Projects
        </button>

        {/* Top Info Panel */}
        <motion.div
          className="pd-info-panel"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="pd-info-item">
            <span className="pd-info-label">Client</span>
            <span className="pd-info-value">{project.client || 'N/A'}</span>
          </div>
          <div className="pd-info-item">
            <span className="pd-info-label">Company</span>
            <span className="pd-info-value">{project.company || 'N/A'}</span>
          </div>
          <div className="pd-info-item">
            <span className="pd-info-label">Project Type</span>
            <span className="pd-info-value">{project.shortDescription}</span>
          </div>
          <div className="pd-info-item">
            <span className="pd-info-label">Year</span>
            <span className="pd-info-value">{project.year}</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="pd-header"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="pd-header__icon-wrap">
            <img src={project.icon} alt={`${project.name} icon`} />
          </div>
          <h1 className="pd-header__title">{project.name}</h1>
        </motion.div>

        {/* Description Section */}
        <motion.div
          className="pd-description"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="pd-description__text">{project.fullDescription}</p>

          <div className="pd-tools">
            {project.tools.map((tool) => (
              <span key={tool} className="pd-tool-chip">
                {tool}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-cta-btn"
            >
              Visit Website
              <svg fill="currentColor" viewBox="0 0 16 16" width="16" height="16">
                 <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </a>
          )}
        </motion.div>

        {/* Visual Preview */}
        <motion.div
          className="pd-preview-wrap"
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="pd-preview-img"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
