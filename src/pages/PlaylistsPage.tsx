import React, { useState, useEffect } from 'react';
import '../styles/App.css'; // Asegúrate de que este CSS se cargue

// Definimos la interfaz para los elementos de la playlist
interface PlaylistItem {
  id: number;
  name: string;
  description: string;
  coverArt: string; // URL de la imagen de la playlist
  songCount: number;
}

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);

        // URL para el endpoint de playlists en tu JSON Server
        const url = 'http://localhost:3001/playlists'; 

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.length > 0) {
          const playlistsData: PlaylistItem[] = data.map((playlist: any) => ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
            coverArt: playlist.coverArt,
            songCount: playlist.songCount || 0, // Asegura que songCount tenga un valor por defecto
          }));
          setPlaylists(playlistsData);
        } else {
          setPlaylists([]);
          console.warn('No se encontraron listas de reproducción en tu API local.');
        }

      } catch (e: any) {
        console.error("Error al cargar listas de reproducción:", e);
        setError(`Fallo al cargar las listas de reproducción desde tu API local: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="page-content playlists-page">
        <h1>Cargando Listas de Reproducción...</h1>
        <p>Obteniendo datos de tu API local (JSON Server).</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content playlists-page">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Asegúrate de que JSON Server esté ejecutándose en http://localhost:3001/playlists</p>
      </div>
    );
  }

  return (
    <div className="page-content playlists-page">
      <h1>Tus Listas de Reproducción</h1>
      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <img src={playlist.coverArt} alt={`Portada de ${playlist.name}`} className="playlist-cover-art" />
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
              <p className="song-count">{playlist.songCount} canciones</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes listas de reproducción. ¡Crea una nueva!</p>
      )}
    </div>
  );
}

export default PlaylistsPage;
