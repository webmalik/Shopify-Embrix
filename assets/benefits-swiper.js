document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.benefits__slider');
    let benefitsSlider;

    function initSlider() {
        if (slider && window.innerWidth < 922 && !benefitsSlider) {
            benefitsSlider = new Swiper(slider, {
                grabCursor: true,
                slidesPerView: 1,
                spaceBetween: 20,
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        } else if (slider && window.innerWidth >= 922 && benefitsSlider) {
            benefitsSlider.destroy();
            benefitsSlider = null;
        }
    }

    initSlider();
    window.addEventListener('resize', initSlider);
});
