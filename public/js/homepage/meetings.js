import { genBlurElement, removeBlurScreen, showOnScreen} from "./utils.js"
const createMeeting = document.getElementById("add-meeting")
const createScreen = document.getElementById("meeting-post")
const meetingSpace = document.getElementById("meetings")

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
        const response = await res.json();
        console.log(response)
        const allMeetings = response.data;
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

const joinUserButton = document.getElementById('joinUser')

const fetchJoin = async (username, userPassword) => {
    try {
        const res = await fetch('/app/join', {
            method : 'POST',
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username,
                password : userPassword
            })
        })
        const response = await res.json()
        console.log(response)
        showOnScreen(response.message, response.success)

    } catch(err) {
        // show generic error 'something went wrong' to the user
        showOnScreen('Algo deu errado ao tentar associar o usuário', false)
        console.log(err)
    }
}

joinUserButton.addEventListener('click', (e) => {
    const username = document.getElementById('name').value
    const userPassword = document.getElementById('password').value
    console.log(username, userPassword)
    fetchJoin(username, userPassword)
})