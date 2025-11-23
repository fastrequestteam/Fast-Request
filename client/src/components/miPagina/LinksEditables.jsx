import React, { useState } from "react";

const EditableLink = ({ campo, textos, updateTexto }) => {
    const [open, setOpen] = useState(false);

    const valoresPorDefecto = {
        linkFacebook: "https://www.facebook.com/",
        linkTwitter: "https://x.com/",
        linkInstagram: "https://www.instagram.com/",
    };

    const valor = textos[campo] !== undefined && textos[campo] !== null
        ? textos[campo]
        : valoresPorDefecto[campo] || "";

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    };

    return (
        <span
            onDoubleClick={() => setOpen(true)}
        >
            {open ? (
                <input
                    type="text"
                    autoFocus
                    value={valor}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => updateTexto(campo, e.target.value)}
                    onBlur={() => setEditing(false)}
                    className="editable-input"
                    placeholder="Ingresa el enlace"
                />
            ) : (
                valor || <span style={{ color: '#999', cursor: 'pointer' }}>Haz doble click para editar</span>
            )}
        </span>
    );
};

export default EditableLink;

