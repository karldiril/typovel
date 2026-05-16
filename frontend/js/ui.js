const menu = document.getElementsByClassName("bouton")
const navMenu = document.getElementsByClassName("nav-menu")
let isOpen = false;


menu[0].addEventListener("click", ()=> {
    if (!isOpen) {
        navMenu[0].classList.add("open");
        navMenu[0].classList.remove("close");
        menu[0].classList.remove('fa-bars');
        menu[0].classList.add('fa-xmark');
        isOpen = true;
    }

    else {
        navMenu[0].classList.remove("open");
        navMenu[0].classList.add("close");
        menu[0].classList.remove('fa-xmark');
        menu[0].classList.add('fa-bars');
        isOpen = false;
    }
});