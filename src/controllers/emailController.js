const { enviarEmailInterno, enviarConfirmacionUsuario } = require("../config/resend");

// Función para formatear número de WhatsApp
const formatearNumeroWhatsApp = (telefono, nombre, servicio, mensaje) => {
  if (!telefono) return null;

  const numeroLimpio = telefono.replace(/\D/g, "");
  let numeroWhatsapp = numeroLimpio;

  if (!numeroWhatsapp.startsWith("52")) {
    if (numeroWhatsapp.length === 10) {
      numeroWhatsapp = "52" + numeroWhatsapp;
    }
  }

  const mensajeWhatsapp = `Hola, soy ${nombre}. Me interesa el servicio de ${servicio}. ${
    mensaje ? `Mensaje: ${mensaje}` : ""
  }`;
  const mensajeCodificado = encodeURIComponent(mensajeWhatsapp);

  return {
    numeroFormateado: numeroWhatsapp,
    link: `https://wa.me/${numeroWhatsapp}?text=${mensajeCodificado}`,
    mensaje: mensajeWhatsapp,
  };
};

const informarRequerimientoInformacion = async (req, res) => {
  try {
    const {
      servicio,
      nombre,
      email,
      telefono,
      mensaje,
      service,
      name,
      phone,
      message,
    } = req.body;

    // Usar los campos que existan (con o sin "v")
    const servicioFinal = servicio || service;
    const nombreFinal = nombre || name;
    const emailFinal = email;
    const telefonoFinal = telefono || phone;
    const mensajeFinal = mensaje || message;

    // Validar campos requeridos
    if (!nombreFinal || !emailFinal || !servicioFinal) {
      return res.status(400).json({
        success: false,
        message: "Nombre, email y servicio son obligatorios",
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailFinal)) {
      return res.status(400).json({
        success: false,
        message: "El formato del email no es válido",
      });
    }

    // Formatear número para WhatsApp
    const whatsappData = formatearNumeroWhatsApp(
      telefonoFinal,
      nombreFinal,
      servicioFinal,
      mensajeFinal
    );

    console.log("📧 Enviando correo interno...");
    const resultadoInterno = await enviarEmailInterno({
      servicio: servicioFinal,
      nombre: nombreFinal,
      email: emailFinal,
      telefono: telefonoFinal,
      mensaje: mensajeFinal,
      whatsappData: whatsappData
    });

    if (!resultadoInterno.success) {
      console.error("❌ Error enviando correo interno:", resultadoInterno.error);
    } else {
      console.log("✅ Correo interno enviado:", resultadoInterno.messageId);
    }

    console.log("📧 Enviando confirmación al usuario...");
    const resultadoUsuario = await enviarConfirmacionUsuario({
      nombre: nombreFinal,
      email: emailFinal,
      servicio: servicioFinal
    });

    if (!resultadoUsuario.success) {
      console.warn("⚠️ No se pudo enviar confirmación al usuario:", resultadoUsuario.error);
    } else {
      console.log("✅ Confirmación enviada al usuario:", resultadoUsuario.messageId);
    }

    res.status(200).json({
      success: true,
      message: "Solicitud recibida correctamente. Te contactaremos pronto.",
      whatsappData: whatsappData || null,
      confirmacionUsuario: resultadoUsuario.success,
      correoInterno: resultadoInterno.success
    });

  } catch (error) {
    console.error("❌ Error en el proceso completo:", error);

    let errorMessage = "Error al procesar la solicitud";

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  informarRequerimientoInformacion,
  formatearNumeroWhatsApp
};