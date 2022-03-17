import React from 'react'
import BtnRender from './BtnRender'

const ProductsItem = ({product,isAdmin,deleteProduct,handleCheck}) => {
    
    return (
        <div className="product_card">
            {
                isAdmin && <input onChange={()=>handleCheck(product._id)} type="checkbox" checked={product.checked}></input>
            }
            <img src={product.images.url}/>
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>{product.price}</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct}/>
        </div>
    )
}

export default ProductsItem
