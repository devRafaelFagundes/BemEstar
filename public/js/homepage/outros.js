import { genBlurElement, removeBlurScreen, showOnScreen} from "./utils.js"

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

const loggout = document.getElementById('loggout')
loggout.addEventListener('click',  (e) => {
    
})