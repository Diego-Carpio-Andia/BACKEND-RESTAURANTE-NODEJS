const {Schema, model}  = require("mongoose");
// Modelo de Configuración del Sitio
const SiteConfigSchema = new Schema({
    horario: {
      apertura: String,
      cierre: String
    },
    costoEnvio: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("SiteConfig", SiteConfigSchema, "SiteConfig"); 