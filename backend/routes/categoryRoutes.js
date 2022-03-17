import express from 'express'
import { creatCategories, deleteCategories, getCategories, updateCategories } from '../controllers/categoryController.js';
import { auth } from '../middleware/auth.js';
import {authAdmin} from '../middleware/authAdmin.js'
const routes = express.Router();

routes.route('/category')
    .get(getCategories)
    .post(auth, authAdmin,creatCategories)

routes.route('/category/:id')
    .delete(auth,authAdmin,deleteCategories)
    .put(auth,authAdmin,updateCategories)

export default routes;