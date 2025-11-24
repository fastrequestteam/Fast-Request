import { useEffect, useState } from "react";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

export const useProductosMasVendidosPublico = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/productos/productos-mas-vendidos",
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
