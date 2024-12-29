import React from "react";
import "../css/CardTable.css";

const CardTable = ({ title, cards, onCardClick }) => {
    return (
        <div className="card-table">
            <h3>{title}</h3>
            <div className="card-row">
                {cards.map((card) => (
                    <div key={card.id} onClick={() => onCardClick(card)}>
                        <img src={card.image_url} alt={card.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardTable;
