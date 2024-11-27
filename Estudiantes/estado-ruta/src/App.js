import './App.css';
import React from 'react';
import BarraNav from './Componentes/BarraNav';
import Encabezado from './Componentes/Encabezado';

class App extends React.Component {
  render() {
    return (
      <div className="pantalla-estudiante-seleccion-de-parada-container1">
        <Encabezado></Encabezado>
        <div className="pantalla-estudiante-seleccion-de-parada-container3">
          <BarraNav></BarraNav>
          <section className="pantalla-estudiante-seleccion-de-parada-container4">
            <span className="pantalla-estudiante-ver-estado-ruta-text20">
              Siga el estado de su ruta
            </span>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d43187.25868662508!2d-78.52596115282607!3d-0.24946750913633772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x91d5a27340683463%3A0xdfb5eabd7bf000e1!2sEstacion%20Transferencia%20Ecovia%20-%20El%20Capul%C3%AD%2C%20Calle%205%2C%20Quito!3m2!1d-0.29960139999999996!2d-78.5420267!4m5!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sESCUELA%20POLIT%C3%89CNICA%20NACIONAL%2C%20Av.%20Ladr%C3%B3n%20de%20Guevara%20E11-253%2C%20Quito%20170143!3m2!1d-0.2124413!2d-78.4905842!5e0!3m2!1ses!2sec!4v1730851738101!5m2!1ses!2sec" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
              className="pantalla-estudiante-ver-estado-ruta-google-maps"
            ></iframe>
          </section>
        </div>
        <script>
        </script>
      </div>
    );
  }
}

export default App;