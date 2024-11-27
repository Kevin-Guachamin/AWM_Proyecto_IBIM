import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BarraNav extends React.Component {
    render() {
        const { userName, userRole, userIcon, menuItems } = this.props;

        return (
            <div className="barra-lateral">
                <div className="barra-lateral-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/8920/8920554.png" alt="Icono del estudiante" className="barra-lateral-icon" />
                    <div>
                        <p className="barra-lateral-name">Juan Perez</p>
                        <p className="barra-lateral-role">Estudiante</p>
                    </div>
                </div>
                <nav className="barra-lateral-menu">
                    <a className="barra-lateral-item">
                        Inicio
                    </a>
                    <a className="barra-lateral-item">
                        Seleccionar Ruta
                    </a>
                    <a className="barra-lateral-item">
                        Seleccionar Parada
                    </a>
                    <a className="barra-lateral-item">
                        Ver estado Ruta
                    </a>
                </nav>
            </div>
        );
    }
}

export default BarraNav;