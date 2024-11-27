import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ConductorMenu.css';

class ConductorMenu extends Component {
  

  render() {
    const { userName, userRole, userIcon, menuItems } = this.props;

    return (
      <div className="barra-lateral">
        <div className="barra-lateral-header">
          <img src={userIcon} alt="Icono del usuario" className="barra-lateral-icon" />
          <div>
            <p className="barra-lateral-name">{userName}</p>
            <p className="barra-lateral-role">{userRole}</p>
          </div>
        </div>
        <nav className="barra-lateral-menu">
          {menuItems.map((item, index) => (
            <a href={item.link} key={index} className="barra-lateral-item">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    );
  }
}

export default ConductorMenu;
