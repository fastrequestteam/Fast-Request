import React from "react";
import "../../assets/css/miPagina.css";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import FooterEdit from '../../components/miPagina/FooterEdit'
import EditableText from "../../components/miPagina/EditTextHome";
import { useTextosEditables } from "../../hooks/useTextosEditables";

const ContactanosPageEdit = () => {



    const { textos, updateTexto } = useTextosEditables();


    return (
        <div className="page">
            {/* Navbar principal */}
            <NavbarMiPageEdit />
            {/* Sección de contacto */}
            <section className="contact-section">
                <div className="contact-container">
                    <h2>
                        <EditableText
                            campo="tituloContactanos"
                            textos={textos}
                            updateTexto={updateTexto}
                        />
                    </h2>
                    <p>
                        <EditableText
                            campo="descripcionContactanos"
                            textos={textos}
                            updateTexto={updateTexto}
                        />
                    </p>
                    <form className="contact-form">
                        <div className="Inputs-Contactanos">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Tu nombre"
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
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-enviar">
                            <EditableText
                                campo="tituloBotonEnviar"
                                textos={textos}
                                updateTexto={updateTexto}
                            />
                        </button>
                    </form>
                </div>
            </section>
            <FooterEdit />
        </div>
    );
};

export default ContactanosPageEdit;
