# 🗺️ Proyecto Final Sistemas de Información Geografica

---

##  Alumno
**Rocha Angulo Jesús Mauricio LISI 4-1**

---

## Descripción del Proyecto

Este es repositorio tiene una serie de actividades prácticas realizadas con la API de Google Maps. El objetivo principal es demostrar diversas funcionalidades de Google Maps.
Cada actividad está organizada en su propia sección/página, proporcionando una explicación de lo que se hizo, herramientas y librerías utilizadas.

---

## Funcionalidades Incluidas
* **Página Principal:** Indice navegable de todas las actividades.
* **Marcadores en el Mapa:** Implementación y manejo de marcadores individuales con ventanas de información.
* **Autocompletado de Direcciones:** Integración del servicio Places API para sugerencias de direcciones en tiempo real.
* **Trazado de Rutas Fijas:** Visualización de rutas predefinidas entre dos puntos.
* **Rutas Dinámicas:** Cálculo de rutas interactivas donde el usuario define origen, destino y modo de transporte.
* **Clustering de Marcadores:** Agrupación de múltiples marcadores para mejorar la visualización en mapas.
* **Dibujo en el Mapa:** Herramientas para trazar polígonos, rectángulos y polilíneas, mostrando sus coordenadas.

---

## Librerías

* **React** 
* **Vite**
* **`@react-google-maps/api`:** Librería de componentes React para Google Maps JavaScript API.
* **`react-router-dom`:** Para la navegación entre las diferentes secciones del portafolio.
---

## Configuración de la API Key
Para que el proyecto funcione correctamente, necesitas una API Key de Google Maps.
1. Obtener la API Key desde [Google Cloud Console](https://console.cloud.com/).
2.  Habilitar las siguientes API para tu proyecto:
    * **Maps JavaScript API**
    * **Directions API**
    * **Places API**
    * **Drawing API**
3.  Crear un archivo `.env` en la raíz de tu proyecto y agrega tu key:
    ```
    VITE_Maps_API_KEY=Tu_Key
    ```

---

## Cómo Correr el Proyecto Localmente

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/JM4URI/ProyectoFinalGeo
    cd ProyectoFinalGeo
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Configura tu API Key** 
4.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```

---

## Despliegue en GitHub Pages

Este proyecto está configurado para ser desplegado fácilmente en GitHub Pages.

1.  Asegúrate de que tu rama principal sea `main`.
2.  Instala la librería `gh-pages`:
    ```bash
    npm install --save-dev gh-pages
    ```
3.  Añade las siguientes propiedades a tu archivo `package.json`:
    ```json
    {
      "name": "portafolio-google-maps",
      "version": "0.1.0",
      "private": true,
      "homepage": "https://[tu-usuario-github].github.io/[nombre-de-tu-repositorio]",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist"
      },
    }
    ```
    **Importante:** Reemplaza `[tu-usuario-github]` con tu nombre de usuario de GitHub y `[nombre-de-tu-repositorio]` con el nombre exacto de tu repositorio.

4.  Ejecuta el comando de despliegue:
    ```bash
    npm run deploy
    ```
5.  Tú aplicación estará disponible en la URL definida en `homepage`.

---

## 🔗 Enlace al Proyecto Desplegado
[Enlace a tu Proyecto en GitHub Pages Aquí]
(Ej: `https://[tu-usuario].github.io/[nombre-de-tu-repositorio]`)

---
