const el = document.querySelector(".center h1");
const caret = document.querySelector(".caret");

const text = el.textContent;
el.textContent = "";
el.appendChild(caret);

let i = 0;

function type() {
    el.textContent = text.slice(0, i);
    el.appendChild(caret);

    i++;

    if (i <= text.length) {
        const delay = Math.random() * 50 + 20;
        setTimeout(type, delay);
    }
}

type();