import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Добро пожаловать на стартовую страницу!</h1>
            <div>
                <button>
                    <Link to="/login">Профиль</Link>
                </button>
                <button>
                    <Link to="/gameSession">Карта</Link>
                </button>
            </div>
        </div>
    );
}

export default Home;
