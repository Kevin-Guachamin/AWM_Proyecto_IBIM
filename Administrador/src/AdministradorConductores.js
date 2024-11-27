import React, { useState } from 'react';
import Encabezado from './Componentes/Encabezado';
import BarraLateral from './Componentes/BarraLateral';
import FiltradoAgregado from './Componentes/FiltradoAgregado';
import Tabla from './Componentes/Tabla';
import AgregadoEditado from './Componentes/AgregadoEditado';
import './AdministradorConductores.css';

const AdministradorConductores = () => {
  // Estado inicial de los conductores
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@gmail.com', cedula: '0987654321', ruta: '13' },
    { id: 2, nombre: 'María', apellido: 'Gómez', correo: 'maria.gomez@gmail.com', cedula: '0998765432', ruta: '11' },
    { id: 3, nombre: 'Carlos', apellido: 'López', correo: 'carlos.lopez@gmail.com', cedula: '0976543210', ruta: '10' },
    { id: 4, nombre: 'Ana', apellido: 'Martínez', correo: 'ana.martinez@gmail.com', cedula: '0965432109', ruta: '8' },
  ]);

  const [filterType, setFilterType] = useState(''); // Columna seleccionada para filtrar
  const [filterText, setFilterText] = useState(''); // Texto del filtro
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null); // Registro seleccionado para editar o agregar

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Apellido', accessor: 'apellido' },
    { header: 'Correo', accessor: 'correo' },
    { header: 'Cédula', accessor: 'cedula' },
    { header: 'Ruta', accessor: 'ruta' },
  ];

  const filterOptions = [
    { value: 'nombre', label: 'Nombre' },
    { value: 'apellido', label: 'Apellido' },
    { value: 'correo', label: 'Correo' },
    { value: 'cedula', label: 'Cédula' },
    { value: 'ruta', label: 'Ruta' },
  ];

  // Filtrar datos según columna y texto
  const filteredData = data.filter((item) => {
    if (!filterType || !filterText) return true; // Si no hay filtro, muestra todo
    const valueToFilter = item[filterType]?.toString().toLowerCase() || '';
    return valueToFilter.includes(filterText.toLowerCase());
  });

  // Manejo de filtros
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

  // Manejo del modal
  const handleAddClick = () => {
    setCurrentRecord({
      id: null,
      nombre: '',
      apellido: '',
      correo: '',
      cedula: '',
      ruta: '',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (newRecord) => {
    const isValid = Object.values(newRecord).every((value) => value.trim() !== '');
    if (!isValid) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (currentRecord && currentRecord.id !== null) {
      // Actualizar registro existente
      setData((prevData) =>
        prevData.map((item) => (item.id === currentRecord.id ? { ...item, ...newRecord } : item))
      );
    } else {
      // Agregar nuevo registro
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
    <div className="administrador-conductores">
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
            filterText={filterText} // Pasa el texto del filtro
            addLabel="Agregar conductor"
            onFilterApply={handleFilterApply}
            onAddClick={handleAddClick}
            onClearFilter={handleClearFilter}
            onFilterTextChange={setFilterText} // Actualiza el estado del filtro
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
        title={currentRecord?.id ? 'Editar Conductor' : 'Agregar Conductor'}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentRecord(null);
        }}
        onSave={(record) => handleSave(record)}
        fields={[
          {
            label: 'Nombre',
            name: 'nombre',
            value: currentRecord?.nombre || '',
            onChange: (value) => setCurrentRecord((prev) => ({ ...prev, nombre: value })),
            validate: (value) =>
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)
                ? ''
                : 'El nombre solo debe contener letras y tildes.',
          },
          {
            label: 'Apellido',
            name: 'apellido',
            value: currentRecord?.apellido || '',
            onChange: (value) => setCurrentRecord((prev) => ({ ...prev, apellido: value })),
            validate: (value) =>
              /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)
                ? ''
                : 'El apellido solo debe contener letras y tildes.',
          },
          {
            label: 'Correo',
            name: 'correo',
            value: currentRecord?.correo || '',
            onChange: (value) => setCurrentRecord((prev) => ({ ...prev, correo: value })),
            validate: (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                ? ''
                : 'El correo no es válido.',
          },
          {
            label: 'Número de Celular',
            name: 'cedula',
            value: currentRecord?.cedula || '',
            onChange: (value) => setCurrentRecord((prev) => ({ ...prev, cedula: value })),
            validate: (value) =>
              /^0\d{9}$/.test(value)
                ? ''
                : 'El número de celular debe tener 10 dígitos y empezar con 0.',
          },
          {
            label: 'Ruta',
            name: 'ruta',
            value: currentRecord?.ruta || '',
            onChange: (value) => setCurrentRecord((prev) => ({ ...prev, ruta: value })),
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

export default AdministradorConductores;
