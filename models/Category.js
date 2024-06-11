const {Schema, model}  = require("mongoose");
// Modelo de Categorías de Platos
const CategorySchema = new Schema({
    nombre: String,
    descripcion: String,
    platos: [{ type: Schema.Types.ObjectId, ref: 'Plate' }],
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Category", CategorySchema, "Category"); 