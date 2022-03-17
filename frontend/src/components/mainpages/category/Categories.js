import axios from 'axios'
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const Categories = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category,setCategory] = useState('')
    const [token] = state.token
    const [callback,setCallback] = state.categoriesAPI.callback
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState('')

    const createCategory = async(e)=>{
        e.preventDefault()
        try {
            if(edit){
                const res = await axios.put(`/api/category/${id}`,{name:category},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category',{name:category},{
                    headers:{Authorization:token}
                })
                alert(res.data.msg)
            }
                setCategory('')
                setCallback(!callback)
                setEdit(false)
        } catch (err) {
                alert(err.response.data.msg)
        }
    }

    const editCatogery = async (id,name) =>{
        setId(id)
        setCategory(name)
        setEdit(true)
    }

    const deleteCategory = async (id) =>{
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers:{Authorization:token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="categories">
            <form action="" onSubmit={createCategory}>
                <label>Categories</label>
                <input type="text" name="category" value={category} onChange={e => setCategory(e.target.value)} />
                <button type="submit">{edit ? 'Update' : 'Create'}</button>
            </form>
            <div className="col">
                {
                    categories.map(category=>(
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button onClick={()=>editCatogery(category._id,category.name)}>Edit</button>
                                <button onClick={()=>deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
