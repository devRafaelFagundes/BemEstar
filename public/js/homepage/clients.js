const clientsSpace = document.getElementById('clients')
const getClients = async () => {
    const res = await fetch('/api/clients', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const data = await res.json()
    return data.message;
}

const renderClients = async () => {

    const clients = await getClients()
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