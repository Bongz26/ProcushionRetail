import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-button"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp size={24} />
      <span>Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;
