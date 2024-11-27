import React, { useState } from 'react';
import './VistaEditado.css';

const VistaEditadoRuta = () => {
  const [formData, setFormData] = useState({
    ruta: 'CAPULI', 
    recorrido: 'Ruta1 (Sur): EPN, Ladrón de Guevara, Av. Velasco Ibarra, Av. Pedro Vicente Maldonado, Av. Napo, calle Corazón, redondel de la Villaflora, Av. Pedro Vicente Maldonado hasta la parada El Capulí del eco-vía.', 
    paradas: 'EPN, Ladrón de Guevara, Villaflora, Capulí'
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Ruta</h2>
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
          <button className="btn btn-primary">Guardar</button>
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default VistaEditadoRuta;
