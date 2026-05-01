let jeu = document.querySelectorAll("span");

let i = 0;
jeu[i].classList.add("actif");

document.body.addEventListener("keydown", (input) => {
    console.log(input.key);
    if (input.key.length == 1) {
        if (input.key == jeu[i].textContent) {
            jeu[i].classList.add("correct");
        }
        else {
            jeu[i].classList.add("incorrect");
        }

        jeu[i].classList.remove("actif");

        if (i < jeu.length - 1) {  // Vérifier si on arrive à la dernière lettre
            ++i;
            jeu[i].classList.add("actif");
        }
        else {
            console.log("fini");
        }
    }
    else if (input.key == "Backspace") {
        if (i > 0) {
            jeu[i].classList.remove("actif");
            --i;
            jeu[i].classList.add("actif");
            jeu[i].classList.remove("correct");
            jeu[i].classList.remove("incorrect");
        }
    }
})