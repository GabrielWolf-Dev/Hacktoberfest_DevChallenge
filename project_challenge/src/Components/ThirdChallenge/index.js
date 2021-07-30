import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

import Header from '../Header';
import './gallery.css';
require('dotenv').config();

export default function ThirdChallenge() {
    const [photos, setPhotos] = useState([]);
    const [nextPage, setNextPage] = useState();
    const [url, setUrl] = useState('https://api.pexels.com/v1/search?query=artes&locale=pt-BR&page=1&per_page=2');
    const wordsValidate = [
        "Arte",
        "Teatro",
        "Artes visuais",
        "Pintura",
        "Desenho",
        "Artes cênicas",
        "Música",
        "Dança"
    ];

    useEffect(() => {
        const animLoad = document.querySelector('.anim-load');

        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries.some(entry => entry.isIntersecting)) {
                animLoad.classList.add('anim-load--active');
                setTimeout(() => {
                    setUrl(nextPage);
                    animLoad.classList.remove('anim-load--active');
                }, 1000)
            }
        });

        intersectionObserver.observe(document.querySelector('.intersection-box'));
        return () => intersectionObserver.disconnect(); // Quando o componente morrer no ciclo de vida
    }, []);

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
            
            setPhotos((photos) => [...photos, ...data.photos]); // Regra do react quando se utiliza array de objetos, array de arrays ou objetos somente.
            setNextPage(data.next_page);
        })();
    }, [url]);
    console.log(photos);

    function searchTypePhotos(e) {
        e.preventDefault();
        const inputValue = new FormData(e.target).get('searchTypePhoto');
        const message = e.target.children[2];
        
        const isWordValidated = wordsValidate.reduce((acc, currValue) => {
            if(currValue === inputValue || currValue.toLowerCase() === inputValue)
                acc = true;
            
            return acc;
        }, false);
        
       if(isWordValidated){//15
            setUrl(`https://api.pexels.com/v1/search?query=${inputValue}&locale=pt-BR&per_page=2`);
            message.classList.remove('seach-photos__input-invalidate--active');
       } else {
            message.classList.add('seach-photos__input-invalidate--active');
       }
    
       e.target.children[0].value = '';
    }

    return(
        <>
            <Header />
            <section style={{ margin: "48px auto" }} className="container">
                <h2 className="title">Galeria de artes</h2>

                <form className="search-photos" onSubmit={searchTypePhotos}>
                    <input className="seach-photos__input" name="searchTypePhoto" type="text" placeholder="Pesquisar outras obras" />
                    <input className="seach-photos__sub" type="submit" value="Pesquisar" />
                    <div className="seach-photos__input-invalidate">Pesquisa invalida</div>
                </form>

                <aside className="words-validate">
                    <h3 className="subtitle words-validate__title">Palavras válidas no campo de pesquisa acima</h3>
                    <ul className="words-validate__list-word">
                        {
                           wordsValidate.map((word, index) => {
                            return(
                                <li className="words-validate__word" key={index}>{word}</li>
                            );
                           }) 
                        }
                    </ul>
                </aside>

                <main className="gallery-grid">
                {
                    photos.map(data => {
                        const randomNum = Math.floor(Math.random() * 20);
                        return(
                            <figure key={data.id} className="gallery-grid__fig">
                                <a target="blank" href={data.url}>
                                    {
                                        randomNum <= 10 
                                        ? <img className="gallery-grid__img" src={data.src.portrait} alt={`Obra artísticafotografada por ${data.photographer}`} />
                                        : <img className="gallery-grid__img" src={data.src.medium} alt={`Obra artísticafotografada por ${data.photographer}`} />
                                    }
                                </a>
                                <figcaption className="gallery-grid__figcap"><a className="gallery-grid__author"target="blank" href={data.photographer_url}>{data.photographer}</a></figcaption>
                            </figure>
                        );
                    })
                }
                </main>
            </section>
            
            <div className="intersection-box"></div>
            <Player
                autoplay
                loop
                src={process.env.REACT_APP_LOTTIE_LOAD} /* https://lottiefiles.com/user/120131*/
                className="anim-load"
                speed="1.5"
            ></Player>

            <footer className="gallery-footer">
                <a className="gallery-footer_link" target="blank" href="https://www.pexels.com/pt-br/">
                    Fotos fornecidas pelo
                </a>
                <a className="gallery-footer_link" target="blank" href="https://www.pexels.com/pt-br/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32">
                    <path d="M2 0h28a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#05A081"></path>
                        <path d="M13 21h3.863v-3.752h1.167a3.124 3.124 0 1 0 0-6.248H13v10zm5.863 2H11V9h7.03a5.124 5.124 0 0   1 .833 10.18V23z" fill="#fff"></path>
                    </svg>
                </a>
            </footer>
        </>
    );
}