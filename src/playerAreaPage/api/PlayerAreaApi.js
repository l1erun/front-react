
export const fetchMeadowCards = async (gameId, playerId) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    try {
        const response = await fetch(`http://localhost:8080/games/${gameId}/${playerId}/getCardsInMeadow`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(),
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

export const fetchCheckFreeBuild = async (gameId, playerId, cardId) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    try {
        const response = await fetch(`http://localhost:8080/games/${gameId}/${playerId}/${cardId}/getCheckFreeBuild`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                // 'Content-Type': 'application/json',
            },
            // body: JSON.stringify(),
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