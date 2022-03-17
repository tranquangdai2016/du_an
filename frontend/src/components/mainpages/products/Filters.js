import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const Filters = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort,setSort] = state.productsAPI.sort
    const [search,setSearch] = state.productsAPI.search

    const handleCategory = (e) =>{
        setCategory(e.target.value)
        setSearch('')
    }
    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters</span>
                <select name="category" id="" value={category} onChange={handleCategory}>
                    <option value="">All product</option>
                    {
                        categories.map(category=>(
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="Enter your search" onChange={e => setSearch(e.target.value.toLowerCase())}/>
            <div className="row sort">
                <span>Sort</span>
                <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: Hight-low</option>
                    <option value='sort=price'>Price: Low-hight</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
