const {mongoose} = require("mongoose");
const connection = async()=>{
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb://localhost:27017/RestaurantePedidosDB");
        console.log("Conectado");
    }catch(error){
        console.log(error);
        throw new Error("no se conecto a la base de datos");
    }
}
module.exports = {
    connection
}