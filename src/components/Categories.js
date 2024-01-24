import React from 'react';
import { api } from '../services/api';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { changeActiveCategory } from '../store/slices/categoriesSlice';
import '../style/Categories.css'

function Categories() {
    const categoriesStore = useSelector(state => state.categoriesStore);

    const dispatch = useDispatch();

    const handelDispatch = (category) => {
        if (category === 'all') {
            dispatch(fetchProducts(`${api.base_url}${api.endpoints.get_products}`));
        } else {
            dispatch(fetchProducts(`${api.base_url}${api.endpoints.get_products_by_category}${category}`));
        }
        dispatch(changeActiveCategory(category));
    };

    return (
        <div className='categories mb-3 d-flex align-items-center justify-content-between flex-wrap'>
            <span>Sort By:</span>
            <ul className='d-flex align-items-center py-2 gap-2 flex-wrap'>
                <li>
                    <Button
                        onClick={() => { handelDispatch('all'); }}
                        aria-label='All'
                        className={`${categoriesStore.activeCategory === 'all' ? 'active' : ''} category`}
                    >
                        All
                    </Button>
                </li>

                {
                    !categoriesStore.loading ?
                        categoriesStore.categories.map((category, index) => {
                            return (
                                <li key={index}>
                                    <Button
                                        onClick={() => { handelDispatch(category); }}
                                        aria-label={category}
                                        className={`${categoriesStore.activeCategory === category ? 'active' : ''} text-capitalize category`}
                                    >
                                        {category}
                                    </Button>
                                </li>
                            )
                        })
                        :
                        "Loading..."
                }
            </ul>
        </div>
    )
}

export default Categories;