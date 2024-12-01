import React, {useContext, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useGameWebSocket from "../context/useGameWebSocket";
import {UserContext} from "../context/UserContext";

const WaitingRoom = ({ isServerReady, playersCount }) => {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const { user, setUser } = useContext(UserContext);

    const { gameState, connect, disconnect, sendMessage } = useGameWebSocket();
    console.log(sendMessage)
    // Устанавливаем соединение при монтировании компонента
    useEffect(() => {
        connect(sessionId, user.id, "user");
        // Разрываем соединение при размонтировании компонента
        return () => {
            disconnect();
        };
    }, []);

    const handleLeaveRoom = () => {
        // Разрываем соединение перед выходом из комнаты
        disconnect();
        navigate('/userProfile'); // Перенаправляем на страницу профиля
    };

    return (
        <div>
            <h2>Вы находитесь в комнате ожидания</h2>
            <button onClick={handleLeaveRoom}>Выйти из комнаты</button>

            <button
                disabled={!isServerReady || playersCount < 2}
                style={{
                    backgroundColor: isServerReady && playersCount >= 2 ? 'green' : 'red',
                    color: 'white',
                    padding: '10px',
                    marginTop: '20px'
                }}
            >
                {isServerReady && playersCount >= 2 ? 'Войти в игру' : 'Ожидание игроков или сервера'}
            </button>
            <div>
                {/* Отображение состояния игры для проверки */}
                {gameState ? (
                    <pre>{JSON.stringify(gameState, null, 2)}</pre>
                ) : (
                    <p>Ожидание обновлений от сервера...</p>
                )}
            </div>
        </div>
    );
};

export default WaitingRoom;
