// Menu Mobile!
const menuList = document.querySelector('[data="menuList"]')
const menuItem  = document.querySelector('header .app')
menuItem.addEventListener('click', menuClick)

function menuClick(event) {
    const menuClass = menuList.classList.contains('active')
    if(menuClass) {
        menuList.classList.remove('active')
        menuItem.innerHTML = '<img src="./assets/img/menu-white.svg" alt="menu-hamburguer">'
    } else {
        menuList.classList.add('active')
        menuItem.innerHTML = `<img src="./assets/img/x-circle-white.svg" alt="menu-hamburguer">`
    }

    modeIcon()
}

// Função para mudar icone do menu MOBILE na alteração de tema e click do menu mobile
function modeIcon() {
    const header = document.querySelector('header').classList.contains('light')
    const imgMenu = document.querySelector('header .app img')
    const sourceMenu = imgMenu.getAttribute('src')
    if(header) {
        if(sourceMenu == './assets/img/x-circle-white.svg') {
            imgMenu.setAttribute('src', './assets/img/x-circle.svg')
        }

        if(sourceMenu == './assets/img/menu-white.svg'){
            imgMenu.setAttribute('src', './assets/img/menu.svg')
        }
    } else {
        if(sourceMenu == './assets/img/x-circle.svg') {
            imgMenu.setAttribute('src', './assets/img/x-circle-white.svg')
        }
        if(sourceMenu == './assets/img/menu.svg') {
            imgMenu.setAttribute('src', './assets/img/menu-white.svg')
        }
    }
}

// Modo noturno/claro
const iconChangeTheme = document.querySelector('.change-theme')
iconChangeTheme.addEventListener('click', changeTheme)

function changeTheme() {
    const body = document.querySelector('body').classList.toggle('light')
    const header = document.querySelector('header').classList.toggle('light')
    const footer = document.querySelector('footer').classList.toggle('light')
    const previousSlide = document.querySelector('#previous').classList.toggle('light')
    const nextSlide = document.querySelector('#next').classList.toggle('light')
    console.log(previousSlide)
    this.classList.toggle('light')
    if(this.classList.contains('light')) {
        iconChangeTheme.innerHTML = '<img src="./assets/img/moon.svg" alt="moon-icon">'
        modeIcon()
        return
    }
    iconChangeTheme.innerHTML = '<img src="./assets/img/sun.svg" alt="sun-icon">'
    modeIcon()
}

// slider adicionando informações automaticamente conforme o arquivo slide.js
const sliderContainer = document.querySelector('.slider-container')
slides.forEach(slide => {
    sliderContainer.innerHTML += `
    <div class="img" style="background: ${slide.background};">
        <h1>${slide.tecnologia}</h1>
    </div>`
})

// aplicando funcionalidade no slider
const sliderEl = document.querySelector('.slider')
const previousEl = sliderEl.querySelector('#previous')
const nextEl = sliderEl.querySelector('#next')
let interval = undefined
let timeout = undefined


const arrowsSlider = [previousEl, nextEl]
arrowsSlider.forEach(arrow => arrow.addEventListener('click', handleClickSlider))

function handleClickSlider() {
    const sliderWidth = sliderContainer.offsetWidth
    if(this.id == 'next') {
        sliderContainer.scrollLeft += sliderWidth
        stopScrollSlider()
        return
    }
    sliderContainer.scrollLeft -= sliderWidth
    stopScrollSlider()
}

function stopScrollSlider() {
    clearTimeout(timeout)
    clearInterval(interval)
    interval = undefined
    timeout = setTimeout(() => {
        autoScrollSlider()
    }, 5000)
}

function autoScrollSlider() {
    interval = setInterval(() => {
        const sliderWidth = sliderContainer.offsetWidth
        const numberSlides = sliderContainer.childElementCount
        const selectedSlide = (sliderContainer.scrollLeft/sliderWidth) + 1
        if(numberSlides == Math.round(selectedSlide)) {
            sliderContainer.scrollLeft = 0
            return
        }
        sliderContainer.scrollLeft += sliderWidth
    }, 2000)
}
autoScrollSlider()