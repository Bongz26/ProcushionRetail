import React from 'react';
import './Hero.css'; // Create this CSS file in the same directory
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content container">
        <h1 className="hero-title">Procushion Auto Paint ~& Body Shop~</h1>
        <p className="hero-subtitle">Expert in plain and custom paint Products.</p>
        <Link to ="/contact" className="hero-button">Get a Quote</Link>
      </div>
    </div>
  );
}

export default Hero;