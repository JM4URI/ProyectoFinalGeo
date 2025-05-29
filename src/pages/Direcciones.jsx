import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './ActivityPage.css';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const origen = {
  lat: 23.231541418530608,
  lng: -106.42652947574959,
};

const destino = {
  lat: 23.198333582642356,
  lng: -106.42317927806837,
};

function Direcciones({ isLoaded }) {
  const [directions, setDirections] = useState(null);

  const directionsCallback = useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.error('Error al obtener direcciones:', response);
      }
    }
  }, []);

  return (
    <div className="activity-page-container">
      <h2>Actividad: Generar direcciones en Google Maps</h2>
      <div className="activity-explanation">
        <h3>¿Qué se hizo?</h3>
        <p>En esta actividad, se implementa el trazado de una ruta entre dos puntos específicos
           utilizando Directions Service. Se visualiza la ruta directamente sobre el mapa, junto con 
           marcadores para el origen y el destino.</p>

        <h3>Herramientas/Librerías Usadas:</h3>
        <p>
          <li>React y Vite</li>
          <li>@react-google-maps/api para los componentes `GoogleMap`, `Marker`, `DirectionsService` y 
            `DirectionsRenderer`.</li>
        </p>

        <h3>¿Qué aprendí?</h3>
        <p>Aprendí a utilizar `DirectionsService` para realizar solicitudes de rutas, especificando el origen,
           el destino y el modo de viaje (en este caso 'WALKING'). También que `DirectionsRenderer`
           representa visualmente en el mapa las rutas solicitadas, y cómo manejar las
           respuestas y posibles errores del servicio de direcciones.</p>
      </div>

      <div className="map-container">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={origen}
            zoom={12}
          >
            <DirectionsService
              options={{
                destination: destino,
                origin: origen,
                travelMode: 'WALKING',
              }}
              callback={directionsCallback}
            />

            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                  suppressMarkers: true, 
                }}
              />
            )}
            <Marker position={origen} label="UAS" />
            <Marker position={destino} label="Machado" />

          </GoogleMap>
        ) : (
          <div>Cargando Mapa de Rutas...</div>
        )}
      </div>
    </div>
  );
}

export default Direcciones;