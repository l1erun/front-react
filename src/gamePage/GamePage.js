import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGameWebSocket from "../context/useGameWebSocket";
import EventsSection from "./component/EventsSection";
import MeadowSection from "./component/MeadowSection";
import DeckSection from "./component/DeckSection";
import DiscardPileSection from "./component/DiscardPileSection";
import BaseLocations from "./component/BaseLocations";

const GamePage = () => {
    const { gameId } = useParams();
    const { gameState, isConnected, connect, disconnect, sendMessage, error } = useGameWebSocket();

    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    // Установление соединения при монтировании
    useEffect(() => {
        if (!isConnected) {
            connect(gameId, null, "map");
        }
        return () => {
            if (isConnected) {
                disconnect();
            }
        };
    }, [gameId, isConnected, connect, disconnect]);

    // Повторный запрос данных, если gameState ещё не загружен
    useEffect(() => {
        if (isConnected && !gameState) {
            const fetchData = () => {
                sendMessage(`/app/${gameId}/getGameState`);
            };

            // Повторный запрос с увеличивающимся интервалом
            if (retryCount < 5) {
                const timer = setTimeout(() => {
                    fetchData();
                    setRetryCount(retryCount + 1);
                }, Math.min(1000 * Math.pow(2, retryCount), 30000)); // Экспоненциальный backoff

                return () => clearTimeout(timer);
            } else {
                console.error("Превышено максимальное количество попыток загрузки данных.");
            }
        }
    }, [isConnected, gameState, sendMessage, retryCount, gameId]);

    // Обработка успешной загрузки
    useEffect(() => {
        if (gameState) {
            setLoading(false);
            setRetryCount(0); // Сбросить счётчик повторных попыток
        }
    }, [gameState]);

    // Обработка ошибок
    useEffect(() => {
        if (error) {
            console.error("Ошибка соединения:", error);
        }
    }, [error]);

    // Отображение загрузки или ошибок
    if (loading) {
        return <div>Загрузка игрового состояния...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки данных. Пожалуйста, попробуйте снова позже.</div>;
    }

    // Основной контент
    return (
        <div className="game-page">
            {/*<h2>Текущий ход: {gameState.currentTurn}</h2>*/}
            <EventsSection events={gameState.events} />
            <MeadowSection meadowCards={gameState.meadowCard} />
            <BaseLocations locations={gameState.locations} />
            <DeckSection deck={gameState.deck} />
            <DiscardPileSection discardPile={gameState.discardPile} />
        </div>
    );
};

export default GamePage;
