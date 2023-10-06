
const express = require('express');
const router = express.Router();

const {newProduct, getProducts, getSingleProduct, updateProduct,deleteProduct} = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');

router.post('/product/new', isAuthenticatedUser, authorizeRoles('admin', 'encoder'), newProduct);
router.get('/products', getProducts);
router.get('/product/:id', getSingleProduct);
router.route('/admin/product/:id', isAuthenticatedUser, authorizeRoles('admin')).put(updateProduct).delete(deleteProduct);

// router.get('/products', isAuthenticatedUser, getProducts)
// router.post('/product/new', isAuthenticatedUser, authorizeRoles('admin'), newProduct)
// router.get('/product/:id', getSingleProduct);
// router.route('/admin/product/:id' ,isAuthenticatedUser ,authorizeRoles('admin')).put(updateProduct).delete(deleteProduct);


module.exports = router;