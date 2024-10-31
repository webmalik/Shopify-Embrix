document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    let articles = Array.from(document.querySelectorAll('.blog__article'));
    const largeClassName = 'blog__item-large';

    const existingButtonPrev = document.querySelector('.chronicles__swiper-button-prev');
    const existingButtonNext = document.querySelector('.chronicles__swiper-button-next');
    let buttonPrevTemplate = null;
    let buttonNextTemplate = null;

    if (existingButtonPrev && existingButtonNext) {
        buttonPrevTemplate = existingButtonPrev.cloneNode(true);
        buttonNextTemplate = existingButtonNext.cloneNode(true);
    }

    function isElementVisible(element) {
        return element.style.display !== 'none';
    }

    function getVisibleArticles() {
        return articles.filter(isElementVisible);
    }

    function renderArticles() {
        const blogContent = document.querySelector('.blog-page__content');
        blogContent.innerHTML = '';

        let visibleArticles = getVisibleArticles();
        let i = 0;
        let sliderCount = 0;
        let largeCount = 0;
        while (i < visibleArticles.length) {
            const largeWrapper = document.createElement('div');
            largeWrapper.classList.add(largeClassName);

            if (largeCount % 2 !== 0) {
                largeWrapper.classList.add('reverse');
            }

            largeWrapper.appendChild(visibleArticles[i]);
            blogContent.appendChild(largeWrapper);
            i++;
            largeCount++;

            if (i < visibleArticles.length) {
                const swiperOuter = document.createElement('div');
                swiperOuter.classList.add('chronicles__swiper-outer');

                const swiper = document.createElement('div');
                swiper.classList.add('chronicles__swiper', 'swiper');
                swiperOuter.appendChild(swiper);

                const swiperWrapper = document.createElement('div');
                swiperWrapper.classList.add(
                    'chronicles__swiper-wrapper',
                    'swiper-wrapper',
                    'chronicles__items',
                );
                swiper.appendChild(swiperWrapper);

                for (let j = 0; j < 3 && i < visibleArticles.length; j++, i++) {
                    swiperWrapper.appendChild(visibleArticles[i]);
                }

                if (buttonPrevTemplate && buttonNextTemplate) {
                    const buttonPrev = buttonPrevTemplate.cloneNode(true);
                    const buttonNext = buttonNextTemplate.cloneNode(true);

                    const uniquePrevClass = `chronicles__swiper-button-prev-${sliderCount}`;
                    const uniqueNextClass = `chronicles__swiper-button-next-${sliderCount}`;

                    buttonPrev.classList.add(uniquePrevClass);
                    buttonNext.classList.add(uniqueNextClass);

                    swiperOuter.appendChild(buttonPrev);
                    swiperOuter.appendChild(buttonNext);
                }

                blogContent.appendChild(swiperOuter);
                sliderCount++;
            }
        }

        initSliders();
    }

    function initSliders() {
        const sliders = document.querySelectorAll('.chronicles__swiper');
        let benefitsSliders = [];
    
        sliders.forEach((slider, index) => {
            if (slider && window.innerWidth < 993 && !benefitsSliders[index]) {
                benefitsSliders[index] = new Swiper(slider, {
                    spaceBetween: 12,
                    slideToClickedSlide: 1,
                    slidesPerView: 1.1,
                    navigation: {
                        nextEl: `.chronicles__swiper-button-next-${index}`,
                        prevEl: `.chronicles__swiper-button-prev-${index}`,
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
            } else if (slider && window.innerWidth >= 993 && benefitsSliders[index]) {
                benefitsSliders[index].destroy();
                benefitsSliders[index] = null;
            }
        });
    }


    window.addEventListener('resize', initSliders);

    tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            tabs.forEach((tab) => {
                tab.classList.remove('active');
            });
            tab.classList.add('active');
            const filter = this.getAttribute('data-filter');
            articles.forEach((article) => {
                if (article.classList.contains(filter) || filter == 'all') {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
            renderArticles();
        });
    });

    renderArticles();
    window.addEventListener('resize', renderArticles);
});
