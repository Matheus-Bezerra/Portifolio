// Active item no Portifólio!
const opcoes = document.querySelectorAll('.options li')

opcoes.forEach(option => {
    option.addEventListener('click', optionClick)
})

function optionClick() {
    const selectedAttribute = this.getAttribute('data-option')
    opcoes.forEach(option => {
        const optionAttributes = option.getAttribute('data-option')
        if(selectedAttribute === optionAttributes) {
            option.classList.add('active')
            createCards()
            return
        }

        option.classList.remove('active')
    })
}



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
    console.log(sourceMenu)    
    if(header) {
        if(sourceMenu == './assets/img/x-circle-white.svg') {
            imgMenu.setAttribute('src', './assets/img/x-circle.svg')
        }

        if(sourceMenu == './assets/img/menu-white.svg'){
            console.log('oi')
            imgMenu.setAttribute('src', './assets/img/menu.svg')
        }
    } else {
        if(sourceMenu == './assets/img/x-circle.svg') {
            console.log('circulo branco')
            imgMenu.setAttribute('src', './assets/img/x-circle-white.svg')
            return
        }
        if(sourceMenu == './assets/img/menu.svg') {
            console.log('menuH branco')
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
    const btn = document.querySelector('.intro button').classList.toggle('light')
    const intro = document.querySelector('.intro').classList.toggle('light')
    const cards = document.querySelectorAll('.portfolio-projetos .portfolio-projetosImg .main-img').forEach(card => card.classList.toggle('light'))
    const footer = document.querySelector('footer').classList.toggle('light')
    this.classList.toggle('light')
    if(this.classList.contains('light')) {
        iconChangeTheme.innerHTML = '<img src="./assets/img/moon.svg" alt="moon-icon">'
        modeIcon()
        return
    }
    iconChangeTheme.innerHTML = '<img src="./assets/img/sun.svg" alt="sun-icon">'
    modeIcon()
}



function createCards() {
    const sectionCard = document.querySelector('.portfolio-projetos')
    sectionCard.innerHTML = ''
    let html = ''
    const options = document.querySelector('[data-option].active').getAttribute('data-option')
    projects.forEach((project, index) => {
        switch (options) {
            case 'todos':
                html += `
                <a href="${project.link}" target="_blank">
                <div class="portfolio-projetosImg">
                    <img src="${project.imagem}" alt="projeto-${index}">
                        <div class="main-img">${project.nome}</div>
                </div>
                </a>
                `
            break;
            case 'sites':
                if(project.tipo == 'sites') {
                    html += `<a href="${project.link}" target="_blank">
                    <div class="portfolio-projetosImg">
                        <img src="${project.imagem}" alt="projeto-${index}">
                            <div class="main-img">${project.nome}</div>
                    </div>
                    </a>`
                }
            break;
            case 'landingPages':
                if(project.tipo == 'landingPages') {
                    html += `<a href="${project.link}" target="_blank">
                    <div class="portfolio-projetosImg">
                        <img src="${project.imagem}" alt="projeto-${index}">
                            <div class="main-img">${project.nome}</div>
                    </div>
                    </a>`
                }
            break;
            case 'paginasInterativas':
                if(project.tipo == 'paginasInterativas') {
                    html += `<a href="${project.link}" target="_blank">
                    <div class="portfolio-projetosImg">
                        <img src="${project.imagem}" alt="projeto-${index}">
                            <div class="main-img">${project.nome}</div>
                    </div>
                    </a>`
                }
            default:
                break;
        }
        
    })
    sectionCard.innerHTML += html
    hoverCards()
    opcoes.forEach(option => {
        const projectCards = document.querySelectorAll('.portfolio-projetos a')
        const optionActive = option.classList.contains('active')
    })
}

createCards()

// Hover in cards
function hoverCards() {
    const cards = document.querySelectorAll('.portfolio-projetos .portfolio-projetosImg')
    console.log(cards)
    cards.forEach(card => {
        card.addEventListener('mouseover', handleHoverCards)
        card.addEventListener('mouseout', outHoverCards)
    })
    
    function handleHoverCards() {
        this.classList.add('active')
    }
    
    function outHoverCards() {
        this.classList.remove('active')
    }
}