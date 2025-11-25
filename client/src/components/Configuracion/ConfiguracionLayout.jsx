import React, { useState, useEffect } from "react";
import MenuConfiguracion from "./MenuConfiguracion";
import TopBar from "../Dashboard/TopBar";
import "../../assets/css/configuracion.css";

const ConfiguracionLayout = ({ title = "Configuracion", children }) => {
    const [activeMenu, setActiveMenu] = useState(false);

    const toggleMenu = () => {
        // Mobile & tablet (overlay)
        if (window.innerWidth <= 992) {
            setActiveMenu(!activeMenu);
        }
        // Desktop (shrink mode)
        else {
            setActiveMenu(!activeMenu);
        }
    };

    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    }, [title]);

    return (
        <section className="dashboard-section">
            
            {/* ✅ Correct class name for sidebar */}
            <div className={`dashboard-nav ${activeMenu ? "active" : ""}`}>
                <MenuConfiguracion />
            </div>

            {/* ✅ Container behavior aligned with CSS */}
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
