import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { authHeader } from "../helpers/authHeader";
import Swal from 'sweetalert2';


export const useContactanos = () => {

    const [mensajes, setMensajes] = useState([])
    const [loading, setLoading] = useState(false)



    const obtenermensajes = async () => {
        setLoading(true)
        try {

            const res = await axios.get('http://localhost:5000/api/contactanos/mensajes', { headers: authHeader() })
            setMensajes(res.data.mensajesPendientes)
        }

        catch (error) {
            console.log(error),
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron obtener los mensajes de los clientes',
                })
        }
        setLoading(false)
    }


    const actualizarMensajeActivo = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/contactanos/mensajes-vistos/${id}`, {}, { headers: authHeader() })
            Swal.fire({
                title: "¡Cambio de estado exitoso!",
                text: "El cambio de estado del mensaje ha sido exitoso",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            });

            obtenermensajes()
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado del mensaje',
            });
        }
    }

    const actualizarMensajeArchivado = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto archivará el mensaje.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, archivar mensaje",
            background: "#272727",
            color: "#c9c9c9",
        });

        setLoading(true)

        try {

            if (result.isConfirmed) {
                await axios.put(`http://localhost:5000/api/contactanos/mensajes-archivados/${id}`,
                    {},
                    {
                        headers: authHeader()
                    }
                )
                Swal.fire({
                    title: "¡Cambio de estado exitoso!",
                    text: "El cambio de estado del mensaje ha sido exitoso",
                    icon: "success",
                    background: "#272727",
                    color: "#c9c9c9",
                });

                obtenermensajes()
            }

        } catch (err) {
            console.error("Error al cambiar el estado del mensaje:", err);
            Swal.fire({
                title: "Error",
                text: 'Error al cambiar el estado del mensaje',
                icon: "error",
                background: "#272727",
                color: "#c9c9c9",
            });
        }
        setLoading(false)
    }


    useEffect(() => {
        obtenermensajes()
    }, [])

    return {
        mensajes,
        loading,
        actualizarMensajeActivo,
        actualizarMensajeArchivado
    }
}


