import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityCard.css';

function ActivityCard({ title, description, link, image }) {
  return (
    <div className="activity-card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="card-button">
          Ver Actividad
        </Link>
      </div>
    </div>
  );
}

export default ActivityCard;