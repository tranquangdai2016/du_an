import express from 'express'
import { getUser, history, login, logout, refreshToken, register } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';
const routes = express.Router();

routes.post('/register',register)
routes.post('/login',login)
routes.get('/logout',logout)
routes.get('/infor',auth,getUser)
routes.get('/refresh_token',refreshToken)
// routes.patch('/addcart', auth,addCart)
routes.get('/history', auth,history)


export default routes;