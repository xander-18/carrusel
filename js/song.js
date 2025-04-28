document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('background-music');
    let musicPlaying = false;
    
    // Función para reproducir música al hacer clic
    function playMusicOnInteraction() {
        if (!musicPlaying) {
            backgroundMusic.play()
            .then(() => {
                musicPlaying = true;
                // Una vez reproducido, removemos el event listener
                document.removeEventListener('click', playMusicOnInteraction);
            })
            .catch(error => {
                console.error("Error al reproducir el audio:", error);
            });
        }
    }
    
    // Añadimos el event listener para el clic
    document.addEventListener('click', playMusicOnInteraction);
});