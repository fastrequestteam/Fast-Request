import React, { useState, useEffect } from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import FooterEdit from '../../components/miPagina/FooterEdit'
import EditableText from '../../components/miPagina/EditTextHome'
import { useTextosEditables } from "../../hooks/useTextosEditables";
import { useMiPaginaInicioEdit } from "../../hooks/useMiPaginaInicioEdit"
import { useMiPaginaInicioEditSlider } from "../../hooks/useMiPaginaInicioEditSlider";
import { useProductosMasVendidosPublico } from "../../hooks/useProductosMasVendidosPublico";

const MiPaginaEdicion = () => {

    const { textos, updateTexto, loading } = useTextosEditables();
    const { imagenNosotros, handleSubirImagenNosotros, previewNosotros } = useMiPaginaInicioEdit();
    const { sliderImages, agregarImagenSlider, eliminarImagenSlider, loading: loadingSlider } = useMiPaginaInicioEditSlider();
    const { productos: topProducts, loading: loadingTop } = useProductosMasVendidosPublico();

    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
    if (sliderImages.length === 0) return;

    const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);

}, [sliderImages.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

    if (loading) {
        return <p>Cargando...</p>
    }

    return (
        <div className="page">
            {/* Navbar */}
            <NavbarMiPageEdit />
            {/* Slider */}
            <div className="slider">

                {sliderImages.length === 0 ? (
                    <p>No hay imágenes en el slider.</p>
                ) : (
                    sliderImages.map((image, index) => (
                        <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
                            <img src={image} alt={`Slide ${index}`} />
                            {/* Botón eliminar */}
                            <button
                                className="btn-delete-slider"
                                onClick={() => eliminarImagenSlider(image)}
                            >
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </div>
                    ))
                )}

                <button onClick={prevSlide} className="slide-btn left">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>

                <button onClick={nextSlide} className="slide-btn right">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>

                {/* Indicadores */}
                <div className="indicators">
                    {sliderImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={index === currentSlide ? "active" : ""}
                        ></button>
                    ))}
                </div>

                {/* Botón agregar imagen */}
                <button
                    className="btn-add-slider"
                    onClick={() => document.getElementById("slider-input").click()}
                >
                    <ion-icon name="add-circle-outline"></ion-icon>
                </button>

                {/* Input oculto */}
                <input
                    id="slider-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        Swal.fire({
                            title: "Subiendo imagen...",
                            didOpen: () => Swal.showLoading(),
                            allowOutsideClick: false
                        });

                        try {
                            await agregarImagenSlider(file);
                            Swal.fire({ icon: "success", title: "Imagen agregada" });
                        } catch (err) {
                            Swal.fire({ icon: "error", title: "Error al subir" });
                        }
                    }}
                />
            </div>

            {/* Productos */}
            <div className="products">
                <h2>
                    <EditableText
                        campo="tituloProductos"
                        textos={textos}
                        updateTexto={updateTexto}
                    />
                </h2>

                {loadingTop ? (
                    <p>Cargando productos más vendidos...</p>
                ) : topProducts.length === 0 ? (
                    <p>No hay productos vendidos aún.</p>
                ) : (
                    <div className="products-grid">
                        {topProducts.map((product, index) => (
                            <div key={index} className="product-card">
                                <img
                                    src={product.image || "https://placehold.co/250x200?text=No+Image"}
                                    alt={product.name}
                                />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <div className="price-action">
                                        <span>${Number(product.price).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {/* Sobre Nosotros */}
            <div className="about-us">
                <h2>
                    <EditableText
                        campo="tituloSobreNosotros"
                        textos={textos}
                        updateTexto={updateTexto}
                    />
                </h2>
                <div className="about-us-container">
                    <p>
                        <EditableText
                            campo="descripcionSobreNosotros"
                            textos={textos}
                            updateTexto={updateTexto}
                        />
                    </p>
                       {/* Imagen de Nosotros con botón de cargar */}
                    <div className="about-image-container">

                        {/* Imagen previa si se cambia, o la de BD */}
                        <img
                            src={previewNosotros || imagenNosotros || "https://placehold.co/400x300"}
                            alt="Imagen de la Empresa"
                            className="about-us-image"
                        />

                        {/* Ícono para subir */}
                        <button 
                            className="upload-icon-btn"
                            onClick={() => document.getElementById("input-nosotros").click()}
                        >
                            <ion-icon name="image-outline"></ion-icon>
                        </button>

                        {/* Input oculto */}
                        <input
                            id="input-nosotros"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleSubirImagenNosotros}
                        />
                    </div>
                </div>
            </div>

            <FooterEdit />
        </div>
    );
};

export default MiPaginaEdicion;
