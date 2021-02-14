//slider ----------------------------------------------------------
var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
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
    for(i=0; i < sectionsArray.length; i++){
        let sectionTop= sectionsArray[i].getBoundingClientRect().top ;
        let sectionBottom = sectionsArray[i].getBoundingClientRect().bottom ;
        


        if(sectionTop <= 50){
            
            hiddenNavLink[i].classList.add('active');
        }
        if((sectionBottom <= 0) || (sectionTop > 50)) {
            hiddenNavLink[i].classList.remove('active');
        }


    }

    
});

