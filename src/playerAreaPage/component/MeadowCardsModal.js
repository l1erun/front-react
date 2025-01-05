import "../css/MeadowCardsModal.css";

const MeadowCardsModal = ({ cards, onCardClick, onClose }) => {
    return (
        <div className="meadow-modal">
            <div className="meadow-modal-header">
                <h2>Карты поляны</h2>
                <button onClick={onClose}>Закрыть</button>
            </div>
            <div className="meadow-cards-grid">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="meadow-card-item"
                        onClick={() => onCardClick(card)}
                    >
                        <img src={card.image_url} alt={card.name || "Карта"} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MeadowCardsModal;
