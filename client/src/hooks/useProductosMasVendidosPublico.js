import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

export const useProductosMasVendidosPublico = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/api/productos/productos-mas-vendidos`,
                    { headers: authHeader() }
                );
                setProductos(res.data);
            } catch (err) {
                console.error("Error cargando productos más vendidos", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { productos, loading };
};
