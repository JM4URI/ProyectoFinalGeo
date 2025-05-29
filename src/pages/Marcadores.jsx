import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './ActivityPage.css'; // Estilos generales para las páginas de actividad

// Estilos para el contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '500px',
};

// Coordenadas de origen (Facultad de Informática Mazatlán - UAS)
const origen = {
  lat: 23.231541418530608, // Coordenadas de la UAS
  lng: -106.42652947574959,
};

// Coordenadas de destino (Plaza Machado)
const destino = {
  lat: 23.198333582642356,  // Coordenadas de Plaza Machado
  lng: -106.42317927806837,
};

// RoutesMap ahora recibe isLoaded como una prop desde App.jsx
function RoutesMap({ isLoaded }) {
  const [directions, setDirections] = useState(null); // Estado para almacenar la respuesta de las direcciones

  // Callback que se ejecuta cuando DirectionsService obtiene una respuesta
  const directionsCallback = useCallback((response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response); // Guarda la respuesta de las direcciones
      } else {
        // Muestra un error en la consola si la solicitud no fue exitosa
        console.error('Error al obtener direcciones:', response);
      }
    }
  }, []);

  // Callback que se ejecuta cuando el mapa ha cargado
  const onLoad = useCallback(function callback(map) {
    // Ajustar los límites del mapa para asegurar que ambos marcadores y la ruta sean visibles
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(origen);
    bounds.extend(destino);
    map.fitBounds(bounds);
  }, []);

  // Callback que se ejecuta cuando el mapa se desmonta
  const onUnmount = useCallback(function callback(map) {
    // No se necesita hacer nada con el estado del mapa aquí si no se usa en este componente
  }, []);

  return (
    <div className="activity-page-container">
      <h2>Actividad: Trazado de Rutas</h2>
      <div className="activity-explanation">
        <h3>¿Qué es la API de Google Maps y cómo se integra con React?</h3>
        <p>Es un conjunto de herramientas y servicios que permite incrustar mapas interactivos en páginas web.</p>
        <p>Para integrarla con React se utiliza la librería `@react-google-maps/api`. Esta librería ofrece componentes de React que actúan
          como envolturas para la API nativa de Google Maps, facilitando su uso.</p>

        <h3>¿Qué es una clave API y cómo se obtiene?</h3>
        <p>Una API Key es un identificador único que se utiliza para autenticar tus solicitudes a la API de Google Maps.
          Es crucial para monitorear el uso, controlar el acceso y asegurar que las solicitudes provengan de tu proyecto.
          Se obtiene a través de la Google Cloud Console, donde se crea un proyecto, se habilitan las APIs necesarias y se genera la clave.</p>

        <h3>Actividad: Trazado de Ruta</h3>
        <p>
          <ul>
            <li>Se utilizó la librería `@react-google-maps/api` para integrar Google Maps en la aplicación React.</li>
            <li>Se configuró una API Key de Google Maps, asegurando que el servicio de Directions API esté habilitado en Google Cloud Console.</li>
            <li>El mapa se carga centrado en el punto de origen (UAS).</li>
            <li>Se utiliza `DirectionsService` para calcular la ruta desde el origen (UAS) hasta el destino (Plaza Machado).</li>
            <li>La ruta calculada se muestra en el mapa utilizando `DirectionsRenderer`.</li>
            <li>El modo de viaje configurado para esta ruta es 'WALKING' (caminando).</li>
            <li>Se muestran marcadores para el punto de origen (UAS) y el punto de destino (Machado).</li>
          </ul>
        </p>
      </div>

      <div className="map-container">
        {isLoaded ? ( // Solo renderizamos el mapa si isLoaded es true
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={origen} // El mapa se centrará inicialmente en el origen
            zoom={12} // Zoom inicial para ver el área de la ruta
            onLoad={onLoad} // Callback al cargar el mapa
            onUnmount={onUnmount} // Callback al desmontar el mapa
          >
            {/* Componente para solicitar las direcciones */}
            <DirectionsService
              options={{
                destination: destino, // Punto final de la ruta
                origin: origen,       // Punto de inicio de la ruta
                travelMode: 'WALKING' // Modo de viaje: caminando
              }}
              callback={directionsCallback} // Callback que maneja la respuesta de la ruta
            />

            {/* Componente para renderizar la ruta si ya se obtuvieron las direcciones */}
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions, // La respuesta de direcciones para dibujar
                  suppressMarkers: true, // Opcional: suprimir los marcadores por defecto de DirectionsRenderer
                }}
              />
            )}

            {/* Marcador para el origen */}
            <Marker position={origen} label="UAS" />
            {/* Marcador para el destino */}
            <Marker position={destino} label="Machado" />

          </GoogleMap>
        ) : (
          <div>Cargando Mapa de Rutas...</div>
        )}
      </div>
    </div>
  );
}

export default RoutesMap;
