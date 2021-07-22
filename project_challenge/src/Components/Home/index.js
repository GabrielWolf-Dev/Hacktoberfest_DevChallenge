import { Link } from 'react-router-dom';

import './index.css';

export function Home() {
    return (
        <main className="home">
            <h1 className="title home__title">DevChallenge Hacktoberfest</h1>
            <p className="paragraph home__space-desc">
              4 Desafios em 1 projeto cumpridos com sucesso na plataforma <a target="blank" className="home__link" href="https://www.   devchallenge.com.br/challenges/5f962d59c10c2600213a4c29/details">DevChallenge</a>
            </p>

            <ul>
                <li className="home_challenges">
                  <Link className="home__challenge" to="/challenge1">Desafio 1</Link>
                </li>
                <li className="home_challenges">
                    <Link className="home__challenge" to="/challenge2">Desafio 2</Link>
                </li>
                <li className="home_challenges">
                    <Link className="home__challenge" to="/challenge3">Desafio 3</Link>
                </li>
            </ul>
        </main>
    );
}
