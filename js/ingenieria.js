// ingenieria.js
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos que deben animarse
    const elementosAnimables = document.querySelectorAll(
        '.titulo, ' +
        '.presentacion-titulo, ' +
        '.presentacion-descripcion, ' +
        '.maol-titulo, ' +
        '.maol-descripcion, ' +
        '.servicios-titulo-celda, ' +
        '.servicios-texto-celda, ' +
        '.bim-titulo, ' +
        '.bim-descripcion, ' +
        '.ra-titulo, ' +
        '.ra-descripcion'
    );

    // Opciones para el IntersectionObserver
    const opcionesObserver = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento visible
    };

    // Callback para el IntersectionObserver
    const callbackObserver = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Opcional: Dejar de observar después de que se anima
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el observer
    const observer = new IntersectionObserver(callbackObserver, opcionesObserver);

    // Observar cada elemento animable
    elementosAnimables.forEach(elemento => {
        observer.observe(elemento);
    });
});