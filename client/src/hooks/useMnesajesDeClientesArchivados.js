import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { authHeader } from "../helpers/authHeader";

const useMnesajesDeClientesArchivados = () => {
    const [mensajes, setMensajes] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }


    const obtenerMensajesArchivados = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${API_BASE_URL}/api/contactanos/mensajes-archivados`, { headers: authHeader() })
            setMensajes(res.data.mensajesArchivados)

        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron obtener los mensajes de los clientes archivados',
            })

        }
        setLoading(false)
    }


    const actualizarMensajeActivo = async (id) => {
        try {
            await axios.put(`${API_BASE_URL}/api/contactanos/mensajes-vistos/${id}`, {}, { headers: authHeader() })
            Swal.fire({
                title: "¡Cambio de estado exitoso!",
                text: "El cambio de estado del mensaje ha sido exitoso",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            });

            obtenerMensajesArchivados()
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado del mensaje',
            });
        }
    }



    const eliminarMensajesArchivados = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto eliminará el mensaje por completo.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar mensaje",
            background: "#272727",
            color: "#c9c9c9",
        });

        setLoading(true)

        try {
            if (result.isConfirmed) {
                await axios.delete(`${API_BASE_URL}/api/contactanos/mensajesDelete/${id}`,
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Eliminación exitosa!",
                    text: "El mensaje ha sido eliminado exitosamente",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

                obtenerMensajesArchivados()
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el mensaje archivado',
            });
        }
        setLoading(false)
    }

    const volverAlInicio = () => {
        navigate('/dashboard/mensajesClientes')
    }

    useEffect(() => {
        obtenerMensajesArchivados()
    }, [])

    return {
        volverAlInicio,
        mensajes,
        eliminarMensajesArchivados,
        loading,
        actualizarMensajeActivo
    }

}

export default useMnesajesDeClientesArchivados
