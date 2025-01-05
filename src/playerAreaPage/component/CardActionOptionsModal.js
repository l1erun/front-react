import React from "react";
import "../css/CardActionOptionsModal.css";
const CardActionOptionsModal = ({cards, onBuildFree, onBuildWithResources, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Выберите действие для карт</h3>
                <div className="cards-list">
                    {cards.map((card) => (
                        <div key={card.id} className="card">
                            <img src={card.image_url} alt={card.name} />
                            <h4>{card.name}</h4>
                            <div className="card-buttons">
                                <button onClick={() => onBuildFree()}>Построить бесплатно</button>
                                <button onClick={() => onBuildWithResources()}>Построить за ресурсы</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default CardActionOptionsModal;
