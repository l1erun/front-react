import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {creatSession, startGameSession} from "../../api/map/session";

function GameSession() {
    const [sessionId, setSessionId] = useState(null);
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    const startSession = async () => {
        try {
            const session = await creatSession(); // Логика генерации или получения UUID сессии
            console.log(session);
            setSession(session);
            setSessionId(session.sessionId); // Сохраняем UUID сессии в состоянии
        } catch (error) {
            console.error("Ошибка при создании сессии", error);
        }
    };

    const startGame = async () => {
        try {
            const data = await startGameSession(session); // Логика генерации или получения UUID сессии
            console.log(data)
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
                    <button onClick={startGame}>Старт</button>
                    <button onClick={handleExit}>Завершить сессию</button>
                </div>
            ) : (
                <div>
                    <button onClick={startSession}>Запустить сессию</button>
                    {/*<button onClick={startGame}>Запуск игры</button>*/}
                    <button onClick={handleExit}>Выйти</button>
                    {/* Кнопка выхода */}
                </div>
            )}
        </div>
    );
}

export default GameSession;
