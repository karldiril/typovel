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

        const lettres = wordObject.lettres;

        for (let j = 0; j < lettres.length; j++) {
            let etat = lettres[j].charEtat;
            let content = lettres[j].charAttendu;
            switch (etat) {
                case "CORRECT":
                    finalUI += `<span class="letter correct">${content}</span>`;
                    break;
                case "INCORRECT":
                    finalUI += `<span class="letter incorrect">${content}</span>`;
                    break;
                case "PENDING":
                    finalUI += `<span class="letter">${content}</span>`;
                    break;
                case "EXTRA":
                    finalUI += `<span class="letter incorrect extra">${lettres[j].charTape}</span>`;
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



export function getGameArea() {
    return document.querySelector(".game-container");
}


export function aPasserLigne(indexA, indexB) {
    const motA = document.querySelector(`.word[data-wordindex="${indexA}"]`);
    const motB = document.querySelector(`.word[data-wordindex="${indexB}"]`);

    if (!motA || !motB) return false;

    return motB.offsetTop < motA.offsetTop;
}


export function calculerDecalage() {
    let decalage = 1;
    let i = offset;
    let currentWord = document.querySelector(`.word[data-wordindex="${i}"]`);
    let nextWord = document.querySelector(`.word[data-wordindex="${i + 1}"]`);
    while (currentWord && nextWord && currentWord.offsetTop == nextWord.offsetTop) {
        decalage += 1;
        i += 1;
        currentWord = document.querySelector(`.word[data-wordindex="${i}"]`);
        nextWord = document.querySelector(`.word[data-wordindex="${i + 1}"]`);
    }
    return decalage;
}


export function allongerOffset(valeur) {
    offset += valeur;
}

export function getOffset() {
    return offset;
}



export function doitDecalerAffichage(currentWordIndex) {
    const firstWord = document.querySelectorAll(".word")[0];
    const currentWord = document.querySelector(`.word[data-wordindex="${currentWordIndex}"]`);

    return currentWord.offsetTop != firstWord.offsetTop;
}


export function peutAjouterLettre(currentWordIndex) {
    const currentWord = document.querySelector(`.word[data-wordindex="${currentWordIndex}"]`).getBoundingClientRect();
    const letterSize = document.querySelector(".letter").getBoundingClientRect().width;
    const zoneDeJeu = document.querySelector(".jeu").getBoundingClientRect();

    return (currentWord.right + (letterSize * 1.5)) < zoneDeJeu.right;

}



export function updateTimer(temps) {
    const DOMtimer = document.querySelector(".timer");
    DOMtimer.textContent = temps;
}



let ecranFocus = document.querySelector(".focusWarning");


export function afficherEcranPause() {
    ecranFocus.classList.remove("hidden");
}

export function cacherEcranPause() {
    ecranFocus.classList.add("hidden");
}