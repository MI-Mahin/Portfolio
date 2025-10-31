import React from 'react';

const projects = [
  { title: "Portfolio Website", description: "My personal portfolio built with React.", link: "#" },
  { title: "Blog App", description: "A full-stack blog application using FastAPI and React.", link: "#" },
  { title: "JMeter API Testing", description: "Performance testing using JMeter on Simple Books API.", link: "#" },
];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
