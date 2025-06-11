const inner = document.querySelector('.inner');
const changeButton = document.querySelectorAll('.move');
changeButton.forEach(e => {
    e.addEventListener('click', (event) => {
    inner.classList.toggle('rotate')
})
})
