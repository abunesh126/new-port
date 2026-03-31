import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  return (
    <div className="projects-section">
      <motion.div
        className="projects-header"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="projects-label">
          <span className="projects-label__dot" />
          Projects
        </div>
        <h2 className="projects-title">My Works</h2>
        <p className="projects-subtitle">
          Discover my portfolio, where purposeful interfaces meet captivating design. 
          My work strives to enhance experiences and inspire.
        </p>
      </motion.div>

      <div className="projects-list">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
