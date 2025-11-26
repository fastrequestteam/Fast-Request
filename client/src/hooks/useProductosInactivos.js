import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import Swal from "sweetalert2";

export const useProductosInactivos = () => {

    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }


    const visualizarProductosInactivos = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/productos/Productos-inactivos`, {
                headers: authHeader(),
            })
            setProductos(res.data)
        } catch (error) {
            console.error('Error al obtener los productos inactivos: ', err)
        }
    }

    const cambiarEstadoProducto = async (Id) => {
        try {
            await axios.put(`${API_BASE_URL}/api/productos/CambiarActivo/${Id}`,
                {},
                {
                    headers: authHeader()
                })

            Swal.fire({
                title: '¡Cambio de estado exitoso!',
                text: 'El producto ha sido activado',
                icon: 'success',
                background: '#272727',
                color: '#c9c9c9'
            })

            visualizarProductosInactivos();
        } catch (error) {
            console.error('Error al cambiar el estado del producto: ', error);
            Swal.fire({
                title: 'Error',
                text: 'No se puedo cambiar el estado del producto.',
                icon: 'error',
                background: '#272727',
                color: '#c9c9c9'
            })
        }
    }

    const volverAlInicio = (e) => {
        e.preventDefault();
        navigate('/dashboard/productos');
    };

    useEffect(() => {
        visualizarProductosInactivos()
    }, []);

    return {
        productos,
        cambiarEstadoProducto,
        volverAlInicio
    }
}