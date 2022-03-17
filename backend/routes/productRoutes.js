import express from 'express'
import { createProducts, deleteProducts, getProducts, updateProducts } from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';
import {authAdmin} from '../middleware/authAdmin.js'
const routes = express.Router();

routes.route('/products')
    .get(getProducts)
    .post(auth, authAdmin,createProducts)

routes.route('/products/:id')
    .delete(auth,authAdmin,deleteProducts)
    .put(auth,authAdmin,updateProducts)

export default routes;