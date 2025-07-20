import { hideFromClass } from "./utils.js";

hideFromClass('demo');

//discover the user role (professional or client)
const json = document.getElementById('server-data').textContent;
const serverData = JSON.parse(json)

//serverData available info:
// email 
// role 
// userId
// username

if(serverData.role === 'client') {
    hideFromClass('profOnly')
}
else {
    hideFromClass('clientOnly')
}

const button = document.getElementById("menu");
const sideBar = document.getElementById("sidebar")
button.addEventListener("click", (e) => {
    sideBar.classList.toggle("show")
})

const selectors = document.querySelectorAll(".selector")
const contents = document.querySelectorAll(".content")

contents[0].classList.add("display");
selectors.forEach((selected) => {
    selected.addEventListener("click", e => {
        let indice = 0
        for (let i = 0; i < selectors.length; i++) {
            if(selectors[i] === selected) {
                indice = i
            }
        }

        contents.forEach((element) => {
            element.classList.remove("display")
        })
        contents[indice].classList.add("display")
    })
})
