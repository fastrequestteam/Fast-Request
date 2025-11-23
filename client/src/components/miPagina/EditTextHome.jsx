import React, { useState } from "react";

const EditableText = ({ campo, textos, updateTexto, className }) => {
    const [editing, setEditing] = useState(false);

    const valoresPorDefecto = {
        tituloSobreNosotros: "Sobre Nosotros",
        descripcionSobreNosotros: "Contenido sobre nuestra empresa, misión, visión y valores.",
        tituloProductos: "Productos Más Comprados",
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
                campo === "descripcionSobreNosotros" ? (
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

