import React, { useState } from 'react';
import './QuotationForm.css';
import QuoteGenerator from './QuoteGenerator';

const QuotationForm = () => {
  const [showQuote, setShowQuote] = useState(false);
const [quoteData, setQuoteData] = useState(null);
const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    paintType: 'solid', // solid, metallic, or pearl
    paintArea: [], // multiple areas can be selected
    additionalServices: [],
    comments: ''
  });

  const paintAreas = [
    { id: 'full', label: 'Full Body', price: 15000 },
    { id: 'hood', label: 'Hood/Bonnet', price: 2500 },
    { id: 'roof', label: 'Roof', price: 2000 },
    { id: 'door', label: 'Door (per door)', price: 1500 },
    { id: 'bumper', label: 'Bumper', price: 1800 }
  ];

  const additionalServices = [
    { id: 'prep', label: 'Surface Preparation', price: 800 },
    { id: 'primer', label: 'Primer Application', price: 600 },
    { id: 'clear', label: 'Clear Coat', price: 1000 },
    { id: 'polish', label: 'Polishing', price: 500 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [type]: checked 
        ? [...prev[type], value]
        : prev[type].filter(item => item !== value)
    }));
  };

  const calculateEstimate = () => {
    let total = 0;
    
    // Calculate paint areas cost
    formData.paintArea.forEach(areaId => {
      const area = paintAreas.find(a => a.id === areaId);
      if (area) total += area.price;
    });

    // Add paint type multiplier
    const paintMultiplier = {
      solid: 1,
      metallic: 1.3,
      pearl: 1.5
    };
    total *= paintMultiplier[formData.paintType];

    // Add additional services
    formData.additionalServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) total += service.price;
    });

    return total;
  };

  const calculateEstimatedTime = () => {
    // Base time in days
    let time = 1;

    // Add time based on paint areas
    const areaCount = formData.paintArea.length;
    if (areaCount > 3) time += 2;
    else if (areaCount > 1) time += 1;

    // Add time for additional services
    if (formData.additionalServices.includes('prep')) time += 0.5;
    if (formData.additionalServices.includes('primer')) time += 0.5;
    if (formData.additionalServices.includes('clear')) time += 0.5;
    if (formData.additionalServices.includes('polish')) time += 0.5;

    // Add time for paint type
    if (formData.paintType === 'metallic') time += 0.5;
    if (formData.paintType === 'pearl') time += 1;

    return Math.ceil(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const estimatedCost = calculateEstimate();
    const estimatedTime = calculateEstimatedTime();

    // Generate quote data
    const quote = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      vehicleMake: formData.vehicleMake,
      vehicleModel: formData.vehicleModel,
      vehicleYear: formData.vehicleYear,
      paintType: formData.paintType,
      paintAreas: formData.paintArea.map(areaId => {
        const area = paintAreas.find(a => a.id === areaId);
        return {
          label: area.label,
          price: area.price
        };
      }),
      additionalServices: formData.additionalServices.map(serviceId => {
        const service = additionalServices.find(s => s.id === serviceId);
        return {
          label: service.label,
          price: service.price
        };
      }),
      totalCost: estimatedCost,
      estimatedTime: estimatedTime
    };

    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote');
      }

      const savedQuote = await response.json();
      setQuoteData(savedQuote);
      setShowQuote(true);

      // Send email notification
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_email: formData.email,
          to_name: formData.customerName,
          quote_number: savedQuote.quoteNumber,
          total_cost: estimatedCost.toLocaleString(),
          estimated_time: estimatedTime,
        },
        process.env.REACT_APP_EMAILJS_USER_ID
      );
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Failed to submit quote. Please try again.');
    }
  };

  return (
    <div className="quotation-form-container">
      <h2>Request a Paint Job Quotation</h2>
      <form onSubmit={handleSubmit} className="quotation-form">
        <div className="form-section">
          <h3>Customer Information</h3>
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Vehicle Information</h3>
          <div className="form-group">
            <label htmlFor="vehicleMake">Vehicle Make</label>
            <input
              type="text"
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleModel">Vehicle Model</label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleYear">Vehicle Year</label>
            <input
              type="number"
              id="vehicleYear"
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Paint Service Details</h3>
          <div className="form-group">
            <label>Paint Type</label>
            <select
              name="paintType"
              value={formData.paintType}
              onChange={handleInputChange}
              required
            >
              <option value="solid">Solid Paint</option>
              <option value="metallic">Metallic Paint</option>
              <option value="pearl">Pearl Paint</option>
            </select>
          </div>

          <div className="form-group">
            <label>Areas to Paint</label>
            <div className="checkbox-group">
              {paintAreas.map(area => (
                <label key={area.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={area.id}
                    checked={formData.paintArea.includes(area.id)}
                    onChange={(e) => handleCheckboxChange(e, 'paintArea')}
                  />
                  {area.label} - R{area.price}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Additional Services</label>
            <div className="checkbox-group">
              {additionalServices.map(service => (
                <label key={service.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={formData.additionalServices.includes(service.id)}
                    onChange={(e) => handleCheckboxChange(e, 'additionalServices')}
                  />
                  {service.label} - R{service.price}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="comments">Additional Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Estimated Cost: R{calculateEstimate().toLocaleString()}</h3>
          <p>Estimated Time: {calculateEstimatedTime()} days</p>
          <button type="submit" className="submit-button">Generate Quote</button>
        </div>

        {showQuote && quoteData && (
          <div className="quote-preview">
            <h3>Your Quote is Ready!</h3>
            <QuoteGenerator quoteData={quoteData} />
          </div>
        )}
      </form>
    </div>
  );
};

export default QuotationForm;
