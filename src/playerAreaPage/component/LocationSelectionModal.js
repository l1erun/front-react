import React from "react";
import "../css/LocationSelectionModal.css";

const LocationSelectionModal = ({baseLocation, forestLocation, userLocation, onLocationClick, onClose }) => {
    const renderLocation = (location) => (
        <li key={location.id} onClick={() => onLocationClick(location)}>
            <div className="location-card">
                <h4>{location.name || "Безымянная локация"}</h4>
                <p><strong>Тип:</strong> {location.type}</p>
                <p><strong>Описание:</strong> {location.description || "Нет описания"}</p>
                <p><strong>Награды:</strong></p>
                <ul className="rewards">
                    {Object.entries(location.rewards).map(([key, value]) => (
                        value > 0 && <li key={key}>{`${key}: ${value}`}</li>
                    ))}
                </ul>
                <p><strong>Занятость:</strong> {location.occupiedBy.length > 0 ? location.occupiedBy.join(", ") : "Свободно"}</p>
                <p><strong>Уникалность:</strong> {location.uniq ? "да" : "нет"}</p>
            </div>
        </li>
    );

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Выбор локации</h3>
                <div>
                    <h4>Базовые локации</h4>
                    <ul>
                        {baseLocation.map(renderLocation)}
                    </ul>
                </div>
                <div>
                    <h4>Лесные локации</h4>
                    <ul>
                        {forestLocation.map(renderLocation)}
                    </ul>
                </div>
                <div>
                    <h4>Локации пользователя</h4>
                    <ul>
                        {Object.entries(userLocation).map(([cardId, locations]) => (
                            <li key={cardId}>
                                <h5>Карта: {cardId}</h5>
                                <ul>
                                    {locations.map(renderLocation)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default LocationSelectionModal;
