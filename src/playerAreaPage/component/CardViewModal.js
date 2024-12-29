import React from "react";

const CardViewModal = ({ card, onClose }) => {
    return (
        <div className="card-view-overlay" onClick={onClose}>
            <div className="card-view" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                <img src={card.image_url} alt={card.name} />
            </div>
        </div>
    );
};

export default CardViewModal;