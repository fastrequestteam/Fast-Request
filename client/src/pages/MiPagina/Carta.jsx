import React, { useRef } from "react";
import "../../assets/css/miPagina.css";
import { useMiPagina } from "../../hooks/useMiPagina";
import { Link } from "react-router-dom";

const Carta = () => {
  const {
    categorias,
    productos,
    salsas,
    gaseosas,
    loading,
    error,
  } = useMiPagina();

  // Referencias dinámicas para cada categoría
  const refsCategorias = useRef({});
  const refSalsas = useRef(null);
  const refGaseosas = useRef(null);

  const scrollToCategory = (id) => {
    if (id === "salsas" && refSalsas.current) {
      refSalsas.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (id === "gaseosas" && refGaseosas.current) {
      refGaseosas.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (refsCategorias.current[id]) {
      refsCategorias.current[id].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) {
    return <div className="loading-container"><p>Cargando...</p></div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">

      {/* NAVBAR DE CATEGORÍAS */}
      <nav className="navbar-categorias sticky-bar">
        <div className="navbar-categorias-container">

          <div className="icono-busqueda">
            <ion-icon name="search-outline"></ion-icon>
          </div>

          <div className="categorias-menu">
            {categorias.map((cat) => (
              <Link
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
              >
                {cat.NombreCategoria.toUpperCase()}
              </Link>
            ))}

            <Link onClick={() => scrollToCategory("salsas")}>SALSAS</Link>
            <Link onClick={() => scrollToCategory("gaseosas")}>GASEOSAS</Link>
          </div>

          <div className="menu-extra">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>

        </div>
      </nav>

      {/* CONTENIDO COMPLETO */}
      <div className="Container-Productos">
        <div className="Categorias-Lista">

          {/* AGRUPACIÓN COMO VERSION ANTIGUA */}
          {categorias.map((cat) => {
            const productosCat = productos.filter(
              (prod) => prod.IdCategoria === cat.id
            );

            // No mostrará categorías sin productos
            if (productosCat.length === 0) return null;

            return (
              <div
                className="Productos"
                key={cat.id}
                ref={(el) => (refsCategorias.current[cat.id] = el)}
              >
                <h1 className="Titulo-de-categoria">
                  {cat.NombreCategoria.toUpperCase()}
                </h1>

                <div className="Lista">
                  {productosCat.map((produc) => (
                    <div className="Producto" key={produc.id}>
                      <div className="informacion">
                        <h2>{produc.NombreProducto.toUpperCase()}</h2>
                        <p>{produc.DescripcionProducto}</p>
                        <p>
                          Precio: <strong>${produc.PrecioProducto}</strong>
                        </p>
                      </div>

                      <div className="imagen-prod">
                        <img
                          src={
                            produc.Imagen
                              ? (produc.Imagen.startsWith("http")
                                ? produc.Imagen
                                : `https://fast-request-back.onrender.com/${produc.Imagen}`
                              )
                              : "https://placehold.co/250x200?text=Sin+Imagen"
                          }
                          alt={produc.NombreProducto}
                        />
                        <ion-icon name="add-outline"></ion-icon>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {salsas.length > 0 && (
            <div className="Productos" ref={refSalsas}>
              <h1 className="Titulo-de-categoria">SALSAS</h1>

              <div className="Lista">
                {salsas.map((s) => (
                  <div className="Producto" key={s.Id}>
                    <div className="informacion">
                      <h2>{s.nombreSalsa.toUpperCase()}</h2>
                    </div>

                    <div className="imagen-prod">
                      <img
                        src={
                          s.Imagen
                            ? (s.Imagen.startsWith("http")
                              ? s.Imagen
                              : `https://fast-request-back.onrender.com/${s.Imagen}`
                            )
                            : "https://placehold.co/250x200?text=Sin+Imagen"
                        }
                        alt={s.nombreSalsa}
                      />
                      <ion-icon name="add-outline"></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gaseosas.length > 0 && (
            <div className="Productos" ref={refGaseosas}>
              <h1 className="Titulo-de-categoria">GASEOSAS</h1>

              <div className="Lista">
                {gaseosas.map((g) => (
                  <div className="Producto" key={g.Id}>
                    <div className="informacion">
                      <h2>{g.nombreGaseosa.toUpperCase()}</h2>
                      <p>
                        Precio:{" "}
                        <strong>
                          {Number(g.precioGaseosa || 0).toLocaleString("es-CO")}
                        </strong>
                      </p>

                    </div>

                    <div className="imagen-prod">
                      <img
                        src={
                          g.Imagen
                            ? (g.Imagen.startsWith("http")
                              ? g.Imagen
                              : `https://fast-request-back.onrender.com/${g.Imagen}`
                            )
                            : "https://placehold.co/250x200?text=Sin+Imagen"
                        }

                        alt={g.nombreGaseosa}
                      />
                      <ion-icon name="add-outline"></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Carta;
