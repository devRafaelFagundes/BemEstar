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

const findMeetings = async () => {
    try {
        const filter = ''
        //add parameters and user as query for the fetching (REMEMBER USING URLSEARCHPARAMS)

        const res = await fetch('/api/meetings', {
            method: "GET",
            credentials : "include"
        })
    } catch (err) {
        //show user the error
    }
    
}