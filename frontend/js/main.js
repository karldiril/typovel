import { Engine } from './engine.js';
import * as gameUI from './gameUI.js';


let mots = ["bonjour", "éteins", "voiture", "interroger", "manger", "pendant", "maison", "que", "je", "train", "voiture", "personne", "puis", "étudier"]

let engine = Engine.init(mots)

window.addEventListener("load", (_) => {
    gameUI.updateUI(engine);
});


window.addEventListener("keydown", (event) => {
    if (event.key == "Backspace") {
        engine = engine.removeLetter();
    }

    if (event.key == " ") {
        engine = engine.nextWord();
    }

    if (isLetter(event.key)) {
        engine = engine.verifyLetter(event.key);
    }

    gameUI.updateUI(engine);
});



function isLetter(key) {
    return key.length == 1 && key != " ";
}