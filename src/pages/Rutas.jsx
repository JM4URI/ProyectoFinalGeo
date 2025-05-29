import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import './ActivityPage.css';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const defaultCenter = {
  lat: 23.2494,
  lng: -106.4111,
};

const travelModes = {
  DRIVING: 'DRIVING',
  WALKING: 'WALKING',
  BICYCLING: 'BICYCLING'
};

function Rutas({ isLoaded }) {
  const [directions, setDirections] = useState(null);
  const [travelMode, setTravelMode] = useState(travelModes.DRIVING);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState(''); 

  const originRef = useRef(null); 
  const destinationRef = useRef(null);

  const calculateRoute = useCallback(() => {
    if (!origin || !destination) {
      setMessage('Por favor, ingresa tanto el origen como el destino.');
      return;
    }
    setMessage(''); 

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result); 
        } else {
          console.error(`Error al calcular la ruta: ${status}`);
          setMessage(`No se pudo calcular la ruta: ${status}. Asegúrate de que las direcciones sean válidas y que la API de Directions esté habilitada.`);
          setDirections(null); 
        }
      }
    );
  }, [origin, destination, travelMode]);

  const onOriginPlaceChanged = useCallback(() => {
    if (originRef.current) {
      const place = originRef.current.getPlace();
      if (place.formatted_address) {
        setOrigin(place.formatted_address);
      } else if (place.name) {
        setOrigin(place.name);
      }
      setMessage(''); 
    }
  }, []);

  const onDestinationPlaceChanged = useCallback(() => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlace();
      if (place.formatted_address) {
        setDestination(place.formatted_address);
      } else if (place.name) {
        setDestination(place.name);
      }
      setMessage('');
    }
  }, []);

  return (
    <div className="activity-page-container">
      <h2>Actividad: Implementación de rutas con Google Maps en React (Routes API Rendering)</h2>
      <div className="activity-explanation">
        <p>Implementar una visualización de ruta entre dos puntos usando Google Maps, permitiendo al usuario
          definir origen y destino, y seleccionar el modo de transporte.</p>
        <h3>¿Qué se hizo?</h3>
        <p>
            <li>Se creó una interfaz con dos campos de entrada para el origen y el destino.</li>
            <li>Estos campos de entrada están potenciados con la funcionalidad de **Autocompletado de Direcciones** (`Autocomplete`) del servicio Places API, lo que facilita la búsqueda de ubicaciones.</li>
            <li>"Calcular Ruta" al ser presionado, utiliza el servicio `DirectionsService` de Google Maps para
              trazar la ruta entre los puntos ingresados.</li>
            <li>Se añadieron botones para seleccionar el modo de viaje: Coche, Caminando y Bicicleta.</li>
            <li>La ruta se visualiza en el mapa usando el componente `DirectionsRenderer`.</li>
        </p>
        <h3>Herramientas/Librerías Usadas:</h3>
        <p>
          <li>React y Vite</li>
          <li>@react-google-maps/api`: Componentes `GoogleMap`, `DirectionsRenderer`, `Autocomplete`.</li>
        </p>
        <h3>¿Qué aprendí?</h3>
        <p>
          Combinar Autocomplete y DirectionsService para calcular rutas entre dos puntos con una interfaz más
          accesible permitiendo seleccionar origen y destino además de manejar el modo de viaje.
        </p>
      </div>

      <div className="map-interaction-area">
        {message && <div className="user-message error">{message}</div>}

        <div className="input-group">
          {isLoaded && (
            <>
              <Autocomplete
                onLoad={autocomplete => (originRef.current = autocomplete)}
                onPlaceChanged={onOriginPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Origen"
                  className="autocomplete-input"
                  defaultValue={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </Autocomplete>

              <Autocomplete
                onLoad={autocomplete => (destinationRef.current = autocomplete)}
                onPlaceChanged={onDestinationPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Destino"
                  className="autocomplete-input"
                  defaultValue={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Autocomplete>

              <button onClick={calculateRoute} className="calculate-button">
                Calcular Ruta
              </button>
            </>
          )}
        </div>

        <div className="travel-mode-buttons">
          <button
            onClick={() => setTravelMode(travelModes.DRIVING)}
            className={`mode-button ${travelMode === travelModes.DRIVING ? 'active' : ''}`}
          >
            Coche
          </button>
          <button
            onClick={() => setTravelMode(travelModes.WALKING)}
            className={`mode-button ${travelMode === travelModes.WALKING ? 'active' : ''}`}
          >
            Caminando
          </button>
          <button
            onClick={() => setTravelMode(travelModes.BICYCLING)}
            className={`mode-button ${travelMode === travelModes.BICYCLING ? 'active' : ''}`}
          >
            Bicicleta
          </button>
        </div>

        <div className="map-container">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={directions ? undefined : defaultCenter} 
              zoom={directions ? undefined : 12}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          ) : (
            <div>Cargando Mapa de Rutas Dinámicas...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rutas;
