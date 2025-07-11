const url = window.location.pathname;
const separatedURL = url.split('/')
const idUser = separatedURL[2];

const fetchAllUserInfo = async () => {
    const response = await fetch('/app/', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const data = await response.json()
    console.log(data)
}

fetchAllUserInfo();