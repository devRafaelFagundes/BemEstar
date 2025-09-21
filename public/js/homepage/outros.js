import { genBlurElement, removeBlurScreen, showOnScreen, genScreen, removeWhenNotClicked} from "./utils.js"

document.addEventListener('click', (e) => {
    removeWhenNotClicked('loggoutScreen')
})

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
    const existsLoggoutScreen = document.getElementById('loggoutScreen')
    if(!existsLoggoutScreen) {
        const body = document.querySelector('body')
    
        const loggoutDiv = genScreen(77.5, 4, 400, 80)
        loggoutDiv.id = 'loggoutScreen'
        //left, top, width, height
    
        loggoutDiv.style.backgroundColor = 'lightgray'
        loggoutDiv.style.borderRadius = '10px'
        loggoutDiv.style.padding = '5px'
    
        const message = document.createElement('p')
        message.innerText = 'Você quer mesmo deslogar?'
        message.style.textAlign = 'center'
        message.style.padding = '5px'
    
        const buttonsDiv = document.createElement('div')
        buttonsDiv.style.display = 'flex'
        buttonsDiv.style.justifyContent = 'space-around'
        buttonsDiv.style.marginTop = '10px'
    
        const deslogarBtn = document.createElement('button')
        deslogarBtn.innerText = 'Sim'
        deslogarBtn.classList.add('loggoutButtons')
    
        const cancelarBtn = document.createElement('button')
        cancelarBtn.innerText = 'Cancelar'
        cancelarBtn.classList.add('loggoutButtons')
        cancelarBtn.id = 'cancelDeslogar'
        
        buttonsDiv.append(deslogarBtn)
        buttonsDiv.append(cancelarBtn)
    
        loggoutDiv.append(message)
        loggoutDiv.append(buttonsDiv)
    
        body.appendChild(loggoutDiv)

        cancelarBtn.addEventListener('click', (e) => {
            const loggoutScreen = document.getElementById('loggoutScreen')
            loggoutScreen.remove()
        })

        deslogarBtn.addEventListener('click', async (e) => {
            const deslogar = await fetch('/auth/logout', {
                credentials: 'include'
            })
            window.location.href = '/'
        })
    }
})

