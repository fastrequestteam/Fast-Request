import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not defined");
}


const API_EMPRESA = `${API_BASE_URL}/api/empresa`;

export const useMiPaginaInicioEditSlider = () => {

    const [empresaId, setEmpresaId] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1️⃣ Obtener empresa y slider
    const obtenerSlider = async () => {
        try {
            const { data } = await axios.get(
                `${API_EMPRESA}/ObtenerInformarcionEmpresa`,
                { headers: authHeader() }
            );

            setEmpresaId(data.Id);
            setSliderImages(data.SliderImagenes || []);

        } catch (error) {
            console.error("Error cargando slider:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2️⃣ Subir imagen al slider
    const agregarImagenSlider = async (file) => {
        const formData = new FormData();
        formData.append("imagen", file);

        const { data } = await axios.put(
            `${API_EMPRESA}/slider/${empresaId}/agregar`,
            formData,
            {
                headers: {
                    ...authHeader(),
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        setSliderImages(data.SliderImagenes);
    };

    // 3️⃣ Eliminar imagen del slider
    const eliminarImagenSlider = async (url) => {
        const { data } = await axios.delete(
            `${API_EMPRESA}/slider/${empresaId}/eliminar`,
            {
                headers: authHeader(),
                data: { url }
            }
        );

        setSliderImages(data.SliderImagenes);
    };

    useEffect(() => {
        obtenerSlider();
    }, []);

    return {
        sliderImages,
        agregarImagenSlider,
        eliminarImagenSlider,
        loading
    };
};
