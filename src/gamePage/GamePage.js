import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/GamePage.css';
import Board from "./component/Board";
import Meadow from "./component/Meadow";
import Forest from "./component/Forest";
import River from "./component/River";
import CardsArea from "./component/CardsArea";
import PlayerArea from "../playerAreaPage/PlayerArea"; // Общие стили для страницы
import useGameWebSocket from "../context/useGameWebSocket";

const GamePage = () => {
    const { gameId } = useParams();
    const playerId = null; // Используйте реальные значения
    console.log(gameId)
    const { gameState, connect, disconnect, sendMessage } = useGameWebSocket();

    useEffect(() => {
        // Устанавливаем соединение при монтировании компонента
        connect(gameId, playerId);

        // Отключаемся при размонтировании компонента
        return () => {
            disconnect();
        };
    }, []);

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

            {/* Дополнительный компонент */}
            <PlayerArea />

            {/* Кнопка для отправки сообщения через WebSocket */}
            <button onClick={() => sendMessage('/app/someDestination', { action: 'test' })}>
                Отправить сообщение
            </button>
        </div>
    );
};

export default GamePage;
