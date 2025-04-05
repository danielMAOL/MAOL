document.addEventListener('DOMContentLoaded', function() {
    // 1. Configuración
    const config = {
        startYear: 2025,
        endYear: 2050,
        speeds: {
            slow: 400,   // 2025-2030
            fast: 100,   // 2031-2048
            final: 800   // 2049-2050
        },
        finalText: "Vemos hacia el Futuro",
        pauseDuration: 1000
    };

    // 2. Crear elementos
    const wrapper = document.createElement('div');
    wrapper.className = 'countdown-display-wrapper';
    
    const counter = document.createElement('span');
    counter.className = 'year-counter';
    counter.textContent = config.startYear;
    
    const finalText = document.createElement('span');
    finalText.className = 'final-phrase';
    finalText.textContent = config.finalText;
    
    wrapper.appendChild(counter);
    wrapper.appendChild(finalText);
    
    // 3. Insertar en DOM
    const visionContainer = document.querySelector('.vision-container');
    const title = document.querySelector('.vision-title');
    const textElements = document.querySelectorAll('.vision-text');
    
    if (visionContainer && title && textElements.length > 0) {
        visionContainer.insertBefore(wrapper, textElements[0].parentElement || textElements[0]);
    } else {
        title.insertAdjacentElement('afterend', wrapper);
    }

    // 4. Animación del contador
    let currentYear = config.startYear;
    let animationStarted = false;
    
    const animateCounter = () => {
        if (animationStarted) return;
        animationStarted = true;
        
        const counterAnimation = () => {
            currentYear++;
            counter.textContent = currentYear;
            
            let speed;
            if (currentYear <= 2030) speed = config.speeds.slow;
            else if (currentYear <= 2048) speed = config.speeds.fast;
            else if (currentYear < config.endYear) speed = config.speeds.final;
            else if (currentYear === config.endYear) {
                setTimeout(() => {
                    wrapper.classList.add('show-final');
                }, config.pauseDuration);
                return;
            }
            
            setTimeout(counterAnimation, speed);
        };
        
        setTimeout(counterAnimation, 1000);
    };
    
    // 5. Observer para iniciar animación cuando la sección sea visible
    const visionSection = document.getElementById('vision-section');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (visionSection) {
        observer.observe(visionSection);
    }
});