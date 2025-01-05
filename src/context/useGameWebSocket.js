import { useState, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useGameWebSocket = () => {
    const [gameState, setGameState] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const stompClientRef = useRef(null);

    const connect = useCallback((gameId, playerId = null, connectionType = 'map') => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8083/ws/gameSession'),
            reconnectDelay: 0,
            onConnect: () => {
                console.log(`WebSocket подключен (${connectionType}): gameId=${gameId}, playerId=${playerId}`);
                setIsConnected(true);

                if (connectionType === 'map') {
                    client.subscribe(`/queue/game/${gameId}`, (message) => {
                        const parsedMessage = JSON.parse(message.body);
                        console.log('Получено сообщение для карты:', parsedMessage);
                        setGameState(parsedMessage);
                    });
                }

                if (connectionType === 'user') {
                    if (playerId) {
                        client.subscribe(`/queue/game/${gameId}/${playerId}`, (message) => {
                            const parsedMessage = JSON.parse(message.body);
                            console.log('Получено персональное сообщение для пользователя:', parsedMessage);
                            setGameState(parsedMessage);
                        });
                    }
                }

                client.subscribe(`/topic/game/${gameId}`, (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    console.log('Получено общее сообщение для всех пользователей:', parsedMessage);
                    setGameState(parsedMessage);
                });

                sendMessage(`/app/${gameId}/connection`, { playerId, actionType: 'connect' });
            },
            onDisconnect: () => {
                console.log('WebSocket отключен');
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error('WebSocket ошибка:', frame.headers['message']);
                console.error('Детали ошибки:', frame.body);
                setIsConnected(false);
            },
        });

        client.activate();
        stompClientRef.current = client;
    }, []);

    const disconnect = useCallback(() => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.deactivate();
            setIsConnected(false);
        }
    }, []);

    const sendMessage = useCallback((destination, body) => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    }, []);

    return { gameState, isConnected, connect, disconnect, sendMessage };
};

export default useGameWebSocket;
