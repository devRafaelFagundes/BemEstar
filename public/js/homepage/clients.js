import { getClients } from "./utils.js"
const clientsSpace = document.getElementById('clients')
const searchInput = document.getElementById('searchClients')

let clients = []

const renderClients = async (filteredClients) => {
    clientsSpace.innerHTML = ""
    let arrayToRender = filteredClients ? filteredClients : clients
    if(Array.isArray(arrayToRender)) {
        arrayToRender.forEach(client => {
            const eachClient = document.createElement('a')
            eachClient.href = `/info/${client._id}`
            eachClient.innerText = client.username
            clientsSpace.append(eachClient)
            //client._id is available too
        })
    }
    else {
        clientsSpace.append(arrayToRender)
    }
}

(async function assignClientsToArray() {
    clients = await getClients()
    //return message if 404

    renderClients()
})()

searchInput.addEventListener('input', e => {
    if(searchInput.value.trim() === '') {
        renderClients()
    }
    else {
        const filteredArray = clients.filter(client => client.username.toLowerCase().includes(searchInput.value.toLowerCase().trim()))
        renderClients(filteredArray)
    }
})

