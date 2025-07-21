//import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import PlaylistsPage from './pages/PlaylistsPage.tsx'; // 
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} /> {/* Nueva ruta para Playlists */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
