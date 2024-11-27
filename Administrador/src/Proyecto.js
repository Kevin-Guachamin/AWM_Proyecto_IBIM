import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdministradorBienvenida from './AdministradorBienvenida';
import AdministradorEstudiantes from './AdministradorEstudiantes';
import AdministradorConductores from './AdministradorConductores';
import AdministradorRutas from './AdministradorRutas';
import InicioSesion from './Componentes/InicioSesion';

function Proyecto() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/bienvenida" element={<AdministradorBienvenida />} /> 
        <Route path="/estudiantes" element={<AdministradorEstudiantes />} />
        <Route path="/conductores" element={<AdministradorConductores />} />
        <Route path="/rutas" element={<AdministradorRutas />} />
      </Routes>
    </Router>
  );
}

export default Proyecto;
