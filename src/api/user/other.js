export const getAllCards = async () => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    console.log(token)
    try {
        const response = await fetch('http://localhost:8080/cards', {
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

export const setGameSession = async (userId, pin) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    console.log(token)
    try {
        const response = await fetch('http://localhost:8080/sessions/'+ pin+ '/addUser/' + userId, {
            method: 'PUT',
            headers: {
                'Authorization': `${token}`,
            },
            // body: JSON.stringify(),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Чтение текста ошибки
            throw new Error(errorMessage || 'Ошибка');
        }

        return await response.json(); // Если всё прошло успешно, возвращаем JSON с токеном
    } catch (error) {
        console.error('Ошибка при авторизации:', error.message);
        throw error; // Пробрасываем ошибку дальше, чтобы обработать её на уровне UI
    }
};