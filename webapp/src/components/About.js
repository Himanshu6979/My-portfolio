import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/about.css";
import { Link } from "react-router-dom";


const About = () => {
  const [data, setData] = useState({
    name: "",
    bio: "",
    photo: "",
    skills: [],
    projects: []
  });

  useEffect(() => {
    axios
      .get("http://localhost:4002/api/about")
      .then((response) => {
        setData(response.data);
        localStorage.setItem("aboutData", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <section className="about-section">
      {/* About Me Section */}
      {data.name && data.bio ? (
        <div className="about-container">
          <div className="about-card">
            <div className="profile-info">
              <img
                src={`http://localhost:4002${data.photo}`}
                alt="Profile"
                className="profile-img"
              />
              <div className="info-text">
                <h2>{data.name}</h2>
                <p>{data.bio}</p>
                <Link to="/contact" className="btn-primary">
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div className="skills-container">
          <h3>Skills</h3>
          <div className="skills-grid">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <div className="projects-container">
          <h3>My Projects</h3>
          <div className="projects-grid">
            {data.projects.map((project, index) => (
              <div key={index} className="project-card">
                <img
                  src={`http://localhost:4002${project.image}`}
                  alt={project.title}
                  className="project-img"
                />
                <div className="project-info">
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                  <div className="project-links">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        View Demo
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
