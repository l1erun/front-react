import React, { useState } from 'react';
import {loginUser, registerUser} from "../../api/user/auth";
import {getAllCards} from "../../api/user/other";

function AuthWindow({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await loginUser(username, password);
            console.log(response);
            localStorage.setItem('token', 'Bearer ' + response.token);
            localStorage.setItem('refreshToken', response.refreshToken); // Можно хранить в HttpOnly cookie для безопасности
            setIsAuthenticated(true); // Обновляем состояние после успешной авторизации
            console.log(response.userResponse)
            onLogin(response.userResponse);
        } catch (error) {
            alert("Ошибка при входе");
            console.error("Ошибка при входе", error);
        }
    };

    const handleRegister = async () => {
        try {
            await registerUser(username, password, email);
            alert(`Зарегистрирован пользователь: ${username}`);
        } catch (error) {
            console.error("Ошибка при регистрации", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false); // Обновляем состояние при выходе
        alert('Пользователь вышел из системы');
    };

    const handleAction = async () => {
        const data = await getAllCards();
        console.log(data);
        alert('Вы нажали кнопку "Действие"');
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <button onClick={handleAction}>Действие</button>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div>
                    <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
                    <input
                        type="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegistering && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                    <button onClick={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default AuthWindow;
