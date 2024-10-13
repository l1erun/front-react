import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import {setGameSession} from "../../api/user/other"; // Импортируем контекст

function UserProfile() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); // Используем контекст для данных пользователя

    // Локальное состояние для полей профиля
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Состояние для модального окна и PIN-кода
    const [showPinModal, setShowPinModal] = useState(false); // Управляет показом модального окна
    const [pinCode, setPinCode] = useState(''); // Хранит введённый PIN-код
    const [pinErrorMessage, setPinErrorMessage] = useState(''); // Сообщение об ошибке

    const handleLogout = () => {
        setUser(null); // Очищаем данные пользователя
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate('/'); // Перенаправляем на стартовую страницу
    };

    // Функция для открытия модального окна
    const handleJoinGame = () => {
        setShowPinModal(true); // Показываем окно для ввода PIN-кода
    };

    // Функция для отправки PIN-кода на сервер
    const handlePinSubmit = async () => {
        await setGameSession(user.id, pinCode)
        setShowPinModal(false); // Закрываем модальное окно
        navigate('/waiting-room'); // Перенаправляем в комнату ожидания
    };

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setShowPinModal(false); // Закрываем модальное окно
        setPinCode(''); // Очищаем введённый PIN-код
        setPinErrorMessage(''); // Очищаем сообщение об ошибке
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProfile = {
            avatarUrl,
            username: nickname,
            email,
            password: password ? password : undefined, // Не отправляем пароль, если он не изменён
        };

        try {
            // Здесь будет вызов API для обновления профиля
            setSuccessMessage('Профиль успешно обновлён');
            setError(null);
        } catch (error) {
            setError('Не удалось обновить профиль');
            setSuccessMessage(null);
        }
    };

    return (
        <div className="profile-container">
            <h2>Профиль пользователя</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div>
                    <label>Аватар</label>
                    <input
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="Ссылка на аватар"
                    />
                </div>
                <div>
                    <label>Никнейм</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Никнейм"
                    />
                </div>
                <div>
                    <label>Почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Новый пароль"
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <button type="submit">Обновить профиль</button>
            </form>

            <div className="profile-stats">
                <h3>Статистика</h3>
                <p>Всего игр: {user.statistics.gamesPlayed}</p>
                <p>Побед: {user.statistics.gamesWon}</p>
                <p>Проиграно: {user.statistics.gamesLost}</p>
            </div>

            <div className="profile-actions">
                <button onClick={handleLogout}>Разлогиниться</button>
                <button onClick={handleJoinGame}>Присоединиться к игре</button>
            </div>

            {/* Модальное окно для ввода PIN-кода */}
            {showPinModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Введите PIN-код</h2>
                        <input
                            type="text"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            placeholder="Введите PIN-код"
                        />
                        {pinErrorMessage && <p style={{ color: 'red' }}>{pinErrorMessage}</p>}
                        <div>
                            <button onClick={handlePinSubmit}>Войти</button>
                            <button onClick={handleCloseModal}>Выйти</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
