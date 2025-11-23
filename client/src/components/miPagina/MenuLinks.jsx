import React, { useState } from "react";
import EditableLink from "./LinksEditables";


const HamburgerMenuLinks = ({ textos, updateTexto }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="hamburger-container">
            <a
                onClick={() => setOpen(!open)}
                className="link-open-modal"
            >
                Añadir enlaces!
            </a>

            {open && (
                <div className="hamburger-overlay">
                    <div className="hamburger-menu">
                        <h2 className="hamburger-title">Editar enlaces de redes sociales</h2>

                        <label className="hamburger-label">
                            Facebook:
                            <EditableLink
                                campo="linkFacebook"
                                textos={textos}
                                updateTexto={updateTexto}
                                className="editable-link-input"
                            />
                        </label>

                        <label className="hamburger-label">
                            Twitter:
                            <EditableLink
                                campo="linkTwitter"
                                textos={textos}
                                updateTexto={updateTexto}
                                className="editable-link-input"
                            />
                        </label>

                        <label className="hamburger-label">
                            Instagram:
                            <EditableLink
                                campo="linkInstagram"
                                textos={textos}
                                updateTexto={updateTexto}
                                className="editable-link-input"
                            />
                        </label>

                        <button
                            onClick={() => setOpen(false)}
                            className="hamburger-close-btn"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenuLinks;
