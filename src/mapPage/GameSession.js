import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creatSession, startGameSession } from "./api/session";

function GameSession() {
    const [sessionId, setSessionId] = useState(null);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    const startSession = async () => {
        try {
            const sessionData = await creatSession(); // Получаем данные сессии
            console.log(sessionData);
            setSession(sessionData); // Сохраняем всю сессию в состояние
            setSessionId(sessionData.sessionId); // Сохраняем sessionId

            // Сохраняем sessionId в localStorage после обновления состояния
            localStorage.setItem('sessionId', sessionData.sessionId);
        } catch (error) {
            console.error("Ошибка при создании сессии", error);
        }
    };

    const startGame = async () => {
        try {
            if (session) {
                const data = await startGameSession(session); // Передаем всю сессию
                console.log(data);

                // Переход на страницу GamePage после успешного старта игры
                navigate('/game');
            }
        } catch (error) {
            console.error("Ошибка при запуске игры", error);
        }
    };

    const handleExit = () => {
        setSessionId(null);  // Завершаем сессию, сбрасывая sessionId
        localStorage.removeItem('sessionId'); // Удаляем sessionId из localStorage
        navigate('/');  // Перенаправляем пользователя на стартовую страницу
    };

    return (
        <div>
            {sessionId ? (
                <div>
                    <h2>Сессия запущена</h2>
                    <p>UUID: {sessionId}</p>
                    <button onClick={startGame}>Старт</button>
                    <button onClick={handleExit}>Завершить сессию</button>
                </div>
            ) : (
                <div>
                    <button onClick={startSession}>Запустить сессию</button>
                    <button onClick={handleExit}>Выйти</button>
                </div>
            )}
        </div>
    );
}

export default GameSession;
