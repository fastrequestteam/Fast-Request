import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { authHeader } from "../helpers/authHeader";

export const useTextosEditables = () => {

    const [textos, setTextos] = useState({});
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL is not defined");
    }

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/textos-editables/find-text-edit`, { headers: authHeader() })
            .then(res => {
                const map = {};
                res.data.forEach(t => { map[t.campo] = t.valor; });
                setTextos(map);
                setLoading(false);
            });
    }, []);


    const updateTexto = async (campo, valor) => {
        setTextos(prev => ({ ...prev, [campo]: valor }));
        await axios.put(`${API_BASE_URL}/api/textos-editables/edit-text/${campo}`, { valor }, { headers: authHeader() });
    };

    return {
        textos,
        updateTexto,
        loading
    };
}

