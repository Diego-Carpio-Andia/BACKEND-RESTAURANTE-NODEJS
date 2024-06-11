const validator = require("validator");
const validate = (params) => {
    let name = !validator.isEmpty(params.name) ||
                validator.isAlpha(params.name, "es-Es");
    let surname = !validator.isEmpty(params.surname) ||
                   validator.isAlpha(params.surname, "es-Es");
    let email = !validator.isEmpty(params.email) ||
                 validator.isEmail(params.email, "es-Es");
    if(!name || !surname || !email){
        throw new Error("No se ha validado el usuario");
    }else{
        console.log("Validacion superada");
    }
}

module.exports = {
    validate
}