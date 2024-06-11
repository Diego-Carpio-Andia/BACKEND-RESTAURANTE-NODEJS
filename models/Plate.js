const {Schema, model}  = require("mongoose");
// Definir el esquema de platos
const PlateSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    promocion: String,
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Plate", PlateSchema, "Plate"); 
