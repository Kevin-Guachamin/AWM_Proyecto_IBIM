import React from 'react';
import './VistaAgregado.css';

const VistaAgregadoConductor = () => {
  const formData = {
    nombre: '',
    apellido: '',
    correo: '',
    numeroCelular: '',
    ruta: ''
  };

  const fields = [
    { label: 'Nombre', placeholder: 'Nombre', value: formData.nombre },
    { label: 'Apellido', placeholder: 'Apellido', value: formData.apellido },
    { label: 'Correo', placeholder: 'Correo', value: formData.correo, type: 'email' },
    { label: 'Número Celular', placeholder: 'Número Celular', value: formData.numeroCelular },
    { label: 'Ruta', placeholder: 'Ruta', value: formData.ruta }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Conductor</h2>
        {fields.map((field, index) => (
          <div className="form-group" key={index}>
            <label>{field.label}</label>
            <input
              type={field.type || 'text'}
              placeholder={field.placeholder}
              defaultValue={field.value}
              className="form-input"
            />
          </div>
        ))}
        <div className="modal-actions">
          <button className="btn btn-primary">Guardar</button>
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default VistaAgregadoConductor;
