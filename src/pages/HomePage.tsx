import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard.tsx';
import '../styles/App.css'; // Asegúrate de que este CSS se cargue para los estilos del carrusel

interface MusicItem {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
}

function HomePage() {
  const [featuredMusic, setFeaturedMusic] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Estado para controlar el slide actual del carrusel

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = 'http://localhost:3001/albums'; // El endpoint para tus álbumes

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
          const musicCardsData: MusicItem[] = data.map((album: any) => ({
            id: album.id,
            title: album.title,
            artist: album.artist,
            albumArt: album.albumArt,
          }));
          setFeaturedMusic(musicCardsData);
        } else {
          setFeaturedMusic([]);
          console.warn('No se encontraron álbumes en tu API local.');
        }

      } catch (e: any) {
        console.error("Error al cargar datos:", e);
        setError(`Fallo al cargar la música desde tu API local: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  // Lógica para el carrusel
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredMusic.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + featuredMusic.length) % featuredMusic.length);
  };

  // Efecto para el auto-avance del carrusel (opcional)
  useEffect(() => {
    if (featuredMusic.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Cambia de slide cada 5 segundos
      return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }
  }, [featuredMusic, currentSlide]); // Dependencias para reiniciar el intervalo si la música o el slide cambian

  if (loading) {
    return (
      <div className="page-content home-page">
        <h1>Cargando Música...</h1>
        <p>Obteniendo datos de tu API local (JSON Server).</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content home-page">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Asegúrate de que JSON Server esté ejecutándose en http://localhost:3001/albums</p>
      </div>
    );
  }

  return (
    <div className="page-content home-page">
      <h1>Bienvenido a Kodigo Music</h1>
      <p>Explora tu mundo musical. Escucha tus canciones favoritas en cualquier momento y lugar.</p>

      {/* --- Carrusel de Música Destacada --- */}
      {featuredMusic.length > 0 && (
        <div className="carousel-container">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredMusic.map((music, index) => (
              <div key={music.id} className="carousel-slide">
                <img src={music.albumArt} alt={`Portada de ${music.title}`} />
                <h2>{music.title}</h2>
                <p>{music.artist}</p>
              </div>
            ))}
          </div>
          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094; {/* Flecha izquierda */}
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            &#10095; {/* Flecha derecha */}
          </button>
        </div>
      )}

      <h2>Música Destacada (Desde tu API Local)</h2>
      {featuredMusic.length > 0 ? (
        <div className="music-grid">
          {featuredMusic.map(music => (
            <MusicCard key={music.id} title={music.title} artist={music.artist} albumArt={music.albumArt} />
          ))}
        </div>
      ) : (
        <p>No se encontró música destacada. Verifica tu archivo db.json y que JSON Server esté activo.</p>
      )}
    </div>
  );
}

export default HomePage;
