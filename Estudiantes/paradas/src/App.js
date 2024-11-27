import './App.css';
import React, { useState, useEffect } from 'react'; 
import BarraNav from './Componentes/BarraNav';
import Encabezado from './Componentes/Encabezado';
import axios from 'axios'; 

const App = () => {
  // Estado para almacenar las paradas
  const [paradas, setParadas] = useState([]);
  const [estudiantesRutasParadas, setEstudiantesRutasParadas] = useState([]);
  const [selectedEstudianteId, setSelectedEstudianteId] = useState(null);
  const [selectedParadaId, setSelectedParadaId] = useState(null); // Corregir este estado
  const [visibleDetails, setVisibleDetails] = useState(null); // Estado para controlar detalles visibles

  // Cargar paradas desde el db.json
  useEffect(() => {
    axios.get('http://localhost:3000/paradas')
      .then(res => {
        console.log("Paradas cargadas:", res);
        setParadas(res.data); // Actualizar el estado con los datos
      })
      .catch(err => {
        console.log("Hubo un error al cargar las paradas:", err);
      });
  }, []); // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

   // Cargar estudiantes para asociar paradas
  useEffect(() => {
    axios.get('http://localhost:3000/estudiantesRutasParadas')
      .then(res => {
        console.log("R. Exitosa:", res);
        setEstudiantesRutasParadas(res.data);
      })
      .catch(err => {
        console.log("R. Fallida: ", err);
      });
  }, []);

  // Manejar cambio de selección de estudiante
  const handleEstudianteChange = (e) => {
    setSelectedEstudianteId(e.target.value);
  };

  // Manejar clic en parada
  const handleParadaClick = (id) => {
    if (selectedEstudianteId) {
      setSelectedParadaId(id);
      // Buscar el estudiante seleccionado
      const estudianteSeleccionado = estudiantesRutasParadas.find(estudiante => estudiante.id === selectedEstudianteId);

      if (estudianteSeleccionado) {
        // Actualizar el estudiante con la nueva parada
        const updatedEstudiante = {
          ...estudianteSeleccionado,
          id_parada: id // Solo actualizamos el campo id_parada
        };

        // Actualizar la parada en el estudiante
        axios.put(`http://localhost:3000/estudiantesRutasParadas/${selectedEstudianteId}`, updatedEstudiante)
          .then(res => {
            console.log("Parada actualizada:", res);

            // Actualizar el estado de los estudiantesRutas después de la actualización
            setEstudiantesRutasParadas(prevState =>
              prevState.map(estudiante =>
                estudiante.id === selectedEstudianteId
                  ? { ...estudiante, id_parada: id }
                  : estudiante
              )
            );
          })
          .catch(err => {
            console.log("Error al actualizar la parada:", err);
          });
      }
    } else {
      alert('Por favor, selecciona un estudiante primero.');
    }

    // Alternar visibilidad de detalles
    setVisibleDetails(prev => (prev === id ? null : id));
  };

  /*const toggleDetails = (card) => {
    const details = card.querySelector('.details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
  };*/

  return (
    <div className="container1">
      <Encabezado />
      <div className="container2">
        <BarraNav />
        <section className="pantalla-estudiante-seleccion-de-parada-container4">
          <div className="pantalla-estudiante-seleccion-de-parada-container5">
            <div className="pantalla-estudiante-seleccion-de-parada-container6">
              <div className="container">
                <select onChange={handleEstudianteChange}>
                  <option value="">Seleccione un estudiante</option>
                  {estudiantesRutasParadas.map((estudiante) => (
                    <option key={estudiante.id} value={estudiante.id}>
                      {estudiante.nombre} - Ruta {estudiante.id_ruta} - Parada {estudiante.id_parada}
                    </option>
                  ))}
                </select>
                <h1>Seleccione su parada:</h1>
                {paradas.map((parada, index) => (
                  <div
                    key={index}
                    className="bus-stop-card"
                    onClick={() => handleParadaClick(parada.id)} // Asocia parada al estudiante
                  >
                    <h2>{parada.nombre}</h2>
                    {selectedParadaId === parada.id && (
                    <div class="details" style={{ display: visibleDetails === parada.id ? 'block' : 'none' }}>
                      <p>Dirección: {parada.direccion}</p>
                    </div>
                    )}
                  </div>
                ))}      
              </div>
            </div>
          </div>
        <p id="seats-available" class="seats-available">Asientos disponibles: 20</p>
        </section>
      </div>
    </div>

    
  );
};

export default App;
