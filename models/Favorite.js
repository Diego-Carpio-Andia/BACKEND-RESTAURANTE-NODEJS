const {Schema, model}  = require("mongoose");
// Definir el esquema de favoritos
const FavoriteSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    plateId: {
      type: Schema.Types.ObjectId,
      ref: 'Plate'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = model("Favorite", FavoriteSchema, "Favorite"); 
