const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check_auth')

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads/')
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null,true)
    } else {
        // Reject a file
        cb(null,false)
    }    
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})

const ProductsController = require('../controllers/products')

router.get('/', ProductsController.get_all_products)

router.post('/', checkAuth, upload.single('productImage'), ProductsController.create_new_product)

router.get("/:productId", ProductsController.get_product_by_id)

router.patch("/:productId", checkAuth, ProductsController.update_product_by_id)

router.delete("/:productId", checkAuth, ProductsController.delete_product_by_id)

module.exports = router