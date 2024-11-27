import React from 'react';
import Encabezado from './Componentes/Encabezado';
import BarraLateral from './Componentes/BarraLateral';
import MenuAdministrador from './Componentes/MenuAdministrador';
import './AdministradorBienvenida.css';

function AdministradorBienvenida() {
  const menuItems = [
    { label: 'Inicio', link: '/bienvenida' }, 
    { label: 'Estudiantes', link: '/estudiantes' },
    { label: 'Conductores', link: '/conductores' },
    { label: 'Rutas', link: '/rutas' },
  ];

  return (
    <div className="app-container">
      <Encabezado />
      <div className="app-body">
        <BarraLateral
          userName="Luisa Casas"
          userRole="Administrador"
          userIcon="https://cdn-icons-png.flaticon.com/512/5322/5322033.png"
          menuItems={menuItems} // Pasa el array actualizado
        />
        <MenuAdministrador />
      </div>
    </div>
  );
}

export default AdministradorBienvenida;
