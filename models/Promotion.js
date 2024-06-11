const {Schema, model}  = require("mongoose");
// Definir el esquema de promociones
const PromotionSchema = new Schema({
    nombre: String,
    descripcion: String,
    puntosRequeridos: Number,
    disponible: { type: Boolean, default: true },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Promotion", PromotionSchema, "Promotion"); 
