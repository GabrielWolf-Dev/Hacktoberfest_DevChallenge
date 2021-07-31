import { useState } from 'react';
import Header from '../Header';
import './calc.css';

export default function FourthChallenge() {
    const [formDatas, setFormDatas] = useState();

    function formCalc(e) {
        e.preventDefault();
        const datas = new FormData(e.target);
        const price = Number(datas.get('price'));
        const tipPercent = Number(datas.get('tip'));
        const peopleSplit = Number(datas.get('peopleSplit'));
        const tipValue = calcTip(price, tipPercent);

        setFormDatas({
            price: calcTotalPrice(price, tipValue),
            tip: tipValue,
            perPerson: calcPersonSplit(price, peopleSplit)
        })
    }

    function calcTip(price, percent) {
        return Math.round((price / 100) * percent);
    }

    function calcTotalPrice(price, tipPercent){
        return Math.round(price + tipPercent);
      }
      
      function calcPersonSplit(price, peopleSplit){
        return price / peopleSplit;
      }

    return(
        <>
            <Header />
            <main style={{ margin: '48px auto' }} className="container">
                <h2 className="title">Calculadora de contas</h2>

                <form className="form-calc" onSubmit={formCalc}>
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="price">Valor da conta:</label>
                        <input className="form-calc__input" required type="number" id="price" name="price" placeholder="Valor da conta" />
                    </fieldset>
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="tip">Gorjeta do garçom:</label>
                        <input className="form-calc__input" required type="number" id="tip" name="tip" placeholder="Gorjeta do garçom" />
                    </fieldset>
                    <fieldset className="form-calc-box">
                        <label className="form-calc__label" htmlFor="peopleSplit">Quantos dividem a conta?:</label>
                        <input className="form-calc__input" required type="number" id="peopleSplit" name="peopleSplit" placeholder="Quantos dividem a conta?" />
                    </fieldset>

                    <input className="form-calc__sub" type="submit" value="Calcular" />
                </form>

                <aside className="result-form">
                    <h3 className="subtitle">Resultado da conta:</h3>
                        {
                            formDatas === undefined
                            ? <p style={{color: "var(--black)", marginTop: '8px'}} className="paragraph">Faça o cálculo para descobrir o resultado</p>
                            : (
                                <ul className="result-form__list-results">
                                    <li style={{color: "var(--black)", marginBottom: '8px'}} className="paragraph">{formDatas.price}</li>
                                    <li style={{color: "var(--black)", margin: '8px 0'}} className="paragraph">{formDatas.tip}</li>
                                    <li style={{color: "var(--black)", marginTop: '8px'}} className="paragraph">{formDatas.perPerson}</li>
                                </ul>
                            )
                        }
                </aside>
            </main>
        </>
    );
}