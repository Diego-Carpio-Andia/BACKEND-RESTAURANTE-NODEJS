const express = require("express");
const router = express.Router();
const addressController = require("../controllers/Address");
const check = require("../middlewares/auth");

router.get("/buscar/:userId", check.auth , addressController.buscarDireccionesPorUsuario);
router.post("/editar/:id", check.auth , addressController.editarDireccion);
router.post("/guardar", check.auth , addressController.guardarDireccion);

module.exports = router;
