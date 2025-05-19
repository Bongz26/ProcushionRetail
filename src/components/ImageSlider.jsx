// src/components/ImageSlider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './ImageSlider.css';

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="slide-wrapper">
            <img src={image.url || image} alt={image.title || `Slide ${index + 1}`} className="slide" />
            {image.title && (
              <div className="slide-content">
                <h2 className="slide-title">{image.title}</h2>
                {image.description && (
                  <p className="slide-description">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="prev-button" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="next-button" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        className={`autoplay-button ${isAutoPlaying ? 'playing' : ''}`}
        onClick={toggleAutoPlay}
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
}

export default ImageSlider;