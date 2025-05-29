import React, { useState, useCallback } from "react";
import { GoogleMap, DrawingManager } from "@react-google-maps/api";
import './ActivityPage.css';

const containerStyle = {
    width: "100%",
    height: "600px",
};

const center = {
    lat: 23.2494,
    lng: -106.4111,
};

function Drawing({ isLoaded }) {
    const [shapes, setShapes] = useState([]);

    const addShape = useCallback((shape, type) => {
        let pathCoords = [];
        if (type === "poligono" || type === "polilinea ") {
            pathCoords = shape.getPath().getArray().map((coord) => ({ lat: coord.lat(), lng: coord.lng() }));
        } else if (type === "rectangulo") {
            const bounds = shape.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            pathCoords = [
                { lat: ne.lat(), lng: sw.lng() },
                { lat: ne.lat(), lng: ne.lng() },
                { lat: sw.lat(), lng: ne.lng() },
                { lat: sw.lat(), lng: sw.lng() } 
            ];
        }

        setShapes((prev) => [
            ...prev,
            { id: Date.now(), type, coords: pathCoords, shape }
        ]);
    }, []);

    const removeShape = useCallback((id) => {
        setShapes((prev) => {
            const shapeToRemove = prev.find((s) => s.id === id);
            if (shapeToRemove) {
                shapeToRemove.shape.setMap(null);
            }
            return prev.filter((s) => s.id !== id);
        });
    }, []);

    return (
        <div className="activity-page-container">
            <h2>Actividad: Trazando sobre el mapa con Drawing Tools de Google Maps en React</h2>
            <div className="activity-explanation">
                <p>Dibujar polígonos, rectángulos o líneas sobre un mapa de Google utilizando la API de 
                    Drawing Tools integrada en `@react-google-maps/api`.
                </p>
                <h3>¿Qué se hizo?</h3>
                <p>
                    <li>Mapa de Google centrado en Mazatlán.</li>
                    <li>Se integró el componente `DrawingManager` que proporciona una interfaz para 
                        seleccionar y dibujar diferentes formas geométricas sobre el mapa.</li>
                    <li>Capturar las coordenadas de las formas.</li>
                    <li>Mostrar dinámicamente las coordenadas en un panel lateral.</li>
                    <li>Cada forma dibujada en el panel lateral tiene un botón "Eliminar" que permite remover
                        las formas.</li>
                </p>
                <h3>Herramientas/Librerías Usadas:</h3>
                <p>
                    <li>React y Vite</li>
                    <li>`@react-google-maps/api`con el compoente `DrawingManager`.</li>
                </p>
                <h3>¿Qué aprendí?</h3>
                <p>
                    Aprendí a manejar los eventos al completar las figuras dibujadas, asi como a capturar las
                    coordenadas de los distintos puntos de las figuras para poder eliminarlas desde usando
                    pequeña interfaz.
                </p>
            </div>

            <div className="map-drawing-container">
                {isLoaded ? (
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                        <DrawingManager
                            options={{
                                drawingControl: true,
                                drawingControlOptions: {
                                    position: window.google.maps.ControlPosition.TOP_CENTER,
                                    drawingModes: ["polygon", "rectangle", "polyline"],
                                },
                                polygonOptions: {
                                    fillColor: '#FFD700',
                                    strokeColor: '#CCAA00',
                                    fillOpacity: 0.3,
                                    strokeWeight: 2,
                                    clickable: true,
                                    editable: true,
                                    draggable: true,
                                },
                                rectangleOptions: {
                                    fillColor: '#FFD700',
                                    strokeColor: '#CCAA00',
                                    fillOpacity: 0.3,
                                    strokeWeight: 2,
                                    clickable: true,
                                    editable: true,
                                    draggable: true,
                                },
                                polylineOptions: { 
                                    strokeColor: '#FFD700',
                                    strokeWeight: 3,
                                    clickable: true,
                                    editable: true,
                                    draggable: true,
                                },
                            }}
                            onPolygonComplete={(polygon) => addShape(polygon, "poligono")}
                            onRectangleComplete={(rectangle) => addShape(rectangle, "rectangulo")}
                            onPolylineComplete={(polyline) => addShape(polyline, "linea")}
                        />
                    </GoogleMap>
                ) : (
                    <div>Cargando Mapa de Dibujo...</div>
                )}

                <div className="shapes-panel">
                    <h3>Formas Dibujadas</h3>
                    {shapes.length === 0 ? (
                        <p>Dibuja una forma en el mapa para ver sus coordenadas aquí.</p>
                    ) : (
                        shapes.map(({ id, type, coords }) => (
                            <div key={id} className="shape-item">
                                <strong>Tipo: {type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                                <ul className="coords-list">
                                    {coords.map((coord, i) => (
                                        <li key={i}>
                                            Lat: {coord.lat.toFixed(6)}, Lng: {coord.lng.toFixed(6)}
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => removeShape(id)} className="delete-button">Eliminar</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Drawing;
