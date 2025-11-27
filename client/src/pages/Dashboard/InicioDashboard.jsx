import React, { useEffect } from 'react';
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import useConfiguracionEmpresa from '../../hooks/useConfiguracionEmpresa';


const InicioDashboard = () => {

    const initial = {
        NombreEmpresa: '',
        LogoEmpresa: "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1761450639/store-4156934_640_cknbry.png",
    }

    const { userData, cargarEmpresa } = useConfiguracionEmpresa(initial)

    const { NombreEmpresa } = userData;

    useEffect(() => {

        const handleCompanyDates = () => {
            cargarEmpresa();
        }

        window.addEventListener("companyDatesUpdated", handleCompanyDates);
        return () =>
            window.removeEventListener("companyDatesUpdated", handleCompanyDates);
    }, [cargarEmpresa])

    return (
        <DashboardLayout title="Inicio - Fast Request">
            <div className="cardsDas">


                <div className="cardDas empresa-main">
                    <div className="empresa-content">
                        <div className="empresa-header">
                            <div className="empresa-icon-wrapper">
                                <img
                                    src={
                                        userData.LogoEmpresa
                                            ? userData.LogoEmpresa instanceof File
                                                ? URL.createObjectURL(userData.LogoEmpresa)
                                                : userData.LogoEmpresa
                                            : "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1763868563/placehold_image_biilgt.jpg"
                                    }
                                    alt="Logo de la empresa"
                                    onError={(e) => {
                                        e.target.src = "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1763868563/placehold_image_biilgt.jpg";
                                    }}
                                />
                            </div>
                            <div className="empresa-text">
                                <h1 className="empresa-brand">{NombreEmpresa}</h1>
                                <p className="empresa-slogan">El sabor que conquista</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">10</span>
                        <span className="cardDas-nombre">Pedidos en espera</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="time-outline"></ion-icon>
                    </div>
                </div>

                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">5</span>
                        <span className="cardDas-nombre">Pedidos en proceso</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="bicycle-outline"></ion-icon>
                    </div>
                </div>

                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">30</span>
                        <span className="cardDas-nombre">Pedidos Terminados</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="checkbox-outline"></ion-icon>
                    </div>
                </div>

                <div className="cardDas">
                    <div>
                        <span className="cardDas-numeros">$500.000</span>
                        <span className="cardDas-nombre">Ventas de hoy</span>
                    </div>
                    <div className="cardDas-icono">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default InicioDashboard