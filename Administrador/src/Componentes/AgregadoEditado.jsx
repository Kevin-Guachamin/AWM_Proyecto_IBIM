import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AgregadoEditado.css';

const AgregadoEditado = ({ title, fields, isOpen, onClose, onSave, className }) => {
  const [errors, setErrors] = useState({}); // Estado para los errores de validación

  if (!isOpen) return null;

  const validateField = (field) => {
    const value = field.value.trim();
    if (field.validate) {
      const error = field.validate(value);
      return error;
    }
    return '';
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};
    const newRecord = fields.reduce((record, field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field.name] = error;
      }
      record[field.name] = field.value.trim(); // Construir el registro limpio
      return record;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(newRecord); // Si no hay errores, enviar el registro
    }
  };

  return (
    <div className={`modal-overlay ${className || ''}`}>
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSave}>
          {fields.map((field, index) => (
            <div className="form-group" key={index}>
              <label>{field.label}</label>
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                value={field.value}
                className={field.className || ''} // Aplica la clase personalizada si existe
                onChange={(e) => field.onChange(e.target.value)}
                required
              />
              {errors[field.name] && (
                <div className="error-message">{errors[field.name]}</div>
              )}
            </div>
          ))}
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AgregadoEditado.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      readOnly: PropTypes.bool,
      type: PropTypes.string,
      validate: PropTypes.func, // Función de validación personalizada
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AgregadoEditado;
