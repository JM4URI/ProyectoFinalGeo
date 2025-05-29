import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marcadores from './pages/Marcadores';
import Direcciones from './pages/Direcciones';
import Clustering from './pages/Clustering';
import Drawing from './pages/Drawing';
import Rutas from './pages/Rutas';
import './App.css';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['drawing', 'maps', 'places'];

function App() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  if (loadError) {
    return (
      <div className="app-error-container">
        <h1>Error al cargar la aplicación</h1>
        <p>No se pudo cargar la API de Google Maps. Por favor, verifica tu conexión a internet o tu API Key.</p>
      </div>
    );
  }
  if (!isLoaded) {
    return (
      <div className="app-loading-container">
        <h1>Cargando Portafolio de Mapas...</h1>
        <p>Por favor, espera un momento.</p>
      </div>
    );
  }


  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marcadores" element={<Marcadores isLoaded={isLoaded} />} />
          <Route path="/direcciones" element={<Direcciones isLoaded={isLoaded} />} />
          <Route path="/clustering" element={<Clustering isLoaded={isLoaded} />} />
          <Route path="/drawing" element={<Drawing isLoaded={isLoaded} />} />
          <Route path="/rutas" element={<Rutas isLoaded={isLoaded} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;