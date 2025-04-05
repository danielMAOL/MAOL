// OBSERVER PARA ANIMACIONES DE SCROLL
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// INICIAR
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-section').forEach(section => {
        section.classList.remove('active');
        observer.observe(section);
    });
});