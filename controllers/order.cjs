const order = require("../models/Order");
const plate = require("../models/Plate");
const fs = require('fs');

const save = (req,res)=>{
    let params = req.body;

    if(!params.platos || !params.direccion || !params.estado || !params.fechaEntrega){
        return res.status(500).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });   
    }
    
    // Parsear el campo "platos" a un array de objetos
    let platos;
    try {
        platos = JSON.parse(params.platos);
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Error al parsear los platos"
        });
    }

    // Crear la orden con los datos proporcionados
    let order_to_save = new order({
        user: req.user.id,
        platos: platos,
        direccion: params.direccion,
        estado: params.estado,
        fechaEntrega: params.fechaEntrega
    });

    order_to_save.save().then(orderSaved => {
        if(!orderSaved){
            return res.status(404).send({
                status: "error",
                message: "no se ha guardardo"
            })
        }
        return res.status(200).send({
            status:"success",
            message:"se guardo la orden",
            orderSaved
        })
    })

}
const eliminar = async (req,res)=>{
    let id = req.params.id;
    let id_encontrado = await order.findById(id).exec();
    if(id_encontrado != null){       
        
        const resultado = await id_encontrado.deleteOne({_id:id});
        return res.status(200).json({
            status: "success",
            message: "plato eliminado correctamente",
            resultado 
        });        

    }else{
        return res.status(404).json({
            status: "error",
            message: "orden no encontrada" 
        });
    }
}
const updateByQuantity = async(req,res)=>{
    let id = req.body.id;
    let idplato = req.body.idplato;
    let cantidad = req.body.cantidad;
    if(!id && !cantidad){
        return res.status(500).json({
            status: "Error",
            message: "Faltan datos por enviar"
        }); 
    }
    let id_encontrado = await order.findById(id).exec();
    if(id_encontrado){
        let newOrder = id_encontrado;
        let platoEncontrado = newOrder.platos.find(platos => platos._id == idplato);
        console.log(platoEncontrado);
        if(platoEncontrado){
            let plato_posicion = newOrder.platos.indexOf(platoEncontrado);
            console.log(plato_posicion);
            newOrder.platos[plato_posicion].cantidad = cantidad;
            console.log(newOrder.platos)
            const orderUpdate = await order.findByIdAndUpdate(id,newOrder,{new:true});
            if(orderUpdate){
                return res.status(200).json({
                    status: "success",
                    message: "Se realizo el cambio correctamente",
                    orderUpdate
                });
            }            
        }else{
            return res.status(500).json({
                status: "Error",
                message: "No se encontro el plato"
            });
        }
    }
    else{
        return res.status(500).json({
            status: "Error",
            message: "Faltan datos por enviar"
        });   
    }
    

}

module.exports = {
    save,
    eliminar,
    updateByQuantity
}