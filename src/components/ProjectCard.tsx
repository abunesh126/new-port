import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ProjectData } from '../data/projectsData';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(`/projects/${project.id}`);
        }
      }}
    >
      <div className="project-card__content">
        <div className="project-card__icon-wrapper">
          <img src={project.icon} alt={`${project.name} icon`} className="project-card__icon" />
        </div>
        <div className="project-card__text">
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__desc">{project.shortDescription}</p>
        </div>
      </div>
      <div className="project-card__arrow">
        <svg fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
