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


export function calculTotalMistakes(engine) {

    let incorrectLetters = 0;
    let missedLetters = 0;
    let extraLetters = 0;
    let correctedLetter = 0;

    const tabMots = engine.tabMots;

    for (let i = 0; i <= engine.currentWordIndex; i++) {
        const lettres = tabMots[i].lettres;

        for (let j = 0; j < lettres.length; j++) {
            const lettre = lettres[j];

            // If its the last typed letter
            if (i == engine.currentWordIndex && j >= engine.currentLetterIndex && lettre.charEtat === "IDLE")
                break;

            switch (lettre.charEtat) {
                case "INCORRECT":
                    incorrectLetters++;
                    break

                case "IDLE":
                    missedLetters++;
                    break

                case "EXTRA":
                    extraLetters++;
                    break
            }
            if (lettre.wasIncorrect && lettre.charEtat === "CORRECT") {
                correctedLetter++;
            }
        }
    }
    return {total: incorrectLetters + missedLetters + extraLetters + correctedLetter, 
            incorrectLetters, 
            missedLetters, 
            extraLetters, 
            correctedLetter
        }; 
}



export function calculAccuracy(engine) {
    const correctLetters = calculCorrectLetters(engine);
    const totalMistakes = calculTotalMistakes(engine).total;
    const typedLetters = correctLetters + totalMistakes;

    if (typedLetters <= 0) return 0;

    return correctLetters / typedLetters;
}


export function calculWpm(engine) {
    const correctLetters = calculCorrectLetters(engine);
    const durationSeconds = engine.timeLimit;

    return (correctLetters / 5) / (durationSeconds / 60) * calculAccuracy(engine);
}