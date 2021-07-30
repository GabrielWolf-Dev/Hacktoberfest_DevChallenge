import { useEffect, useState } from 'react';

import Header from '../Header';
import './gallery.css';
require('dotenv').config();

export default function ThirdChallenge() {
    const [datas, setDatas] = useState([]);
    const [url, setUrl] = useState("https://api.pexels.com/v1/search?query=artes&locale=pt-BR&page=1&per_page=20");

    useEffect(() => {
        (async function(){
            const resStruture = {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': process.env.REACT_APP_API_PEXELS
                }
            }
            const res = await fetch(url, resStruture);
            const data = await res.json();
            setDatas(data.photos);
            
        })();
    }, [url]);

    return(
        <>
            <Header />
            <section style={{ margin: "48px auto" }} className="container">
                <h2 className="title">Galeria de artes</h2>
                <form>
                    <input type="text" placeholder="Pesquisar outras obras" />
                    <input type="submit" value="Pesquisar" />
                </form>

                <main style={{ width: '600px' }}>
                    {
                        datas.map(data => {
                            const randomNum = Math.floor(Math.random() * 20);
                            return(
                                <figure key={data.id}>
                                    <a target="blank" href={data.url}>
                                        <img src={randomNum <= 10 ? data.src.medium : data.src.portrait} alt={`Obra artística fotografada por ${data.photographer}`} />
                                    </a>
                                    <figcaption><a target="blank" href={data.photographer_url}>{data.photographer}</a></figcaption>
                                </figure>
                            );
                        })
                    }
                </main>
            </section>
            <footer>
                <a href="https://www.pexels.com/pt-br/">
                    Fotos fornecidas pelo
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32">
                    <path d="M2 0h28a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#05A081"></path>
                        <path d="M13 21h3.863v-3.752h1.167a3.124 3.124 0 1 0 0-6.248H13v10zm5.863 2H11V9h7.03a5.124 5.124 0 0 1 .833 10.18V23z" fill="#fff"></path>
                    </svg>
                </a>
            </footer>
        </>
    );
}