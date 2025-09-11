const navbar = document.querySelector('.navbar')
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav-links')
const navLinksLi = document.querySelectorAll('.nav-links li')




const swiper = new Swiper('.swiper', {
    loop: true,

     // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


})

window.onload = () => {
    for (let i of document.querySelectorAll(".gallery img")) {
      i.onclick = () => i.classList.toggle("full");
    }
  };


window.addEventListener('scroll', () => {
    if(this.scrollY >= 100) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
})

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    hamburger.classList.toggle('active')
})

navLinksLi.forEach(li => li.addEventListener('click', ()=> {
    navLinksLi.forEach(li => li.classList.remove('active'))
    li.classList.add('active')

    hamburger.classList.remove('active')
    navLinks.classList.remove('active')

}))


// Typed js
var options = {
    strings: [
        'Learn Japanese', 
        'Open The doors'
    ],
    typeSpeed: 40,
    loop: true,
    loopCount: Infinity,
    typeSpeed: 40,
    backDelay: 2000,
  };
  
var typed = new Typed('#hero-titles', options);



// AOS
AOS.init();