const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.cjs");
const check = require("../middlewares/auth");

router.post("/save",check.auth, orderController.save);
router.put("/update", orderController.updateByQuantity);
router.delete("/eliminar/:id", orderController.eliminar);

module.exports = router;
