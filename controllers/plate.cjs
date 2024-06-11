const Plate = require("../models/Plate");
const path = require("path");
const multer = require('multer');
const fs = require('fs');

const save = (req,res)=>{
    const params = req.body;
    if(!params.nombre || !params.descripcion || !params.precio || !params.promocion){
        return res.status(500).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });
    }
    let plate_to_save = new Plate(params);
    plate_to_save.save()
    .then(plateStored =>{
        if(!plateStored){
            return res.status(500).json({
                status: "error",
                message: "error al guardar del plato",
                params
            });
        }
        return res.status(200).json({
            status: "success",
            message: "El plato se guardo correctamente",
            plateStored
        })
    }).catch(error => {        
        return res.status(500).json({
            status: "error",
            message: "Hubo un error al guardar del plato",
            error
        });
    });
}
const upload = (req,res) => {   
    let image = req.file.originalname;
    const id = req.params.id;
    const imagesplit = image.split("\.");
    const extension = imagesplit[1];
    //falta modificar el nombre del archivo
    if(extension != "png" &&
       extension != "jpg" &&
       extension != "jpeg"){
        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);
        return res.status(400).json({
            status: "error",
            message: "extension no valida" 
        });
    }    
    Plate.findByIdAndUpdate(id, {image: req.file.filename}, {new: true})
    .then(plateUpdate=>{
        if(!plateUpdate){
            return res.status(500).json({
                status: "error",
                message: "no se pudo subir archivo" 
            });
        }        
        return res.status(200).json({
            status: "success", 
            plate: plateUpdate,
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
const eliminar = async (req,res) => {
    const id = req.params.id;
    const id_encontrado = await Plate.findById(id).exec();
    if(id_encontrado != null){
       fs.unlink("./uploads/platos/"+id_encontrado.image, ()=>{
        console.log("se elimino el archivo completamente");
       })

        const resultado = await id_encontrado.deleteOne({_id:id});
        return res.status(200).json({
        status: "success",
        message: "plato eliminado correctamente",
        resultado 
        });

    }else{
        return res.status(404).json({
            status: "error",
            message: "plato no encontrado" 
        });
    }
}
const list = async (req,res)=>{
    platos = await Plate.find({});
    return res.status(200).json({
        status: "sucess",
        platos
    });
}
const viewImage = async (req,res) => {
    const file = req.params.file;
    const filePath = "./uploads/platos/"+ file;
    fs.stat(filePath,(error,exists)=>{
        if(!exists){
            return res.status(400).json({
                status: "error",
                message: "no existe la imagen"
            });
        }
    })
    return res.sendFile(path.resolve(filePath));
}


module.exports = {
    save,
    upload,
    eliminar,
    list,
    viewImage
}