const clientsSpace = document.getElementById('clients')
import { getClients } from "./utils.js"

const renderClients = async () => {

    const clients = await getClients()
    console.log(clients)
    if(Array.isArray(clients)) {
        clients.forEach(client => {
            const eachClient = document.createElement('a')
            eachClient.href = `/app/${client._id}`
            eachClient.innerText = client.username
            clientsSpace.append(eachClient)
            //client._id is available too
        })
    }
    else {
        clientsSpace.append(clients)
    }
}

renderClients()