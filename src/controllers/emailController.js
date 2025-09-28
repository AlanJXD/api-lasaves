const { createTransporter } = require("../config/nodemailer");

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

// Función para enviar confirmación al usuario
// Función para enviar confirmación al usuario
const enviarConfirmacionUsuario = async (userData) => {
  try {
    const { nombre, email, servicio } = userData;

    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmación de solicitud - Estancia Las Aves`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background: #f8f9fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #ffffff; 
              border-radius: 15px;
              overflow: hidden;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #f9b872, #ffe3b8); 
              padding: 40px 20px; 
              text-align: center; 
            }
            .logo-container {
              background: white;
              border-radius: 12px;
              padding: 20px;
              display: inline-block;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              margin-bottom: 20px;
            }
            .logo { 
              max-width: 180px; 
              height: auto;
            }
            .content { 
              padding: 40px 30px; 
              background: #ffffff; 
            }
            .greeting { 
              font-size: 28px; 
              color: #f9b872; 
              margin-bottom: 25px; 
              font-weight: bold;
              text-align: center;
            }
            .message { 
              background: #fefefe; 
              padding: 30px; 
              border-radius: 12px; 
              border-left: 5px solid #f9b872;
              margin-bottom: 25px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .service-info {
              background: #fff8f0;
              padding: 20px;
              border-radius: 10px;
              margin: 25px 0;
              border: 2px solid #f9b872;
              text-align: center;
            }
            .service-info strong {
              color: #f9b872;
              font-size: 18px;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #666; 
              font-size: 14px; 
              background: linear-gradient(135deg, #f9b872, #ffe3b8);
              color: white;
            }
            .contact-info {
              background: white;
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
              text-align: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              border: 2px solid #f9b872;
            }
            .contact-item {
              margin: 12px 0;
              font-size: 16px;
            }
            .benefits-list {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
            }
            .benefits-list li {
              margin: 10px 0;
              padding-left: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="https://estancialasaves.com/img/logo-sinbg.png" alt="Estancia Las Aves" class="logo">
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">Estancia Las Aves</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Cuidado especializado para adultos mayores</p>
            </div>
            
            <div class="content">
              <div class="greeting">
                ¡Gracias por tu interés, ${nombre}!
              </div>
              
              <div class="message">
                <p style="font-size: 16px; line-height: 1.8;">Hemos recibido tu solicitud de información correctamente. Nuestro equipo se pondrá en contacto contigo en un plazo máximo de 24 horas para proporcionarte todos los detalles sobre nuestros servicios y resolver cualquier duda que puedas tener.</p>
                
                <div class="service-info">
                  <strong>Servicio de interés:</strong><br>
                  <span style="font-size: 20px; color: #333;">${servicio}</span>
                </div>
                
                <p style="font-size: 16px; color: #f9b872; font-weight: bold; text-align: center;">Mientras tanto, te invitamos a conocer más sobre nosotros:</p>
                
                <div class="benefits-list">
                  <ul style="list-style: none; padding: 0;">
                    <li>🏠 Ambiente seguro y familiar</li>
                    <li>👵 Atención personalizada 24/7</li>
                    <li>🎨 Actividades recreativas y terapéuticas</li>
                    <li>👩‍⚕️ Personal especializado en geriatría</li>
                    <li>🍎 Alimentación balanceada y nutritiva</li>
                    <li>💊 Control médico y administración de medicamentos</li>
                  </ul>
                </div>
              </div>
              
              <div class="contact-info">
                <h3 style="color: #f9b872; margin-bottom: 20px; font-size: 22px;">¿Tienes alguna duda?</h3>
                
                <div class="contact-item">
                  <strong>📞 Teléfono:</strong><br>
                  <a href="tel:+523111172800" style="color: #333; text-decoration: none;">311 117 2800</a>
                </div>
                
                <div class="contact-item">
                  <strong>📧 Email:</strong><br>
                  <a href="mailto:${
                    process.env.EMAIL_USER
                  }" style="color: #333; text-decoration: none;">${
        process.env.EMAIL_USER
      }</a>
                </div>
                
                <div class="contact-item">
                  <strong>📍 Dirección:</strong><br>
                  Prolongación Fresno #243<br>
                  Col. San Juan, Tepic, Nayarit<br>
                  C.P. 63514
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p style="margin: 0 0 10px 0; font-size: 16px;">© ${new Date().getFullYear()} Estancia Las Aves. Todos los derechos reservados.</p>
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Este es un mensaje automático</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Confirmación de solicitud - Estancia Las Aves

¡Gracias por tu interés, ${nombre}!

Hemos recibido tu solicitud de información correctamente. Nuestro equipo se pondrá en contacto contigo en un plazo máximo de 24 horas para proporcionarte todos los detalles sobre nuestros servicios.

SERVICIO DE INTERÉS: ${servicio}

Mientras tanto, te invitamos a conocer más sobre nosotros:
- Ambiente seguro y familiar
- Atención personalizada 24/7
- Actividades recreativas y terapéuticas
- Personal especializado en geriatría
- Alimentación balanceada y nutritiva
- Control médico y administración de medicamentos

¿TIENES ALGUNA DUDA?
📞 Teléfono: 311 117 2800
📧 Email: ${process.env.EMAIL_USER}
📍 Dirección: Prolongación Fresno #243, Col. San Juan, Tepic, Nayarit, C.P. 63514

© ${new Date().getFullYear()} Estancia Las Aves. Todos los derechos reservados.
Este es un mensaje automático, por favor no respondas a este correo.
      `,
      // SIN attachments - el logo se carga desde la URL
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email de confirmación enviado al usuario:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error al enviar confirmación al usuario:", error);
    return { success: false, error: error.message };
  }
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

    const transporter = createTransporter();

    // Lista de destinatarios
    const toEmails = [process.env.EMAIL_USER, "alan_jhosel@hotmail.com"].join(
      ", "
    );

    // Formatear número para WhatsApp
    const whatsappData = formatearNumeroWhatsApp(
      telefonoFinal,
      nombreFinal,
      servicioFinal,
      mensajeFinal
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmails,
      replyTo: emailFinal,
      subject: `Nuevo mensaje - ${servicioFinal} - ${nombreFinal}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0078D4; background: linear-gradient(135deg, #f9b872, #ffe3b8); padding: 20px; border-radius: 10px; color: white; text-align: center;">
            Nuevo mensaje de contacto 
          </h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Servicio de interés:</strong> ${servicioFinal}</p>
            <p><strong>Nombre:</strong> ${nombreFinal}</p>
            <p><strong>Email:</strong> ${emailFinal}</p>
            <p><strong>Teléfono:</strong> ${
              telefonoFinal || "No proporcionado"
            }</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #f9b872;">
              ${
                mensajeFinal
                  ? mensajeFinal.replace(/\n/g, "<br>")
                  : "Sin mensaje adicional"
              }
            </p>
            
            ${
              whatsappData
                ? `
            <div style="margin-top: 20px; text-align: center;">
              <a href="${whatsappData.link}" 
                 target="_blank" 
                 style="background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
                </svg>
                Enviar WhatsApp
              </a>
            </div>
            `
                : ""
            }
            
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Enviado el: ${new Date().toLocaleString("es-MX")}
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje de contacto - Estancia Las Aves

Servicio de interés: ${servicioFinal}
Nombre: ${nombreFinal}
Email: ${emailFinal}
Teléfono: ${telefonoFinal || "No proporcionado"}
Mensaje: ${mensajeFinal || "Sin mensaje adicional"}

${whatsappData ? `Enviar WhatsApp: ${whatsappData.link}` : ""}

Enviado el: ${new Date().toLocaleString("es-MX")}
      `,
    };

    console.log("📧 Enviando correo interno...");
    const infoInterno = await transporter.sendMail(mailOptions);
    console.log("✅ Correo interno enviado:", infoInterno.messageId);

    console.log("📧 Enviando confirmación al usuario...");
    const infoUsuario = await enviarConfirmacionUsuario({
      nombre: nombreFinal,
      email: emailFinal,
      servicio: servicioFinal,
    });

    if (!infoUsuario.success) {
      console.warn(
        "⚠️ No se pudo enviar confirmación al usuario, pero el correo interno sí se envió"
      );
    }

    res.status(200).json({
      success: true,
      message: "Correo enviado exitosamente. Te contactaremos pronto.",
      whatsappData: whatsappData || null,
      confirmacionUsuario: infoUsuario.success,
    });
  } catch (error) {
    console.error("❌ Error en el proceso completo:", error);

    let errorMessage = "Error al enviar el correo";

    if (error.code) {
      switch (error.code) {
        case "EAUTH":
          errorMessage =
            "Error de autenticación. Verifica usuario y contraseña.";
          break;
        case "ECONNECTION":
          errorMessage = "Error de conexión con el servidor de correo.";
          break;
        case "ETIMEDOUT":
          errorMessage = "Tiempo de conexión agotado.";
          break;
        default:
          errorMessage = `Error del servidor de correo: ${error.code}`;
      }
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  informarRequerimientoInformacion,
  formatearNumeroWhatsApp,
  enviarConfirmacionUsuario,
};
