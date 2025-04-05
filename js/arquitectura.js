document.addEventListener('DOMContentLoaded', function() {
    // Efecto de carga suave
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Puedes añadir más interactividad aquí si es necesario
    console.log('Página de arquitectura cargada');
    
    // Ejemplo de cómo podrías cambiar variables CSS desde JS
    function adjustDesignVariables() {
        // Esto es solo un ejemplo de cómo podrías modificar las variables
        document.documentElement.style.setProperty('--font-size-normal', '1.2rem');
    }
    
    // Llamar a esta función cuando necesites ajustar algo dinámicamente
    // adjustDesignVariables();
});