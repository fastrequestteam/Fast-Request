// src/hooks/useMiPaginaEdit.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";

const API_URL = "http://localhost:5000/api/categorias/";
const API_URL2 = "http://localhost:5000/api/productos/";
const API_URL3 = "http://localhost:5000/api/complementos/obtener-salsas";
const API_URL4 = "http://localhost:5000/api/complementos/obtener-gaseosas";

export const useMiPaginaEdit = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [salsas, setSalsas] = useState([]);
  const [gaseosas, setGaseosas ] = useState([]);

  const VisualizarCategoriasMenu = async () => {
    try {
      const res = await axios.get(API_URL, { headers: authHeader() });
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      Swal.fire("Error", "No se pudo cargar categorías", "error");
    }
  };

  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL2, { headers: authHeader() });
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos");
      Swal.fire("Error", "Error al cargar productos", "error");
    }
  };

  const cargarSalsas = async () => {
    try {
      const res = await axios.get(API_URL3, { headers: authHeader() });
      setSalsas(res.data.salsas);
    } catch (error) {
      console.error("Error al cargar las salsas");
      Swal.fire("Error", "Error al cargar salsas", "error");
    }
  }
  
  const cargarGaseosas = async () => {
    try {
      const res = await axios.get(API_URL4, { headers: authHeader() });
      setGaseosas(res.data.gaseosas);
    } catch (error) {
      console.error("Error al cargar las gaseosas");
      Swal.fire("Error", "Error al cargar gaseosas", "error");
    }
  }

  const subirImagen = async (tipo, id, archivo) => {
  if (!archivo) return;

  Swal.fire({
    title: 'Subiendo imagen...',
    text: "Espera un poco, la imagen se está subiendo 🚀!",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const formData = new FormData();
    formData.append("imagen", archivo);

    let endpoint = "";
    if (tipo === "producto") endpoint = `http://localhost:5000/api/productos/productoImagen/${id}/imagen`;
    if (tipo === "salsa") endpoint = `http://localhost:5000/api/complementos/salsasImagen/${id}/imagen`;
    if (tipo === "gaseosa") endpoint = `http://localhost:5000/api/complementos/gaseosasImagen/${id}/imagen`;

    await axios.put(endpoint, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });

    // Recargar datos
    await Promise.all([
      cargarProductos(),
      cargarSalsas(),
      cargarGaseosas(),
    ]);

    Swal.fire({
      icon: "success",
      title: "Imagen actualizada",
      timer: 1200,
    });

  } catch (error) {
    console.error("Error al subir imagen:", error);
    Swal.fire("Error", "No se pudo actualizar la imagen", "error");
  }
};


  useEffect(() => {
    VisualizarCategoriasMenu();
    cargarProductos();
    cargarSalsas();
    cargarGaseosas();
  }, []);

  return {
    categorias,
    productos,
    salsas,
    gaseosas,
    subirImagen
  };
};
