import { genBlurElement, removeBlurScreen, showOnScreen, getClients} from "./utils.js"

const createMeeting = document.getElementById("add-meeting")
const createScreen = document.getElementById("meeting-post")
const meetingSpace = document.getElementById("meetings")
const createMeetingButton = document.getElementById("createMeetingButton")
const clientsToAssignMeeting = document.getElementById("clientsToAssignMeeting")

let globalClients;
let selectedClients = []

async function addGlobalClientsContent() {
    globalClients = await renderClientsToAssignMeeting()
}
addGlobalClientsContent();

createMeeting.addEventListener("click", (e) => {
    e.stopPropagation();
    createScreen.classList.add('appearScreen')
    genBlurElement()
})

createScreen.addEventListener("click", (e) => {
    e.stopPropagation();
})

window.addEventListener("click", async (ev) => {
    const clickedInsideCreateScreen = !!ev.target.closest('#meeting-post')
    const clickedOnCreateMeeting = !!ev.target.closest('#add-meeting')

    if (!clickedInsideCreateScreen && !clickedOnCreateMeeting) {
        createScreen.classList.remove("appearScreen")
        await removeBlurScreen()
    }
})

const findMeetings = async () => {
    try {
        const res = await fetch('/meetings', {
            method: "GET",
            credentials : "include"
        })
        const response = await res.json();
        const allMeetings = response.data;

        if(!Array.isArray(allMeetings)) {
            console.log('Entered wrong if')
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
        console.log(err)
    }
}
findMeetings()

async function renderClientsToAssignMeeting() {
    const clients = await getClients();
    if(typeof clients == 'string') {
        const noClientsMessage = document.createElement('p')
        noClientsMessage.innerText = clients
        clientsToAssignMeeting.append(noClientsMessage)
    }
    else {
        clients.forEach(client => {
            console.log(client)
            const clientContainer = document.createElement('button')
            clientContainer.type = 'button'
            clientContainer.innerText = client.username
            clientContainer.style.backgroundColor = 'gray'
            clientContainer.style.color = 'white'
            clientContainer.style.margin = '5px'
            clientContainer.style.padding = '10px'
            clientsToAssignMeeting.append(clientContainer)
        })
    }
    return clients;
}

clientsToAssignMeeting.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        e.target.classList.toggle('selectedClient')

        const username = e.target.innerText;
        const clientObject = globalClients.find(object => object.username === username)
        const alreadySelected = selectedClients.some(client => client.username === clientObject.username)

        if(clientObject && !alreadySelected) {
            selectedClients.push(clientObject)
            console.log(selectedClients)
        }
        else if(clientObject && alreadySelected) {
            selectedClients = selectedClients.filter(client => client.username != clientObject.username)
            console.log(selectedClients)
        }
    }
})
createMeetingButton.addEventListener('click', async (e) => {
    const topic = document.getElementById('topic')
    const link = document.getElementById('link')
    const date = document.getElementById('date')
    const clientsIds = selectedClients.map(client => client._id)
    const res = await fetch('/meetings/create-meeting', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            topic : topic.value,
            link : link.value,
            date : date.value,
            clients : clientsIds
        })
    })
    const data = await res.json();
    if(data.success) {
        console.log('meeting created')
    }
    else {
        console.log(data)
    }
})