import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useNavigate, useLocation } from 'react-router-dom'; // Importamos useNavigate y useLocation
import './BarraLateral.css';

const BarraLateral = ({ userName, userRole, userIcon, menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInicioClick = () => {
    if (location.pathname !== '/bienvenida') {
      navigate('/bienvenida'); // Si no estás en bienvenida, navega allí
    }
  };

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
          item.label === 'Inicio' ? (
            // Para "Inicio", aplicamos un evento de clic
            <div
              key={index}
              className={`barra-lateral-item ${
                location.pathname === '/bienvenida' ? 'active' : ''
              }`}
              onClick={handleInicioClick} // Llama a la lógica de redirección
            >
              {item.label}
            </div>
          ) : (
            <NavLink
              to={item.link}
              key={index}
              className={({ isActive }) =>
                isActive ? 'barra-lateral-item active' : 'barra-lateral-item'
              }
            >
              {item.label}
            </NavLink>
          )
        ))}
      </nav>
    </div>
  );
};

BarraLateral.propTypes = {
  userName: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  userIcon: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BarraLateral;
