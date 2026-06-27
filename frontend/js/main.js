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
    if (event.code == "Backspace") {
        engine = engine.removeLetter();
    }

    if (event.code == "Space") {
        engine = engine.submitWord();
    }
    gameUI.updateUI(engine);
});


input.addEventListener("input", (event) => {
    if (isLetter(event.target.value)) {
        engine = engine.verifyLetter(event.target.value);
    }

    gameUI.updateUI(engine);
})



function isLetter(key) {
    return key.length == 1 && key != " ";
}