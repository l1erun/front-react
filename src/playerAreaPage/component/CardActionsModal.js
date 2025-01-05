import React from "react";
import "../css/CardActionsModal.css";

const CardActionsModal = ({ card, onAction, onClose, onView }) => {
    return (
        <div className="card-view-overlay" onClick={onClose}>
            <div className="card-actions-popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                <h4>{card.name}</h4>
                <div className="action-buttons">
                    <button onClick={() => onAction("build")}>Построить</button>
                    <button onClick={() => onAction("discard")}>Сбросить</button>
                    <button onClick={() => onView(card)}>Просмотреть</button>
                </div>
            </div>
        </div>
    );
};

export default CardActionsModal;
