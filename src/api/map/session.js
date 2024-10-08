
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