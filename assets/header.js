document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const close = document.querySelector('.header__close');
    const menu = document.querySelector('.header__menu');

    burger.addEventListener('click', () => {
        menu.classList.add('active');
    });
    close.addEventListener('click', () => {
        menu.classList.remove('active');
        menuItemOuters.forEach((outer) => {
            outer.classList.remove('open');
        });
    });
});

const dropDownMenuItems = document.querySelectorAll('.menu__item.dropdown');
if (window.innerWidth > 982) {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdownItem) => {
        dropdownItem.addEventListener('mouseleave', () => {
            // document.querySelector('.wrapper').classList.remove('no-scroll')
            const dropdownMenuWrappers = document.querySelectorAll('.header__dropdown-menu__outer');
            dropdownMenuWrappers.forEach((dropdownMenuWrapper) =>
                dropdownMenuWrapper.classList.add('hidden'),
            );
        });
    });
    dropDownMenuItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            // document.querySelector('.wrapper').classList.add('no-scroll')
            const dropdownMenuWrappers = document.querySelectorAll('.header__dropdown-menu__outer');
            dropdownMenuWrappers.forEach((dropdownMenuWrapper) =>
                dropdownMenuWrapper.classList.remove('hidden'),
            );
        });
    });
}

const menuItemOuters = document.querySelectorAll('.header__dropdown-menu__outer');
dropDownMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
        const currentOuter = item.querySelector('.header__dropdown-menu__outer');
        menuItemOuters.forEach((outer) => {
            outer.classList.remove('open');
        });
        currentOuter.classList.toggle('open');
    });
});
