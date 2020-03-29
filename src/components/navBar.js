import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
                <Link to="/" className="navbar-brand">DanceMove Dashboard</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* Default Dashboard Page */}
                        <li className="navbar-item">
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/sensorReadings" className="nav-link">Logged Readings</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/validmoves" className="nav-link">Logged ValidMoves</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/dancemoves" className="nav-link">Registered DanceMoves</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createDancemove" className="nav-link">Create New Dancemove</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createDancer" className="nav-link">Create New Dancer</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
