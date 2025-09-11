import { genBlurElement, removeBlurScreen, showOnScreen} from "./utils.js"
const createMeeting = document.getElementById("add-meeting")
const createScreen = document.getElementById("meeting-post")
const meetingSpace = document.getElementById("meetings")
const createMeetingButton = document.getElementById("createMeetingButton")

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

        const res = await fetch('/meetings', {
            method: "GET",
            credentials : "include"
        })
        const response = await res.json();
        console.log(response)
        const allMeetings = response.message;
        console.log(allMeetings)
        if(!Array.isArray(allMeetings)) {
            const newMeeting = document.createElement("li")
            newMeeting.innerText = allMeetings;
            meetingSpace.appendChild(newMeeting)
        }
        else {
            allMeetings.forEach(meeting => {
                const newMeeting = document.createElement("li");
                newMeeting.innerText = meeting.topic;
                meetingSpace.appendChild(newMeeting);
            });
        }
    } catch (err) {
        //show user the error
        console.log(err)
    }
}
findMeetings()


