import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

const API_EMPRESA = "http://localhost:5000/api/empresa";

export const useMiPaginaInicioEdit = () => {

    const [empresaId, setEmpresaId] = useState(null);
    const [imagenNosotros, setImagenNosotros] = useState(null);
    const [previewNosotros, setPreviewNosotros] = useState(null);
    const [loading, setLoading] = useState(true);

    const obtenerDatosEmpresa = async () => {
        try {

            const { data } = await axios.get(
                `${API_EMPRESA}/ObtenerInformarcionEmpresa`,
                { headers: authHeader() }
            );

            setEmpresaId(data.Id);
            setImagenNosotros(data.SobreNosotros);

        } catch (error) {
            console.error("Error al obtener datos de la empresa:", error);
        } finally {
            setLoading(false);
        }
    };

    const subirImagenNosotros = async (file) => {
        const formData = new FormData();
        formData.append("imagen", file);

        const response = await axios.put(
            `${API_EMPRESA}/NosotrosImagen/${empresaId}/imagen`,
            formData,
            {
                headers: {
                    ...authHeader(),
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data.url;
    };

    const handleSubirImagenNosotros = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreviewNosotros(URL.createObjectURL(file));

        Swal.fire({
            title: "Subiendo imagen...",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const url = await subirImagenNosotros(file);
            setImagenNosotros(url);

            Swal.fire({
                icon: "success",
                title: "Imagen actualizada",
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema al subir la imagen.",
            });
        }
    };

    useEffect(() => {
        obtenerDatosEmpresa();
    }, []);

    return {
        empresaId,
        imagenNosotros,
        previewNosotros,
        handleSubirImagenNosotros,
        loading,
    };
};
