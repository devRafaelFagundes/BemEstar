const json = document.getElementById('server-data').textContent
const serverData = JSON.parse(json)

const personalInfoContent = document.getElementById('personalInfo-content')

const fetchUserPersonalInfo = async () => {
    const res = await fetch(`/app/${serverData.userId}`, {
        method : 'GET',
        credentials : 'include'
    })
    const data = await res.json()
    return data
}

const renderPersonalInfo = async () => {
    const fetched = await fetchUserPersonalInfo();
    const personalInfo = fetched.message[0];
    personalInfoContent.append(personalInfo.username)
}

renderPersonalInfo();

