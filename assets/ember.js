document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    function animationLogo() {
        gsap.fromTo(
            '.ember__logo-section',
            {
                y: -800,
            },
            {
                y: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.ember__logo-section',
                    start: 'top top',
                    end: '+=500',
                    scrub: 1,
                },
            },
        );
    }

    function animationDesctop() {
        gsap.fromTo(
            '.ember__inner',
            {
                maxWidth: 10,
            },
            {
                maxWidth: 1000,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.ember__inner',
                    start: '-=500 top',
                    // markers: true,
                    end: '+=300',
                    scrub: 2,
                },
                onUpdate: function () {
                    const emberInner = document.querySelector('.ember__inner');
                    const emberDescription = document.querySelector('.ember__description');
                    if (emberInner && emberDescription) {
                        const width = emberInner.getBoundingClientRect().width;
                        emberDescription.style.opacity = width > 20 ? 1 : 0;
                    }
                },
            },
        );
    }
    function animationMobile() {
        gsap.fromTo(
            '.ember__inner',
            {
                maxHeight: 10,
            },
            {
                maxHeight: 1000,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.ember__inner',
                    start: '-=500 top',
                    // markers: true,
                    end: '+=300',
                    scrub: 2,
                },
                onUpdate: function () {
                    const emberInner = document.querySelector('.ember__inner');
                    const emberDescription = document.querySelector('.ember__description');
                    if (emberInner && emberDescription) {
                        const height = emberInner.getBoundingClientRect().height;
                        emberDescription.style.opacity = height > 20 ? 1 : 0;
                    }
                },
            },
        );
    }

    animationLogo();

    if (window.innerWidth < 992) {
        animationMobile();
    } else {
        animationDesctop();
    }

    const emberDescription = document.querySelector('.ember__description');
    emberDescription.style.opacity = 0;
});
