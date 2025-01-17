const {Schema, model}  = require("mongoose");
//modelo de usuarios
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String
    },

    bio: String,  

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "role_user"
    },

    image: {
        type: String,
        default: "default.png"
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    
});
module.exports = model("User", UserSchema, "User"); 

