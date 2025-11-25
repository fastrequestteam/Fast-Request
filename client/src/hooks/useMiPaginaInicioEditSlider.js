import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

const API_EMPRESA = "https://fast-request-back.onrender.com/api/empresa";

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
