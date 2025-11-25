const { ValidarEmail } = require('../models');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

exports.validarEmail = async (req, res) => {
    try {
        const { correo } = req.body;
        const codigoAleatorio = String(Math.floor(Math.random() * 900000) + 100000);

        await ValidarEmail.upsert({
            correo,
            codigo: codigoAleatorio,
            expiracion: new Date(Date.now() + 5 * 60 * 1000)
        });

        const msg = {
            to: correo,
            from: process.env.EMAIL_FROM, // debe estar verificado en SendGrid
            subject: "Código de verificación - Fast Request",
            html: `
        <div style="font-family: Arial, sans-serif; text-align:center;">
          <h2>Tu código de verificación</h2>
          <p style="font-size:32px; font-weight:bold; color:#ff6200;">${codigoAleatorio}</p>
          <p>Este código expira en 5 minutos.</p>
        </div>
      `
        };

        await sgMail.send(msg);

        res.status(200).json({ message: 'Código enviado correctamente.' });

    } catch (err) {
        console.error('Error al validar el correo:', err);
        // Si SendGrid devolviera detalle en err.response, lo puedes loggear:
        if (err.response) {
            console.error(err.response.body);
        }
        res.status(500).json({ err: 'Error enviando el correo.' });
    }
};

exports.validarCodigo = async (req, res) => {
    try {
        const { correo, codigo } = req.body;
        const registro = await ValidarEmail.findOne({ where: { correo } });

        if (!registro) return res.status(404).json({ message: 'Correo no encontrado.' });

        if (registro.codigo !== String(codigo).trim()) return res.status(400).json({ message: 'Código incorrecto.' });

        if (new Date() > registro.expiracion) {
            await ValidarEmail.destroy({ where: { correo } });
            return res.status(400).json({ message: 'El código ha expirado.' });
        }

        await ValidarEmail.destroy({ where: { correo } });
        res.status(200).json({ verified: true, message: 'Código verificado.' });

    } catch (err) {
        console.error('Error al validar el código:', err);
        res.status(500).json({ verified: false, err: 'Error interno del servidor.' });
    }
};