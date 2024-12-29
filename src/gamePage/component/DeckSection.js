import React from "react";

const DeckSection = ({ deck }) => {
    return (
        <div className="deck-section">
            <h3>Карты в колоде</h3>
            <div>Всего карт: {deck.length}</div>
        </div>
    );
};

export default DeckSection;
