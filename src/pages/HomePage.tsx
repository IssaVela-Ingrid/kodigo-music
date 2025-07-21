import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard.tsx';
import '../styles/App.css';

interface MusicItem {
  id: number;
  title: string;
  artist: string;
  albumArt: string;
  // Puedes añadir más propiedades si las usas de tu db.json
  // genre?: string;
  // release_year?: number;
}

function HomePage() {
  const [featuredMusic, setFeaturedMusic] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        setError(null);

        // *** CAMBIO CLAVE: Usa la URL de tu JSON Server local ***
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
            albumArt: album.albumArt, // Ahora usa la URL de la imagen de tu db.json
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