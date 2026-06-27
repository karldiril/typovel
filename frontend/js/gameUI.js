import { Engine } from './engine.js';


const game = document.querySelector(".jeu");

export function updateUI(engine) {
    game.innerHTML = "";
    let finalUI = "";
    for (const objet of engine.tabMots) {
        finalUI += `<div class="word">`;

        const motAttendu = objet.attendu;
        const motTape = objet.tape;


        for (let i = 0; i < motAttendu.length; i++) {
            let content = motAttendu[i];

            if (i < motTape.length) {
                if (motTape[i] == motAttendu[i]) {
                    finalUI += `<span class="correct">${content}</span>`;
                }
                else {
                    finalUI += `<span class="incorrect">${content}</span>`;
                }
            }
            else {
                finalUI += `<span>${content}</span>`;
            }
        }

        if (motTape.length > motAttendu.length) {
            const surplus = motTape.slice(motAttendu.length);

            for (let i = 0; i < surplus.length; i++) {
                finalUI += `<span class="incorrect">${surplus[i]}</span>`;
            }
        }


        finalUI += `</div>`;
    }
    
    game.innerHTML = finalUI;
}


export function getInputElement() {
    return document.querySelector(".typing-input");
}