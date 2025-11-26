// CONTROLLER RECUPERAR CONTRASEÑA con SENDGRID
const { Usuario, ValidarEmail } = require("../models");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const sgMail = require("../config/email"); // SendGrid

dotenv.config();

exports.enviarCodigoRecuperacion = async (req, res) => {
  try {
    const correo = req.body.correo.trim().toLowerCase();
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ message: "Este correo no está registrado." });
    }

    const codigo = String(Math.floor(100000 + Math.random() * 900000)); // Código de 6 dígitos

    // Guardar o actualizar registro del código
    await ValidarEmail.upsert({
      correo,
      codigo,
      expiracion: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Mensaje SendGrid
    const msg = {
      to: correo,
      from: process.env.EMAIL_FROM, // Tiene que estar verificado en SendGrid
      subject: "Recuperación de Contraseña - Fast Request",
      html: `
        <div style="font-family: Arial, sans-serif; text-align:center;">
          <h2>Recupera tu contraseña</h2>
          <p>Tu código de recuperación es:</p>
          <h1 style="color:#ff6200;">${codigo}</h1>
          <p>Este código expirará en 5 minutos.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return res.status(200).json({ message: "Código enviado exitosamente." });

  } catch (error) {
    console.error("Error al enviar el código de recuperación:", error);

    if (error.response) {
      console.error("SendGrid:", error.response.body);
    }

    return res.status(500).json({ error: "No se pudo enviar el código." });
  }
};

exports.verificarCorreo = async (req, res) => {
  const { correo } = req.query;
  if (!correo) {
    return res
      .status(400)
      .json({ existe: false, mensaje: "Correo no proporcionado." });
  }
  const usuario = await Usuario.findOne({
    where: { correo: correo.trim().toLowerCase() },
  });
  if (usuario) {
    return res.json({ existe: true, mensaje: "Correo registrado." });
  } else {
    return res.json({ existe: false, mensaje: "Correo no registrado." });
  }
};

exports.validarCodigoRecuperacion = async (req, res) => {
  try {
    const { correo, codigo } = req.body;

    const registro = await ValidarEmail.findOne({ where: { correo } });

    if (!registro) {
      return res.status(404).json({ message: "Correo no encontrado." });
    }

    if (registro.codigo !== String(codigo).trim()) {
      return res.status(400).json({ message: "Código incorrecto." });
    }

    const ahora = new Date();
    if (ahora > registro.expiracion) {
      await ValidarEmail.destroy({ where: { correo } });
      return res.status(400).json({ message: "El código ha expirado." });
    }

    // Código válido → borrar el registro y continuar
    await ValidarEmail.destroy({ where: { correo } });

    return res
      .status(200)
      .json({ verified: true, message: "Código verificado correctamente." });
  } catch (err) {
    console.error("Error al validar el código:", err);
    return res
      .status(500)
      .json({ verified: false, error: "Error interno del servidor." });
  }
};

exports.cambiarContrasena = async (req, res) => {
  try {
    const { correo, nuevaContrasena } = req.body;

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    usuario.password = hashedPassword;
    await usuario.save();

    return res.status(200).json({ message: "Contraseña actualizada exitosamente." });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ error: "No se pudo actualizar la contraseña." });
  }
}

