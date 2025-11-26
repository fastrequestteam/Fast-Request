import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import ModalDashboard from "../../components/Dashboard/ModalDashboard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useClientes } from "../../hooks/useClientes";
import { validacionDeCampos } from '../../helpers/validacionDeCampos'
import { useFiltroClientes } from "../../hooks/useFiltro";
import { usePaginacion } from "../../hooks/usePaginacion";


const ClientesDashboard = () => {
    const {
        onChangeInputs,
        CrearCliente,
        cambiarEstadoCliente,
        clientes,
        obtenerClientes,
        openModal,
        isCreating,
        modalVisible,
        formRef,
        formData,
        closeModal,
        errores,
        setErrores,
        validacionDeClientes
    } = useClientes();


    useEffect(() => {
        obtenerClientes();
    }, []);

    const [busqueda, setBusqueda] = useState('')
    const [paginacionActual, setPaginacionActual] = useState(1)
    const res = useFiltroClientes(clientes, busqueda)
    const { itemsPorPagina, funtionFinally } = usePaginacion(paginacionActual, res)

    const validaciones = async () => {

        const nombreClienteError = validacionDeCampos('nombreCliente', formData.nombreCliente)
        const correoElectronicoError = validacionDeCampos('correoElectronico', formData.correoElectronico)
        const numeroContactoError = validacionDeCampos('numeroContacto', formData.numeroContacto)

        let erroresTemp = {
            nombreCliente: nombreClienteError,
            correoElectronico: correoElectronicoError,
            numeroContacto: numeroContactoError
        }

        if (!correoElectronicoError || !numeroContactoError) {
            const backendErrores = await validacionDeClientes()
            erroresTemp = {
                ...erroresTemp,
                correoElectronico: backendErrores?.correoElectronico || erroresTemp.correoElectronico,
                numeroContacto: backendErrores?.numeroContacto || erroresTemp.numeroContacto
            }
            setErrores(erroresTemp)
        }

        return Object.values(erroresTemp).some(err => err)

    }


    const navigate = useNavigate();

    return (
        <DashboardLayout title="Clientes - Fast Request">
            <div className="container_tablas">
                <div className="table_Header">
                    <h2>Clientes</h2>
                    <button className="boton_raro" onClick={openModal}>Crear Cliente</button>

                    <div className="input_search">
                        <input
                            type="search"
                            placeholder="Buscar"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <ion-icon id="search-sharp" name="search-sharp"></ion-icon>
                    </div>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/dashboard/clientesInactivos`)
                        }}>
                        <ion-icon id="iconosoperacionVisualizarEstado" name="reader-outline"></ion-icon>
                    </a>
                </div>

                <table className="tabladashb">
                    <thead className="tabladashb_thead">
                        <tr>
                            <th className="tabladashb_thead_th">Nombre  del Cliente<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Email<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Numero de contacto<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Contraseña<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Estado<ion-icon name="chevron-expand-outline"></ion-icon></th>
                            <th className="tabladashb_thead_th">Operaciones<ion-icon name="chevron-expand-outline"></ion-icon></th>
                        </tr>
                    </thead>
                    <tbody className="tabladashb_tbody">
                        {funtionFinally.map((customer) => (
                            <tr className="tabladashb_tbody_tr" key={customer.id}>
                                <td className="tabladashb_tbody_tr_td">{customer.nombreCliente.toLowerCase()}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.correoElectronico.toLowerCase()}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.numeroContacto}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.contrasena}</td>
                                <td className="tabladashb_tbody_tr_td">{customer.estadoCliente}</td>
                                <td className="tabladashb_tbody_tr_td">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            cambiarEstadoCliente(customer.id);
                                        }}>
                                        <ion-icon id="iconosoperacionEliminar" name="ban"></ion-icon>
                                    </a>

                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate(`/dashboard/pedidosPorCliente/${customer.id}`)
                                        }}>
                                        <ion-icon id="iconosoperacionVisualizar" name="folder-open-outline"></ion-icon>
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

            <ModalDashboard show={modalVisible} onClose={closeModal}>

                <form
                    id="miFormulario"
                    ref={formRef}
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const hayErrores = await validaciones()
                        if (hayErrores) return

                        CrearCliente();

                    }}
                >
                    <h2 className="modal__title">
                        Crear Cliente
                    </h2>

                    <div className="dashinputs_formulario">
                        <label htmlFor="nombreCliente">Nombre completo del Cliente:</label>
                        <input
                            type="text"
                            name="nombreCliente"
                            id="nombreCliente"
                            className="dashinputs_formulario_Labels"
                            value={formData.nombreCliente}
                            onChange={onChangeInputs}
                            required
                        />
                        {errores.nombreCliente && <div style={{ color: 'red' }}>{errores.nombreCliente}</div>}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="correoElectronico">Correo Electronico:</label>
                        <input
                            type="email"
                            name="correoElectronico"
                            id="correoElectronico"
                            className="dashinputs_formulario_Labels"
                            value={formData.correoElectronico}
                            onChange={onChangeInputs}
                            required
                        />
                        {errores.correoElectronico && <div style={{ color: 'red' }}>{errores.correoElectronico}</div>}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="numeroContacto">Numero de Contacto:</label>
                        <input
                            type="text"
                            name="numeroContacto"
                            id="numeroContacto"
                            className="dashinputs_formulario_Labels"
                            value={formData.numeroContacto}
                            onChange={onChangeInputs}
                            required
                        />
                        {errores.numeroContacto && <div style={{ color: 'red' }}>{errores.numeroContacto}</div>}
                    </div>

                    <div className="dashinputs_formulario">
                        <label htmlFor="contrasena">Contraseña:</label>
                        <input
                            type="text"
                            name="contrasena"
                            id="contrasena"
                            className="dashinputs_formulario_Labels"
                            value={formData.contrasena}
                            onChange={onChangeInputs}
                            required
                        />
                    </div>

                    <div className="botones_formulario">
                        <button type="submit" className="boton_formulario">
                            {isCreating ? "Crear" : "Actualizar"}
                        </button>
                        <button type="button" className="close__modal" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </ModalDashboard>
        </DashboardLayout>
    )
}

export default ClientesDashboard


