import axios from 'axios';
import React ,{createContext,useEffect,useState} from 'react'
import UserApi from './api/UserApi';
import CategoryApi from './api/CategoryApi';
import ProductApi from './api/ProductApi';



export const GlobalState = createContext();
export const DataProvider = ({children}) =>{
    const [token,setToken] = useState(false)
    useEffect(() =>{
            const firstLogin = localStorage.getItem('firstLogin')
            if(firstLogin){
                const refreshToken = async () =>{
                    const res = await axios.get('/user/refresh_token')
                    setToken(res.data.accesstoken)
                    setTimeout(() => {
                        refreshToken()
                    }, 10 * 60 * 1000)
                }
                refreshToken()  
            }
    },[])
    const state = {
        token: [token,setToken],
        userAPI: UserApi(token),
        categoriesAPI: CategoryApi(),
        productsAPI:ProductApi()
    }
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}