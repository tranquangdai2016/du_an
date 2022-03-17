import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Categories from './category/Categories'
import NotFound from './utils/NotFound/NotFound'
import CreateProduct from './create-product/CreateProduct'
import Products from './products/Products'



const Pages = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <Routes>
            <Route path="/" exact element={<Products/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/register" exact element={<Register/>}/>
            <Route path="/category" exact element={<Categories/>}/>
            <Route path="/create_product" exact element={<CreateProduct/>} />
            {/* ---------------------------------------- */}
            <Route path="*"  exact component={NotFound}/>
            
        </Routes>
    )
}

export default Pages
