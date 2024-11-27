import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import './Encabezado.css';

const Encabezado = ({ logoSrc, text }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtén la ruta actual

  const handleBackToWelcome = () => {
    if (location.pathname === '/bienvenida') {
      navigate('/'); // Redirige al login si estás en bienvenida
    } else {
      navigate('/bienvenida'); // Redirige a bienvenida desde otras páginas
    }
  };

  return (
    <div className="encabezado-container">
      <img src={logoSrc} alt="Logo de la EPN" className="encabezado-logo" />
      <h2 className="encabezado-text">{text}</h2>
      <button
        type="button"
        className="encabezado-button"
        onClick={handleBackToWelcome} // Llama a la función de salida
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/906/906811.png"
          alt="icono de salida"
          className="encabezado-icon"
        />
      </button>
    </div>
  );
};

Encabezado.defaultProps = {
  logoSrc: 'https://ici2st.epn.edu.ec/eventosAnteriores/ICI2ST2023/images/ici2st2023/Logo_EPN.png',
  text: 'SISTEMA DE TRANSPORTE ESTUDIANTIL',
};

Encabezado.propTypes = {
  logoSrc: PropTypes.string,
  text: PropTypes.string,
};

export default Encabezado;
