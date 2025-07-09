import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";  // Create a custom CSS file for Home styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content text-center">
        <h1 className="display-3 text-primary font-weight-bold">
          Welcome to My Portfolio
        </h1>
        <p className="lead text-light mb-4">
          Discover my journey, skills, and the projects I'm passionate about.
        </p>
        <div className="cta-buttons">
          <Link to="/about" className="btn btn-outline-light btn-lg m-2">
            Learn More About Me
          </Link>
          <Link to="/projects" className="btn btn-outline-light btn-lg m-2">
            Explore My Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
