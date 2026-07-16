import { Engine } from './engine.js';


const game = document.querySelector(".jeu");
let offset = 0;



export function updateUI(engine) {
    game.innerHTML = "";
    let finalUI = "";

    const motsAafficher = engine.tabMots.slice(offset, offset + 100);


    for (let i = 0; i < motsAafficher.length; i++) {
        
        const wordObject = motsAafficher[i];
        const indexAbsolu = offset + i;

        finalUI += `<div class="word" data-wordindex="${indexAbsolu}">`;

        console.log(wordObject);

        const lettres = wordObject.lettres;

        for (let j = 0; j < lettres.length; j++) {
            let etat = lettres[j].charEtat;
            let content = lettres[j].charAttendu;
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
                    finalUI += `<span class="incorrect extra">${lettres[j].charTape}</span>`;
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
    const currentWord = document.querySelector(`.word[data-wordindex="${engine.currentWordIndex}"]`);
    
    if (!currentWord) return;

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