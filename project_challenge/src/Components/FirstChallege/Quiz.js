export default function Quiz({
    question,
    answer,
    alternatives,
    currentQuest,
    setCurrentQuest,
    questions,
    setUser,
    user,
    image,
    alt,
    setAnimResUser
}) {

    function questionSub(e) {
        e.preventDefault();
        const formDatas = new FormData(e.target);
        const userRes = Number(formDatas.get('questions'));

        isCorrect(userRes);
        setCurrentQuest(currentQuest + 1);
        console.log(user);
    }

    function isCorrect(value) {
        if(value === answer) {
            setUser({
                name: user.name,
                score: user.score + 10
            });
            setAnimResUser(process.env.REACT_APP_LOTTIE_CORRECT);
        } else { setAnimResUser(process.env.REACT_APP_LOTTIE_FAIL); }
    }

    function resultQuiz() {
        alert('Construir o resultado do quiz');
    }

    return(
        <>
            <aside className="quiz__question-box">
                <div>
                    <h2 className="subtitle">{question}</h2>
                    <form onSubmit={questionSub} className="quiz__question-box__form">
                        {
                            alternatives.map((alternative, index) => {
                                return(
                                    <fieldset key={index} className="question-box__form__alternatives">
                                        <input
                                            type="radio" 
                                            id={index}
                                            className="form__alternatives__radio"
                                            name="questions"
                                            value={answer === index ? answer : false}
                                        />
                                        <label htmlFor={index}>{alternative}</label>
                                    </fieldset>
                                )
                            })
                        }
                        {
                            currentQuest + 1 === questions.length ?
                            <input onClick={resultQuiz} className="question-box__form__sub" type="button" value="Finalizar" />
                            : <input className="question-box__form__sub" type="submit" value="Confirmar" />
                        }
                    </form>
                </div>

                <img className="quiz__question-box__img" src={image} alt={alt} />
            </aside>
        </>
    );
}