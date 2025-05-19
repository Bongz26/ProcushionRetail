import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaintEstimator = () => {
    const [vehicleType, setVehicleType] = useState('');
    const [paintType, setPaintType] = useState('');
    const [estimatedTime, setEstimatedTime] = useState(0);
    const navigate = useNavigate();

    const calculateTime = () => {
        let baseTime = 0;
        
        // Base times for different vehicle types
        switch(vehicleType) {
            case 'sedan':
                baseTime = 24; // hours
                break;
            case 'suv':
                baseTime = 36;
                break;
            case 'truck':
                baseTime = 48;
                break;
            default:
                baseTime = 24;
        }

        // Add time based on paint type
        if (paintType === 'metallic') {
            baseTime += 12;
        } else if (paintType === 'pearl') {
            baseTime += 24;
        }

        setEstimatedTime(baseTime);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/quotations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vehicleType,
                    paintType,
                    preparationTime: estimatedTime,
                    cost: 50 * estimatedTime // $50 per hour
                })
            });
            const data = await response.json();
            navigate(`/quote/${data.id}`);
        } catch (error) {
            console.error('Error creating quote:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Paint Preparation Time Estimator</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Vehicle Type</label>
                    <select 
                        value={vehicleType} 
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select vehicle type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Paint Type</label>
                    <select 
                        value={paintType} 
                        onChange={(e) => setPaintType(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select paint type</option>
                        <option value="standard">Standard</option>
                        <option value="metallic">Metallic</option>
                        <option value="pearl">Pearl</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Estimated Preparation Time</label>
                    <p className="mt-1 text-gray-600">{estimatedTime} hours</p>
                </div>

                <button 
                    type="submit"
                    onClick={calculateTime}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Get Quote
                </button>
            </form>
        </div>
    );
};

export default PaintEstimator;