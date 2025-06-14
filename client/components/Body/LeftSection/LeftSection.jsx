import React, { useState, useEffect } from 'react';
import { FaEarthAmericas } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { FaDiscord } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaSpotify } from "react-icons/fa";
import { FaPython, FaNodeJs  } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { TbFileTypeSql } from "react-icons/tb";
import { SiFastapi } from "react-icons/si";
import { SiQt } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMongodb } from "react-icons/si";
import { SiSqlite } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { SiJavascript, SiExpress, SiFlask, SiReact } from "react-icons/si";
import { SiGooglecloud } from "react-icons/si";
import { FaDocker } from "react-icons/fa6";
import { FaGitAlt } from "react-icons/fa";
import { SiScrapy } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";



import __fang_yuan__ from '../../../src/assets/fang_yuan.webp';
import __tag__ from '../../../src/assets/tag.svg';
import '../../../public/styles/_body/_leftSection/leftSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC } from '@fortawesome/free-solid-svg-icons';

const title_compressor = (title) => {
  // Compress the title to a maximum of 20 characters
  if (title.length > 30) {
    return title.slice(0, 30) + '...';
  }
  return title;
}

const redirectToSpotify = (songUrl , isPlaying) => {
  if(!isPlaying){
    console.log("No song URL available");
    return;
  }
  window.open(songUrl, '_blank');
}

