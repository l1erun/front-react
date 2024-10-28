
export const creatSession = async () => {
    try {
        const response = await fetch('http://localhost:8080/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Чтение текста ошибки
            throw new Error(errorMessage || 'Ошибка авторизации');
        }

        return await response.json(); // Если всё прошло успешно, возвращаем JSON с токеном
    } catch (error) {
        console.error('Ошибка при авторизации:', error.message);
        throw error; // Пробрасываем ошибку дальше, чтобы обработать её на уровне UI
    }
};

export const deleteUserInSession = async () => {
    try {
        const response = await fetch('http://localhost:8080/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Чтение текста ошибки
            throw new Error(errorMessage || 'Ошибка авторизации');
        }

        return await response.json(); // Если всё прошло успешно, возвращаем JSON с токеном
    } catch (error) {
        console.error('Ошибка при авторизации:', error.message);
        throw error; // Пробрасываем ошибку дальше, чтобы обработать её на уровне UI
    }
};

export const startGameSession = async (session) => {
    try {
        const response = await fetch('http://localhost:8080/sessions/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(session.sessionId),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Чтение текста ошибки
            throw new Error(errorMessage || 'Ошибка старта игры');
        }
        const data = await response.json(); // Обрабатываем ответ как JSON
        console.log('Response data:', data); // Логируем ответ

        return data;
        // return await response.json(); // Если всё прошло успешно, возвращаем JSON с токеном
    } catch (error) {
        console.error('Ошибка запроса стратра игры:', error.message);
        throw error; // Пробрасываем ошибку дальше, чтобы обработать её на уровне UI
    }
};


export const getSessionById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/sessions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Чтение текста ошибки
            throw new Error(errorMessage || 'нет сессии');
        }
        const data = await response.json(); // Обрабатываем ответ как JSON
        console.log('Response data:', data); // Логируем ответ

        return data;
        // return await response.json(); // Если всё прошло успешно, возвращаем JSON с токеном
    } catch (error) {
        console.error('Ошибка при авторизации:', error.message);
        throw error; // Пробрасываем ошибку дальше, чтобы обработать её на уровне UI
    }
};