import React, { useState } from 'react';

// Image files should be placed in the `public/projects/` folder (example: `public/projects/data-sense.jpg`)
const projects = [
  {
    title: "Data Sense",
    description: "Data Sense is a natural language to SQL system with a modern web interface for the Savoy Ice Cream distribution database.",
    link: "https://github.com/MI-Mahin/DataSense.git",
    image: "/projects/data-sense.svg",
  },
  {
    title: "Police Positive",
    description: "Police Positive enhances responsiveness, transparency, and public trust by streamlining communication between civilians, on-duty police operators, and supervisors through innovative technology solutions.",
    link: "https://github.com/MI-Mahin/Police-Positive.git",
    image: "/projects/police-positive.svg",
  },
  {
    title: "Sign All",
    description: "Sign All is designed to enhance communication for individuals with hearing disabilities by translating American Sign Language (ASL) gestures into English text and speech.",
    link: "https://github.com/MI-Mahin/sign-all_DP1.git",
    image: "/projects/sign-all.svg",
  },
];

const Projects = () => {
  const [expanded, setExpanded] = useState({});
  const [failedImage, setFailedImage] = useState({});

  const toggle = (i) => {
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const handleImageError = (i) => {
    setFailedImage((prev) => ({ ...prev, [i]: true }));
  };

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-media">
              {!failedImage[index] ? (
                <img src={project.image} alt={`${project.title} screenshot`} onError={() => handleImageError(index)} />
              ) : (
                <div className="media-placeholder" aria-hidden>
                  <span className="media-initial">{project.title.split(' ').map(w => w[0]).slice(0,2).join('')}</span>
                </div>
              )}
            </div>

            <div className="project-content">
              <h3>
                <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
              </h3>

              <p id={`project-desc-${index}`} className={`project-desc ${expanded[index] ? 'expanded' : ''}`} aria-expanded={!!expanded[index]}>
                {project.description}
              </p>

              <div className="project-actions">
                <button
                  className="read-more"
                  onClick={() => toggle(index)}
                  aria-controls={`project-desc-${index}`}
                >
                  {expanded[index] ? 'Read less' : 'Read more'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
