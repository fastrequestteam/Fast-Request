import React, { useState, useEffect } from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import FooterEdit from '../../components/miPagina/FooterEdit'
import EditableText from '../../components/miPagina/EditTextHome'
import { useTextosEditables } from "../../hooks/useTextosEditables";

const MiPaginaEdicion = () => {

    const { textos, updateTexto, loading } = useTextosEditables();


    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate()
    const sliderImages = [
        { id: 1, src: "https://placehold.co/800x400?text=Oferta+1", alt: "Oferta 1" },
        { id: 2, src: "https://placehold.co/800x400?text=Oferta+2", alt: "Oferta 2" },
        { id: 3, src: "https://placehold.co/800x400?text=Oferta+3", alt: "Oferta 3" },
        { id: 4, src: "https://placehold.co/800x400?text=Oferta+4", alt: "Oferta 4" },
    ];

    const topProducts = [
        { id: 1, name: "Producto Premium 1", price: "$125.000", image: "https://placehold.co/250x200?text=Producto+1" },
        { id: 2, name: "Producto Estrella 2", price: "$89.900", image: "https://placehold.co/250x200?text=Producto+2" },
        { id: 3, name: "Producto Popular 3", price: "$156.000", image: "https://placehold.co/250x200?text=Producto+3" },
        { id: 4, name: "Producto Favorito 4", price: "$78.500", image: "https://placehold.co/250x200?text=Producto+4" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

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
                {sliderImages.map((image, index) => (
                    <div key={image.id} className={`slide ${index === currentSlide ? "active" : ""}`}>
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
                <button onClick={prevSlide} className="slide-btn left">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button onClick={nextSlide} className="slide-btn right">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
                <div className="indicators">
                    {sliderImages.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={index === currentSlide ? "active" : ""}></button>
                    ))}
                </div>
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
                <div className="products-grid">
                    {topProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <div className="price-action">
                                    <span>{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                    <img src="https://placehold.co/400x300" alt="Imagen de la Empresa" />
                </div>
            </div>

            <FooterEdit />
        </div>
    );
};

export default MiPaginaEdicion;
