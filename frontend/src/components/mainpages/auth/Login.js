import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Login = () => {
    const [user,setUser] = useState({
        email:'',password:''
    })
    const onChangeInput = (e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }
    const loginSubmit =async (e) =>{
        e.preventDefault()
        try {
            await axios.post(`/user/login`,{...user})
            localStorage.setItem('firstLogin',true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div>
            <div className="login-page">
                <form onSubmit={loginSubmit}>
                    <h2>Login
                    </h2>
                    <input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
                    <input type="password" name="password" required placeholder="Password" value={user.password} autoComplete="on" onChange={onChangeInput} />
                    <div className="row">
                        <button type="submit">Login</button>
                        <Link to="/register">New Customers?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login