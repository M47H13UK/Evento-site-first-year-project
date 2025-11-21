document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Check if the current page is index.html, /, or aboutUs.html
    const path = window.location.pathname;
    console.log("Current path:", path);

    if (path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/aboutUs.html') || path.endsWith('/contact.html')) {
        console.log("Adding scroll event listener for navbar behavior");

        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) {
                console.warn('Navbar element not found.');
                return;
            }

            console.log("Scroll event triggered");
            const scrollPosition = window.scrollY || window.pageYOffset;
            const viewportHeight = window.innerHeight;
            console.log("Scroll position:", scrollPosition);
            console.log("Viewport height:", viewportHeight);

            if (scrollPosition >= viewportHeight) {
                console.log("Adding navbar-scrolled class");
                navbar.classList.add('navbar-scrolled');
            } else {
                console.log("Removing navbar-scrolled class");
                navbar.classList.remove('navbar-scrolled');
            }

            if (scrollPosition === 0) {
                console.log("Adding navbar-top class");
                navbar.classList.add('navbar-top');
            } else {
                console.log("Removing navbar-top class");
                navbar.classList.remove('navbar-top');
            }
        });
    }

    // About Us page specific scroll behavior
    if (path.endsWith('/aboutUs.html')) {
        console.log("Setting up scroll behavior for aboutUs.html");
        const scrollToSection = document.querySelector('.scroll-down');
        if (scrollToSection) {
            scrollToSection.addEventListener('click', function() {
                const aboutUsIntro = document.querySelector('#our-history');
                if (aboutUsIntro) {
                    console.log("Scrolling to our-history section");
                    aboutUsIntro.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn("our-history section not found");
                }
            });
        } else {
            console.warn("scroll-down element not found on aboutUs.html");
        }
    }

    if (path.endsWith('/contact.html')) {
        console.log("Setting up scroll behavior for contact.html");
        const scrollToContact = document.querySelector('.scroll-down');
        if (scrollToContact) {
            scrollToContact.addEventListener('click', function() {
                const contactInfo = document.querySelector('#contact-info');
                if (contactInfo) {
                    console.log("Scrolling to contact-info section");
                    contactInfo.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn("contact-info section not found");
                }
            });
        } else {
            console.warn("scroll-down element not found on contact.html");
        }
    }

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('navDrawer');

    hamburger.addEventListener('click', function() {
        navDrawer.classList.toggle('open');
    });

    // Close drawer when clicking outside of it
    document.addEventListener('click', function(event) {
        if (navDrawer.classList.contains('open') && !navDrawer.contains(event.target) && !hamburger.contains(event.target)) {
            navDrawer.classList.remove('open');
        }
    });
});
