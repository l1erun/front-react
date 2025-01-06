import React from "react";
import "../css/LocationDetailsModal.css";

const LocationDetailsModal = ({ location, onSendWorker, onClose }) => {
    if (!location) return null;
    console.log(location);
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Детали локации</h3>
                <div className="location-details">
                    <h4>{location.name || "Безымянная локация"}</h4>
                    <p><strong>Описание:</strong> {location.description || "Нет описания"}</p>
                    <p><strong>Награды:</strong></p>
                    <ul className="rewards">
                        {Object.entries(location.rewards).map(([key, value]) => (
                            value > 0 && <li key={key}>{`${key}: ${value}`}</li>
                        ))}
                    </ul>
                    <p><strong>Слоты рабочих:</strong> {location.workerSlots}</p>
                </div>
                <div className="modal-buttons">
                    <button onClick={onSendWorker}>Отправить рабочего</button>
                    <button onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default LocationDetailsModal;
