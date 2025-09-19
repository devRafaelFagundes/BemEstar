const url = window.location.pathname;
const infoArray = url.split('/')
const userId = infoArray[2];
const fetchUserInfo = async (id) => {
    const data = await fetch(`/clients/${id}`, {
        credentials: 'include'
    })
    const res = await data.json();
    console.log(res)
    if(res.success) {
        alert('informações puxadas com sucesso')
    }
    else {
        alert('deu ruim ao puxar as informações')
    }
} 

fetchUserInfo(userId)