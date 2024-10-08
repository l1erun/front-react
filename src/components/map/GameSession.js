import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {creatSession} from "../../api/map/session";

function GameSession() {
    const [sessionId, setSessionId] = useState(null);
    const navigate = useNavigate();

    const startSession = async () => {
        try {
            const session = await creatSession(); // Логика генерации или получения UUID сессии
            console.log(session)
            // setSessionId(uuid); // Сохраняем UUID сессии в состоянии
        } catch (error) {
            console.error("Ошибка при создании сессии", error);
        }
    };

    const handleExit = () => {
        setSessionId(null);  // Завершаем сессию, сбрасывая sessionId
        navigate('/');  // Перенаправляем пользователя на стартовую страницу
    };

    return (
        <div>
            {sessionId ? (
                <div>
                    <h2>Сессия запущена</h2>
                    <p>UUID: {sessionId}</p>
                    <button>Старт</button>
                    <button onClick={handleExit}>Завершить сессию</button>
                </div>
            ) : (
                <div>
                    <button onClick={startSession}>Запустить сессию</button>
                    <button onClick={handleExit}>Выйти</button> {/* Кнопка выхода */}
                </div>
            )}
        </div>
    );
}

export default GameSession;
