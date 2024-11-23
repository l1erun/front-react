import { useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useGameWebSocket = () => {
    const [gameState, setGameState] = useState(null);
    const stompClientRef = useRef(null);

    const connect = (gameId, playerId) => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8083/ws/gameSession'),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                // Подписываемся на персональные сообщения, если есть playerId
                // if (playerId) {
                    client.subscribe(`/queue/game/${gameId}`, (message) => {
                        // const parsedMessage = JSON.parse(message.body);
                        const parsedMessage = message.body;
                        console.log('Получено персональное сообщение:', parsedMessage);
                        setGameState(parsedMessage);
                    });
                // }

                // Подписываемся на общие обновления игры
                client.subscribe(`/topic/game/${gameId}`, (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    // Обработка общего обновления игры
                    console.log('Получено общее сообщение:', parsedMessage);
                    setGameState(parsedMessage);
                });

                // Отправляем сообщение о подключении
                sendMessage(`/app/${gameId}/action`, { playerId, actionType: 'connect' });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();
        stompClientRef.current = client;
    };

    const disconnect = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.deactivate();
        }
    };

    const sendMessage = (destination, body) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    return { gameState, connect, disconnect, sendMessage };
};

export default useGameWebSocket;
