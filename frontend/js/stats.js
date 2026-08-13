import { Engine } from './engine.js';


function calculCorrectLetters(engine) {

    let correctLetter = 0;
    const tabMots = engine.tabMots;

    for (let i = 0; i <= engine.currentWordIndex; i++) {
        const lettres = tabMots[i].lettres;

        for (const lettre of lettres) {
            if (lettre.charEtat === "CORRECT")
                correctLetter++;
        }
    }

    // Spacebar is counted as a correct Letter
    correctLetter += engine.currentWordIndex;

    return correctLetter; 
}


export function calculIncorrectLetters(engine) {

    let incorrectLetter = 0;
    const tabMots = engine.tabMots;

    for (let i = 0; i <= engine.currentWordIndex; i++) {
        const lettres = tabMots[i].lettres;

        for (let j = 0; j < lettres.length; j++) {
            const lettre = lettres[j];

            // If its the last typed letter
            if (i == engine.currentWordIndex && j > engine.currentLetterIndex)
                break;

            if (lettre.charEtat === "INCORRECT" || lettre.charEtat === "IDLE" || lettre.charEtat === "EXTRA") {
                incorrectLetter++;
            }
        }
    }
    return incorrectLetter; 
}


export function calculAccuracy(engine) {
    const correctLetters = calculCorrectLetters(engine);
    const incorrectLetters = calculIncorrectLetters(engine);
    const typedLetters = correctLetters + incorrectLetters;

    if (typedLetters <= 0) return 0;

    return correctLetters / typedLetters;
}


export function calculWpm(engine) {
    const correctLetters = calculCorrectLetters(engine);
    const durationSeconds = engine.timeLimit;

    return (correctLetters / 5) / (durationSeconds / 60) * calculAccuracy(engine);
}