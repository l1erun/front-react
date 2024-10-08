import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import AuthWindow from "./components/user/AuthWindow";
import UserProfile from "./components/user/UserProfile";
import GameSession from "./components/map/GameSession";
import Home from "./components/Home";  // Стартовое меню (главная страница)

function App() {
    const [user, setUser] = useState(null);
    const [inGame, setInGame] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);  // Проверяем, есть ли токен в локальном хранилище
        }
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setInGame(false);
        localStorage.removeItem('token');  // Удаляем токен при разлогине
    };

    const handleJoinGame = () => {

        console.log(user)

        setInGame(true);
    };

    return (
        <Router>
            <Routes>
                {/* Стартовое меню */}
                <Route path="/" element={<Home />} />

                {/* Если пользователь не авторизован, перенаправляем его на окно авторизации */}
                <Route path="/login" element={!isAuthenticated ? (
                    <AuthWindow onLogin={handleLogin} />
                ) : (
                    <Navigate to="/userProfile" />
                )} />

                {/* Профиль пользователя доступен только авторизованным пользователям */}
                <Route path="/userProfile" element={isAuthenticated ? (
                    <UserProfile user={user} onLogout={handleLogout} onJoinGame={handleJoinGame} />
                ) : (
                    <Navigate to="/login" />
                )} />

                {/* Карта доступна независимо от авторизации */}
                <Route path="/gameSession" element={
                    <GameSession />
                } />

                {/* Перенаправление на стартовое меню при выходе */}
                <Route path="/logout" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
