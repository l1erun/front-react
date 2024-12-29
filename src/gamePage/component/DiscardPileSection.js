import React from "react";

const DiscardPileSection = ({ discardPile }) => {
    return (
        <div className="discard-pile-section">
            <h3>Сброс</h3>
            <div>Карт в сбросе: {discardPile.length}</div>
        </div>
    );
};

export default DiscardPileSection;
