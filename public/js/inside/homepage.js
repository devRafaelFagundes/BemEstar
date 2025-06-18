const button = document.getElementById("menu");
const sideBar = document.getElementById("sidebar")

button.addEventListener("click", (e) => {
    sideBar.classList.toggle("show")
})