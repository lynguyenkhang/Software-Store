let hiddenMenu = document.querySelector(".Navigation__hiddenMenu")
let MenuIcon = document.querySelector(".Navigation__iconMenu")
let CloseIcon = document.querySelector(".Navigation__iconClose")
let overlay = document.querySelector(".OverlayBackground")
const size = 300

MenuIcon.addEventListener('click', () => {
    hiddenMenu.style.transform = `translateX(-${size}px)`
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'

})

CloseIcon.addEventListener('click', () => {
    hiddenMenu.style.transform = `translateX(0px)`;
    overlay.style.display = 'none';
    document.body.style.overflow = 'scroll'
})


let CartIcon = document.querySelector(".Navigation__iconCart")
let CloseIconCart = document.querySelector(".Navigation__iconCloseCart")
let cartPage = document.querySelector(".Navigation__cartPage")


CloseIconCart.addEventListener('click', () => {
    cartPage.style.transform = `translateX(0px)`;
    overlay.style.display = 'none';
    document.body.style.overflow = 'scroll'

})


const showCartPage = () => {
    cartPage.style.transform = `translateX(-120vw)`
    overlay.style.display = 'block';
    cartPage.querySelector('ul').scrollTop = 2000
    document.body.style.overflow = 'hidden'

}

overlay.addEventListener('click', () => {
    // close hiddenMenu and 
    hiddenMenu.style.transform = `translateX(0px)`;
    overlay.style.display = 'none';
    document.body.style.overflow = 'scroll'

    cartPage.style.transform = `translateX(0px)`;
    overlay.style.display = 'none';
    document.body.style.overflow = 'scroll'

})
