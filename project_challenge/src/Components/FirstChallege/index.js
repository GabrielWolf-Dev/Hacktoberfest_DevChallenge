import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import Header from '../Header';
import Quiz from './Quiz';
import './quiz.css';

require('dotenv').config();

export default function FirstChallenge() {
    const [questions, setQuestions] = useState([]);
    const [currentQuest, setCurrentQuest] = useState(0);
    const [dataMenu, setDataMenu] = useState({});
    const [isStarted, setsStarted] = useState(false);
    const [user, setUser] = useState({});
    const [animResUser, setAnimResUser] = useState(false);

    // setCorrectQuests([...correctQuests, value]);
    const url = "https://raw.githubusercontent.com/GabrielWolf-Dev/Hacktoberfest_DevChallenge/main/project_challenge/api/quiz.json";

    useEffect(() => {
        (async function(){
            const res = await fetch(url);
            const data = await res.json();

            setQuestions(data.questions);
            setDataMenu(data.quiz);
        })();
    }, []);

    function backMenu() {
        // Limpar o cache.
        setsStarted(!isStarted);
    }

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

            <main className={isStarted ? 'quiz quiz--active' : 'quiz'}>
                <button onClick={backMenu} className="quiz__btn-back">Voltar no Menu</button>

                <article>
                    <label className="quiz__label-progress" htmlFor="progressBar">Progresso</label>
                    <progress className="quiz__progress" id="progressBar" value={(currentQuest + 1) * 10} max={questions.length * 10} />
                </article>
                
                {
                    questions.map((question, index) => index === currentQuest 
                    ? <Quiz
                        key={question.id}
                        alternatives={question.alternatives}
                        id={question.id}
                        question={question.question}
                        answer={question.answer}
                        image={question.image}
                        alt={question.alt}
                        setCurrentQuest={setCurrentQuest}
                        setUser={setUser}
                        user={user}
                        currentQuest={currentQuest}
                        questions={questions}
                        setAnimResUser={setAnimResUser}
                      /> 
                    : false)
                }
            </main>
            <Player
                autoplay
                src={animResUser /* Não esquecer de contribuir https://lottiefiles.com/rohit e https://lottiefiles.com/aalvs */}
                className="anim-true"
                speed="1.5"
            ></Player>
        </>
    );
}