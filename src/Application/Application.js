import React from 'react';
import './Application.css';

export default function Application(props) {
    return (
        <div className="application">
            <h2>{props.App}</h2>
            <div className="application_category">by {props.Category}</div>
            <div className="application_Reviews">
                Category: {props.Reviews}
            </div>
            <div className="applicatoin_genres">{props.Genres}</div>
            <div className="application_rating">
                Rating {props.Rating}
      </div>
        </div>
    );
}