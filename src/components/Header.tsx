//import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">Kodigo Music</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          {/* <li><Link to="/playlists">Playlists</Link></li> */} {/* <--- Elimina esta línea */}
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;