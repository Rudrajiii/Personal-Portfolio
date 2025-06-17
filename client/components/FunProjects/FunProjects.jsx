import React, { useState, useEffect } from 'react';
import './FunProject.scss';
import demoImg from "../../src/assets/project-images/recipe_in.png"

// Sample project data (replace with your actual data)
const funProjects = [
  {
    id: 1,
    title: 'Projects 1',
    description: 'A Python-based web scraper that collects data from various sources and visualizes trends using D3.js and React.',
    image: demoImg,
    fullDescription: 'This project is a comprehensive web scraping tool built with Python and BeautifulSoup. It extracts data from multiple sources, processes it using pandas, and displays interactive visualizations using D3.js within a React frontend. The application allows users to track trends over time, filter data by various parameters, and export results in multiple formats.',
    technologies: ['Python', 'BeautifulSoup', 'React', 'D3.js'],
    demoUrl: 'https://project1-demo.com',
    githubUrl: 'https://github.com/yourusername/project1'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'An AI-powered image recognition system that identifies objects in photos and generates descriptive captions.',
    image: '/path/to/project2.png',
    fullDescription: 'This AI-powered image recognition system leverages deep learning models to identify objects, scenes, and activities in photographs. Built with TensorFlow and PyTorch, it generates natural language descriptions of images using a custom-trained transformer model. The system includes a user-friendly web interface where users can upload images or provide URLs to get instant analyses.',
    technologies: ['TensorFlow', 'PyTorch', 'React', 'Flask'],
    demoUrl: 'https://project2-demo.com',
    githubUrl: 'https://github.com/yourusername/project2'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'A real-time collaboration tool for remote teams with video chat, shared whiteboard, and task management.',
    image: '/path/to/project3.png',
    fullDescription: 'This real-time collaboration platform helps remote teams work together effectively. It features high-quality video conferencing powered by WebRTC, a shared whiteboard for brainstorming, and a Kanban-style task management system. The application uses Socket.io for real-time updates and MongoDB for data persistence. Users can create rooms, invite team members, and save session results for future reference.',
    technologies: ['WebRTC', 'Socket.io', 'React', 'Node.js', 'MongoDB'],
    demoUrl: 'https://project3-demo.com',
    githubUrl: 'https://github.com/yourusername/project3'
  },
  {
    id: 4,
    title: 'Project 4',
    description: 'A mobile app that uses augmented reality to help users visualize furniture in their homes before purchasing.',
    image: '/path/to/project4.png',
    fullDescription: 'This mobile application uses augmented reality to allow users to place virtual furniture in their real-world spaces. Built with React Native and ARKit/ARCore, it helps customers make confident purchasing decisions by seeing how products would look and fit in their homes. The app includes a catalog of 3D furniture models, measurement tools, and direct integration with e-commerce stores.',
    technologies: ['React Native', 'ARKit', 'ARCore', 'Three.js'],
    demoUrl: 'https://project4-demo.com',
    githubUrl: 'https://github.com/yourusername/project4'
  },
];

const FunProject = () => {
  const [selectedProject, setSelectedProject] = useState(funProjects[0]);

  // Function to trim description to a certain length
  const trimDescription = (text, maxLength = 35) => {
    const words = text.split(' ');
    if (words.length <= maxLength) return text;
    return words.slice(0, maxLength).join(' ') + '...';
  };

  return (
    <div className="fun-project-page">
      <div className="grid-background">
        <div className="grid-lines"></div>
      </div>
      
      <div className="fun-project-content">
        {/* Left Section - Project Cards */}
        <div className="project-cards-section">
          <div className="project-cards-container">
            {funProjects.map(project => (
              <div 
                key={project.id} 
                className={`--project-card ${selectedProject.id === project.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card-image">
                  {/* Empty div with no content - add content here */}
                  <div className="image-placeholder">
                    <img src={project.image} alt={project.title} />
                  </div>
                </div>
                <div className="project-card-info">
                  <h3>{project.title}</h3>
                  <p>{trimDescription(project.description, 30)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Section - Project Details */}
        <div className="project-details-section">
          <h2 className="--project-title">{selectedProject.title}</h2>
          
          
          
          <div className="--project-description">
            <p>{selectedProject.fullDescription}</p>

            <div className="--project-image-container">
            <div className="full-image-placeholder">
                <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
          </div>
            
            <div className="project-technologies">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-links">
              {selectedProject.demoUrl && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="--project-link">
                  Live Demo
                </a>
              )}
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="--project-link">
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunProject;