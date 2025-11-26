import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { authHeader } from "../helpers/authHeader";
import Swal from "sweetalert2";

export const useVisualizarClientesInactivos = () => {

    const navigate = useNavigate();
    const [clientes, setClientes] = useState([])
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }


    const visualizarClientesConEstadoInactivo = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/clientes/inactivos`,
                {
                    headers: authHeader()
                }
            );
            setClientes(res.data);
        } catch (err) {
            console.error('Error al obtener los pedidos de cliente', err);
        }
    }

    const cambioDeEstadoCliente = async (id) => {
        try {
                await axios.put(`http://localhost:8080/clientes/${id}/estado`,
                    {},
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El cambio de estado del cliente a sido exitoso",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

            visualizarClientesConEstadoInactivo()

        } catch (err) {
            console.error("Error al cambiar el estado del cliente:", err);
            Swal.fire("Error", "No se a podido cambiar el estado del cliente", "error");
        }
    }

    const volverAlInicio = (e) => {
        e.preventDefault()
        navigate('/dashboard/clientes')
    }

    useEffect(() => {
        visualizarClientesConEstadoInactivo()
    }, [])

    return {
        volverAlInicio,
        clientes,
        cambioDeEstadoCliente
    }
}


