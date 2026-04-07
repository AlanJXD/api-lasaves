const axios = require("axios");

const escapar = (text = "") =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const limpiarNumero = (numero = "") => {
  let limpio = numero.replace(/\D/g, "");

  if (limpio.length === 10) {
    limpio = "52" + limpio;
  }

  return limpio;
};

// 👤 Formatear nombre
const formatearNombre = (nombre = "") => {
  return nombre
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
};

// 💬 Capitalizar mensaje
const capitalizarMensaje = (texto = "") => {
  texto = texto.trim();
  if (!texto) return "Sin mensaje";

  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

const enviarTelegram = async (data) => {
  try {
    const { nombre, email, telefono, servicio, mensaje } = data;

    // 🧠 Formateo
    const nombreFormateado = formatearNombre(nombre);
    const mensajeFormateado = capitalizarMensaje(mensaje);

    const fechaMX = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mazatlan",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // 📩 Mensaje Telegram
    const texto = `
📩 <b>Nuevo contacto web</b>

👤 <b>Nombre:</b> ${escapar(nombreFormateado)}
📧 <b>Email:</b> ${escapar(email)}
📱 <b>Tel:</b> ${escapar(telefono || "No proporcionado")}
🏡 <b>Servicio:</b> ${escapar(servicio)}
💬 <b>Mensaje:</b> ${escapar(mensajeFormateado)}
🕒 <b>Fecha:</b> ${fechaMX}
`;

    // 📲 Número cliente
    const numeroCliente = limpiarNumero(telefono);

    // 📤 Número destino (tu WhatsApp o equipo)
    const numeroDestino = process.env.NUMERO_WHATSAPP;

    // 💬 Mensaje cálido para WhatsApp
    const mensajeWhatsApp = `
Ma, llegó otro mensaje de la estancia

${nombreFormateado}: ${mensajeFormateado}

Servicio: ${servicio}
Tel: ${telefono || "No proporcionado"}
`;

    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: texto,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📲 Contactar cliente",
              url: numeroCliente
                ? `https://wa.me/${numeroCliente}`
                : "https://wa.me/",
            },
          ],
          [
            {
              text: "📤 Reenviar info",
              url: `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`,
            },
          ],
        ],
      },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error Telegram:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  enviarTelegram,
};
