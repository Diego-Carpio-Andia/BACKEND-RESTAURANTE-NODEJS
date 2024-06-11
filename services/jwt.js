const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "CLAVE_SECRETA_DEL_PROYECTO_DEL_RESTAURANTE_CUYJAENO_REALIZADO_REACT_MONGODB_NODEJS_DULCES";

const createToken = (user) =>{
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    return jwt.encode(payload,secret);
}

module.exports = {
    createToken,
    secret
}