import React from 'react';
import './Paintings.scss';
import __zhuofan__ from '../../src/assets/zhuofan.png'; // Assuming you have a zhuofan image in your assets

// Import your paintings or use placeholders for now
const paintings = [
  { id: 1, src: '/path/to/painting1.jpg', title: 'Abstract Mountains', size: 'normal' },
  { id: 2, src: '/path/to/painting2.jpg', title: 'Ocean Sunset', size: 'tall' },
  { id: 3, src: '/path/to/painting3.jpg', title: 'Cosmic Journey', size: 'normal' },
  { id: 4, src: '/path/to/painting4.jpg', title: 'Forest Path', size: 'wide' },
  { id: 5, src: '/path/to/painting5.jpg', title: 'City Lights', size: 'normal' },
  { id: 6, src: '/path/to/painting6.jpg', title: 'Mountain Lake', size: 'tall' },
  // Add more paintings as needed
];

const Paintings = () => {
  return (
    <div className="paintings-page">
      <div className="grid-background">
        <div className="grid-lines"></div>
      </div>
      
      <div className="paintings-content">
        {/* Left Section - Fixed Content */}
        <div className="left-section-of-paintings">
          <div className="painting-image-container">
            <img src={__zhuofan__} alt="" />
          </div>
          
          <div className="painting-text">
            <p className="painting-paragraph">
              Painting is one and only hobby i have & i like it very much when ever i get time i do painting !!
            </p>
            
            <p className="painting-paragraph">
              it's kinda work like a nurishment of my soul so i really enjoy doing it...
            </p>
            
            <p className="painting-paragraph">
              You know what? i've decided when I will grow older I will follow this passion for the rest of my life along with enjoying some anime show's and manhua's lol...
            </p>
          </div>
        </div>
        
        {/* Right Section - Scrollable Two-Column Grid */}
        <div className="right-section">
          
          <div className="paintings-grid">
            {/* Left Column */}
            <div className="grid-column">
              <div className="painting-item">
                <img 
                  src="https://i.pinimg.com/736x/0b/17/68/0b17687c0df676176373bcbdcc40e3cb.jpg" 
                  alt="Painting 1"
                />
                <div className="painting-overlay">
                  <p className="painting-title">Abstract Nature</p>
                </div>
              </div>
              
              <div className="painting-item painting-tall">
                <img 
                  src="https://i.pinimg.com/736x/cb/26/d1/cb26d1f01caeb53db5fb62d0e9b4a74d.jpg" 
                  alt="Painting 2"
                />
                <div className="painting-overlay">
                  <p className="painting-title">Mountain Scene</p>
                </div>
              </div>
              
              {/* <div className="painting-item">
                <img 
                  src="https://via.placeholder.com/400x300/1e1e1e/4caf50/?text=Painting+3" 
                  alt="Painting 3"
                />
                <div className="painting-overlay">
                  <p className="painting-title">Ocean Waves</p>
                </div>
              </div> */}
            </div>
            
            {/* Right Column */}
            <div className="grid-column">
              <div className="painting-item painting-tall">
                <img 
                  src="https://i.pinimg.com/736x/8f/ff/49/8fff491de9e00ad040b09834c678a0e1.jpg" 
                  alt="Painting 4"
                />
                <div className="painting-overlay">
                  <p className="painting-title">Forest Path</p>
                </div>
              </div>
              
              {/* <div className="painting-item">
                <img 
                  src="https://via.placeholder.com/400x300/1e1e1e/4caf50/?text=Painting+5" 
                  alt="Painting 5"
                />
                <div className="painting-overlay">
                  <p className="painting-title">City Lights</p>
                </div>
              </div> */}
              
              <div className="painting-item ">
                <img 
                  src="https://i.pinimg.com/736x/91/9b/e8/919be8ecda6f10d82926c99f2f3a64d5.jpg" 
                  alt="Painting 6"
                  style={{ objectPosition:'top'}}
                />
                <div className="painting-overlay">
                  <p className="painting-title">Sunset Colors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paintings;