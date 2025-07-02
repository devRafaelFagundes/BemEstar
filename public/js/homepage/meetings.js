import { genBlurElement, removeBlurScreen} from "./utils.js"
const createMeeting = document.getElementById("add-meeting")
const createScreen = document.getElementById("meeting-post")
createMeeting.addEventListener("click", (e) => {
    e.stopPropagation();
    createScreen.classList.add('appearScreen')
    genBlurElement()
})
window.addEventListener("click", (ev) => {
        if(!createScreen.contains(ev.target) && !createMeeting.contains(ev.target)) {
            createScreen.classList.remove("appearScreen")
        }
        removeBlurScreen()
    })