import React from 'react';
import { Link } from 'react-router-dom';
import ActivityCard from './ActivityCard';
import './Home.css';

function Home() {
  const activities = [
    {
      title: 'Implementacion con Google Maps',
      description: 'Integrar Google Maps en una aplicación construida con React, utilizando una API Key y personalizando el mapa con marcadores y ventanas de información.',
      path: '/marcadores'
    },
    {
      title: 'Generar direcciones en Google Maps',
      description: 'Uso de direction service y direction renderer para mostrar direcciones entre distintos puntos en el mapa.',
      path: '/direcciones',
    },
    {
      title: 'Implementación de Marker Clustering con Google Maps API en React',
      description: 'Aplicar el uso de la API de Google Maps en una aplicación React para mostrar múltiples ubicaciones y agrupar marcadores mediante MarkerClusterer, mejorando la visualización y eficiencia en mapas interactivos.',
      path: '/clustering',
    },
    {
      title: 'Trazando sobre el mapa con Drawing Tools de Google Maps en React',
      description: 'Implementar una aplicación en React que permita a los usuarios dibujar polígonos, rectángulos o líneas sobre un mapa de Google usando la API de Drawing Tools.',
      path: '/drawing',
    },
    {
      title: 'Implementación de rutas con Google Maps en React (Routes API Rendering)',
      description: 'Implementar una visualización de ruta entre dos puntos usando Google Maps y la librería @react-google-maps/api, haciendo uso de la Routes API para mostrar el trazado dinámico entre origen y destino.',
      path: '/rutas',
    }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Proyecto Final</h1>
        <p>Rocha Angulo Jesús Mauricio LISI 4-1</p>
        <p>Actividades prácticas realizadas con la API de Google Maps.</p>
      </header>

      <section className="activities-grid">
        <h2>Actividades Realizadas</h2>
        <div className="cards-wrapper">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              description={activity.description}
              link={activity.path}  
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;