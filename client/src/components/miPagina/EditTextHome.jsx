import React, { useState } from "react";

const EditableText = ({ campo, textos, updateTexto, className }) => {
    const [editing, setEditing] = useState(false);

    const valoresPorDefecto = {
        tituloSobreNosotros: "Haz doble click para editar",
        descripcionSobreNosotros: "Haz doble click para editar",
        tituloProductos: "Haz doble click para editar",


        // Titilo Y descripcion en "Contactanos"
        tituloContactanos: "Haz doble click para editar",
        descripcionContactanos: "Haz doble click para editar",
        tituloBotonEnviar: "Haz doble click para editar",
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
                campo === "descripcionSobreNosotros" || campo === "descripcionContactanos" ? (
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

