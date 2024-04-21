const color = document.getElementById('color-picker')
const mode = document.getElementById('mode')
const colorsContainer = document.querySelector('.colors')
const getBtn = document.getElementById('getBtn')

const baseUrl = 'https://www.thecolorapi.com/scheme'

getBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const colorId = color.value
    const modeId = mode.value
    console.log(colorId.slice(1), modeId)
    const finalUrl = `${baseUrl}?hex=${colorId.slice(1)}&mode=${modeId}`
    async function getColorScheme() {
        const res = await fetch(finalUrl, {method: "GET"})
        const data = await res.json()
        console.log(data)
        setColor(data.colors)
    }

    getColorScheme()
})

function setColor(colors) {
    const colorsEle = []
    colors.map(color => {
        colorsEle.push(`
            <div class="color" style="background-color:${color.hex.value};">
                <p class="hex-text">${color.hex.value}</p>
            </div>
        `)
    })
    colorsContainer.innerHTML = colorsEle.join('')
}