import React from "react";
import "../css/EventsSection.css"; // Для стилизации

const EventsSection = ({ events }) => {
    const displayedEvents = events.slice(0, 4); // Берём только первые 4 события

    return (
        <div className="events-section">
            <h3>События</h3>
            <div className="events-list">
                {displayedEvents.map((event, index) => (
                    <div key={index} className="event-item">
                        <h4>{event.name}</h4>
                        <p>{event.description}</p>
                        <p>{event.completed ? "Завершено" : "Не завершено"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsSection;
