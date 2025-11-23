import React, { useState } from "react";
import "../../assets/css/miPagina.css";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import { useNavigate } from "react-router-dom";
import FooterEdit from '../../components/miPagina/FooterEdit'

const ContactanosPageEdit = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¡Gracias por contactarnos! Te responderemos pronto.");
        setFormData({ nombre: "", email: "", mensaje: "" });
    };

    return (
        <div className="page">
            {/* Navbar principal */}
            <NavbarMiPageEdit />
            {/* Sección de contacto */}
            <section className="contact-section">
                <div className="contact-container">
                    <h2>Contáctanos</h2>
                    <p>
                        Si tienes alguna pregunta, sugerencia o deseas más información, no dudes en escribirnos.
                    </p>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="Inputs-Contactanos">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Tu nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Inputs-Contactanos">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="tuemail@ejemplo.com"
                                value={formData.email}
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
                                value={formData.mensaje}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-enviar">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </section>
            <FooterEdit />
        </div>
    );
};

export default ContactanosPageEdit;
