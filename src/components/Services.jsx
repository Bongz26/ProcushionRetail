import React from 'react';
import { FaCar, FaSprayCan, FaTools, FaCheck } from 'react-icons/fa';
import './Services.css';

const services = [
  {
    id: 1,
    name: 'Complete Auto Painting',
    icon: <FaCar />,
    description: 'Full vehicle repainting with premium quality paints and professional finish.',
    features: [
      'Color matching expertise',
      'Premium paint brands',
      'UV protection coating',
      'Lifetime warranty'
    ]
  },
  {
    id: 2,
    name: '~Panel Repairs & Painting~',
    icon: <FaSprayCan />,
    description: '~Expert panel repairs and spot painting for damaged areas.~',
    features: [
      'Dent removal',
      'Rust treatment',
      'Seamless color matching',
      'Quick turnaround'
    ]
  },
  {
    id: 3,
    name: 'Custom Paint Jobs',
    icon: <FaTools />,
    description: 'Custom paint designs and special effects for unique looks.',
    features: [
      'Custom color mixing',
      'Special effects paint',
      'Metallic finishes',
      'Artistic designs'
    ]
  }
];

function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2>Our Services</h2>
          <p className="services-subtitle">
            Professional auto painting services with guaranteed satisfaction
          </p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck className="feature-check" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="quote-button"
                onClick={() => window.location.href = '/quote'}
              >
                Get a Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
