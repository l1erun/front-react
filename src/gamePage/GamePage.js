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
    const { gameState, connect, disconnect, sendMessage } = useGameWebSocket();
    console.log(gameState)
    useEffect(() => {
        // Устанавливаем соединение при монтировании компонента
        connect(gameId, null, "map");

        // Отключаемся при размонтировании компонента
        return () => {
            disconnect();
        };
    }, [connect, gameId]);

    return (
        <div className="game-page">
            {/* Основное игровое поле */}
            <Board/>

            {/* Луг */}
            <Meadow/>

            {/* Лесная локация */}
            <Forest/>

            {/* Локация реки */}
            <River/>

            {/* Область карт */}
            <CardsArea/>

            {/* Дополнительный компонент */}
            <PlayerArea/>

            {/* Кнопка для отправки сообщения через WebSocket */}
            <button onClick={() => sendMessage(`/app/${gameId}/action2`, {action: 'test'})}>
                Отправить сообщение
            </button>
        </div>
    );
};

export default GamePage;
