import './App.css';
import React, { useState, useEffect } from 'react';
import BarraNav from './Componentes/BarraNav';
import Encabezado from './Componentes/Encabezado';
import axios from "axios";

const App = () => {
  const [rutas, setRutas] = useState([]);
  const [estudiantesRutas, setEstudiantesRutas] = useState([]);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState(null);
  const [selectedRutaId, setSelectedRutaId] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState(null); // Estado para controlar detalles visibles

  // Cargar rutas con get
  useEffect(() => {
    axios.get('http://localhost:3000/rutas')
      .then(res => {
        console.log("R. Exitosa:", res);
        setRutas(res.data);
      })
      .catch(err => {
        console.log("R. Fallida: ", err);
      });
  }, []);

  // Cargar estudiantes para asociar rutas
  useEffect(() => {
    axios.get('http://localhost:3000/estudiantesRutas')
      .then(res => {
        console.log("R. Exitosa:", res);
        setEstudiantesRutas(res.data);
      })
      .catch(err => {
        console.log("R. Fallida: ", err);
      });
  }, []);

  // Manejar cambio de selección de estudiante
  const handleEstudianteChange = (e) => {
    setSelectedEstudianteId(e.target.value);
  };

  // Manejar clic en ruta
  const handleRutaClick = (id) => {
    if (selectedEstudianteId) {
      setSelectedRutaId(id);

      // Buscar el estudiante seleccionado
      const estudianteSeleccionado = estudiantesRutas.find(estudiante => estudiante.id === selectedEstudianteId);

      if (estudianteSeleccionado) {
        // Actualizar el estudiante con la nueva ruta
        const updatedEstudiante = {
          ...estudianteSeleccionado,
          id_ruta: id // Solo actualizamos el campo id_ruta
        };

        // Actualizar la ruta en el estudiante
        axios.put(`http://localhost:3000/estudiantesRutas/${selectedEstudianteId}`, updatedEstudiante)
          .then(res => {
            console.log("Ruta actualizada:", res);

            // Actualizar el estado de los estudiantesRutas después de la actualización
            setEstudiantesRutas(prevState =>
              prevState.map(estudiante =>
                estudiante.id === selectedEstudianteId
                  ? { ...estudiante, id_ruta: id }
                  : estudiante
              )
            );
          })
          .catch(err => {
            console.log("Error al actualizar la ruta:", err);
          });
      }
    } else {
      alert('Por favor, selecciona un estudiante primero.');
    }

    // Alternar visibilidad de detalles
    setVisibleDetails(prev => (prev === id ? null : id));
  };

  return (
    <div className="pantalla-estudiante-seleccion-de-parada-container1">
      <Encabezado />
      <div className="pantalla-estudiante-seleccion-de-parada-container3">
        <BarraNav />
        <section className="pantalla-estudiante-seleccion-de-parada-container4">
          {/* Listbox para seleccionar estudiante */}
          <select onChange={handleEstudianteChange}>
            <option value="">Seleccione un estudiante</option>
            {estudiantesRutas.map((estudiante) => (
              <option key={estudiante.id} value={estudiante.id}>
                {estudiante.nombre} - Ruta {estudiante.id_ruta}
              </option>
            ))}
          </select>

          <div className="container">
            <h1>Seleccione su ruta:</h1>
            {rutas.map((ruta, index) => (
              <div
                key={index}
                className="route-card"
                onClick={() => handleRutaClick(ruta.id)} // Asocia ruta al estudiante
              >
                <h2>{ruta.nombre}</h2>
                {selectedRutaId === ruta.id && (
                    <div class="details" style={{ display: visibleDetails === ruta.id ? 'block' : 'none' }}>
                      <p>{ruta.recorrido}</p>
                    </div>
                    )}        
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
