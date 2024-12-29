import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useGameWebSocket from "../context/useGameWebSocket";
import CardTable from "./component/CardTable";
import Resources from "./component/Resources";
import Workers from "./component/Workers";
import CardActionsModal from "./component/CardActionsModal";
import CardViewModal from "./component/CardViewModal";

const PlayerArea = () => {
    const { gameId, playerId } = useParams();
    const { user } = useContext(UserContext);
    const { gameState, isConnected, connect, disconnect, sendMessage, error } = useGameWebSocket();

    const [actionCard, setActionCard] = useState(null);
    const [viewedCard, setViewedCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    // Установление соединения при монтировании
    useEffect(() => {
        if (!isConnected) {
            connect(gameId, playerId, "user");
        }
        return () => disconnect();
    }, [connect, disconnect, gameId, playerId]);

    // Обработка загрузки данных игрока
    useEffect(() => {
        if (isConnected && !gameState) {
            const fetchData = () => {
                sendMessage(`/app/${gameId}/${playerId}/getDataPlayer`);
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
    }, [isConnected, gameState, sendMessage, retryCount, gameId, playerId]);

    // Сброс состояния загрузки и повторных попыток при успешной загрузке данных
    useEffect(() => {
        if (gameState) {
            setLoading(false);
            setRetryCount(0);
        }
    }, [gameState]);

    // Обработка ошибок соединения
    useEffect(() => {
        if (error) {
            console.error("Ошибка соединения:", error);
        }
    }, [error]);

    // Обработчики действий пользователя
    const handleCardClick = (card) => setActionCard(card);
    const handleAction = (actionType) => {
        sendMessage(`/app/${gameId}/${playerId}/${actionCard.id}/cardAction`);
        setActionCard(null);
    };
    const handleCloseActions = () => setActionCard(null);
    const handleView = (card) => {
        setViewedCard(card);
        setActionCard(null);
    };
    const handleCloseView = () => setViewedCard(null);
    const handleSendWorker = () => sendMessage(`/app/${gameId}/${playerId}/sendWorker`);
    const handleEndTurn = () => sendMessage(`/app/${gameId}/${playerId}/endTurn`);
    const handleGoToSeason = () => sendMessage(`/app/${gameId}/${playerId}/goToSeason`);

    // Отображение загрузки или контента
    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки данных. Пожалуйста, попробуйте снова позже.</div>;
    }

    const playerData = gameState || {};
    const resources = playerData.resources || {};
    const workers = playerData.workers || 0;
    const hand = playerData.hand || [];
    const city = playerData.city || [];

    return (
        <div className="player-area">
            <Resources resources={resources} />
            <Workers workers={workers} />

            <CardTable title="Карты на руке" cards={hand} onCardClick={handleCardClick} />
            <CardTable title="Карты построек" cards={city} onCardClick={handleCardClick} />

            <div className="player-actions">
                <h3>Действия игрока</h3>
                <button onClick={handleSendWorker}>Отправить рабочего</button>
                <button onClick={handleEndTurn}>Закончить ход</button>
                <button onClick={handleGoToSeason}>Уйти в сезон</button>
            </div>

            {viewedCard && (
                <CardViewModal card={viewedCard} onClose={handleCloseView} />
            )}

            {actionCard && (
                <CardActionsModal
                    card={actionCard}
                    onAction={handleAction}
                    onClose={handleCloseActions}
                    onView={handleView}
                />
            )}
        </div>
    );
};

export default PlayerArea;
