import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useGameWebSocket from "../context/useGameWebSocket";
import CardTable from "./component/CardTable";
import Resources from "./component/Resources";
import Workers from "./component/Workers";
import CardActionsModal from "./component/CardActionsModal";
import CardViewModal from "./component/CardViewModal";
import {fetchCheckFreeBuild, fetchMeadowCards} from "./api/PlayerAreaApi";
import MeadowCardsModal from "./component/MeadowCardsModal";
import CardActionOptionsModal from "./component/CardActionOptionsModal";

const PlayerArea = () => {
    const { gameId, playerId } = useParams();
    const { user } = useContext(UserContext);
    const { gameState, isConnected, connect, disconnect, sendMessage, error } = useGameWebSocket();

    const [actionCard, setActionCard] = useState(null); // Карта для действий
    const [viewedCard, setViewedCard] = useState(null); // Карта для просмотра
    const [loading, setLoading] = useState(true);
    const [meadowCards, setMeadowCards] = useState([]); // Карты поляны
    const [isMeadowModalOpen, setMeadowModalOpen] = useState(false); // Состояние модального окна поляны
    const [retryCount, setRetryCount] = useState(0);
    const [cardOptions, setCardOptions] = useState([]); // Карты для CardActionOptionsModal
    const [isOptionsModalOpen, setOptionsModalOpen] = useState(false); // Состояние модального окна
    const [selectedCard, setSelectedCard] = useState(null);


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
            const fetchData = () => sendMessage(`/app/${gameId}/${playerId}/getDataPlayer`);

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

    const handleAction = async () => {
        try {
            const data = await fetchCheckFreeBuild(gameId, playerId, actionCard.id);
            if (data.length > 0) {
                console.log(data)
                setCardOptions(data); // Сохраняем карты
                setOptionsModalOpen(true); // Открываем новое меню
            } else {
                // handleBuildWithResources(actionCard);
                sendMessage(`/app/${gameId}/${playerId}/${actionCard.id}/buildCardWithResources`);
            }
        } catch (error) {
            console.error("Ошибка при проверке возможности постройки:", error);
        }
        setActionCard(null);
        setMeadowModalOpen(false);
    };

    const handleBuildCardsInMeadow = async () => {
        try {
            const cards = await fetchMeadowCards(gameId, playerId);
            setMeadowCards(cards);
            setMeadowModalOpen(true); // Открываем модальное окно
        } catch (e) {
            console.error("Ошибка при загрузке карт поляны:", e);
        }
    };

    const handleCloseMeadowModal = () => setMeadowModalOpen(false);

    const handleCardSelection = (card) => {
        setActionCard(card);
        setSelectedCard(card);
        // setMeadowModalOpen(false);
    };

    const handleCloseActions = () => setActionCard(null);
    const handleView = (card) => {
        setViewedCard(card);
        setActionCard(null);
    };

    // Обработчики для нового меню
    const handleBuildFree = () => {
        sendMessage(`/app/${gameId}/${playerId}/${selectedCard.id}/buildCardFree`);
        setOptionsModalOpen(false); // Закрываем меню
    };

    const handleBuildWithResources = () => {
        sendMessage(`/app/${gameId}/${playerId}/${selectedCard.id}/buildCardWithResources`);
        setOptionsModalOpen(false); // Закрываем меню
    };

    const handleCloseOptionsModal = () => {
        setOptionsModalOpen(false); // Закрываем меню
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

            <CardTable
                title="Карты на руке"
                cards={hand}
                onCardClick={handleCardClick}
                clickable={true} // Карты на руке остаются кликабельными
            />
            <CardTable
                title="Карты построек"
                cards={city}
                onCardClick={handleCardClick}
                clickable={false} // Карты построек не кликабельны
            />

            <div className="player-actions">
                <h3>Действия игрока</h3>
                <button onClick={handleSendWorker}>Отправить рабочего</button>
                <button onClick={handleBuildCardsInMeadow}>Построить карту с поля</button>
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

            {/* Модальное окно для выбора карты с поляны */}
            {isMeadowModalOpen && (
                <MeadowCardsModal
                    cards={meadowCards}
                    onCardClick={handleCardSelection}
                    onClose={handleCloseMeadowModal}
                />
            )}

            {isOptionsModalOpen && (
                <CardActionOptionsModal
                    cards={cardOptions}
                    onBuildFree={handleBuildFree}
                    onBuildWithResources={handleBuildWithResources}
                    onClose={handleCloseOptionsModal}
                />
            )}
        </div>
    );
};

export default PlayerArea;
