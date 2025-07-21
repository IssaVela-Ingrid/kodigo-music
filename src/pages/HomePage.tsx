import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard.tsx';
import '../styles/App.css';
import { supabase } from '../supabaseClient.ts'; // Importa el cliente de Supabase

interface MusicItem {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
  // Añade otras propiedades si las necesitas de tu tabla de Supabase
  // genre?: string;
  // release_year?: number;
}

function HomePage() {
  const [featuredMusic, setFeaturedMusic] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- CAMBIO CLAVE: Cargar datos desde Supabase ---
        const { data, error: supabaseError } = await supabase
          .from('albums') // Nombre de tu tabla en Supabase
          .select('id, title, artist, albumArt'); // Selecciona las columnas que necesitas

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (data && data.length > 0) {
          // Supabase ya devuelve los datos en el formato que necesitas,
          // así que no es necesario un mapeo complejo si las columnas coinciden.
          setFeaturedMusic(data as MusicItem[]);
        } else {
          setFeaturedMusic([]);
          console.warn('No se encontraron álbumes en Supabase.');
        }

      } catch (e: any) {
        console.error("Error al cargar datos desde Supabase:", e);
        setError(`Fallo al cargar la música: ${e.message}. Asegúrate de que Supabase esté configurado y los datos existan.`);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  // Lógica para el carrusel (sin cambios, ya que usa featuredMusic)
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredMusic.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + featuredMusic.length) % featuredMusic.length);
  };

  useEffect(() => {
    if (featuredMusic.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredMusic, currentSlide]);

  if (loading) {
    return (
      <div className="page-content home-page">
        <h1>Cargando Música...</h1>
        <p>Obteniendo datos desde Supabase.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content home-page">
        <h1>Error</h1>
        <p>{error}</p>
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
            {featuredMusic.map((music) => (
              <div key={music.id} className="carousel-slide">
                <img src={music.albumArt} alt={`Portada de ${music.title}`} />
                <h2>{music.title}</h2>
                <p>{music.artist}</p>
              </div>
            ))}
          </div>
          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      )}

      <h2>Música Destacada</h2>
      {featuredMusic.length > 0 ? (
        <div className="music-grid">
          {featuredMusic.map(music => (
            <MusicCard key={music.id} title={music.title} artist={music.artist} albumArt={music.albumArt} />
          ))}
        </div>
      ) : (
        <p>No se encontró música destacada en Supabase.</p>
      )}
    </div>
  );
}

export default HomePage;
