import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const UserContext = createContext();

// Провайдер контекста для хранения и управления данными пользователя
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Получаем данные пользователя из localStorage при инициализации
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        // Сохраняем или удаляем данные пользователя в localStorage при изменении
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
