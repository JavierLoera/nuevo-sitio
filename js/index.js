// movemos el view al top
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// actualizamos e width de la barra de progreso
function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / scrollableHeight) * 100;

    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress}%`;
}

function disableScroll() {
    document.body.classList.add('no-scroll');
}

function enableScroll() {
    document.body.classList.remove('no-scroll');
}

function typeText(index, text, textElement, textContainer) {
    const { gsap } = window
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        gsap.to(textContainer, {
            duration: 0.03,
            onComplete: () => {
                typeText(index + 1, text, textElement, textContainer);
            },
        });
    }
}
function executeTypeText(index, textTarget, textParentContainer) {
    const textContainer = document.querySelector(textParentContainer);
    const textElement = document.querySelector(textTarget);
    const text = textElement.textContent.replace(/^[ \t]+/gm, "");
    textElement.textContent = '';

    typeText(index, text, textElement, textContainer)
}


window.addEventListener("DOMContentLoaded", function () {
    // eliminamos el efecto titl si es mobile
    if (innerWidth <= 768) {
        const elementosTilt = document.querySelectorAll('[data-tilt]');
        for (var i = 0, len = elementosTilt.length; i < len; i++) {
            elementosTilt[i].vanillaTilt.destroy();
        }

    }

    window.addEventListener('scroll', updateProgressBar);
    const { gsap } = window;

    gsap.registerPlugin(ScrollTrigger);

    disableScroll()

    executeTypeText(0, '#text', '.contenedor-top-main-text');

    gsap.to('.img-intro', {
        boxShadow: '0.5px 20px 50px hsla(0, 0%, 0%, 0.50)',
        rotationY: -5,
        duration: 1,
        ease: 'power2.inOut'
    })

    gsap.from('.text-main-bottom', {
        duration: 1,
        opacity: 0,
        x: -200,
        ease: 'Expo.easeOut'
    }, "+=1");

    let borderStyle = "1px solid white"
    gsap.to(".grid-container-main > .header-main", { border: borderStyle, ease: 'slow' }, "-=1")
    gsap.to(".grid-container-main > .main-animacion", { borderLeft: borderStyle, borderBottom: borderStyle, borderRight: borderStyle, ease: 'slow' }, "-=1")

    if (innerWidth > 760) {
        gsap.to(".grid-container-main > .sidebar-main", { borderTop: borderStyle, borderBottom: borderStyle, ease: 'slow' }, "-=1")
    }
    gsap.to(".grid-container-main > .sidebar-main", { borderBottom: borderStyle, ease: 'slow' }, "-=1")


    gsap.to('.layout', {
        border: borderStyle, duration: 1, ease: 'slow',
        onComplete: enableScroll
    }, '-=1');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contenedor_animacion-main",
            // markers: true,
            start: "top top",
            end: "100% top",
            scrub: true,
            yoyo: true
        },
    });

    tl.to(".contenedor-bottom-main-text", { opacity: 0, ease: "steps(5)", duration: 1 });
    tl.to(".contenedor-top-main-text", { y: 200, opacity: 0, ease: 'steps(5)', duration: 1 }, "-=1");
    if (innerWidth <= 465) {
        tl.to(".flipper", { width: 150, height: 150, y: 150, x: 150, duration: 5, ease: "steps(10)" }, "+=1");
    } else if (innerWidth <= 768) {
        tl.to(".flipper", { width: 180, height: 180, y: 200, x: 300, duration: 5, ease: "steps(10)" }, "+=1");
    } else {
        tl.to(".flipper", { width: 250, height: 200, y: 380, x: 550, duration: 5, ease: "steps(10)" }, "+=1");
    }

    tl.to(".text-main-step2", { opacity: 1, ease: 'power2.inOut', duration: 5 }, "-=5");
    tl.from(".text-header-main", { y: -50, ease: 'power2.inOut', duration: 5 }, "-=5");
    tl.to(".text-header-main", { opacity: 1, ease: 'power2.inOut', duration: 5 }, "-=5");
    tl.from(".secondary-img-main", { y: 100, ease: 'power2.inOut', duration: 5 }, "-=5");
    tl.to(".secondary-img-main", { opacity: 1, ease: 'power2.inOut', duration: 5 }, "-=5");
    tl.to(".sidebar-img", { opacity: 1, ease: 'power2.inOut', duration: 5 }, "-=2");
    tl.from(".sidebar-img", { x: -300, rotationY: 100, ease: 'power2.inOut', duration: 5 }, "-=3.5");
    tl.to(".flipper", { rotationY: -180, duration: 5, ease: 'power2.inOut', }, "+=1");
    tl.to(".flipper", { width: "100%", height: "100%", y: 0, x: 0, duration: 5 }, "+=1");

    let elementoAOcultar = [".text-header-main", ".sidebar-img", ".secondary-img-main", ".text-main-step2"];

    elementoAOcultar.forEach(element => {
        tl.to(element, { opacity: 0, duration: 1, ease: 'steps(3)' }, "-=1")
        tl.to(element, { display: 'none', duration: 1 }, '-=.5')
    });

    tl.from(".cv-section-title", { y: -200, opacity: 0, ease: 'power2.inOut', duration: 3 }, "+=5");
    tl.from(".btn-cv", { y: 200, opacity: 0, ease: 'power2.inOut', duration: 3 }, "-=5");

    tl.to(".grid-container-main > .header-main", { borderBottom: 'none', borderRight: 'none', ease: 'power2.inOut' }, "-=6")
    tl.to(".grid-container-main > .main-animacion", { borderRight: 'none', ease: 'power2.inOut' }, "-=6")



    // posicionar el scroll del  elemento back con respecto al body 
    document.addEventListener('scroll', function () {
        const backElement = document.querySelector('.back')
        backElement.scrollTop = document.documentElement.scrollTop - 4500;
    });



    // swiper y card effect
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('tiltChange', function (event) {
            const overlay = card.querySelector('.overlay');
            if (overlay) {
                let overflowPosition = event.detail.tiltY * -35
                overlay.style.transform = `translateY(${overflowPosition}px)`
            }
        });

        card.addEventListener('mouseleave', function () {
            const overlay = card.querySelector('.overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0px)';
            }
        });
    })

    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1,
        allowTouchMove: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
        },
        breakpoints: {
            500: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    //cursor
    let cursor = document.getElementById("cursor");

    if (innerWidth > 760) {
        document
            .getElementsByTagName("body")[0]
            .addEventListener("mousemove", function (e) {
                (cursor.style.left = e.clientX + "px"),
                    (cursor.style.top = e.clientY + "px");
            });
    }



    window.addEventListener('scroll', function () {

        const body = document.querySelector('body')
        const backElement = document.querySelector('.container-back-sections')

        const alturaBackElme = backElement.scrollHeight;


        // body.style.height += alturaBackElme
        console.log(alturaBackElme)
    })
})

