import React, { useState } from 'react';
import useMnesajesDeClientesArchivados from '../../hooks/useMnesajesDeClientesArchivados';
import { useFiltroMensajes } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';;

const VisualizarMensajesDeClientesArchivados = () => {

    const { volverAlInicio, mensajes, eliminarMensajesArchivados, loading, actualizarMensajeActivo } = useMnesajesDeClientesArchivados()


    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)

    const res = useFiltroMensajes(mensajes, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)


    if (loading) {
        return <p>Cargando mensajes archivados...</p>;
    }

    return (

        <div className="tabla-contenedor" >
            <div className="tabla_header_clientes_inactivos">
                <h2>🚫 Lista De Mensajes Archivados</h2>

                <div className="input_search_clientes_inactivos">
                    <input
                        type="search"
                        placeholder="Buscar"
                        className='input-search-bar'
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>


            {mensajes.length === 0 ? (
                <p>No hay mensajes archivados por el momento.</p>
            ) : (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo Electronico</th>
                            <th>Mensaje</th>
                            <th>Estado Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funtionFinally.map((mess) => (
                            <tr key={mess.id}>
                                <td>{mess.NombreCliente}</td>
                                <td>{mess.CorreoElectronico}</td>
                                <td>{mess.mensaje}</td>
                                <td>{mess.EstadoMensaje}</td>
                                <td>
                                    <button
                                        className="btn-imprimir"
                                        title="Cambio de estado"
                                        aria-label={`Cambio de estado ${mess.id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            actualizarMensajeActivo(mess.id)
                                        }}
                                    >
                                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                                    </button>
                                    <button
                                        className="btn-imprimir"
                                        title="Eliminar mensaje archivado"
                                        aria-label={`Eliminar mensaje archivado ${mess.id}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            eliminarMensajesArchivados(mess.id)
                                        }}
                                    >
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }

            {/* paginacion */}
            <Stack spacing={2}>
                <Pagination
                    className="paginacion-clientes-inactivos"
                    count={Math.ceil(res.length / itemsPorPagina)}
                    page={paginacionActual}
                    onChange={(event, value) => setPaginacionActual(value)}
                    size="large"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#000000ff',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#000000ff',
                            color: '#ffffffff',
                            '&:hover': {
                                backgroundColor: '#252525ff',
                            },
                        },
                    }}
                />
            </Stack>


            <a className="btn-volver" onClick={volverAlInicio}>
                Volver
            </a>
        </div >
    );
};

export default VisualizarMensajesDeClientesArchivados;

