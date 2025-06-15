import React, { useState } from 'react';
import './Contact.scss';
import { FaEnvelope } from 'react-icons/fa';  // Import envelope icon
import __naruto__ from '../../src/assets/naruto.png'; // Assuming you have a luffy image in your assets
import { RiArrowRightUpLine } from "react-icons/ri";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  // Function to open Gmail with your email
  const openGmail = () => {
    window.open('mailto:rudrasaha305@gmail.com', '_blank');
  };
  
  return (
    <div className="contact-page">
      <div className="grid-background">
        <div className="grid-lines"></div>
      </div>
      
      <div className="contact-content">
        
        <div className="contact-container">
          <div className="contact-image-container">
            <div className="image-placeholder">
                <img src={__naruto__} alt="" />
            </div>
          </div>
          
          <div className="contact-form-container">
            <p onClick={openGmail}>
                <span className="look-at-me-damnit-dot look-at-me-damnit-dot--blinking roundy"></span>
                Send a direct mail <RiArrowRightUpLine size={18} style={{verticalAlign:'middle'}}/>
            </p>
            <h3 className="contact-title">Any Special Message For Me?</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Kurosaki Ichigo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="abc@gamil.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message Here ..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                ></textarea>
              </div>
              
              <button type="submit" className="send-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;