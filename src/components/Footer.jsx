import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About ProCushion</h4>
          <p>Your trusted partner in automotive paint solutions. Delivering quality and excellence since 2019.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/quote">Get Quote</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <a 
                href="https://www.google.com/maps?q=-28.52133,28.8166953&z=17&hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-map-link"
              >
                📍 Sekwereng (Phuthadijhba Freedom Square Shopping Centre)
              </a>
            </li>
            <li>📞 083 579 6982</li>
            <li>✉️ info@procushion.co.za</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Business Hours</h4>
          <ul>
            <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
            <li>Saturday: 9:00 AM - 2:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ProCushion (Pty) Ltd. All rights reserved.</p>
        <p className="developer-credit">Developed by Dondas Tech</p>
      </div>
    </footer>
  );
}

export default Footer;