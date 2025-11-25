import React, { useState } from "react";
import "../../assets/css/miPagina.css";
import Footer from '../../components/miPagina/Footer'
import { useMiPagina } from "../../hooks/useMiPagina";

const Contactanos = () => {

  const initial = {
    NombreCliente: '',
    CorreoElectronico: '',
    mensaje: '',
    EstadoMensaje: 'pendiente'
  }

  const {
    textosEditables,
    handleChange,
    handleSubmit,
    mensajeData,
  } = useMiPagina(initial);

  const {
    NombreCliente,
    CorreoElectronico,
    mensaje
  } = mensajeData;


  return (
    <div className="page">

      {/* Sección de contacto */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>{textosEditables.tituloContactanos}</h2>
          <p>
            {textosEditables.descripcionContactanos}
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="Inputs-Contactanos">
              <label htmlFor="NombreCliente">Nombre</label>
              <input
                type="text"
                id="NombreCliente"
                name="NombreCliente"
                placeholder="Tu nombre"
                value={NombreCliente}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Inputs-Contactanos">
              <label htmlFor="CorreoElectronico">Correo Electrónico</label>
              <input
                type="email"
                id="CorreoElectronico"
                name="CorreoElectronico"
                placeholder="tuemail@ejemplo.com"
                value={CorreoElectronico}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Inputs-Contactanos">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                placeholder="Escribe tu mensaje aquí..."
                value={mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-enviar">
              {textosEditables.tituloBotonEnviar}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contactanos;
