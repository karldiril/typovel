import { Engine } from './engine.js';
import * as gameUI from './gameUI.js';


let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]
let input = gameUI.getInputElement();
let engine = Engine.init(mots)

window.addEventListener("load", (_) => {
    input.focus();
    gameUI.updateUI(engine);
});


window.addEventListener("keydown", (event) => {
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
        else
            engine = engine.verifyLetter(event.target.value);
    }

    gameUI.updateUI(engine);
})



function isLetter(key) {
    return key.length == 1 && key != " ";
}