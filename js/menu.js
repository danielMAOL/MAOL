document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Función para alternar el menú móvil
    function toggleMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Bloquear/desbloquear el scroll del body
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Evento click para el icono hamburguesa
    hamburger.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en un enlace (opcional)
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Efecto activo para la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'portada.html';
    const menuLinks = document.querySelectorAll('.menu-link, .mobile-menu-link');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
    
});