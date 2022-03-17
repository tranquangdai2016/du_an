import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icons/menu.svg'
import Cancel from './icons/cancel.svg'
import Cart from './icons/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;
    const [menu, setMenu] = useState(false)

    const logoutUser =async ()=>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        // localStorage.clear()
        window.location.href= "/"
    }
    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Caretory</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }
    const toggleMenu = () =>{
        setMenu(!menu)
    }
    const styleMenu = {
        left : menu ?0 : "-100%"
    }

    return (
        <div>
            <header>
                <div className="menu" onClick={()=>setMenu(!menu)}>
                    <img src={Menu} width="60"/>
                </div>
                <div className="logo">
                    <h1>
                        <Link to="/">{isAdmin ? 'Admin' : 'Mai la anh em'}</Link>
                    </h1>
                </div>
                <ul style={styleMenu}>
                    <li><Link to="/">{isAdmin ? 'Products' :'Shop'}</Link></li>
                    {isAdmin && adminRouter()}
                    {
                        isLogged ? loggedRouter() : <li><Link to="/login">Login || Register</Link></li>
                    }
                    <li onClick={()=>setMenu(!menu)}>
                        <img src={Cancel} width="30" className="menu"/>
                    </li>
                </ul>
                {
                    isAdmin ? '' :
                    <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} width="30"/>
                        </Link>
                    </div>
                }
                
            </header>
        </div>
    )
}

export default Header
