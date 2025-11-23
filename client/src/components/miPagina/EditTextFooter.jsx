import React, { useState } from "react";

const EditableText = ({ campo, textos, updateTexto, className }) => {
    const [editing, setEditing] = useState(false);

    const valoresPorDefecto = {
        caracteristicas: "Tu tienda de confianza con los mejores productos y precios increíbles.",
        tituloDeEnlaces: "Enlaces Rápidos",
        tituloContacto: "Contacto",
        localidad: "Medellín, Colombia",
        telefono: "+57 300 123 4567",
        email: "info@empresa.com",
        tituloRedes: "Síguenos",
        footerFinal: "© 2025 Tu Empresa. Todos los derechos reservados."
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
        <span onDoubleClick={() => setEditing(true)} className={className}>
            {editing ? (
                campo === "caracteristicas" || campo === "footerFinal" ? (
                    <textarea
                        autoFocus
                        value={valor}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => updateTexto(campo, e.target.value)}
                        onBlur={() => setEditing(false)}
                        className="editable-textarea"
                    />
                ) : (
                    <input
                        autoFocus
                        value={valor}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => updateTexto(campo, e.target.value)}
                        onBlur={() => setEditing(false)}
                        className="editable-input"
                    />
                )
            ) : (
                valor || <span style={{ color: '#999', cursor: 'pointer' }}>Haz doble click para editar</span>
            )}
        </span>
    );
};

export default EditableText;

