import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
          </ul>
        </div>
       
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Book Smart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
