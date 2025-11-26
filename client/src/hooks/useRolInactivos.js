import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import Swal from "sweetalert2";

export const useRolInactivos = () => {

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }


    const visualizarRolesInactivos = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/rol/Roles-inactivos`, {
                headers: authHeader()
            })
            setRoles(res.data)
        } catch (error) {
            console.error('Error al obtener los roles inactivos:', error)
        }
    }

    const cambiarEstadoRol = async (Id) => {
        try {
            await axios.put(`${API_BASE_URL}/api/rol/CambiarActivo/${Id}`, {},
                {
                    headers: authHeader()
                }
            )

            Swal.fire({
                title: '¡Cambio de estado exitoso!',
                text: 'El producto ha sido activado',
                icon: 'success',
                background: '#272727',
                color: '#c9c9c9'
            })
            visualizarRolesInactivos();
        } catch (error) {
            console.error('Error al cambiar el estado del producto: ', error);
            Swal.fire({
                title: 'Error',
                text: 'No se puedo cambiar el estado del rol.',
                icon: 'error',
                background: '#272727',
                color: '#c9c9c9'
            })
        }
    }

    const volverAlInicio = (e) => {
        e.preventDefault();
        navigate('/dashboard/roles')
    }

    useEffect(() => {
        visualizarRolesInactivos()
    }, []);

    return {
        roles,
        cambiarEstadoRol,
        volverAlInicio
    }
}