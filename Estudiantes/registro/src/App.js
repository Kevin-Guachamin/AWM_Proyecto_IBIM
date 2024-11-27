import React from 'react';
import './App.css';
import AgregarEstudiante from './Componentes/AgregarEstudiantes';

class App extends React.Component {

  render() {
    return (
      <div className="container1">
        <div className="container2">
        <AgregarEstudiante></AgregarEstudiante>
        </div>
        <div className="container3">
          <img
            alt="logoepn"
            src="/polibus-logo-600w.png"
            className="logoepn-registro"
          />
        </div>
      </div>
    );
  }
}

export default App;
