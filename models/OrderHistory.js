const {Schema, model}  = require("mongoose");
// Modelo de Historial de Pedidos
const OrderHistorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    pedidos: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("OrderHistory", OrderHistorySchema, "OrderHistory"); 
