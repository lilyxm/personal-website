import React from "react";
import Chip from '@mui/material/Chip';
import { useParams, useNavigate } from 'react-router-dom';
import rawProjectsData from '../data/projects.json';
import '../assets/styles/Project.scss';
import '../index.scss';

const imageBasePath = `${process.env.PUBLIC_URL}/images`;

type ProjectData = {
  id: string;
  title: string;
  images: string[];
  paragraphs: string[];
  link: string;
  technologies: string[];
};

function resolveMediaPath(path: string) {
  if (/^(https?:\/\/|\/)/i.test(path)) {
    return path;
  }

  return `${imageBasePath}/${path}`;
}

function isVideoFile(path: string) {
  return /\.(mp4|webm|ogg)$/i.test(path);
}

function getVideoMimeType(path: string) {
  const ext = path.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'ogg':
      return 'video/ogg';
    default:
      return 'video/mp4';
  }
}

const projectsData: Record<string, ProjectData> = Object.fromEntries(
  Object.entries(rawProjectsData).map(([key, project]) => [
    key,
    {
      ...project,
      images: project.images.map((media) => resolveMediaPath(media)),
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
  const totalSections = Math.max(
    project.images.length,
    Math.ceil(project.paragraphs.length / 2)
  );

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
              <span className="chip-title">Tech Stack:</span>
              {project.technologies.map((tech: string) => (
                <Chip key={tech} className='chip' label={tech} />
              ))}
            </div>
          </section>

          {Array.from({ length: totalSections }).map((_, sectionIndex) => {
            const media = project.images[sectionIndex];
            const firstParagraph = project.paragraphs[sectionIndex * 2];
            const secondParagraph = project.paragraphs[sectionIndex * 2 + 1];

            return (
              <React.Fragment key={`${project.id}-section-${sectionIndex}`}>
                {media &&
                  (isVideoFile(media) ? (
                    <video controls className="project-hero-video" preload="metadata">
                      <source src={media} type={getVideoMimeType(media)} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={media}
                      alt={`${project.title} screenshot ${sectionIndex + 1}`}
                      className="project-hero-image"
                    />
                  ))}

                {firstParagraph && (
                  <section className="project-section">
                    <p>{firstParagraph}</p>
                  </section>
                )}

                {secondParagraph && (
                  <section className="project-section">
                    <p>{secondParagraph}</p>
                  </section>
                )}
              </React.Fragment>
            );
          })}

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
