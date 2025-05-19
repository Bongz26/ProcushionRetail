import React from 'react';
import './About.css';
import { FaTrophy, FaPaintBrush, FaUsers, FaCertificate } from 'react-icons/fa';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About ProCushion Automotive Paints</h1>
        <p className="about-tagline">
          Your Premier Destination for Professional Automotive Paint Solutions
        </p>
      </div>

      <div className="about-features">
        <div className="feature-card">
          <FaTrophy className="feature-icon" />
          <h3>Premium Quality</h3>
          <p>We offer only the highest quality automotive paints and products from leading manufacturers.</p>
        </div>

        <div className="feature-card">
          <FaPaintBrush className="feature-icon" />
          <h3>Expert Solutions</h3>
          <p>Our team provides professional advice and custom color matching services.</p>
        </div>

        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Customer Focus</h3>
          <p>Dedicated to exceptional service for both professionals and enthusiasts.</p>
        </div>

        <div className="feature-card">
          <FaCertificate className="feature-icon" />
          <h3>Quality Guaranteed</h3>
          <p>All our products come with quality assurance and technical support.</p>
        </div>
      </div>

      <div className="about-story">
        <h2>Our Story</h2>
        <p>
          Since our establishment, ProCushion Automotive Paints has been at the forefront of 
          automotive paint innovation. We understand that every vehicle is unique, and every 
          customer has specific requirements. That's why we offer a comprehensive range of 
          products and services tailored to meet your exact needs.
        </p>
        <p>
          Our commitment to quality and customer satisfaction has made us a trusted name in 
          the automotive paint industry. Whether you're a professional auto body shop, 
          a custom car enthusiast, or working on a personal project, we have the products 
          and expertise to help you achieve the perfect finish.
        </p>
      </div>
    </div>
  );
}

export default About;