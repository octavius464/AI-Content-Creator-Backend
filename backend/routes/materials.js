const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth.js');

const MaterialController = require("../controllers/material");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/', MaterialController.get_random_materials);
/*upload.single middleware parses form data and extracts file along */
router.post('/', upload.single('imageFile'), MaterialController.create_new_material);
router.get('/:materialId', MaterialController.get_one_material);
router.delete('/:materialId', MaterialController.delete_material);
router.patch("/:materialID", checkAuth, MaterialController.update_material);

module.exports = router;