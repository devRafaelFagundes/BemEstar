const inner = document.querySelector('.inner');
//buttons register and login
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');

const username = document.querySelector('#register input[name="username"]').value;
const email = document.querySelector('#register input[name="email"]').value;
const password = document.querySelector('#register input[name="password"]').value;

const feedBackText = document.getElementById("serverFeedback")
const loginFeedback = document.getElementById('feedbackLogin')

registerButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const res = await fetch('/auth/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            username, 
            email,
            password
        })
    })
    const data = await res.json();
    if(data.success) {
        console.log('user registered')
    }
    
    feedBackText.innerText = data.message

})
loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = fetch('/auth/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            username, 
            email,
            password
        })
    })
    const data = await res.json();
    if (data.success) {
        window.location.href = '/app/home'
    }
    else{
        loginFeedback.innerText = data.message
        loginFeedback.style.color = 'red'
    }

})

const changeButton = document.querySelectorAll('.move');
changeButton.forEach(e => {
    e.addEventListener('click', (event) => {
    inner.classList.toggle('rotate')
})
})


