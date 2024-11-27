import React, { useState } from 'react';
import './VistaAgregado.css';

const VistaAgregadoConductor = ({ isEdit = false, initialData = {} }) => {
  const [formData, setFormData] = useState({
    ruta: initialData.ruta || '',
    recorrido: initialData.recorrido || '',
    paradas: initialData.paradas || ''
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isEdit ? 'Editar Ruta' : 'Agregar Ruta'}</h2>
        <div className="form-group">
          <label>Ruta:</label>
          <input
            type="text"
            placeholder="Ruta"
            value={formData.ruta}
            onChange={(e) => handleChange('ruta', e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Recorrido:</label>
          <textarea
            placeholder="Recorrido"
            value={formData.recorrido}
            onChange={(e) => handleChange('recorrido', e.target.value)}
            className="form-input textarea-input"
          />
        </div>
        <div className="form-group">
          <label>Paradas:</label>
          <textarea
            placeholder="Paradas"
            value={formData.paradas}
            onChange={(e) => handleChange('paradas', e.target.value)}
            className="form-input textarea-input"
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary">{isEdit ? 'Guardar Cambios' : 'Guardar'}</button>
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default VistaAgregadoConductor;
