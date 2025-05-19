import React, { useRef, useState } from 'react';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBq8Qtk9YpQfK-5F2Z9VVr5AZwKyHlVjOw'
  });

  const location = {
    lat: -28.5252,
    lng: 28.8151
  };

  const mapStyles = {
    width: '100%',
    height: '400px'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        form.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setSubmitStatus('success');
      form.current.reset();
    } catch (error) {
      setSubmitStatus('error');
      console.error('Failed to send email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for all your auto paint needs</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Visit Us</h3>
            <p>Sekwereng (Phuthadijhba Freedom Square Shopping Centre)</p>
          </div>

          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Call Us</h3>
            <p>
              <a href="tel:0835796982">083 579 6982</a>
            </p>
          </div>

          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email Us</h3>
            <p>
              <a href="mailto:info@procushion.co.za">info@procushion.co.za</a>
            </p>
          </div>

          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Business Hours</h3>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="contact-main">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="user_name">Name</label>
                <input type="text" id="user_name" name="user_name" required />
              </div>

              <div className="form-group">
                <label htmlFor="user_email">Email</label>
                <input type="email" id="user_email" name="user_email" required />
              </div>

              <div className="form-group">
                <label htmlFor="user_phone">Phone</label>
                <input type="tel" id="user_phone" name="user_phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-status success">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="submit-status error">
                  Failed to send message. Please try again or contact us directly.
                </div>
              )}
            </form>
          </div>

          <div className="map-section">
            {/* Google Map */}
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={location}
              >
                <Marker position={location} />
              </GoogleMap>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;