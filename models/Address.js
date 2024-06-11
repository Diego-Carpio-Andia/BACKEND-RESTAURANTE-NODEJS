const {Schema, model}  = require("mongoose");
// Modelo de Direcciones de Entrega
const AddressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    direccion: String,
    etiqueta: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Address", AddressSchema, "Address"); 
