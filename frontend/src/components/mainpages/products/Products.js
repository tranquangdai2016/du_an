import React,{ useContext, useState} from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductsItem from '../utils/ProductItems/ProductsItem'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'





const Products = () => {
    const state = useContext(GlobalState)
    const [products,setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [callback, setCallback] = state.productsAPI.callback
    const [token]= state.token
    const [loading,setLoading] = useState(false)
    const [isCheck,setIsCheck] = useState(false)
    const deleteProduct = async(id,public_id)=>{
        try {
            setLoading(true)
            const destroyImg =  axios.post('/api/destroy',{public_id},{
                headers:{Authorization:token}
            })
            const deleteProduct = axios.delete(`/api/products/${id}`,{
                headers:{Authorization:token}
            })
            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleCheck = (id) =>{
        products.forEach(product=>{
            if(product._id === id){
                product.checked = !product.checked
            }
        })
        setProducts([...products    ])
        
    }
    const checkAll = () =>{
        products.forEach(product=>{
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    }

    const deleteAll = ()=>{
        products.forEach(product=>{
            if(product.checked)
                deleteProduct(product._id,product.images.public_id)
        })
    }
    if(loading) return <Loading/>

    return (
        <>
        <Filters/>
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll}/>
                <button onClick={deleteAll}>Delete All</button>
            </div>
        }
        <div>
            <div className="products">
                {
                    products.map(product =>{
                        return <ProductsItem key={product._id} product={product}  isAdmin={isAdmin} handleCheck={handleCheck} deleteProduct={deleteProduct}/>
                    })
                }
            </div>
            <LoadMore/>
            {products.length === 0 && <Loading/>}
        </div>
        </>
    )
}

export default Products
