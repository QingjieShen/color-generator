const color = document.getElementById('color-picker')
const mode = document.getElementById('mode')
const colorsContainer = document.querySelector('.colors')
const getBtn = document.getElementById('getBtn')
const copyText = document.getElementById('copy')

const baseUrl = 'https://www.thecolorapi.com/scheme'

getBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const colorId = color.value
    const modeId = mode.value
    // console.log(colorId.slice(1), modeId)
    const finalUrl = `${baseUrl}?hex=${colorId.slice(1)}&mode=${modeId}`
    async function getColorScheme() {
        const res = await fetch(finalUrl, {method: "GET"})
        const data = await res.json()
        // console.log(data)
        setColor(data.colors)
    }

    getColorScheme()
})

function setColor(colors) {
    const colorsEle = []
    colors.map(color => {
        colorsEle.push(`
            <div data-hex=${color.hex.value} class="color" style="background-color:${color.hex.value};">
                <p class="hex-text">${color.hex.value}</p>
            </div>
        `)
    })
    colorsContainer.innerHTML = colorsEle.join('')
    copyText.textContent = "Click color to copy hex code"
}

colorsContainer.addEventListener('click', (e) => {
    // console.log(e.target)
    if (e.target.classList.contains('color')) {
        navigator.clipboard.writeText(e.target.dataset.hex)
        copyText.textContent = `${e.target.dataset.hex} copied`
    }
    if (e.target.classList.contains('hex-text')) {
        navigator.clipboard.writeText(e.target.parentElement.dataset.hex)
        copyText.textContent = `${e.target.parentElement.dataset.hex} copied`
    }
})