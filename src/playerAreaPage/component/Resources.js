import React from "react";
import "../css/Resources.css"; // Создайте CSS файл для стилизации

const Resources = ({ resources }) => {
    return (
        <div className="resources">
            <h3>Ресурсы</h3>
            <div className="resources-row">
                <div className="resource">
                    <span className="resource-icon">🌲</span> {resources.twigs || 0}
                </div>
                <div className="resource">
                    <span className="resource-icon">🍇</span> {resources.berries || 0}
                </div>
                <div className="resource">
                    <span className="resource-icon">💧</span> {resources.resin || 0}
                </div>
                <div className="resource">
                    <span className="resource-icon">🪨</span> {resources.pebbles || 0}
                </div>
            </div>
        </div>
    );
};

export default Resources;
