import React from "react";
import "../css/CardTable.css";

const CardTable = ({ title, cards, onCardClick, clickable = true }) => {
    return (
        <div className="card-table">
            <h3>{title}</h3>
            <div className="card-row">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={clickable ? () => onCardClick(card) : null}
                        className={`card ${clickable ? "clickable" : "non-clickable"}`}
                    >
                        <img src={card.image_url} alt={card.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardTable;
