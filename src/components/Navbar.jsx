import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Crea este archivo para los estilos del Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Portafolio Google Maps</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/marcadores" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Marcadores
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/direcciones" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Direcciones
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/clustering" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Clustering
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/drawing" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Drawing
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rutas" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Rutas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;