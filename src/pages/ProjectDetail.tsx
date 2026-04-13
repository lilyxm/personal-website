import React from "react";
import Chip from '@mui/material/Chip';
import { useParams, useNavigate } from 'react-router-dom';
import rawProjectsData from '../data/projects.json';
import '../assets/styles/Project.scss';

const imageBasePath = `${process.env.PUBLIC_URL}/images`;

type ProjectData = {
  id: string;
  title: string;
  images: string[];
  paragraphs: string[];
  link: string;
  technologies: string[];
};

const projectsData: Record<string, ProjectData> = Object.fromEntries(
  Object.entries(rawProjectsData).map(([key, project]) => [
    key,
    {
      ...project,
      images: project.images.map((image) => `${imageBasePath}/${image}`),
    },
  ])
);

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  if (!projectId || !projectsData[projectId]) {
    return (
      <div className="project-detail-container">
        <button className="back-button" onClick={() => navigate('/personal-website')}>
          ← Back to Portfolio
        </button>
        <h1>Project Not Found</h1>
        <p>Sorry, we couldn't find the project you're looking for.</p>
      </div>
    );
  }

  const project = projectsData[projectId];
  const totalSections = Math.max(project.images.length, project.paragraphs.length);

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={() => navigate('/personal-website')}>
        ← Back to Portfolio
      </button>
      
      <div className="project-detail">
        <div className="project-content">
          <h1>{project.title}</h1>
           <section className="project-section">
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {project.technologies.map((tech: string) => (
                <Chip key={tech} className='chip' label={tech} />
              ))}
            </div>
          </section>

          {Array.from({ length: totalSections }).map((_, index) => (
            <React.Fragment key={`${project.id}-section-${index}`}>
              {project.images[index] && (
                <img
                  src={project.images[index]}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="project-hero-image"
                />
              )}
              {project.paragraphs[index] && (
                <section className="project-section">
                  <p>{project.paragraphs[index]}</p>
                </section>
              )}
            </React.Fragment>
          ))}

         

          <div className="project-links">
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                View Live Project →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
