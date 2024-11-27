import React, { useState } from 'react';
import Encabezado from './Componentes/Encabezado';
import BarraLateral from './Componentes/BarraLateral';
import FiltradoAgregado from './Componentes/FiltradoAgregado';
import Tabla from './Componentes/Tabla';
import AgregadoEditado from './Componentes/AgregadoEditado';
import './AdministradorEstudiantes.css';

const AdministradorEstudiantes = () => {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Perez', correo: 'juan.perez@epn.edu.ec', codigoUnico: '123456789', ruta: '13' },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', correo: 'maria.gomez@epn.edu.ec', codigoUnico: '987654321', ruta: '11' },
    { id: 3, nombre: 'Carlos', apellido: 'Lopez', correo: 'carlos.lopez@epn.edu.ec', codigoUnico: '112233445', ruta: '10' },
    { id: 4, nombre: 'Ana', apellido: 'Martinez', correo: 'ana.martinez@epn.edu.ec', codigoUnico: '334455667', ruta: '8' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [filterType, setFilterType] = useState(''); // Filtro seleccionado
  const [filterText, setFilterText] = useState(''); // Texto del filtro

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Código Único', accessor: 'codigoUnico' },
    { header: 'Ruta', accessor: 'ruta' },
  ];

  const filterOptions = [
    { value: 'nombre', label: 'Nombre' },
    { value: 'apellido', label: 'Apellido' },
    { value: 'correo', label: 'Correo' },
    { value: 'codigoUnico', label: 'Código Único' },
    { value: 'ruta', label: 'Ruta' },
  ];

  const handleFilterApply = (selectedFilter, text) => {
    if (!selectedFilter) {
      alert('Selecciona un campo para filtrar.');
      return;
    }
    setFilterType(selectedFilter);
    setFilterText(text);
  };

  const handleClearFilter = () => {
    setFilterType('');
    setFilterText('');
  };

  const filteredData = data.filter((item) => {
    if (!filterType || !filterText) return true;
    const valueToFilter = item[filterType]?.toString().toLowerCase() || '';
    return valueToFilter.includes(filterText.toLowerCase());
  });

  const handleAddClick = () => {
    setCurrentRecord({
      id: null,
      nombre: '',
      apellido: '',
      correo: '',
      codigoUnico: '',
      ruta: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (newRecord) => {
    if (currentRecord && currentRecord.id !== null) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === currentRecord.id ? { ...item, ...newRecord } : item
        )
      );
    } else {
      const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
      setData((prevData) => [...prevData, { id: newId, ...newRecord }]);
    }
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handleDeleteClick = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="administrador-estudiantes">
      <Encabezado />
      <div className="contenido-principal">
        <BarraLateral
          userName="Luisa Casas"
          userRole="Administrador"
          userIcon="https://cdn-icons-png.flaticon.com/512/5322/5322033.png"
          menuItems={[
            { label: 'Inicio', link: '/' },
            { label: 'Estudiantes', link: '/estudiantes' },
            { label: 'Conductores', link: '/conductores' },
            { label: 'Rutas', link: '/rutas' },
          ]}
        />
        <div className="contenido-tabla">
          <FiltradoAgregado
            filterOptions={filterOptions}
            filterText={filterText}
            addLabel="Agregar estudiante"
            onFilterApply={handleFilterApply}
            onAddClick={handleAddClick}
            onClearFilter={handleClearFilter}
            onFilterTextChange={setFilterText}
          />

          <Tabla
            columns={columns}
            data={filteredData}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
      {isModalOpen && (
        <AgregadoEditado
          title={currentRecord?.id ? 'Editar Estudiante' : 'Agregar Estudiante'}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentRecord(null);
          }}
          onSave={handleSave}
          fields={[
            {
              label: 'Nombre',
              name: 'nombre',
              value: currentRecord?.nombre || '',
              onChange: (value) =>
                setCurrentRecord((prev) => ({ ...prev, nombre: value })),
              validate: (value) =>
                /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)
                  ? ''
                  : 'El nombre solo debe contener letras y tildes.',
            },
            {
              label: 'Apellido',
              name: 'apellido',
              value: currentRecord?.apellido || '',
              onChange: (value) =>
                setCurrentRecord((prev) => ({ ...prev, apellido: value })),
              validate: (value) =>
                /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)
                  ? ''
                  : 'El apellido solo debe contener letras y tildes.',
            },
            {
              label: 'Correo',
              name: 'correo',
              value: currentRecord?.correo || '',
              onChange: (value) =>
                setCurrentRecord((prev) => ({ ...prev, correo: value })),
              validate: (value) =>
                /^[a-zA-Z0-9._%+-]+@epn\.edu\.ec$/.test(value)
                  ? ''
                  : 'El correo debe tener el formato @epn.edu.ec.',
            },
            {
              label: 'Código Único',
              name: 'codigoUnico',
              value: currentRecord?.codigoUnico || '',
              onChange: (value) =>
                setCurrentRecord((prev) => ({ ...prev, codigoUnico: value })),
              validate: (value) =>
                /^\d{9}$/.test(value)
                  ? ''
                  : 'El código único debe contener exactamente 9 números.',
            },
            {
              label: 'Ruta',
              name: 'ruta',
              value: currentRecord?.ruta || '',
              onChange: (value) =>
                setCurrentRecord((prev) => ({ ...prev, ruta: value })),
              validate: (value) =>
                /^[1-9]$|^1[0-8]$/.test(value)
                  ? ''
                  : 'La ruta debe ser un número entre 1 y 18.',
            },
          ]}
        />
      )}
    </div>
  );
};

export default AdministradorEstudiantes;
