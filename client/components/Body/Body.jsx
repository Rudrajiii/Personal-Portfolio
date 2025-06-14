// import React from 'react';
import LeftSection from './LeftSection/LeftSection';
import RightSection from './RightSection/RightSection';
import '../../public/styles/_body/body.css';

const Body = () => {
  return (
    <div className="body-container">
      <div className="body-content">
        <div className="body-left">
          <LeftSection />
        </div>
        <div className="body-right">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default Body;