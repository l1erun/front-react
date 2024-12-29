import React from "react";
import "../css/BaseLocations.css"; // Для стилизации

const BaseLocations = ({ locations }) => {
    return (
        <div className="locations-section">
            <h3>Базовые локации</h3>
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

export default BaseLocations;
