import React, { useState, useEffect } from "react";
import MenuConfiguracion from "./MenuConfiguracion";
import TopBar from "../Dashboard/TopBar";
import "../../assets/css/configuracion.css";

const ConfiguracionLayout = ({ title = "Configuracion", children }) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleMenu = () => {
        setActiveMenu(!activeMenu);
    };

    // Detectar si es móvil o desktop
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            // Si cambia de móvil a desktop, resetear el menú
            if (!mobile && activeMenu) {
                setActiveMenu(false);
                document.body.classList.remove('menu-open');
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeMenu]);

    // Cerrar menú al hacer click fuera (SOLO en móvil)
    useEffect(() => {
        if (!isMobile) return; // No ejecutar en desktop

        const handleClickOutside = (event) => {
            if (activeMenu) {
                const nav = document.querySelector('.dashboard-nav');
                const toggle = document.querySelector('.toggle');
                
                if (nav && toggle && 
                    !nav.contains(event.target) && 
                    !toggle.contains(event.target)) {
                    setActiveMenu(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [activeMenu, isMobile]);

    // Bloquear scroll del body cuando el menú está abierto en móvil
    useEffect(() => {
        if (isMobile) {
            if (activeMenu) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        } else {
            // En desktop, siempre remover menu-open
            document.body.classList.remove('menu-open');
        }

        return () => document.body.classList.remove('menu-open');
    }, [activeMenu, isMobile]);

    // Setear título de la página
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    }, [title]);

    return (
        <section className="dashboard-section">
            <div className={`dashboard-nav ${activeMenu ? "active" : ""}`}>
                <MenuConfiguracion onLinkClick={() => {
                    // Solo cerrar automáticamente en móvil
                    if (isMobile) {
                        setActiveMenu(false);
                    }
                }} />
            </div>

            <div className={`dashboard-container ${activeMenu ? "active" : ""}`}>
                <TopBar onToggleNav={toggleMenu} />
                <main>
                    {children}
                </main>
            </div>
        </section>
    );
};

export default ConfiguracionLayout;