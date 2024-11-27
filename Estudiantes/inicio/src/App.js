import './App.css';
import React from 'react';
import BarraNav from './Componentes/BarraNav';
import Encabezado from './Componentes/Encabezado';

class App extends React.Component {
  render() {
    return (
      <div className="container1">
        <Encabezado></Encabezado>
        <div className="container2">
          <BarraNav></BarraNav>
          <section className="container3">
                <div className="titulo-inicio">
                  <h1 id="text-1">Bienvenido al Sistema del Transporte Estudiantil</h1>
                  <h2 id="text-2">¡Aquí podrás ver el detalle de las rutas de los Polibuses y seguir su recorrido!</h2>   
                </div>
                  <img
                    alt="polibus"
                    src='/polibus-logo-400h.png'
                    className="blog-post-header7-image"
                  />   
          </section>
        </div>
        <script>
        </script>
      </div>
    );
  }
}

export default App;
