import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useContactanosEmpresas = (initial) => {

    const [mensajesData, setMensajesData] = useState(initial)

    const handleOnchangeInput = ({ target }) => {
        const { name, value } = target
        setMensajesData({
            ...mensajesData,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://fast-request-back.onrender.com/api/contactanos/enviar-mensaje-empresas', {
                name: mensajesData.name, 
                email: mensajesData.email, 
                message: mensajesData.message
            })
            setMensajesData(res.data)
            Swal.fire({
                title: "¡Mensaje enviado!",
                text: "Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.",
                icon: "success",
                background: "#272727",
                color: "#c9c9c9",
            })
            
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
            })
        }

        setMensajesData({
            name: '',
            email: '',
            message: ''
        })
    
    }




    return {
        handleSubmit,
        handleOnchangeInput,
        mensajesData
    }
}
