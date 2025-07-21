//import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import '../styles/App.css'; // Asegúrate de que este CSS se cargue

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="logo">Kodigo Music</Link>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
          <li><Link to="/playlists">Playlists</Link></li> {/* Nuevo enlace */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
