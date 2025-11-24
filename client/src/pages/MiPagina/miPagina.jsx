import React, { useState, useEffect } from "react";
import "../../assets/css/miPagina.css";
import { useNavigate } from "react-router-dom";
import Footer from '../../components/miPagina/Footer'
import { useMiPagina } from "../../hooks/useMiPagina";
import { useProductosMasVendidosPublico } from "../../hooks/useProductosMasVendidosPublico";

const MiPagina = () => {

  const { productos: topProducts, loading: loadingTop } = useProductosMasVendidosPublico();
  const { textosEditables, sliderImages, imagenNosotros } = useMiPagina();



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

  return (
    <div className="page">

      {/* Slider */}
      <div className="slider">
          {sliderImages.length === 0 ? (
              <p>No hay imágenes disponibles</p>
          ) : (
              sliderImages.map((url, index) => (
                  <div key={index} className={`slide ${index === currentSlide ? "active" : ""}`}>
                      <img src={url} alt={`slide-${index}`} />
                  </div>
              ))
          )}

          <button onClick={prevSlide} className="slide-btn left">
              <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <button onClick={nextSlide} className="slide-btn right">
              <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
      </div>

      {/* Productos */}
      <div className="products">
        <h2>{textosEditables.tituloProductos}</h2>
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
        <h2>{textosEditables.tituloSobreNosotros}</h2>
        <div className="about-us-container">
          <p>{textosEditables.descripcionSobreNosotros}</p>
          <img
            src={imagenNosotros || "https://placehold.co/400x300"}
            alt="Imagen de la Empresa"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MiPagina;
