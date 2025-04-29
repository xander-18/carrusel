import { useState, useEffect, useRef } from 'react';

/**
 * Componente para reproducir música de fondo después de la interacción del usuario
 * @param {Object} props
 * @param {string} props.src - URL del archivo de audio
 * @param {boolean} props.loop - Si el audio debe reproducirse en bucle
 * @param {number} props.volume - Volumen del audio (0-1)
 * @returns {JSX.Element}
 */
const BackgroundMusic = ({ src, loop = true, volume = 0.5 }) => {
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Función para reproducir música al hacer clic
    const playMusicOnInteraction = () => {
      if (!musicPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setMusicPlaying(true);
            // Una vez reproducido, removemos el event listener
            document.removeEventListener('click', playMusicOnInteraction);
          })
          .catch(error => {
            console.error("Error al reproducir el audio:", error);
          });
      }
    };

    // Añadimos el event listener para el clic
    document.addEventListener('click', playMusicOnInteraction);

    // Limpieza del efecto
    return () => {
      document.removeEventListener('click', playMusicOnInteraction);
    };
  }, [musicPlaying]);

  // Configurar volumen cuando el componente se monte o el volumen cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <audio
      ref={audioRef}
      id="background-music"
      src={src}
      loop={loop}
      preload="auto"
    />
  );
};

export default BackgroundMusic;