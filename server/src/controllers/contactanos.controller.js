const nodemailer = require('nodemailer');
const { contactoClientes } = require('../models');
const { Op } = require("sequelize");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    pool: true,
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER_FAST,
        pass: process.env.EMAIL_PASS_FAST
    }
});

exports.enviarMensajeEmpresas = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const sendToAdmin = {
            from: `"Formulario Web" <${process.env.EMAIL_USER_FAST}>`,
            to: process.env.EMAIL_USER_FAST,
            subject: `Nuevo mensaje de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: rgb(4, 67, 131); text-align: center;">Nuevo mensaje de contacto</h2>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p>${message}</p>
                </div>
            `
        }


        const sendToUsuario = {
            from: `"Fast Request" <${process.env.EMAIL_USER_FAST}>`,
            to: email,
            subject: 'Hemos recibido tu mensaje - Fast Request',
            text: `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje:\n\n"${message}"\n\nNuestro equipo te responderá en un máximo de 24 horas.\n\nSaludos,\nEquipo Fast Request`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width">
                <title>Confirmación de Mensaje</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7f9fc;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header --> 
                    <tr>
                        <td style="padding: 30px 25px; background: #1a73e8; border-radius: 12px 12px 0 0;">
                        </td>
                    </tr>
                    <!-- Cuerpo del mensaje -->
                    <tr>
                        <td style="padding: 35px 25px;">
                            <h1 style="color: #2d3748; font-size: 24px; margin: 0 0 25px 0; text-align: center;">¡Gracias por contactarnos, ${name}!</h1>
                            <div style="text-align: center; margin: 30px 0;">
                                <p style="color: #718096; font-size: 16px; margin: 15px 0;">Nuestro equipo revisará tu consulta y te responderá en menos de 24 horas.</p>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px; background: #1a73e8; border-radius: 0 0 12px 12px; text-align: center;">
                            <p style="color: #ffffff; font-size: 12px; margin: 10px 0;">© ${new Date().getFullYear()} Fast Request. Todos los derechos reservados.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `
        }

        await Promise.all([
            transporter.sendMail(sendToAdmin),
            transporter.sendMail(sendToUsuario),
        ]);

        console.log("Correos enviados exitosamente");
        res.json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
    }
}






exports.FindAllMensajesPendientesYVistos = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }


        const mensajesPendientes = await contactoClientes.findAll({
            where: {
                EstadoMensaje: {
                    [Op.or]: ['pendiente', 'visto']
                },
                EmpresaId: EmpresaId
            }
        });

        res.status(200).json({ message: 'Mensajes obtenidos de manera exitosa', mensajesPendientes })
        console.log('Mensajes pendientes obtenidos de manera correcta')


    } catch (err) {
        console.error('Error al obtener mensajes pendientes:', err);
        res.status(500).json({ error: 'Error al obtener mensajes pendientes' });
    }
}



exports.FindAllMensajesArchivados = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const mensajesArchivados = await contactoClientes.scope('soloMensajesArchivados').findAll({
            where: {
                EstadoMensaje: 'archivado',
                EmpresaId: EmpresaId
            }
        })

        res.status(200).json({ message: 'Mensajes archivados obtenidos de manera exitosa', mensajesArchivados })
        console.log('Mensajes pendientes obtenidos de manera correcta')

    } catch (err) {
        console.error('Error al obtener mensajes pendientes:', err);
        res.status(500).json({ error: 'Error al obtener mensajes pendientes' });
    }
}


exports.enviarMensageClientes = async (req, res) => {
    try {

        const { empresaId } = req.query

        if (!empresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { NombreCliente, CorreoElectronico, mensaje, EstadoMensaje } = req.body

        if (!NombreCliente || !CorreoElectronico || !mensaje) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const EstadoMensajeFinal = EstadoMensaje || "pendiente";

        const nuevoMensaje = await contactoClientes.create({
            NombreCliente,
            CorreoElectronico,
            mensaje,
            EstadoMensaje: EstadoMensajeFinal,
            EmpresaId: empresaId
        });

        console.log('Mensaje creado:', nuevoMensaje);
        res.status(201).json(nuevoMensaje);

    } catch (err) {
        console.error('Error al crear mensaje:', err);
        res.status(500).json({ error: 'Error al crear mensaje' });
    }
}



exports.actualizarEstadoMensajeVisto = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const mensaje = await contactoClientes.findOne({
            where: { id, EmpresaId }
        });

        if (!mensaje) {
            return res.status(404).json({ message: 'Mensaje no encontrado' });
        }

        if (mensaje.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        const mensajeActualizado = await mensaje.update({ EstadoMensaje: 'visto' });

        res.status(200).json({
            message: `Estado del mensaje actualizado correctamente a: visto`,
            mensajeActualizado
        });

    } catch (err) {
        console.error('Error al actualizar el estado del mensaje:', err);
        res.status(500).json({ error: 'Error al actualizar el estado del mensaje' });
    }
};


exports.actualizarEstadoMensajeArchivado = async (req, res) => {
    try {

        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const mensaje = await contactoClientes.findOne({
            where: { id, EmpresaId }
        });

        if (!mensaje) {
            return res.status(404).json({ message: 'Mensaje no encontrado' });
        }

        if (mensaje.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        const mensajeActualizado = await mensaje.update({ EstadoMensaje: 'archivado' });

        res.status(200).json({
            message: `Estado del mensaje actualizado correctamente a: archivado`,
            mensajeActualizado
        });

    } catch (err) {
        console.error('Error al actualizar el estado del mensaje:', err);
        res.status(500).json({ error: 'Error al actualizar el estado del mensaje' });
    }
};



exports.eliminarMensajesArchivados = async (req, res) => {
    try {
        const EmpresaId = req.user.empresaId;

        if (!EmpresaId) {
            return res.status(400).json({ error: "empresaId es requerido" });
        }

        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: 'El id es obligatorio' });
        }

        const mensaje = await contactoClientes.unscoped().findByPk(id)

        if (!mensaje) return res.status(404).json({ message: 'id del mensaje no encontrado' })

        if (mensaje.EmpresaId !== EmpresaId) {
            return res.status(403).json({ message: "No autorizado" });
        }

        await mensaje.destroy()

        console.log('Mensaje eliminado correctamente');
        res.status(200).json({ message: 'Mensaje eliminado correctamente', });

    } catch (err) {
        console.error('Error al eliminar mensajes archivados:', err);
        res.status(500).json({ error: 'Error al eliminar mensajes archivados' });
    }
}
