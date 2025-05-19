import React from 'react';
import carvello from '../assets/carvello.png';
import ppg from '../assets/ppg.png';
import stallion from '../assets/stallion.png';
import luxor from '../assets/luxor.png';
import pantchem from '../assets/pantchem.png';

function VendorLogos() {
  return (
    <div className="vendor-logos">
      <img src={carvello} alt="Carvello" />
      <img src={ppg} alt="PPG" />
      <img src={stallion} alt="Stallion" />
      <img src={luxor} alt="Luxor" />
      <img src={pantchem} alt="Pantchem" />
    </div>
  );
}

export default VendorLogos;