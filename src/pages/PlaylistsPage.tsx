import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { supabase } from '../supabaseClient.ts'; // Importa el cliente de Supabase

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

        // --- CAMBIO CLAVE: Cargar datos desde Supabase ---
        const { data, error: supabaseError } = await supabase
          .from('playlists') // Nombre de tu tabla en Supabase
          .select('id, name, description, coverArt, songCount'); // Selecciona las columnas

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (data && data.length > 0) {
          setPlaylists(data as PlaylistItem[]);
        } else {
          setPlaylists([]);
          console.warn('No se encontraron listas de reproducción en Supabase.');
        }

      } catch (e: any) {
        console.error("Error al cargar listas de reproducción desde Supabase:", e);
        setError(`Fallo al cargar las listas de reproducción: ${e.message}. Asegúrate de que Supabase esté configurado y los datos existan.`);
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
        <p>Obteniendo datos desde Supabase.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-content playlists-page">
        <h1>Error</h1>
        <p>{error}</p>
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
