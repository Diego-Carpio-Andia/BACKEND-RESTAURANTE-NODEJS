const {Schema, model}  = require("mongoose");
// Definir el esquema de opiniones
const ReviewSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comentario: String,
    calificacion: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Review", ReviewSchema, "Review"); 
