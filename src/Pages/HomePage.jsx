// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import ImageSlider from '../components/ImageSlider';
import './HomePage.css';

function HomePage() {
  const sliderImages = [
    {
      url: '/images/slide44.jpg',
      title: 'Professional Auto Painting',
      description: 'Transform your vehicle with our expert paint services'
    },
    {
      url: '/images/slide3.jpg',
      title: 'Quality Workmanship',
      description: 'Premium finishes that protect and beautify your vehicle'
    },
    {
      url: '/images/p1.jpg',
      title: 'Custom Color Solutions',
      description: 'Choose from a wide range of colors and finishes'
    }
  ];

  return (
    <div className="home-page-container">
      <section className="slider-section">
        <ImageSlider images={sliderImages} />
      </section>
      
      <div className="home-page-content">
        <Hero />
        <section className="services-section">
          <Services />
          <Products />
        </section>
        <About />
        <Contact />
      </div>
    </div>
  );
}

export default HomePage;
