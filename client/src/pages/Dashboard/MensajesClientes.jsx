import React, { useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useFiltroMensajes } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";
import { useContactanos } from "../../hooks/useContactanos";
import { useNavigate } from "react-router-dom";

const MensajesClientes = () => {

    const {
        mensajes,
        loading,
        actualizarMensajeActivo,
        actualizarMensajeArchivado
    } = useContactanos()

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroMensajes(mensajes, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    if (loading) {
        return <div>Cargando mensajes...</div>;
    }

    return (
        <DashboardLayout title="Mensajes Clientes - Fast Request">

            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Mensajes De Nuestros Clientes</h2>
                    <div className="input_search">
                        <input
                            type="search"
                            placeholder="Buscar"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>

                    <a href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/dashboard/mensajesClientesArchivados`)
                        }}>
                        <ion-icon id="iconosoperacionVisualizarEstado" name="reader-outline"></ion-icon>
                    </a>
                </div>

                <table className="tabladashb">
                    <thead className="tabladashb_thead">
                        <tr>
                            <th className="tabladashb_thead_th">Nombre<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Correo Electronico<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Mensaje<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {funtionFinally.map((mess) => (
                            <tr className="tabladashb_tbody_tr" key={mess.id}>
                                <td className="tabladashb_tbody_tr_td">{mess.NombreCliente}</td>
                                <td className="tabladashb_tbody_tr_td">{mess.CorreoElectronico}</td>
                                <td className="tabladashb_tbody_tr_td">{mess.mensaje}</td>
                                <td className="tabladashb_tbody_tr_td">{mess.EstadoMensaje}</td>
                                <td className="tabladashb_tbody_tr_td" >
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            actualizarMensajeActivo(mess.id);
                                        }}>
                                        <ion-icon id="iconosoperacionEditar" name="pencil"></ion-icon>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            actualizarMensajeArchivado(mess.id);
                                        }}>
                                        <ion-icon id="iconosoperacionEditar" name="archive"></ion-icon>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* paginacion */}
            <Stack spacing={2}>
                <Pagination
                    className="paginacion"
                    count={Math.ceil(res.length / itemsPorPagina)}
                    page={paginacionActual}
                    onChange={(event, value) => setPaginacionActual(value)}
                    size="large"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#fff',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#1c1c1e',
                            color: '#fff',
                        },
                    }}
                />
            </Stack>
        </DashboardLayout>
    );
};

export default MensajesClientes;
