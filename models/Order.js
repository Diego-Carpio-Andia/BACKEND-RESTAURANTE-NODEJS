const {Schema, model}  = require("mongoose");
// Definir el esquema del pedido
const OrderSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    platos: [{
      plate: {
        type: Schema.Types.ObjectId,
        ref: 'Plate'
      },
      cantidad: Number
    }],
    direccion: String,
    estado: String,
    compra: {
      type: String,
      default: "CompraDirecta"
    },
    fechaEntrega: Date,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Order", OrderSchema, "Order"); 