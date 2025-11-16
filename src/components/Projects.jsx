import React from 'react';

const projects = [
  { title: "Data Sense", description: "Data Sense is a natural language to SQL system with a modern web interface for the Savoy Ice Cream distribution database.", link: "https://github.com/MI-Mahin/DataSense.git" },
  { title: "Police Positive", description: "Police Positive enhances responsiveness, transparency, and public trust by streamlining communication between civilians, on-duty police operators, and supervisors through innovative technology solutions.", link: "https://github.com/MI-Mahin/Police-Positive.git" },
  { title: "Sign All", description: "Sign All is designed to enhance communication for individuals with hearing disabilities by translating American Sign Language (ASL) gestures into English text and speech.", link: "https://github.com/MI-Mahin/sign-all_DP1.git" },
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
