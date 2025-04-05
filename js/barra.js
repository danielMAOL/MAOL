document.addEventListener('DOMContentLoaded', function() {
    const wavesContainer = document.getElementById('waves');
    const maolText = document.getElementById('maol');
    
    // Configuración
    const config = {
        colors: ['#4cc9f0', '#f72585', '#7209b7', '#3a0ca3', '#4361ee'],
        totalWaves: 12,
        delayBetween: 150,
        minSize: 50,
        maxSize: Math.min(window.innerWidth, window.innerHeight) * 0.8
    };
    
    // Crear olas
    function createWaves() {
        const sizeStep = (config.maxSize - config.minSize) / config.totalWaves;
        
        for (let i = 0; i < config.totalWaves; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'wave';
                
                // Configurar tamaño y color
                const size = config.minSize + (i * sizeStep);
                wave.style.width = `${size}px`;
                wave.style.height = `${size}px`;
                wave.style.borderColor = config.colors[i % config.colors.length];
                
                wavesContainer.appendChild(wave);
                
                // Eliminar después de animarse
                setTimeout(() => wave.remove(), 2000);
            }, i * config.delayBetween);
        }
        
        // Mostrar texto al final
        setTimeout(() => {
            maolText.classList.add('visible');
        }, config.totalWaves * config.delayBetween + 500);
    }
    
    // Iniciar animación
    createWaves();
    
    // Reiniciar al hacer clic
    document.addEventListener('click', () => {
        wavesContainer.innerHTML = '';
        maolText.classList.remove('visible');
        createWaves();
    });
});