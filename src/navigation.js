document.addEventListener('DOMContentLoaded', () => {
    // Normalize the current path to ensure it's consistent.
    // e.g. /jiu-jitsu/index.html -> /jiu-jitsu/
    const currentPage = window.location.pathname.replace(/index\.html$/, '');

    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        // Special case for the Home link
        if (linkPath === '/' || linkPath === '/index.html') {
            if (currentPage === '/' || currentPage === '/index.html') {
                link.classList.add('active');
            }
        } else {
            // For other links, check if the current page path starts with the link's path
            if (currentPage.startsWith(linkPath)) {
                link.classList.add('active');
            }
        }
    });
});
