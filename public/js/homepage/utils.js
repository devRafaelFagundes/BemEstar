let blurScreen = null;
export function genBlurElement() {
     if (!blurScreen) {
        blurScreen = document.createElement('div')
        blurScreen.style.position = 'fixed'
        blurScreen.style.top = 0
        blurScreen.style.left = 0
        blurScreen.style.width = '100vw'
        blurScreen.style.height = '100vh'
        blurScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
        blurScreen.style.zIndex = 1
        blurScreen.id = 'blur-screen'
        document.body.append(blurScreen)
    }
}
export function removeBlurScreen() {
    if (blurScreen && document.body.contains(blurScreen)) {
        document.body.removeChild(blurScreen)
        blurScreen = null
    }
}

// create function to show erros on the user screen
export async function showOnScreen(error, success) {
    const errorElement = document.createElement('p')
    errorElement.innerText = error;
    document.body.appendChild(errorElement);
    if(success) {
        errorElement.style.color = 'red'
    }
    else {
        errorElement.style.color = 'green'
    }
    errorElement.style.backgroundColor = 'white'
    errorElement.style.padding = '5px'

    errorElement.style.position = 'absolute'
    errorElement.style.top =  '25%';
    errorElement.style.left = '50%';
    errorElement.style.transform = 'translate(-50%, -50%)'
    errorElement.style.transition = 'all .3s'
    errorElement.style.display = 'block'
    errorElement.style.opacity = '1';
    await new Promise(resolve => setTimeout(resolve, 500));
    errorElement.style.opacity = '0'
    await new Promise(resolve => setTimeout(resolve, 300));
    errorElement.remove();
}