// src/hooks/useMiPagina.js
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "https://fast-request-back.onrender.com/api/categorias/categorias";
const API_URL2 = "https://fast-request-back.onrender.com/api/productos/productos";
const API_URL3 = "https://fast-request-back.onrender.com/api/complementos/salsas";
const API_URL4 = "https://fast-request-back.onrender.com/api/complementos/gaseosas";
const API_EMPRESA = "https://fast-request-back.onrender.com/api/empresa/empresaPublic";
const Api_textos = 'https://fast-request-back.onrender.com/api/textos-editables/find-text';
export const useMiPagina = (initial = { NombreCliente: '', CorreoElectronico: '', mensaje: '', EstadoMensaje: 'pendiente' }) => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [empresaId, setEmpresaId] = useState(null);
  const [empresaNombre, setEmpresaNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salsas, setSalsas] = useState([]);
  const [gaseosas, setGaseosas] = useState([]);
  const [textosEditables, setTextosEditables] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);
  const [imagenNosotros, setImagenNosotros] = useState("");
  const [mensajeData, setMensajeData] = useState(initial)
  const { empresaSlug } = useParams();


  const cargarTextos = async () => {
    try {
      if (!empresaId) return;
      const res = await axios.get(Api_textos, { params: { empresaId } });

      const map = {};
      res.data.forEach(t => {
        map[t.campo] = t.valor;
      });

      setTextosEditables(map);

    } catch (error) {
      console.error("Error en categorías:", error);
      Swal.fire("Error", "Error al cargar las categorías", "error");
    }
  }

  const VisualizarCategoriasMenu = async () => {
    try {
      if (!empresaId) return;
      const res = await axios.get(API_URL, { params: { empresaId } });
      setCategorias(res.data);
    } catch (error) {
      console.error("Error en categorías:", error);
      Swal.fire("Error", "Error al cargar las categorías", "error");
    }
  };

  const cargarProductos = async () => {
    try {
      if (!empresaId) return;
      const res = await axios.get(API_URL2, { params: { empresaId } });
      setProductos(res.data);
    } catch (error) {
      console.error("Error en productos:", error);
      Swal.fire("Error", "Error al cargar productos", "error");
    }
  };


  const cargarSalsas = async () => {
    try {
      const res = await axios.get(API_URL3, { params: { empresaId } });
      setSalsas(res.data.salsas);
    } catch (error) {
      console.error("Error al cargar las salsas");
      Swal.fire("Error", "Error al cargar salsas", "error");
    }
  }

  const cargarGaseosas = async () => {
    try {
      const res = await axios.get(API_URL4, { params: { empresaId } });
      setGaseosas(res.data.gaseosas);
    } catch (error) {
      console.error("Error al cargar las gaseosas");
      Swal.fire("Error", "Error al cargar gaseosas", "error");
    }
  }


  const handleChange = ({ target }) => {
    const { name, value } = target;
    setMensajeData({
      ...mensajeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'https://fast-request-back.onrender.com/api/contactanos/enviar-mensaje',
        {
          NombreCliente: mensajeData.NombreCliente,
          CorreoElectronico: mensajeData.CorreoElectronico,
          mensaje: mensajeData.mensaje
        },
        {
          params: { empresaId }
        }
      );

      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.",
        icon: "success",
        background: "#272727",
        color: "#c9c9c9",
      });

      setMensajeData({ NombreCliente: "", CorreoElectronico: "", mensaje: "" });

    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        background: "#272727",
        color: "#c9c9c9",
      });
    }
  };


  // Obtener empresa por slug
  useEffect(() => {
    if (!empresaSlug) {
      setError("No se proporcionó el identificador de empresa");
      setLoading(false);
      return;
    }

    const obtenerEmpresa = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_EMPRESA}/${empresaSlug}`);
        setEmpresaId(res.data.empresaId);
        setEmpresaNombre(res.data.nombre);
        setSliderImages(res.data.slider || []);
        setImagenNosotros(res.data.sobreNosotros || "");
        setError(null);
      } catch (error) {
        console.error("Error empresa:", error);
        setError("Empresa no encontrada");
        Swal.fire("Empresa no encontrada", "La página no existe", "error");
      } finally {
        setLoading(false);
      }
    };

    obtenerEmpresa();
  }, [empresaSlug]);

  useEffect(() => {
    if (empresaId) {
      VisualizarCategoriasMenu();
      cargarProductos();
      cargarSalsas();
      cargarGaseosas();
      cargarTextos();
    }
  }, [empresaId]);

  return {
    categorias,
    productos,
    salsas,
    gaseosas,
    empresaNombre,
    loading,
    error,
    textosEditables,
    sliderImages,      // <--- NUEVO
    imagenNosotros,
    handleChange,
    handleSubmit,
    mensajeData,
  };
};
