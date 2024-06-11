const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../services/jwt");
const validate  = require("../helpers/validate");
const path = require("path");
const fs = require("fs");

//Profile
const profile = (req, res) =>{  
    const id = req.params.id;
    User.findById(id)
        .select({password:0,role:0})
        .then(user_profile => {
            if(!user_profile){
                return res.status(404).json({
                    error,
                    status: "error",
                    message: "el usuario no existe"
                });
            }
            return res.status(200).json({
                status: "success",
                user: user_profile,
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Error en la consulta",
                error
            });
        });
}
//Login
const login = (req,res)=>{
    const params = req.body;
    if(!params.email || !params.password){
        return res.status(400).json({
            status: "error",
            message: "faltan datos"
        });
    }
    User.findOne({email: params.email.toLowerCase()})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    error,
                    status: "error",
                    message: "no existe el usuario"
                });
            }

            let pwd = bcrypt.compareSync(params.password, user.password)

            if(!pwd){
                return res.status(404).json({
                    status: "error",
                    message: "no te has identificado correctamente"
                });
            }
            const token = jwt.createToken(user);

            return res.status(200).json({
                status: "success",
                message: "te has identificado correctamente",
                user: {
                    id: user._id,
                    name: user.name,
                },
                token
            })
            
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Error en la consulta",
                error
            });
        }); 
}
//Register
const register =  (req, res) => {
    const params = req.body;
    if (!params.name || !params.email || !params.password || !params.role) {
        return res.status(500).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });
    }

    try {
        validate.validate(params);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Validacion no superada",
        });
    }

    let user_to_save = new User(params);
    user_to_save.email = user_to_save.email.toLowerCase();

    User.findOne({ email: user_to_save.email })
    .then(user_true => {
        if (user_true) {
            return res.status(200).json({
                status: "success",
                message: "El usuario ya existe"
            });
        } else {
            bcrypt.hash(user_to_save.password, 10)
                .then(password_to_save => {
                    user_to_save.password = password_to_save;

                    user_to_save.save()
                        .then(userStored => {
                            return res.status(200).json({
                                status: "success",
                                message: "Se guardó el usuario",
                                user: userStored
                            });
                        })
                        .catch(error => {
                            return res.status(500).json({
                                status: "error",
                                message: "Hubo un error al guardar el usuario",
                                error
                            });
                        });
                })
                .catch(error_hash => {
                    return res.status(500).json({
                        status: "error",
                        message: "Error al cifrar la contraseña",
                        error_hash
                    });
                });
        }
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "Error en la consulta",
            error
        });
    });       
};
//update
const update = async (req, res) => {
    let userToUpdate = req.body;
    let userIdentity = req.user;
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    if (!req.body) {
        // Manejar caso donde no hay datos en el cuerpo de la solicitud
    }

    try {
        const usuario = await User.findOne({ email: userToUpdate.email.toLowerCase() });

        if (usuario) {
            return res.status(200).json({
                status: "success",
                message: "El usuario ya existe",
            });
        }

        if (userToUpdate.password) {
            let pwd = await bcrypt.hash(req.body.password, 10);
            userToUpdate.password = pwd;
        } else {
            delete userToUpdate.password;
        }

        const userUpdate = await User.findByIdAndUpdate(
            userIdentity.id,
            userToUpdate,
            { new: true }
        );

        if (!userUpdate) {
            return res.status(500).json({
                status: "error",
                message: "Error al actualizar usuario",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Usuario actualizado correctamente",
            user: userUpdate,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error en la consulta",
            error
        });
    }
};
//upload
const upload = (req,res) => {   
    let image = req.file.originalname;
    const imagesplit = image.split("\.");
    const extension = imagesplit[1];

    if(extension != "png" &&
       extension != "jpg" &&
       extension != "jpeg" &&
       extension != "gif"){
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);
        return res.status(400).json({
            status: "error",
            message: "extension no valida" 
        });
    }    
    User.findByIdAndUpdate(req.user.id, {image: req.file.filename}, {new: true})
    .then(userUpdate=>{
        if(!userUpdate){
            return res.status(500).json({
                status: "error",
                message: "no se pudo subir archivo" 
            });
        }        
        return res.status(200).json({
            status: "success", 
            user: userUpdate,
            file: req.file
        });
    })
    .catch(error => {
        return res.status(500).json({
            status: "error",
            message: "Error en la consulta",
            error,
        });
    }); 
}
//avatar
const avatar = (req,res) => {
    const file = req.params.file;
    const filePath = "./uploads/avatars/"+file;
    fs.stat(filePath, (error, exists)=>{
        if(!exists){
            return res.status(404).json({
                status: "error",
                message: "no existe la imagen"
            });
        }
        return res.sendFile(path.resolve(filePath));
    })
}

module.exports = {
    profile,
    login,
    register,
    update,
    upload,
    avatar    
}