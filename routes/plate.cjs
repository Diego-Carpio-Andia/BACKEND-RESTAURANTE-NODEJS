const express = require("express");
const router = express.Router();
const plateController = require("../controllers/plate.cjs");
const check = require("../middlewares/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "./uploads/platos/");
    },

    filename: (req,file,cb) => {
        cb(null, "platillo - "+Date.now()+ "-"+file.originalname);
    }
})
const uploads =  multer({storage});


router.get("/list", plateController.list);
router.get("/image/:file", plateController.viewImage);
router.delete("/eliminar/:id", plateController.eliminar);
router.post("/save", plateController.save);
router.post("/upload/:id",[uploads.single("file0")],plateController.upload);


module.exports = router;
