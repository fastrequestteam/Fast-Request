import { useEffect, useState } from 'react'
import axios from 'axios'
import { authHeader } from '../helpers/authHeader'

export const usePedidoCompleto = (id) => {

    const [dataPedido, setDataPedido] = useState(null)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }

    const getPedidoCompleto = async () => {
        try {

            const res = await axios.get(
                `${API_BASE_URL}/api/pedidos/pedidoFull/${id}`,
                {
                    headers: authHeader()
                }
            )

            setDataPedido(res.data.data)
            console.log('Pedido obtenido de manera correcta')

        } catch (err) {
            console.error('Error al obtener el pedido completo', err)
        }
    }

    useEffect(() => {
        if (id) {
            getPedidoCompleto()
        }
    }, [id])

    return {
        dataPedido,
    }
}
