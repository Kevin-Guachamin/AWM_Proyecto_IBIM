import React from 'react';

function Encabezado() {
        return (
            <div className="pantalla-estudiante-seleccion-de-parada-container2">
            <img
              alt='logo'
              src='https://ici2st.epn.edu.ec/eventosAnteriores/ICI2ST2023/images/ici2st2023/Logo_EPN.png'
              className="logo-epn"
            />
            <h2 className="titulo-sistema">Sistema de Transporte Estudiantil</h2>
            <button type="button" className="boton-salir">
              <svg
                viewBox="0 0 32 32"
                className="component9-icon10"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                >
                  <path
                    d="M12 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H12"
                    stroke-dasharray="32"
                    stroke-dashoffset="32"
                  >
                    <animate
                      dur="0.4s"
                      fill="freeze"
                      values="32;0"
                      attributeName="stroke-dashoffset"
                    ></animate>
                  </path>
                  <path
                    d="M9 12h11.5"
                    opacity="0"
                    stroke-dasharray="12"
                    stroke-dashoffset="12"
                  >
                    <set to="1" begin="0.5s" attributeName="opacity"></set>
                    <animate
                      dur="0.2s"
                      fill="freeze"
                      begin="0.5s"
                      values="12;0"
                      attributeName="stroke-dashoffset"
                    ></animate>
                  </path>
                  <path
                    d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
                    opacity="0"
                    stroke-dasharray="6"
                    stroke-dashoffset="6"
                  >
                    <set to="1" begin="0.7s" attributeName="opacity"></set>
                    <animate
                      dur="0.2s"
                      fill="freeze"
                      begin="0.7s"
                      values="6;0"
                      attributeName="stroke-dashoffset"
                    ></animate>
                  </path>
                </g>
              </svg>
            </button>
        </div>
        );
}
export default Encabezado;