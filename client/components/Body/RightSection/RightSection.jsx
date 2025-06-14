import React, { useEffect, useState } from 'react';
import '../../../public/styles/_body/_rightSection/rightSection.css';
import { TbExternalLink } from "react-icons/tb";
import __recipein__ from '../../../src/assets/project-images/recipe_in.png';
import __jsinternals__ from '../../../src/assets/project-images/js_internal.png';
import __fulladder__ from '../../../src/assets/project-images/full-adder.png';
import __clipy__ from '../../../src/assets/project-images/clipy.png';
import __sorting__ from '../../../src/assets/project-images/sorting_visuals.png';
import __volt__ from '../../../src/assets/project-images/volt.png';

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import AreaPlot from '../../Plots/AreaPlot';
import HistogramChart from '../../Plots/HistogramPlot';


const RightSection = () => {
  const API_II = "https://wakatime.com/share/@Rudra_/be63e25f-927f-4586-b971-81fa9e623dfe.json";
  const API_I = "";
  const [chartData, setChartData] = useState([]);
  const [codingStats, setCodingStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Sample project data (you can replace this with your actual data)
  const projectsData = [
    {
      id: 1,
      title: "Full Adder Circuit Design in Logisim-Evolution",
      description: "This project showcases the design and simulation of a Full Adder, a fundamental combinational circuit in digital logic, using the Logisim-Evolution tool. The full adder takes three 1-bit binary inputs—A, B, and Cin (carry-in)—and produces two outputs: Sum and Cout (carry-out).",
      tags: ["Digital Logic", "Boolean Algebra", "Combinational Circuits", "Logisim-Evolution"],
      date: "April 2025",
      link: "#",
      image: __fulladder__,
      category: "Core CS"
    },
    {
      id: 2,
      title: "Js-Internals",
      description: "This is a NPM Package based on JS , Which is basically gives an deep understanding How Inbuilt Js Functions , Methods Works Under the Hood , it can be much helpful those who are intermediate or new in js or preparing for an Job Preparation.",
      tags: ["javaScript", "NPM", "Node.js"],
      date: "May 2025",
      link: "#",
      image: __jsinternals__,
      category: "All"
    },
    { 
      id: 3,
      title: "Recipe Generator & Analysis App",
      description: "This is Recipe Generator app . By using this you can generate your own any favourite recipes along with the proper nutritional analysis & video tutorial of that recipe. You can translate the recipe in your own native language and share it with your friends and family.",
      tags: ["Node.js", "Express", "EJS", "SCSS","MongoDB","Firebase","Chart.js"],
      date: "June 2025",
      link: "#",
      image: __recipein__,
      category: "Backend"
    },
    {
      id: 4,
      title: "Clipy - A Clipboard Manager Tool",
      description: "A modern desktop clipboard manager built using PyQt5, SQLite, and Python , designed to enhance productivity by capturing, organizing, and restoring clipboard history with ease.",
      tags: ["Python", "PyQt5", "SQLite"],
      date: "March 2025",
      link: "#",
      image: __clipy__,
      category: "All"
    },
    {
      id: 5,
      title: "Sorting Comparator & Visualizer",
      description: "This project is a dynamic and interactive web application built using raw JavaScript and Chart.js, designed to visually demonstrate how various sorting algorithms work step-by-step along with the comparison of 2 algorithms at a time.",
      tags: ["JavaScript", "Chart.js", "HTML", "CSS"],
      date: "March 2025",
      link: "#",
      image: __sorting__,
      category: "Frontend"
    },
    {
      id: 6,
      title: "VOLT - A Versatile Discord Bot",
      description: "VOLT is a feature-rich Discord bot with 80+ commands for server management,code compilation, media, music, and automation. It supports AI-powered image generation, playing music in voice channel , anime search,language translations, scanning urls and GitHub stats many more...",
      tags: ["Python", "Discord.py", "MongoDB", "Matplotlib","Llama3"],
      date: "March 2025",
      link: "#",
      image: __volt__,
      category: "Backend"
    },
  ];

  // Categories for filtering
  const categories = ["All", "Core CS", "Backend", "Frontend", "Low level stuff", "Ai/Ml"];

  // Filter projects based on selected category
  const filteredProjects = activeCategoryIndex === 0
    ? projectsData
    : projectsData.filter(project => project.category === categories[activeCategoryIndex]);

  // Pagination calculations
  const projectsPerPage = 3;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle category change
  const handleCategoryChange = (index) => {
    setActiveCategoryIndex(index);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Add this new function to fetch language percentages data
  const fetchLanguagePercentageData = async () => {
    try {
      const res = await fetch("https://wakatime.com/share/@Rudra_/9b5a290e-ff47-409d-b1ca-bf75785c5809.json");
      if (!res.ok) throw new Error('Failed to fetch language percentage data');

      const response = await res.json();
      setChartData(response); // Store the raw API response
    } catch (error) {
      console.error("Error fetching language percentage data:", error);
      setChartData(null);
    }
  };
  const fetchPast7DaysCodingHoursData = async () => {
    try {
      const res = await fetch("https://wakatime.com/share/@Rudra_/be63e25f-927f-4586-b971-81fa9e623dfe.json");
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setCodingStats(data);

    } catch (err) {
      console.error("Error fetching coding hours data:", err);
    }
  }

  // Update useEffect to use the new function
  useEffect(() => {
    // Fetch the coding hours data for the area chart
    fetchLanguagePercentageData();
    fetchPast7DaysCodingHoursData();

    // Fetch the language percentages for the histogram

    // Set up intervals for periodic refreshes
    const hoursInterval = setInterval(fetchPast7DaysCodingHoursData, 6 * 60 * 60 * 1000);
    const percentInterval = setInterval(fetchLanguagePercentageData, 6 * 60 * 60 * 1000);

    return () => {
      clearInterval(hoursInterval);
      clearInterval(percentInterval);
    };
  }, []);



  return (
    <div className="right-section">
      <div className="right-content">
        {/* Top Row - Two Cards Side by Side */}
        <div className="top-row">
          <div className="card card-1" style={{ paddingLeft: '0' }}>
            <div className="card-content">
              <HistogramChart apiData={chartData} />
            </div>
          </div>
          <div className="card card-2" style={{ paddingLeft: '0' }}>
            <div className="card-content" >
              <AreaPlot apiData={codingStats} />
            </div>
          </div>
        </div>

        {/* Bottom Row - Single Large Card */}
        <div className="bottom-row">
          <div className="card-large" >
            <div className="card-content-large" >
              <div className="header-nav">
                <ul className="categories">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className={activeCategoryIndex === index ? 'active' : ''}
                      onClick={() => handleCategoryChange(index)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="project-cards">
                <div className="project-grid">
                  {currentProjects.map((project) => (
                    <div key={project.id} className={`project-card --pc-${project.id}`}>
                      <div className="project-card-content">
                        <div className="project-image-container">
                          <img src={project.image} alt="" />
                        </div>
                        <div className="project-info">
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-description">
                            {project.description}
                          </p>
                          <div className="project-tags">
                            {project.tags.slice(0, 4).map((tag, index) => (
                              <span key={index} className="tag">{tag}</span>
                            ))}
                            {project.tags.length > 4 && (
                              <div className="tag-row">
                                {project.tags.slice(4).map((tag, index) => (
                                  <span key={index} className="tag">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="project-link">
                          <TbExternalLink size={25} />
                        </div>
                        <div className="project-date">{project.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      <FaArrowLeft/>
                    </button>

                    <div className="pagination-info">
                      {currentPage} / {totalPages}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      <FaArrowRight/>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;