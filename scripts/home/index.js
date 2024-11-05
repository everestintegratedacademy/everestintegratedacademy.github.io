const testimonialsSlider = document.getElementById('testimonials__slider')

if (testimonialsSlider !== null) {
    const splideslider = new Splide('#testimonials__slider', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: 100,
        autoplay: true,
        interval: 3000,
        pagination: false,
        arrows: true
    });
    splideslider.mount();
}