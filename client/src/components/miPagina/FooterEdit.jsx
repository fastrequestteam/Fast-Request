
import React from 'react'
import '../../assets/css/miPagina.css'
import { useTextosEditables } from '../../hooks/useTextosEditables'
import EditableText from './EditTextFooter'
import { Link } from 'react-router-dom'
import HamburgerMenuLinks from './MenuLinks'

const FooterEdit = () => {

    const { textos, updateTexto, loading } = useTextosEditables();

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div>
                        <div className="logo">LOGO</div>
                        <p>
                            <EditableText
                                campo="caracteristicas"
                                textos={textos}
                                updateTexto={updateTexto}
                            />
                        </p>
                    </div>
                    <div>
                        <h3>
                            <EditableText
                                campo="tituloDeEnlaces"
                                textos={textos}
                                updateTexto={updateTexto}
                            />
                        </h3>
                        <ul>
                            <li><Link to="/miPagina/edit">Inicio</Link></li>
                            <li><Link to="/miPagina/carta/edit">Productos</Link></li>
                            <li><Link to="/miPagina/contacto/edit">Contacto</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3>
                            <EditableText
                                campo="tituloContacto"
                                textos={textos}
                                updateTexto={updateTexto}
                            />
                        </h3>
                        <p><ion-icon name="location-outline"></ion-icon> <EditableText
                            campo="localidad"
                            textos={textos}
                            updateTexto={updateTexto}
                        /></p>
                        <p><ion-icon name="call-outline"></ion-icon> <EditableText
                            campo="telefono"
                            textos={textos}
                            updateTexto={updateTexto}
                        /></p>
                        <p><ion-icon name="mail-outline"></ion-icon> <EditableText
                            campo="email"
                            textos={textos}
                            updateTexto={updateTexto}
                        /></p>
                    </div>
                    <div>
                        <h3>
                            <EditableText
                                campo="tituloRedes"
                                textos={textos}
                                updateTexto={updateTexto}
                            />
                        </h3>
                        <div className="socials">
                            <a
                                href={textos.linkFacebook || "https://www.facebook.com/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <ion-icon name="logo-facebook"></ion-icon>
                            </a>
                            <a
                                href={textos.linkTwitter || "https://x.com/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <ion-icon name="logo-twitter"></ion-icon>
                            </a>
                            <a
                                href={textos.linkInstagram || "https://www.instagram.com/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <ion-icon name="logo-instagram"></ion-icon>
                            </a>
                        </div>

                        <HamburgerMenuLinks textos={textos} updateTexto={updateTexto} />

                    </div>
                </div>
                <div className="copy">
                    <EditableText
                        campo="footerFinal"
                        textos={textos}
                        updateTexto={updateTexto}
                    />
                </div>
            </footer>
        </>
    )
}

export default FooterEdit
