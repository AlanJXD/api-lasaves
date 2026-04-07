const axios = require("axios");

const escapar = (text = "") =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const enviarTelegram = async (data) => {
  try {
    const { nombre, email, telefono, servicio, mensaje } = data;

    const fechaMX = new Date().toLocaleString("es-MX", {
      timeZone: "America/Mazatlan",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const texto = `
📩 <b>Nuevo contacto web</b>

👤 <b>Nombre:</b> ${escapar(nombre)}
📧 <b>Email:</b> ${escapar(email)}
📱 <b>Tel:</b> ${escapar(telefono || "No proporcionado")}
🛠 <b>Servicio:</b> ${escapar(servicio)}
💬 <b>Mensaje:</b> ${escapar(mensaje || "Sin mensaje")}
🕒 <b>Fecha:</b> ${fechaMX}
`;

    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: texto,
      parse_mode: "HTML",
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Error Telegram:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  enviarTelegram,
};