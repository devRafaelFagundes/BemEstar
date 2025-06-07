const header = document.querySelector("header")
let lastScroll = 0;
window.addEventListener('scroll', e =>{
    currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
        header.classList.add("hide")
    }
    else{
        header.classList.remove("hide");
    }
    if (currentScroll < 0) {
        currentScroll = 0;
    }
    else {
        lastScroll = currentScroll;
    }
})

const botao = document.querySelector('.buttonEffectContainer > button');

const orbitas = document.querySelectorAll('.buttonEffectContainer > button ~ .orbita')
console.log(orbitas)

botao.addEventListener('click', (e) => {
    orbitas.forEach((orbita) => {
        orbita.style.backgroundColor = 'white';
    })
})
