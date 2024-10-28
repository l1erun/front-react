// Функция для выполнения fetch-запросов
async function fetchWithToken(url, options = {}) {
    let token = localStorage.getItem('accessToken'); // Получаем токен из localStorage

    // Добавляем токен в заголовки запроса, если он существует
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    // Выполняем запрос
    let response = await fetch(url, options);

    // Если ответ 401, пробуем обновить токен
    if (response.status === 401) {
        // Попробуем обновить токен
        const refreshSuccess = await refreshAccessToken();

        if (refreshSuccess) {
            // Если токен обновлен, повторяем запрос с новым токеном
            token = localStorage.getItem('accessToken');
            options.headers['Authorization'] = `Bearer ${token}`;

            response = await fetch(url, options);
        } else {
            // Если не удалось обновить токен, перенаправляем на логин
            window.location.href = '/login';
        }
    }

    return response;
}

// Функция для обновления токена
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken'); // Получаем refresh токен

    if (!refreshToken) {
        return false; // Если refresh токена нет, перенаправляем на логин
    }

    try {
        const response = await fetch('/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }), // Отправляем refresh токен
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken); // Сохраняем новый access токен
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Ошибка при обновлении токена', error);
        return false;
    }
}
