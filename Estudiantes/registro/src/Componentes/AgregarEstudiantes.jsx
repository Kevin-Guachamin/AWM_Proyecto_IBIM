import React, { useState } from 'react';
import axios from 'axios';

const AgregarEstudiante = (props) => {
    const [datosFormEstudiante, setDatosFormEstudiante] = useState({
        id: "",
        nombre: "",
        correo: "",
        codigo: "",
        contrasenia: "",
    });

    const handleAgregarEstudiante = (e) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value } = e.target;
        setDatosFormEstudiante({ ...datosFormEstudiante, [name]: value })
    }


    const { onAgregarEstudiante } = props;

    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        codigo: "",
        contrasenia: "",
    });

    const handleSubmitEstudiante = (e) => {
        e.preventDefault();
        const form = e.target;

        // Obtener valores de los campos
        const nombre = form.nombre.value;
        const correo = form.correo.value;
        const codigo = form.codigo.value;
        const contrasenia = form.contrasenia.value;

        let isValid = true;
        const nuevosErrores = { nombre: "", correo: "", codigo: "", contrasenia: "" };

        // Validar nombre
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
            nuevosErrores.nombre = "El nombre solo puede contener letras y espacios.";
            isValid = false;
        }

        // Validar correo
        if (!/^[a-zA-Z0-9._%+-]+@epn\.edu\.ec$/.test(correo)) {
            nuevosErrores.correo = "El correo debe terminar en @epn.edu.ec.";
            isValid = false;
        }

        // Validar código único
        if (!/^\d{8}$/.test(codigo)) {
            nuevosErrores.codigo = "El código debe tener exactamente 8 números.";
            isValid = false;
        }

        // Validar contraseña
        if (contrasenia.length < 5) {
            nuevosErrores.contrasenia = "La contraseña debe tener al menos 5 caracteres.";
            isValid = false;
        }

        setErrores(nuevosErrores);

        if (isValid) {
            alert("Formulario enviado correctamente.");
            // se maneja el envío del fomrulario
            axios.post('http://localhost:3000/estudiantes', datosFormEstudiante)
            .then(res => {
                console.log("Insercion Exitosa");
                onAgregarEstudiante(datosFormEstudiante);
            })
            .catch(err => {
                console.log("Insercion Fallida");
            })
        } else {
            alert("Por favor, corrige los errores antes de enviar el formulario.");
        }
    };

    return (
        <div className="container4">
            <h1 className="titulo">Registro de Estudiantes</h1>
            <form id="formRegistrar" onSubmit={handleSubmitEstudiante}>
                <div className="container5">
                    <label className="campo-titulo">Nombre y Apellido</label>
                    <input
                        id="nombre"
                        name="nombre"
                        placeholder="Ingrese su nombre y su primer apellido"
                        className="campo-texto"
                        value={datosFormEstudiante.nombre}
                        onChange={handleAgregarEstudiante}
                    />
                    <span className="error">{errores.nombre}</span>
                </div>
                <div className="container5">
                    <label className="campo-titulo">Correo Institucional</label>
                    <input
                        id="correo"
                        name="correo"
                        placeholder="alguien@epn.edu.ec"
                        className="campo-texto"
                        value={datosFormEstudiante.correo}
                        onChange={handleAgregarEstudiante}
                    />
                    <span className="error">{errores.correo}</span>
                </div>
                <div className="container5">
                    <label className="campo-titulo">Código Único</label>
                    <input
                        id="codigo"
                        name="codigo"
                        placeholder="Ingrese su código único"
                        className="campo-texto"
                        value={datosFormEstudiante.codigo}
                        onChange={handleAgregarEstudiante}
                    />
                    <span className="error">{errores.codigo}</span>
                </div>
                <div className="contraseña-registro">
                    <label className="contraseña-titulo">Contraseña</label>
                    <input
                        id="contrasenia"
                        name="contrasenia"
                        type="password"
                        placeholder="Cree una Contraseña"
                        className="contraseña-relleno"
                        value={datosFormEstudiante.contrasenia}
                        onChange={handleAgregarEstudiante}
                    />
                    <span className="error">{errores.contrasenia}</span>
                </div>
                <div className="boton">
                    <button type="submit" className="boton-registrar">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AgregarEstudiante;