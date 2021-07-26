import { useEffect, useState } from 'react';

import Header from '../Header';
import './quiz.css';

export default function FirstChallenge() {
    const [datas, setDatas] = useState([]);
    const [dataMenu, setDataMenu] = useState({});
    const [isStarted, setsStarted] = useState(false);
    const [user, setUser] = useState({});
    const url = "https://raw.githubusercontent.com/GabrielWolf-Dev/Hacktoberfest_DevChallenge/main/project_challenge/api/quiz.json";

    useEffect(() => {
        (async function(){
            const res = await fetch(url);
            const data = await res.json();

            setDatas(data.questions);
            setDataMenu(data.quiz);
        })();
    }, []);

    return(
        <>
            <Header />
            <section className="quiz-content">
                <h2 className="quiz-content__title title">{isStarted ? 'Nome: ' + user.name : dataMenu.title}</h2>
                <p className="paragraph">{isStarted ? 'Pontuação: ' + user.score : dataMenu.desc}</p>
            </section>

            <section className={isStarted ? 'menu-quiz--hide' : 'menu-quiz'}>
                <main className="menu-quiz__main">
                    <form 
                        className="menu-quiz__form"
                        onSubmit={e => {
                            e.preventDefault();

                            setUser({
                                name: new FormData(e.target).get('name'), // Depois que terminar o quiz, armazenar no localStorage para fazer o placar depois.
                                score: 0
                            });
                            setsStarted(!isStarted);
                        }}
                    >
                        <label className="menu-quiz__label-name" htmlFor="name">Digite o seu nome</label>
                        <input
                            className="menu-quiz__input-name" 
                            title="O nome deve conter somente letras e no máximo 15 caracteres" 
                            pattern="[A-Za-z]{1,15}"
                            required 
                            type="text" 
                            id="name"
                            name="name"
                            placeholder="Digite o seu nome"
                        />
                        <input className="menu-quiz__input-sub" type="submit" value="Começar" />
                    </form>

                    <img className="menu-quiz__img" src={dataMenu.img} alt="Logo da linguagem JavaScript" />
                </main>
            </section>

            <main className={isStarted ? 'quiz quiz--active' : 'quiz'}>Nosso quiz!</main>
        </>
    );
}