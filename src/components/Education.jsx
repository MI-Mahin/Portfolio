const education = [
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "Islamic University of Technology",
    location: "Gazipur, Bangladesh",
    year: "2022 - 2026 (Expected)",
    description: "First Class (Honors)",
    logo: "/university-logo.png"
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Notre Dame College",
    location: "Dhaka, Bangladesh",
    year: "2019 - 2021",
    description: "GPA 5.00 (Science)",
    logo: "/college-logo.png"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "RAJUK Uttara Model College",
    location: "Dhaka, Bangladesh",
    year: "2017 - 2019",
    description: "GPA 5.00 (Science)",
    logo: "/school-logo.png"
  }
];

const Education = () => {
  return (
    <section id="education" className="education">
      <h2>Education</h2>
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-card">
            <div className="education-logo">
              <img src={edu.logo} alt={`${edu.institution} logo`} />
            </div>
            <div className="education-content">
              <div className="education-header">
                <h3>{edu.degree}</h3>
                <span className="education-year">{edu.year}</span>
              </div>
              <h4 className="education-institution">{edu.institution}</h4>
              <p className="education-location">{edu.location}</p>
              <p className="education-description">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
