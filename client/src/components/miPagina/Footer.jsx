
import React from 'react'
import '../../assets/css/miPagina.css'
import { useMiPagina } from '../../hooks/useMiPagina'
import { Link, useParams } from "react-router-dom";

const Footer = () => {

    const { textosEditables } = useMiPagina();
    const { empresaSlug } = useParams();

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div>
                        <div className="logo">LOGO</div>
                        <p>{textosEditables.caracteristicas}</p>
                    </div>
                    <div>
                        <h3>{textosEditables.tituloDeEnlaces}</h3>
                        <ul>
                            <li><Link to={`/miPagina/${empresaSlug}`} >Inicio</Link></li>
                            <li><Link to={`/miPagina/${empresaSlug}/carta`} >Carta</Link></li>
                            <li><Link to={`/miPagina/${empresaSlug}/contacto`} >Contáctanos</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3>{textosEditables.tituloContacto}</h3>
                        <p><ion-icon name="location-outline"></ion-icon> {textosEditables.localidad}</p>
                        <p><ion-icon name="call-outline"></ion-icon> {textosEditables.telefono}</p>
                        <p><ion-icon name="mail-outline"></ion-icon> {textosEditables.email}</p>
                    </div>
                    <div>
                        <h3>{textosEditables.tituloRedes}</h3>
                        <div className="socials">
                            <a
                                href={textosEditables.linkFacebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a
                                href={textosEditables.linkTwitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ion-icon name="logo-twitter">
                                </ion-icon>
                            </a>
                            <a
                                href={textosEditables.linkInstagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="copy">© 2025 Tu Empresa. Todos los derechos reservados.</div>
            </footer>
        </>
    )
}

export default Footer
