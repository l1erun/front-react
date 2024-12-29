import React from "react";
import "../css/MeadowSection.css"; // Для стилизации

const MeadowSection = ({ meadowCards }) => {
    const totalSlots = 8; // Фиксированное количество мест
    const slots = Array.from({ length: totalSlots }, (_, index) => meadowCards[index] || null);

    return (
        <div className="meadow-section">
            <h3>Центральная поляна</h3>
            <div className="meadow-grid">
                {slots.map((card, index) => (
                    <div key={index} className="meadow-slot">
                        {card ? <img src={card.image_url} alt={card.name} /> : <div className="empty-slot"></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeadowSection;
