import React from "react";
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  readonly id: string;
  readonly image: string;
  readonly title: string;
  readonly description: string;
  readonly externalLink?: string;
}

function ProjectCard({ id, image, title, description, externalLink }: Readonly<ProjectCardProps>) {
  return (
    <div className="project">
      <Link to={`/project/${id}`} className="project-image-link">
        <img src={image} className="zoom" alt={title} width="100%"/>
      </Link>
      <Link to={`/project/${id}`} className="project-title-link">
        <h2>{title}</h2>
      </Link>
      <p>{description}</p>
      {externalLink && (
        <a href={externalLink} target="_blank" rel="noreferrer" className="project-external-link">
          View Project →
        </a>
      )}
    </div>
  );
}

export default ProjectCard;
