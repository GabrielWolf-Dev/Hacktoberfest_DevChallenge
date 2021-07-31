import Header from '../Header';
import './calc.css';

export default function FourthChallenge() {
    return(
        <>
            <Header />
            <main style={{ margin: '48px auto' }} className="container">
                <h2 className="title">Calculadora de contas</h2>

                <form className="form-calc">
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="price">Valor da conta:</label>
                        <input className="form-calc__input" required type="number" id="price" name="price" placeholder="Valor da conta" />
                    </fieldset>
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="tip">Gorjeta do garçom:</label>
                        <input className="form-calc__input" required type="text" id="tip" name="tip" placeholder="Gorjeta do garçom" />
                    </fieldset>
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="peopleSplit">Quantos dividem a conta?:</label>
                        <input className="form-calc__input" required type="number" id="peopleSplit" name="peopleSplit" placeholder="Quantos dividem a conta?" />
                    </fieldset>

                    <input className="form-calc__sub" type="submit" value="Calcular" />
                </form>

                <aside className="result-form">
                    <h3 className="subtitle">Resultado da conta:</h3>

                    <ul className="result-form__list-results">
                        <li style={{color: "var(--black)", marginBottom: '8px'}} className="paragraph">Conta</li>
                        <li style={{color: "var(--black)", margin: '8px 0'}} className="paragraph">Gorjeta</li>
                        <li style={{color: "var(--black)", marginTop: '8px'}} className="paragraph">Total por pessoa</li>
                    </ul>
                </aside>
            </main>
        </>
    );
}