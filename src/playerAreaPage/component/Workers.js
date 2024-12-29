import React from "react";
import "../css/Workers.css"; // Создайте CSS файл для стилизации

const Workers = ({ workers }) => {
    return (
        <div className="workers">
            <h3>Рабочие</h3>
            <div className="workers-info">
                <span className="workers-count">Свободные рабочие: {workers || 0}</span>
                <div className="worker-icon">🧑‍🌾</div>
            </div>
        </div>
    );
};

export default Workers;
