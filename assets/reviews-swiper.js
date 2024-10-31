document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.reviews__swiper');
    let reviewsSlider;

    function initSlider() {
        reviewsSlider = new Swiper(slider, {
            effect: 'cards',
            grabCursor: true,
            initialSlide: 2,
            centeredSlides: true,
            navigation: {
                nextEl: '.reviews__swiper-button-prev',
                prevEl: '.reviews__swiper-button-next',
            },
        });
    }

    initSlider();
});
