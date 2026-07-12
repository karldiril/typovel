import { Engine } from './engine.js';


const game = document.querySelector(".jeu");

export function updateUI(engine) {
    game.innerHTML = "";
    let finalUI = "";
    for (const objet of engine.tabMots) {
        finalUI += `<div class="word">`;

        const lettres = objet.lettres;

        for (let i = 0; i < lettres.length; i++) {
            let etat = lettres[i].charEtat;
            let content = lettres[i].charAttendu;
            switch (etat) {
                case "CORRECT":
                    finalUI += `<span class="correct">${content}</span>`;
                    break;
                case "INCORRECT":
                    finalUI += `<span class="incorrect">${content}</span>`;
                    break;
                case "PENDING":
                    finalUI += `<span>${content}</span>`;
                    break;
                case "EXTRA":
                    finalUI += `<span class="incorrect extra">${lettres[i].charTape}</span>`;
                    break;
            }
                
        }
        finalUI += `</div>`;
    }
    
    game.innerHTML = finalUI;
    curseurPlacement(engine);
    getInputElement().value = "";
}


export function curseurPlacement(engine) {
    const currentWord = document.querySelectorAll(".word")[engine.currentWordIndex];
    const currentLetter = currentWord.children[engine.currentLetterIndex + 1];
    console.log(engine.currentLetterIndex);
    const caret = document.querySelector(".caret");


    if (engine.currentLetterIndex == 0) {
        const currentLetter = currentWord.children[engine.currentLetterIndex];
        caret.style.left = `${currentLetter.offsetLeft}px`;
        caret.style.top = `${currentLetter.offsetTop}px`;
    }
    else {
        const currentLetter = currentWord.children[engine.currentLetterIndex - 1];
        caret.style.left = `${currentLetter.offsetLeft + currentLetter.offsetWidth}px`;
        caret.style.top = `${currentLetter.offsetTop}px`;
    }
    
}

export function getInputElement() {
    return document.querySelector(".typing-input");
}