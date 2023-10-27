const btnClose = $(".header__close-btn")
const btnOpen = $(".header__menu-mob-btn")
const mobMenu = $(".header__box-mob-menu")
const body = $("body")

btnOpen.on( "click", function() {
    mobMenu.addClass("header__box-mob-menu--open")
    body.addClass("overflow-y-off")
})

btnClose.on( "click", function() {
    mobMenu.removeClass("header__box-mob-menu--open")
    body.removeClass("overflow-y-off")
})

//mask-phone________________________________
$('.art-stranger').mask('+7(999)999-99-99',{autoclear: false})