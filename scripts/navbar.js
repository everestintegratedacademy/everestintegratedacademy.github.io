navActivator();

function navActivator() {
    const navContainer = document.getElementById("navbar");
    const navLinks = navContainer.querySelectorAll(".navlink");

    navLinks.forEach((link) => {
        if (link.href === window.location.href) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function redirectHome() {
    window.location = "./index.html";
}

// Handle navbar background on scroll
window.addEventListener("scroll", () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Improve contrast for navbar items
function updateNavItemsContrast() {
    const nav = document.querySelector('nav');
    const navItems = nav.querySelectorAll('a');
    const isScrolled = nav.classList.contains('scrolled');

    navItems.forEach(item => {
        if (isScrolled) {
            item.style.color = 'var(--black)';
        } else {
            item.style.color = 'var(--white)';
        }
    });
}

window.addEventListener("scroll", updateNavItemsContrast);
updateNavItemsContrast(); // Call once on page load