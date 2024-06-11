const {Schema, model}  = require("mongoose");
// Modelo de Carrito de Compras Temporal
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    platos: [{ type: Schema.Types.ObjectId, ref: 'Plate' }],
    cantidad: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Cart", CartSchema, "Cart"); 