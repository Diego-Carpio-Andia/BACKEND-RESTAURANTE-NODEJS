const {Schema, model}  = require("mongoose");
// Modelo de Cupones o Descuentos
const CouponSchema = new Schema({
    codigo: String,
    descripcion: String,
    descuento: Number,
    validoDesde: Date,
    validoHasta: Date,
    cantidadDisponible: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Coupon", CouponSchema, "Coupon"); 