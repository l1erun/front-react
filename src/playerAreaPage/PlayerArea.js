import React from 'react';
// import useGameWebSocket from "../context/useGameWebSocket";

const PlayerArea = () => {
    // const gameId = "57ac9dd5-cf3d-4c1b-abe8-50ce4aca5597";
    // const playerId = "57ac9dd5-cf3d-4c1b-abe8-50ce4aca5597";
    // const { gameState, sendMessage } = useGameWebSocket(gameId, playerId);
    //
    // const handleSendAction = () => {
    //     sendMessage(JSON.stringify({ action: 'player_move', details: { x: 1, y: 2 } }));
    // };

    return (
        <div>
            {/*<button onClick={handleSendAction}>Отправить действие</button>*/}
            <button>Отправить действие</button>
            <div>
                {/*{gameState ? (*/}
                {/*    <pre>{JSON.stringify(gameState, null, 2)}</pre>*/}
                {/*) : (*/}
                    <p>Ожидание обновлений игры...</p>
                {/*)}*/}
            </div>
        </div>
    );
};

export default PlayerArea;
