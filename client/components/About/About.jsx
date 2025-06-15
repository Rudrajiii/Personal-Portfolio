import React from 'react';
import '../../public/styles/_about/About.css';
import __ichigo__ from '../../src/assets/ichis_smily_face.png';

import { RiQuillPenAiLine } from "react-icons/ri";


const About = () => {
  return (
    <div className="about-page">
      <div className="grid-background">
        <div className="grid-lines"></div>
      </div>
      
      <div className="about-content">
        <div className="js30-banner">
          <div className="js30-logo">
            <img src={__ichigo__} alt="" />
          </div>
          <div className="about-container">
          <div className="js30-text">
            <div className="js30-label">Here's all about me <RiQuillPenAiLine size={20} style={{verticalAlign:'middle'}}/></div>
            <h2 className="js30-title">I'm Rudra. Just a dev</h2>
          </div>

          <div className="about-all">
            <p>
              I am a full-stack developer with a passion for creating dynamic and responsive web applications. I have experience in various technologies including React Node.js, and MongoDB. My goal is to build applications that provide a seamless user experience and solve real-world problems.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;