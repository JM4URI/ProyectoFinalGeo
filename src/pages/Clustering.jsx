import React, { useState, useCallback } from "react";
import { GoogleMap, MarkerF, MarkerClustererF, InfoWindowF } from "@react-google-maps/api";
import './ActivityPage.css';

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 23.2494,
    lng: -106.4111,
};

const generateMarkers = () => {
    const markers = [];
    for (let i = 0; i < 100; i++) {
        markers.push({
            lat: center.lat + (Math.random() - 0.5) * 0.1,
            lng: center.lng + (Math.random() - 0.5) * 0.1,
            id: i,
            info: `Marcador #${i + 1}`,
        });
    }
    return markers;
};

function Clustering({ isLoaded }) {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const markers = generateMarkers();

    return (
        <div className="activity-page-container">
            <h2>Actividad: Implementación de Marker Clustering con Google Maps API en React</h2>
            <div className="activity-explanation">
                <p>El objetivo era aplicar el uso de la API de Google Maps en una aplicación React para 
                    mostrar múltiples ubicaciones y agrupar marcadores mediante `MarkerClusterer`, mejorando 
                    la visualización y eficiencia en mapas interactivos.</p>
                <h3>¿Qué se hizo?</h3>
                <p>
                    <li>Se generaron 100 marcadores aleatorios alrededor del centro de Mazatlán.</li>
                    <li>`MarkerClustererF` agrupa automáticamente los marcadores cercanos en un solo ícono de clúster mostrando el número de marcadores agrupados.</li>
                    <li>Al hacer zoom, los clústeres se dividen en marcadores individuales o en clústeres más pequeños.</li>
                    <li>Al seleccionar cualquier marcador individual se muestra un recuadro donde se imprimen las coordenadas y el número del marcador.</li>
                </p>
                <h3>Herramientas/Librerías Usadas:</h3>
                <li>`@react-google-maps/api`</li>
                <li>Componente `MarkerClustererF` para la agrupación de marcadores.</li>
                <h3>¿Qué aprendí?</h3>
                <p>El rendimiento del mapa es significativo: reduce la cantidad de marcadores renderizados 
                    directamente en el mapa lo que mejora la fluidez..</p>
            </div>

            <div className="map-container">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                    >
                        <MarkerClustererF>
                            {(clusterer) =>
                                markers.map((marker) => (
                                    <MarkerF
                                        key={marker.id}
                                        position={{ lat: marker.lat, lng: marker.lng }}
                                        clusterer={clusterer} 
                                        onClick={() => setSelectedMarker(marker)}
                                    />
                                ))
                            }
                        </MarkerClustererF>

                        {selectedMarker && (
                            <InfoWindowF
                                position={{
                                    lat: selectedMarker.lat,
                                    lng: selectedMarker.lng,
                                }}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div style={{ color: "var(--color-dark-gray-base)", backgroundColor: "var(--color-white-text)", padding: "10px", borderRadius: "5px" }}>
                                    <h4>{selectedMarker.info}</h4>
                                    <p>Coordenadas:</p>
                                    <p>Lat: {selectedMarker.lat.toFixed(5)}</p>
                                    <p>Lng: {selectedMarker.lng.toFixed(5)}</p>
                                </div>
                            </InfoWindowF>
                        )}
                    </GoogleMap>
                ) : (
                    <div>Cargando Mapa de Clustering...</div>
                )}
            </div>
        </div>
    );
}

export default Clustering;
