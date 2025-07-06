const clientsSpace = document.getElementById('clients')

const getClients = async () => {
    const res = await fetch('/api/clients', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)

    const clients  = data.message;
    if(Array.isArray(clients)) {
        clients.forEach(client => {
            //show each one in the screem
        })
    }
    else {
        //show the message, probably that the professional have no clients yet
    }
}