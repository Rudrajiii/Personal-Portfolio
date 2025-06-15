import React, { useEffect, useState } from 'react';
import '../../../public/styles/_body/_rightSection/rightSection.css';
import { TbExternalLink } from "react-icons/tb";


import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import AreaPlot from '../../Plots/AreaPlot';
import HistogramChart from '../../Plots/HistogramPlot';
import { projectsData } from '../../../Data';


const RightSection = () => {
  const API_II = "https://wakatime.com/share/@Rudra_/be63e25f-927f-4586-b971-81fa9e623dfe.json";
  const API_I = "";
  const [chartData, setChartData] = useState([]);
  const [codingStats, setCodingStats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);


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