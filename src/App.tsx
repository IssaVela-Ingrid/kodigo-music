// ... otras importaciones
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
// import PlaylistsPage from './pages/PlaylistsPage.tsx'; // <--- Elimina esta línea
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
         </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;