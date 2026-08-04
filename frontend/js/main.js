import { Engine } from './engine.js';
import * as gameUI from './gameUI.js';
import * as wordManager from './wordManager.js';


let input = gameUI.getInputElement();
let chronoInterval = null;
let gameArea = gameUI.getGameArea();


let engine = Engine.init();
input.focus();
gameUI.updateUI(engine);


input.addEventListener("blur", gameUI.afficherEcranPause);

input.addEventListener("focus", gameUI.cacherEcranPause);


gameArea.addEventListener("mousedown", (e) => {
    e.preventDefault();
    input.focus();
    gameUI.cacherEcranPause();
});


document.addEventListener("keydown", (e) => {
    if (document.activeElement !== input)
        e.preventDefault();
    input.focus();
});






window.addEventListener("keydown", async (event) => {
    if (engine.status == "FINISHED") return;


    if (event.code == "Backspace") {
        engine = engine.removeLetter(gameUI.getOffset());
    }

    if (event.code == "Space") {
        engine = engine.submitWord();
        if(gameUI.aPasserLigne(engine.currentWordIndex, engine.currentWordIndex - 1)) {
            if (gameUI.doitDecalerAffichage(engine.currentWordIndex - 1)) {
                gameUI.allongerOffset(gameUI.calculerDecalage())
            }
            
        }
    }
    gameUI.updateUI(engine);
});


input.addEventListener("input", (event) => {
    if (engine.status == "FINISHED") return;

    if (isLetter(event.target.value)) {
        if (engine.isWordComplete && !gameUI.peutAjouterLettre(engine.currentWordIndex))
            return;

        const etaitEnAttente = (engine.status === "IDLE");
        engine = engine.verifyLetter(event.target.value);
        
        if (etaitEnAttente) {
            lancerChrono();
        }
    }

    gameUI.updateUI(engine);
})



function isLetter(key) {
    return key.length == 1 && key != " ";
}



function lancerChrono() {
    chronoInterval = setInterval(() => {
        let time = Date.now();
        time -= engine.startTime;
        time = Math.floor(time / 1000);

        gameUI.updateTimer(time);
    }, 1000);
}


function arreterChrono() {
    clearInterval(chronoInterval);
}