// Seção dos Cards, inserindo via Javascript
const projects = [
    {
        nome: 'deluxe Barber Shop',
        imagem: './assets/img/port-project1.png',
        link: 'https://matheus-bezerra.github.io/deluxeBarberShop/',
        tipo: 'sites',
    },
    {
        nome: 'Instagramer',
        imagem: './assets/img/port-project2.png',
        link: 'https://matheus-bezerra.github.io/Instagramer/',
        tipo: 'landingPages',
    },
    {
        nome: 'XboxX-S - Slider',
        imagem: './assets/img/port-project3.png',
        link: 'https://github.com/Matheus-Bezerra/XboxX-S',
        tipo: 'landingPages',
    },
    {
        nome: 'Cavaleiros do Zodíaco',
        imagem: './assets/img/port-project4.png',
        link: 'https://cocky-benz-1a912b.netlify.app/',
        tipo: 'paginasInterativas',
    },
    {
        nome: 'BookMark<i data-feather="bookmark"></i>',
        imagem: './assets/img/port-project5.png',
        link: 'https://github.com/Matheus-Bezerra/BookMark',
        tipo: 'sites',
    },
    {
        nome: 'batman<i data-feather="gitlab"></i>',
        imagem: './assets/img/port-project6.png',
        link: 'https://github.com/Matheus-Bezerra/Batman-Template',
        tipo: 'landingPages',
    },
    {
        nome: 'Fylo - dark',
        imagem: './assets/img/port-project7.png',
        link: 'https://github.com/Matheus-Bezerra/Fylo---Tema-escuro',
        tipo: 'sites',
    },
    {
        nome: 'Carros',
        imagem: './assets/img/port-project8.png',
        link: 'https://github.com/Matheus-Bezerra/ProjetoJs-carros',
        tipo: 'paginasInterativas',
    },
    {
        nome: 'Desafios Js',
        imagem: './assets/img/port-project9.png',
        link: 'https://github.com/Matheus-Bezerra/Desafios-Javascript',
        tipo: 'paginasInterativas', 
    }   
]


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
    
    if(header) {
        if(sourceMenu == './assets/img/x-circle-white.svg') {
            imgMenu.setAttribute('src', './assets/img/x-circle.svg')
        }

        if(sourceMenu == './assets/img/menu-white.svg'){
            console.log('oi')
            imgMenu.setAttribute('src', './assets/img/menu.svg')
            return
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
        return
    }
    iconChangeTheme.innerHTML = '<img src="./assets/img/sun.svg" alt="sun-icon">'
    modeIcon()
}



function createCards() {
    const sectionCard = document.querySelector('.portfolio-projetos')
    projects.forEach((project, index) => {
        sectionCard.innerHTML += `
        <a href="${project.link}" target="_blank">
            <div class="portfolio-projetosImg">
                <img src="${project.imagem}" alt="projeto-${index}">
                    <div class="main-img">${project.nome}</div>
            </div>
        </a>
        `
    })
    opcoes.forEach(option => {
        const projectCards = document.querySelectorAll('.portfolio-projetos a')
        const optionActive = option.classList.contains('active')
    })
}

createCards()

// Hover in cards
const cards = document.querySelectorAll('.portfolio-projetos .portfolio-projetosImg')
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