const LeftSection = () => {
  // Define tech skills data as objects with name and icon component
  const techSkills = [
    { name: "PYTHON", icon: FaPython },
    { name: "JAVASCRIPT", icon: SiJavascript },
    { name: "", icon: () => <FontAwesomeIcon icon={faC} /> },
    { name: "JAVA", icon: FaJava },
    { name: "GO", icon: FaGolang },
    { name: "SQL", icon: TbFileTypeSql },
    { name: "EXPRESS", icon: SiExpress },
    { name: "FAST-API", icon: SiFastapi },
    { name: "NODE JS", icon: FaNodeJs },
    { name: "DISCORD PY", icon: FaDiscord },
    { name: "SCRAPY", icon: SiScrapy },
    { name: "FLASK", icon: SiFlask },
    { name: "REACT", icon: SiReact },
    { name: "PYQT5", icon: SiQt },
    { name: "POSTGRE-SQL", icon: BiLogoPostgresql },
    { name: "MONGODB", icon: SiMongodb },
    { name: "SQLITE", icon: SiSqlite },
    { name: "FIREBASE", icon: IoLogoFirebase },
    { name: "GCP", icon: SiGooglecloud },
    { name: "DOCKER", icon: FaDocker },
    { name: "GIT", icon: FaGitAlt }
  ];

  // Define social media links with icons
  const socialLinks = [
    { name: "GitHub", icon: FaGithub },
    { name: "LeetCode", icon: SiLeetcode},
    { name: "LinkedIn", icon: IoLogoLinkedin},
    { name: "Discord", icon: FaDiscord },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 394);
  const [currentTime, setCurrentTime] = useState('');
  const [spotifyData, setSpotifyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
   
  };
  
   useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/now-playing');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Spotify data');
        }
        
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setSpotifyData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchSpotifyData();
    
    // Set up polling every 30 seconds to keep data updated
    const intervalId = setInterval(fetchSpotifyData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 394);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const updateTime = () => {
      // Create a date object for Indian Standard Time (IST)
      const options = { timeZone: 'Asia/Kolkata' };
      const indianTime = new Date().toLocaleString('en-US', options);
      const date = new Date(indianTime);
      setCurrentTime(formatTime(date));
    };
    // Update time immediately
    updateTime();
    
    // Set interval to update time every second
    const intervalId = setInterval(updateTime, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="left-section">
      {/* Profile Header - Image and Info Side by Side */}
      <div className="profile-header">
        <div className="profile-image">
            <img src={__fang_yuan__} alt="fang_yuan" />
        </div>
        
        <div className="personal-info">
          <h1 className="name">Rudra Saha</h1>
          <p className="nickname">Vicky</p>
          {/* Leetcode Status Indicator */}
          <div className="status-indicator">
            <div className="status-header">
              <span>{isMobile ? "Leetcode Status" : "Current Leetcode Status"}</span>
              <FaWifi style={{ marginLeft: '5px' }} />
            </div>
            <div className="status-details">
              <span className="status-badge">
                <span className="status-dot status-dot--blinking offline"></span>
                Offline
              </span>
              <span className="last-online"><span style={{color:"#B3B5B9", fontWeight:600}}>Last Online</span> 2 hours ago</span>
            </div>
          </div>
          <div className="time-location">
            <span className="time">Time <FaClock style={{ marginLeft: '5px', verticalAlign: 'middle' }}/></span>
            <span className="time-value">{currentTime}</span>
            <span className="location">
              <span className="location-icon">
                <FaEarthAmericas style={{ marginTop: '5px' }} />
              </span>
              Kolkata, India
            </span>
          </div>
        </div>
      </div>

      {/* Bio/Description */}
      <div className="bio">
        <p>
          Enjoying Coding in illusional world... 
          love to learn and explore new things!! currently 
          working on <strong>Leetcode Status Tracker Extension</strong> project & learning <strong>Go</strong>.
        </p>
      </div>

      {/* Tech Stack Icons */}
      <div className="tech-stack">
        <div className="tech-icons">
          <div className="tech-icon">Resume</div>
          <div className="tech-icon">Hire Me</div>
          
          {/* Map through social links array to render icons */}
          {socialLinks.map((social, index) => (
            <div className="tech-icon tech-icon--small" key={`social-${index}`}>
              <social.icon />
            </div>
          ))}
        </div>
      {/* Spotify Song Status */}
       <div onClick={() => {redirectToSpotify(spotifyData.songUrl,spotifyData.isPlaying)}} className="spotify-div">
        <div className="spotify-card">
          <div className="spotify-album-art">
            {spotifyData && spotifyData.isPlaying ? (
              <img 
                src={spotifyData.albumImageUrl || 'https://via.placeholder.com/65'} 
                alt={spotifyData.album || 'Album Cover'} 
              />
            ) : (
              <div className="spotify-placeholder-image"></div>
            )}
          </div>
          
          <div className="spotify-info">
            <div className="spotify-track-details">
              <p className="spotify-track-name">
                {spotifyData && spotifyData.isPlaying 
                  ? title_compressor(spotifyData.title) 
                  : 'Not playing anything'}
              </p>
              <p className="spotify-artist-name">
                {spotifyData && spotifyData.isPlaying 
                  ? spotifyData.artist 
                  : 'Open Spotify to play something'}
              </p>
            </div>
            <div className="spotify-currently-playing">
              {spotifyData && spotifyData.isPlaying && (
                <span>Currently Playing</span>
              )}
            </div>
          </div>
          
          <div className="spotify-logo">
            <FaSpotify />
          </div>
        </div>
      </div>
        
        <h3 className="tech-title">
          <span className="tag-icon">
            <img src={__tag__} alt="tag" />
          </span>
          Techs & tools 
        </h3>
        
        <div className="skills">
          {/* Map through techSkills array to render skill tags */}
          {techSkills.map((skill, index) => (
            <div className="skill-tag" key={`skill-${index}`}>
              {typeof skill.icon === 'function' 
                ? <skill.icon /> 
                : React.createElement(skill.icon)}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="life-update">
          <h4><GiProgression size={15} style={{marginRight: '4px'}} /> Life Update's</h4>
          <ul className='life-update-list'>
            <li><HiArrowSmRight/> 80% done with the project <strong>Leetcode Status Tracker Extension</strong></li>
            <li><HiArrowSmRight/> Got selected for <strong>Hack[0]lution </strong>(Hackathon) in Kolkata.</li>
            <li><HiArrowSmRight/> Going through some docs about <strong>Profiling</strong> in py.</li>
          </ul>
    </div>
    </>
  );
};

export default LeftSection;