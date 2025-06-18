import React, { useState, useEffect } from 'react';

import { FaClock , FaGithub,FaWifi,FaSpotify,FaDiscord } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import { FaEarthAmericas } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { HiArrowSmRight } from "react-icons/hi";

import __fang_yuan__ from '../../../src/assets/fang_yuan.webp';
import __tag__ from '../../../src/assets/tag.svg';
import '../../../public/styles/_body/_leftSection/leftSection.css';
import {lifeUpdates , techSkills} from '../../../Data';

import { io } from "socket.io-client";
import { RoughNotation } from 'react-rough-notation';





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
  const [updates, setUpdates] = useState(lifeUpdates);
  const [leetcodeStatus, setLeetcodeStatus] = useState(null);
  const [lastOnlineText, setLastOnlineText] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);


  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
   
  };

  const getTimeAgoText = (timestamp) => {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };
  
  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://spotify-server-nwd0.onrender.com/api/now-playing');
        
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

  useEffect(() => {
    // Try to get life updates from localStorage
    const savedUpdates = localStorage.getItem('lifeUpdates');
    if (savedUpdates) {
      try {
        const parsedUpdates = JSON.parse(savedUpdates);
        setUpdates(parsedUpdates);
      } catch (e) {
        console.error('Error loading life updates:', e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchLeetCodeStatus = async () => {
      try {
        const response = await fetch('https://leetcode-status-tracker-extension.onrender.com/status');
        const data = await response.json();
        setLeetcodeStatus(data);
        if (data.status === 'offline') {
          setLastOnlineText(getTimeAgoText(data.last_online));
        } else {
          setLastOnlineText('');
        }
      } catch (error) {
        console.error('Error fetching LeetCode status:', error);
      }
    };

    // Initial fetch
    fetchLeetCodeStatus();

    // Fallback polling every 60s
    const fallbackInterval = setInterval(fetchLeetCodeStatus, 60000);

    // WebSocket setup
    const socket = io("https://leetcode-status-tracker-extension.onrender.com", {
      transports: ['websocket'],
      reconnectionAttempts: Infinity,
      timeout: 10000
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    socket.on("statusUpdate", (data) => {
      setLeetcodeStatus(data);
      if (data.status === 'offline') {
        setLastOnlineText(getTimeAgoText(data.last_online));
      } else {
        setLastOnlineText('');
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.disconnect();
      clearInterval(fallbackInterval);
    };
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
            {/* Leetcode Status Data from my-custom-leetcode-server linked with my chrome ext*/}
             <div className="status-details">
              {leetcodeStatus ? (
                leetcodeStatus.status === 'online' ? (
                  <span className="status-badge">
                    <span className="status-dot status-dot--blinking online"></span>
                    Online
                  </span>
                ) : (
                  <>
                    <span className="status-badge">
                      <span className="status-dot status-dot--blinking offline"></span>
                      Offline
                    </span>
                    <span className="last-online">
                      <span style={{ color: "#B3B5B9", fontWeight: 600 }}>Last Online</span> {lastOnlineText}
                    </span>
                  </>
                )
              ) : (
                <span className="text-red-400">Loading...</span>
              )}
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
          working on <strong>
            Leetcode Status Tracker
            <RoughNotation type="underline" show={true} color="#1DB954" animationDelay={1000} animationDuration={2000}>
            <span> Extension </span>
            </RoughNotation>
              </strong>
          project & learning{' '}
          <RoughNotation type="underline" show={true} color="#1DB954" animationDelay={1000} animationDuration={2000}>
            <span><strong>Go</strong></span>
          </RoughNotation>.
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
          <h4><GiProgression size={15} style={{marginRight: '4px'}} />Recent Update's</h4>
          <ul className='life-update-list'>
            {
              updates.map((update) => (
                <li key={update.id}>
                  <HiArrowSmRight style={{verticalAlign:'middle',marginRight:'3px'}}/>
                  <span dangerouslySetInnerHTML={{ __html: update.text }} />
                </li>
              ))
            }
          </ul>
    </div>
    </>
  );
};

export default LeftSection;
