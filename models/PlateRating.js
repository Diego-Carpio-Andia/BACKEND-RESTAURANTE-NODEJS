const {Schema, model}  = require("mongoose");
// Modelo de Valoraciones de Platos
const PlateRatingSchema = new Schema({
    plateId: { type: Schema.Types.ObjectId, ref: 'Plate' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    calificacion: Number,
    comentario: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("PlateRating", PlateRatingSchema, "PlateRating"); 