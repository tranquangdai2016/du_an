import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const initialState  ={
    product_id:'',
    title:'',
    price:0,
    description:'hii',
    content:'welcom',
    category:'',
    id:''
}

const CreateProduct = () => {
    const state = useContext(GlobalState)
    const [product,setProduct] = useState(initialState )
    const [categories] = state.categoriesAPI.categories
    const [images,setImages] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [products] = state.productsAPI.products
    const [onEdit,setOnEdit] = useState(false)
    const [callback,setCallback] = state.productsAPI.callback
    const history = useNavigate();
    const param = useParams();

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product=>{
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                }
                
            })
        }else{
            setOnEdit(false)
            setProduct(initialState )
            setImages(false)
        }
    },[param.id,products])
    const styleUpload ={
        display:images?"block":"none"
    }
    const handleUpload =async (e) =>{
        e.preventDefault();
        try {
            if(!isAdmin) return alert("Is not admin")
            const file = e.target.files[0]

            if(!file) return alert('file not exist')

            if(file.size > 1024*1024)
                return alert("Size too larger")
            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect")
             let formData = new FormData();
             formData.append('file',file)
             const res = await axios.post('/api/upload',formData,{
                 headers:{'content-type':'multipart/form-data',Authorization:token}
             })
             setImages(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const hadnleDestroy = async () =>{
        try {
            if(!isAdmin) return alert("Is not admin")
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers:{Authorization:token}
            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput = (e) =>{
        const {name,value} = e.target
        setProduct({...product,[name]:value})
    }
    const handleSubmit =async (e) =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("Is not admin")
            if(!images) return alert("No images upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product,images},{
                    headers:{Authorization:token}
                })
            }else{
                await axios.post('/api/products', {...product,images},{
                    headers:{Authorization:token}
                })
            }
            setCallback(!callback)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} />
                    <span onClick={hadnleDestroy}>X</span>
                </div>
            </div>
            <form action=""onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input disabled={onEdit} onChange={handleChangeInput} type="text" name="product_id" id="product_id" value={product.product_id}/>
                </div>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChangeInput} type="text" id="title" name="title" value={product.title}/>
                </div>
                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input onChange={handleChangeInput} type="number" id="price" name="price" value={product.price}/>
                </div>
                
                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea onChange={handleChangeInput} rows="5" type="text" id="content" name="content" value={product.content}/>
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleChangeInput} rows="7" type="text" id="description"  value={product.description}/>
                </div>
                <div className="row">
                    <label htmlFor="category">Categories</label>
                    <select onChange={handleChangeInput} name="category" value={product.category}>
                        <option value="">Select category</option>
                        {
                            categories.map(category=>(
                                <option  value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}

export default CreateProduct
