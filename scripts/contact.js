document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Add animation to form inputs
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {scale: 1.05, duration: 0.3, ease: 'power2.out'});
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {scale: 1, duration: 0.3, ease: 'power2.out'});
        });
    });

    // Form submission animation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        gsap.to(form, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            onComplete: () => {
                form.submit();
            }
        });
    });
});

// Update copyright year
const date = new Date().getFullYear();
const copyrightText = document.getElementById("copytext");
copyrightText.textContent = `Copyright © ${date} Everest Integrated Academy. All rights reserved.`;