document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.chronicles__swiper');
    let benefitsSlider;

    function initSlider() {
        if (slider && window.innerWidth < 993 && !benefitsSlider) {
            benefitsSlider = new Swiper(slider, {
                spaceBetween: 12,
                slideToClickedSlide: true,
                slidesPerView: 1.1,
                navigation: {
                    nextEl: '.chronicles__swiper-button-next',
                    prevEl: '.chronicles__swiper-button-prev',
                },
                breakpoints: {
                    480: {
                        slidesPerView: 1.1,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                },
            });
        } else if (slider && window.innerWidth >= 992 && benefitsSlider) {
            benefitsSlider.destroy();
            benefitsSlider = null;
        }
    }

    initSlider();
    window.addEventListener('resize', initSlider);
});
