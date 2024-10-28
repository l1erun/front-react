import React, { useState } from 'react';
import './css/GamePage.css';
import Board from "./component/Board";
import Meadow from "./component/Meadow";
import Forest from "./component/Forest";
import River from "./component/River";
import CardsArea from "./component/CardsArea";
import PlayerArea from "./component/PlayerArea";
import AdditionalFeature from "./component/AdditionalFeature"; // Общие стили для страницы

const GamePage = () => {
    const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);

    return (
        <div className="game-page">
            {/* Основное игровое поле */}
            <Board />

            {/* Луг */}
            <Meadow />

            {/* Лесная локация */}
            <Forest />

            {/* Локация реки */}
            <River />

            {/* Область карт */}
            <CardsArea />

            {/* Зона игрока */}
            <PlayerArea />

            {/* Дополнительный компонент, отображаемый в зависимости от флага */}
            {isFeatureEnabled && <AdditionalFeature />}

            {/* Кнопка для включения/выключения флага */}
            <button onClick={() => setIsFeatureEnabled(!isFeatureEnabled)}>
                Toggle Additional Feature
            </button>
        </div>
    );
};

export default GamePage;
