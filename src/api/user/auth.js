export const registerUser = async (username, password, email) => {
    console.log(username, password, email)
    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email
            }),
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json(); // Если это JSON
        } else {
            data = await response.text(); // Если это текст
        }

        if (!response.ok) {
            throw new Error(data || 'Ошибка регистрации');
        }

        console.log('Успех:', data);
        alert(`Зарегистрирован пользователь: ${username}`);

    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
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
// Другие API функции...
