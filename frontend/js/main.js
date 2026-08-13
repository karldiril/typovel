import { Engine } from './engine.js';
import * as gameUI from './gameUI.js';
import * as wordManager from './wordManager.js';
import * as stats from './stats.js';


let input = gameUI.getInputElement();
let chronoInterval = null;
let gameArea = gameUI.getGameArea();
let replayArea = gameUI.getReplayArea();


let engine = Engine.init();
input.focus();
gameUI.updateUI(engine);
 

window.addEventListener("resize", (_) => {
    if (gameUI.doitDecalerAffichage(engine.currentWordIndex)) {
        gameUI.allongerOffset(gameUI.calculerDecalage());
    }

    gameUI.updateUI(engine);
});



document.addEventListener("gameOverEvent", (_) => {
    console.log("fin");
    gameUI.afficherEcranFin();
});



input.addEventListener("blur", gameUI.afficherEcranPause);

input.addEventListener("focus", gameUI.cacherEcranPause);


gameArea.addEventListener("mousedown", (e) => {
    e.preventDefault();
    input.focus();
    gameUI.cacherEcranPause();
});


replayArea.addEventListener("click", relancerPartie);


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
            lancerChrono(engine.timeLimit);
        }
    }

    gameUI.updateUI(engine);
})



function isLetter(key) {
    return key.length == 1 && key != " ";
}



function lancerChrono() {
    gameUI.displayTimer(engine.timeLimit);
    chronoInterval = setInterval(actualiserTemps, 1000);
}



function actualiserTemps() {
    let time = Date.now();
    time -= engine.startTime;
    time = Math.floor(time / 1000);
    time = engine.timeLimit - time;

    gameUI.updateTimer(time);

    if (time <= 0) {
        terminerPartie();
    }
}

function terminerPartie() {
    engine.status = "FINISHED";
    clearInterval(chronoInterval);

    const wmpScore = stats.calculWpm(engine);
    const accScore = stats.calculAccuracy(engine);
    const mistakesScore = stats.calculIncorrectLetters(engine);
    const timeLimit = engine.timeLimit;


    gameUI.updateStatsUI(wmpScore, accScore, mistakesScore, timeLimit);

    const gameOverEvent = new CustomEvent("gameOverEvent"); 

    document.dispatchEvent(gameOverEvent);
}


function relancerPartie() {
    engine = Engine.init();
    gameUI.resetUI(engine);
    input.focus();
}