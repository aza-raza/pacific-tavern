//slider ----------------------------------------------------------
var mySwiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
    },
    effect: 'fade',  
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


// Burger-menu ------------------------------------------------------
let burgerMenu = document.querySelector(".burger-menu");
let mobileNav = document.querySelector(".mobile-nav");
let links = document.querySelectorAll('.link');

function toggleBurger(){
    burgerMenu.classList.toggle('is-active');
    mobileNav.classList.toggle('is-active');
}

burgerMenu.addEventListener('click', toggleBurger);

links.forEach(
    function(links){
        links.addEventListener("click", toggleBurger)
    }
);

// hidden-nav -------------------------------------------------------
let windowHeight = window.innerHeight;
let hiddenNav = document.querySelector('.hidden-nav');

window.addEventListener('scroll', function (){
    let scrolled = window.scrollY;

    //hidden-nav
    if (scrolled > windowHeight) {
        hiddenNav.classList.add('reveal');
    }
    if (scrolled < 800) {
        hiddenNav.classList.remove('reveal');
    }
});

// scrollspy --------------------------------------------------------
let sections = document.querySelectorAll('section');
let sectionsArray = Array.from(sections); 
let hiddenNavLink =  Array.from(document.querySelectorAll('.hidden-nav a'));

window.addEventListener('scroll', function (){
    sectionsArray.forEach((v,i)=> {
        let rect = v.getBoundingClientRect().y
        if(rect < window.innerHeight-600){
            hiddenNavLink.forEach(v=> v.classList.remove('active'))
            hiddenNavLink[i].classList.add('active')
        }
    })
}); 
