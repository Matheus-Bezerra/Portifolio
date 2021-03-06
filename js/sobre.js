// Menu Mobile!
const menuList = document.querySelector('[data="menuList"]');
const menuItem = document.querySelector('header .app');
menuItem.addEventListener('click', menuClick);

function menuClick(event) {
  const menuClass = menuList.classList.contains('active');
  if (menuClass) {
    menuList.classList.remove('active');
    menuItem.innerHTML =
      '<img src="./assets/img/menu-white.svg" alt="menu-hamburguer">';
  } else {
    menuList.classList.add('active');
    menuItem.innerHTML = `<img src="./assets/img/x-circle-white.svg" alt="menu-hamburguer">`;
  }

  modeIcon();
}

// Função para mudar icone do menu MOBILE na alteração de tema e click do menu mobile
function modeIcon() {
  const header = document.querySelector('header').classList.contains('light');
  const imgMenu = document.querySelector('header .app img');
  const sourceMenu = imgMenu.getAttribute('src');
  if (header) {
    if (sourceMenu == './assets/img/x-circle-white.svg') {
      imgMenu.setAttribute('src', './assets/img/x-circle.svg');
    }

    if (sourceMenu == './assets/img/menu-white.svg') {
      imgMenu.setAttribute('src', './assets/img/menu.svg');
    }
  } else {
    if (sourceMenu == './assets/img/x-circle.svg') {
      imgMenu.setAttribute('src', './assets/img/x-circle-white.svg');
    }
    if (sourceMenu == './assets/img/menu.svg') {
      imgMenu.setAttribute('src', './assets/img/menu-white.svg');
    }
  }
}

// Modo noturno/claro
const iconChangeTheme = document.querySelector('.change-theme');
iconChangeTheme.addEventListener('click', changeTheme);

function changeTheme() {
  const body = document.querySelector('body').classList.toggle('light');
  const header = document.querySelector('header').classList.toggle('light');
  const footer = document.querySelector('footer').classList.toggle('light');
  const previousSlide = document
    .querySelector('#previous')
    .classList.toggle('light');
  const nextSlide = document.querySelector('#next').classList.toggle('light');
  console.log(previousSlide);
  this.classList.toggle('light');
  if (this.classList.contains('light')) {
    iconChangeTheme.innerHTML =
      '<img src="./assets/img/moon.svg" alt="moon-icon">';
    modeIcon();
    return;
  }
  iconChangeTheme.innerHTML = '<img src="./assets/img/sun.svg" alt="sun-icon">';
  modeIcon();
}
// Slide
const swiper = new Swiper('.mySwiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

// slider adicionando informações automaticamente conforme o arquivo slide.js
const sliderContainer = document.querySelector('.swiper-wrapper');
slides.forEach(({ image, technology }) => {
  sliderContainer.innerHTML += `
  <div class="swiper-slide">
    <img src=${image} alt=${technology}/>
  </div>
  `;
});
