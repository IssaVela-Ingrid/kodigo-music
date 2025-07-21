//import React from 'react';
import '../styles/App.css';

// Definimos la interfaz para las props de MusicCard
interface MusicCardProps {
  title: string;
  artist: string;
  albumArt: string;
}

// Usamos la interfaz para tipar las props del componente funcional
function MusicCard({ title, artist, albumArt }: MusicCardProps) {
  return (
    <div className="music-card">
      <img src={albumArt} alt={`Portada de ${title}`} className="album-art" />
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}

export default MusicCard;