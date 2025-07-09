import React, { useState, useEffect } from "react";
import "../styles/projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);  // Store projects data
  const [loading, setLoading] = useState(true);   // To handle loading state
  const [error, setError] = useState(null);       // To handle any error during fetching

  useEffect(() => {
    // Try to fetch projects data from localStorage
    const aboutData = localStorage.getItem("aboutData");

    if (aboutData) {
      try {
        const parsedProjects = JSON.parse(aboutData).projects;
        setProjects(parsedProjects); // Set the projects data from localStorage
      } catch (error) {
        setError("Error parsing projects data.");
      }
    } else {
      setError("No projects found in localStorage.");
    }
    setLoading(false);  // Once done, stop loading state
  }, []);

  if (loading) {
    return <div className="text-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="projects-container">
      <h2 className="text-center mb-5">My Projects</h2>
      <div className="row">
        {projects.length === 0 ? (
          <p className="text-center">No projects available.</p>
        ) : (
          projects.map((project, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card project-card shadow-lg">
                <img
                  src={`http://localhost:4000${project.image}`}
                  className="card-img-top project-img"
                  alt={project.title}
                />
                <div className="card-body">
                  <h5 className="card-title project-title">{project.title}</h5>
                  <p className="card-text project-description">{project.description}</p>
                  <div className="project-links">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        className="btn btn-primary project-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Demo
                      </a>
                    )}
                     <a
                        href={project.demoLink}
                        className="btn btn-primary project-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Details
                      </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
