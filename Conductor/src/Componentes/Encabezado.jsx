import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Encabezado.css';

class Encabezado extends Component {
  static defaultProps = {
    logoSrc: 'https://ici2st.epn.edu.ec/eventosAnteriores/ICI2ST2023/images/ici2st2023/Logo_EPN.png',
    text: 'SISTEMA DE TRANSPORTE ESTUDIANTIL',
  };

  static propTypes = {
    logoSrc: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const { logoSrc, text } = this.props;

    return (
      <div className="encabezado-container">
        <img src={logoSrc} alt="Logo de la EPN" className="encabezado-logo" />
        <h2 className="encabezado-text">{text}</h2>
        <button type="button" className="encabezado-button">
          <img
            src="https://cdn-icons-png.flaticon.com/128/906/906811.png"
            alt="icono de salida"
            className="encabezado-icon"
          />
        </button>
      </div>
    );
  }
}

export default Encabezado;
