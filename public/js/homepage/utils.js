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