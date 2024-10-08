import React from 'react';
import { useNavigate } from 'react-router-dom';
import {setGameSession} from "../../api/user/other";

function UserProfile({ user, onLogout, onJoinGame }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();  // Здесь вызывается функция, которая удаляет токен и обновляет состояние
        navigate('/');  // Перенаправляем на стартовое меню
    };

    const test = async () => {
        console.log("!! " + user.id)
        try {
            await setGameSession(user.id, '4216');
        } catch (error) {
            console.error("Ошибка при запуске команды", error);
        }
    }

    return (
        <div>
            <h2>Профиль пользователя: {user.username}</h2>
            <button onClick={handleLogout}>Разлогиниться</button>
            {/*<button onClick={onJoinGame}>Присоединиться к игре</button>*/}
            <button onClick={test}>Присоединиться к игре</button>
        </div>
    );
}

export default UserProfile;
