import React from "react";
import "../css/ForestLocations.css"; // Для стилизации

const ForestLocation = ({ locations }) => {
    return (
        <div className="locations-section">
            <h3>Лесные локации</h3>
            <div className="locations-grid">
                {locations.map((location, index) => (
                    <div key={index} className="location-item">
                        <h4>{location.name}</h4>
                        <p>{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForestLocation;
