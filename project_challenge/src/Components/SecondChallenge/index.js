import { useEffect, useState } from 'react';
import Header from '../Header';
import './chess.css';

export default function SecondChallenge() {
    const [matriz] = useState([
        "0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0",
        "0 0 0 0 0 0 0 0",
        "0 0 0 1 1 0 0 0",
        "0 0 0 1 1 0 0 0",
        "0 0 0 0 0 0 0 0",
        "4 0 0 0 0 0 0 4",
        "0 0 0 0 0 6 0 0",
    ]);
    const [pecas, setPecas] = useState({
        peao: 0,
        bispo: 0,
        cavalo: 0,
        torre: 0,
        rainha: 0,
        rei: 0,
    });

    useEffect(() => {
        matriz.forEach(matriz => {
            const row = matriz.split(' ');

            row.forEach(row => {
                if(row === '1')
                    setPecas({ ...pecas, peao: pecas.peao += 1 });

                if(row === '2')
                    setPecas({ ...pecas, bispo: pecas.bispo += 1 });

                if(row === '3')
                    setPecas({ ...pecas, cavalo: pecas.cavalo += 1 });

                if(row === '4')
                    setPecas({ ...pecas, torre: pecas.torre += 1 });

                if(row === '5')
                    setPecas({ ...pecas, rainha: pecas.rainha += 1 });

                if(row === '6')
                    setPecas({ ...pecas, rei: pecas.rei += 1 });
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matriz]);

    return(
        <>
            <Header />
            <main className="container chess-box">
                <h1 className="title">Contando peças de xadrez</h1>
                <table className="chess-box__table-chess">
                    <thead>
                        <tr>
                            <th colSpan="8">Tabuleiro</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        matriz.map((matriz, index) => {
                            const numbersMatrix = matriz.split(' ');
                            return (
                                <tr key={index}>
                                    {numbersMatrix.map((numbers, index) => numbers !== '0' 
                                    ? (<td key={index} style={{ color: "var(--blue-light)" }}>{numbers}</td>)
                                    : (<td key={index}>{numbers}</td>))}
                                </tr>
                            );
                        })
                    }
                    </tbody> 
                </table>

                <footer className="chess-box__result">
                    <h3 className="subtitle">Resultado</h3>
                    <ul className="chess-box__list-pieces">
                        <li>Peão: {pecas.peao}</li>
                        <li>Bispo: {pecas.bispo}</li>
                        <li>Cavalo: {pecas.cavalo}</li>
                        <li>Torre: {pecas.torre}</li>
                        <li>Rainha: {pecas.rainha}</li>
                        <li>Rei: {pecas.rei}</li>
                    </ul>
                </footer>
            </main>
        </>
    );
}