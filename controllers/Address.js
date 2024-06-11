const Address = require("../models/Address");

const guardarDireccion = (req, res) => {
    const {direccion, etiqueta} = req.body;
    
    if(!direccion || !etiqueta){
        return res.status(404).json({
            status: "error",
            message: "digite completamente su direccion",
        });
    }

    const nuevaDireccion = new Address({
        user: req.user.id,
        direccion,
        etiqueta
    });

    nuevaDireccion.save()
        .then(direccionGuardada => {
            return res.status(200).json({
                status: "success",
                message: "Se guardó la dirección de entrega correctamente",
                direccion: direccionGuardada
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Hubo un error al guardar la dirección de entrega",
                error
            });
        });
};

const buscarDireccionesPorUsuario = (req, res) => {
    const userId = req.params.userId;

    Address.find({ user: userId })
        .then(direcciones => {
            return res.status(200).json({
                status: "success",
                direcciones
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Hubo un error al buscar las direcciones del usuario",
                error
            });
        });
};

const editarDireccion = (req, res) => {
    const direccionId = req.params.id;
    const { direccion, etiqueta } = req.body;

    Address.findByIdAndUpdate(direccionId, { direccion, etiqueta }, { new: true })
        .then(direccionActualizada => {
            if (!direccionActualizada) {
                return res.status(404).json({
                    status: "error",
                    message: "No se encontró la dirección para actualizar"
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Dirección de entrega actualizada correctamente",
                direccion: direccionActualizada
            });
        })
        .catch(error => {
            return res.status(500).json({
                status: "error",
                message: "Hubo un error al actualizar la dirección de entrega",
                error
            });
        });
};

module.exports = {
    editarDireccion,
    buscarDireccionesPorUsuario,
    guardarDireccion
}