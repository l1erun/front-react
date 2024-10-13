import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Импортируем контекст

function WaitingRoom({ isServerReady, playersCount }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Используем данные пользователя

    const handleLeaveRoom = () => {
        // await
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
        </div>
    );
}

export default WaitingRoom;
