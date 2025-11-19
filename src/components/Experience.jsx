const experience = [
  {
    position: "Software Engineering Intern (Research & Development)",
    company: "Savoy Ice Cream Factory Ltd.",
    location: "Gulshan, Dhaka, Bangladesh",
    duration: "October 2025 - February 2026",
    //description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    technologies: ["Next.js", "MySQL", "Flask"],
    logo: "/company-logo.png"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <h2>Experience</h2>
      <div className="experience-list">
        {experience.map((exp, index) => {
          const [title, rest] = exp.position.split(' (');
          return (
            <div key={index} className="experience-card">
              <div className="experience-logo">
                <img src={exp.logo} alt={`${exp.company} logo`} />
              </div>
              <div className="experience-content">
                <div className="experience-header">
                  <div>
                    <h3>
                      {title}
                      {rest ? (<><br /><span className="experience-position-rest">({rest}</span></>) : null}
                    </h3>
                    <h4 className="experience-company">{exp.company}</h4>
                  </div>
                  <div>
                    <span className="experience-duration">{exp.duration}</span>
                  </div>
                </div>
                <p className="experience-location">{exp.location}</p>
                <p className="experience-description">{exp.description}</p>
                {/* technologies removed from Experience cards per request */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
