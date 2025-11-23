// src/pages/miPagina/CartaPageEdit.jsx
import React, { useRef } from "react";
import "../../assets/css/miPagina.css";
import NavbarMiPageEdit from "../../components/miPagina/NavbarEdicion";
import { useMiPaginaEdit } from "../../hooks/useMiPaginaEdit";
import { Link } from "react-router-dom";

const CartaPageEdit = () => {
  const { categorias, productos, salsas, gaseosas, subirImagen} = useMiPaginaEdit();

  const refsCategorias = useRef({});
  const refSalsas = useRef(null);
  const refGaseosas = useRef(null);

  const scrollToSection = (key) => {
    if (key === "salsas" && refSalsas.current) {
      refSalsas.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (key === "gaseosas" && refGaseosas.current) {
      refGaseosas.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (refsCategorias.current[key]) {
      refsCategorias.current[key].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="page">
      <NavbarMiPageEdit />

      {/* NAVBAR SUPERIOR */}
      <nav className="navbar-categorias sticky-bar">
        <div className="navbar-categorias-container">

          <div className="icono-busqueda">
            <ion-icon name="search-outline"></ion-icon>
          </div>

          <div className="categorias-menu">

            {/* Categorías normales */}
            {categorias.map((cat) => (
              <Link key={cat.Id} onClick={() => scrollToSection(cat.Id)}>
                {cat.NombreCategoria.toUpperCase()}
              </Link>
            ))}

            {/* EXTRA: SALSAS */}
            <Link onClick={() => scrollToSection("salsas")}>
              SALSAS
            </Link>

            {/* EXTRA: GASEOSAS */}
            <Link onClick={() => scrollToSection("gaseosas")}>
              GASEOSAS
            </Link>

          </div>

          <div className="menu-extra">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </div>

        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="Container-Productos">
        <div className="Categorias-Lista">

          {/* CATEGORÍAS + PRODUCTOS */}
          {categorias.map((cat) => {
            const prodCat = productos.filter(
              (prod) => prod.IdCategoria === cat.Id
            );

            if (prodCat.length === 0) return null;

            return (
              <div
                className="Productos"
                key={cat.Id}
                ref={(el) => (refsCategorias.current[cat.Id] = el)}
              >
                <h1 className="Titulo-de-categoria">
                  {cat.NombreCategoria.toUpperCase()}
                </h1>

                <div className="Lista">
                  {prodCat.map((p) => (
                    <div className="Producto" key={p.Id}>
                      <div className="informacion">
                        <h2>{p.NombreProducto.toUpperCase()}</h2>
                        <p>{p.DescripcionProducto}</p>
                        <p>
                          Precio: <strong>${p.PrecioProducto}</strong>
                        </p>
                      </div>

                      <div className="imagen-prod">

                        <img
                          src={p.Imagen || "https://placehold.co/250x200?text=Sin+Imagen"}
                          alt={p.NombreProducto}
                        />

                        {/* Input invisible */}
                        <input
                          type="file"
                          accept="image/*"
                          id={`file-prod-${p.Id}`}
                          style={{ display: "none" }}
                          onChange={(e) => subirImagen("producto", p.Id, e.target.files[0])}
                        />

                        {/* Icono de cámara */}
                        <ion-icon
                          name="camera-outline"
                          class="icono-camara"
                          onClick={() => document.getElementById(`file-prod-${p.Id}`).click()}
                        ></ion-icon>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* SECCIÓN SALSAS */}
          {salsas.length > 0 && (
            <div className="Productos" ref={refSalsas}>
              <h1 className="Titulo-de-categoria">SALSAS</h1>

              <div className="Lista">
                {salsas.map((s) => (
                  <div className="Producto" key={s.Id}>
                    <div className="informacion">
                      <h2>{s.nombreSalsa.toUpperCase()}</h2>
                      {/*<p>{s.DescripcionSalsa}</p>*/}
                    </div>

                    <div className="imagen-prod">
                      <img
                        src={s.Imagen || "https://placehold.co/250x200?text=Salsa"}
                        alt={s.nombreSalsa}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        id={`file-salsa-${s.Id}`}
                        style={{ display: "none" }}
                        onChange={(e) => subirImagen("salsa", s.id, e.target.files[0])}
                      />

                      <ion-icon
                        name="camera-outline"
                        class="icono-camara"
                        onClick={() => document.getElementById(`file-salsa-${s.Id}`).click()}
                      ></ion-icon>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECCIÓN GASEOSAS */}
          {gaseosas.length > 0 && (
            <div className="Productos" ref={refGaseosas}>
              <h1 className="Titulo-de-categoria">GASEOSAS</h1>

              <div className="Lista">
                {gaseosas.map((g) => (
                  <div className="Producto" key={g.Id}>
                    <div className="informacion">
                      <h2>{g.nombreGaseosa.toUpperCase()}</h2>
                      <p>
                        Precio: <strong>${g.precioGaseosa}</strong>
                      </p>
                    </div>

                    <div className="imagen-prod">
                      <img
                        src={g.Imagen || "https://placehold.co/250x200?text=Gaseosa"}
                        alt={g.nombreGaseosa}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        id={`file-gaseosa-${g.Id}`}
                        style={{ display: "none" }}
                        onChange={(e) => subirImagen("gaseosa", g.id, e.target.files[0])}
                      />

                      <ion-icon
                        name="camera-outline"
                        class="icono-camara"
                        onClick={() => document.getElementById(`file-gaseosa-${g.Id}`).click()}
                      ></ion-icon>
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

export default CartaPageEdit;
