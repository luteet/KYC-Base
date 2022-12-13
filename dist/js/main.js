
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('.header__burger--btn, .header__nav, body'),
    burger = document.querySelector('.header__burger--btn'),
    header = document.querySelector('.header'),
    headerNav = header.querySelector('.header__nav');


body.addEventListener('click', function (event) {

    function $(elem) {
      return event.target.closest(elem)
    }

    // =-=-=-=-=-=-=-=-=-=- <Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-
    const headerBurgerBtn = $('.header__burger--btn');
    if (headerBurgerBtn) {
      
      if(!headerBurgerBtn.classList.contains('_changing')) {
        headerBurgerBtn.classList.add('_changing')

        menu.forEach(element => {
          element.classList.toggle('_active')
        })

        setTimeout(() => {
          headerBurgerBtn.classList.remove('_changing')
        },1000)

        if(!headerNav.classList.contains('_active')) {
          headerNav.classList.add('_hiding');
          setTimeout(() => {
            headerNav.classList.remove('_hiding');
            headerBurgerBtn.classList.remove('_changing')
          },500)
        }
      }
        
    }

    // =-=-=-=-=-=-=-=-=-=- </Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-

})

// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize;

function resize() {

  windowSize = window.innerWidth
  html.style.setProperty('--width-scrollbar', window.innerWidth - body.offsetWidth + 'px');
  html.style.setProperty('--height-screen', window.innerHeight + 'px');
  

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=
/*
let slider = new Swiper('.__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    }
}); 
*/
// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
