import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCarts } from '../store/slices/cartsSlice';
import { Link } from 'react-router-dom';
import StarsList from './StarsList';
import '../style/CardProducts.css';

function CardProduct({ product }) {
    const dispatch = useDispatch();

    const cartsStore = useSelector(state => state.cartsStore);

    const { id, image, title, price, rating: { rate } } = product;

    return (
        <Card className='card_product position-relative overflow-hidden'>
            {
                cartsStore.find(cart => cart.id === id) ?
                    <Button
                        aria-label='Add to Carts'
                        className='floating_btn transition bg_move_color border_move_color w-75 mx-auto shadow-lg position-absolute z-3 start-50 translate-middle-x'
                    >
                        <i className="fa-solid fa-check me-2"></i>
                        <span>Added to Carts</span>
                    </Button>
                    :
                    <Button
                        onClick={() => { dispatch(addToCarts(product)) }}
                        aria-label='Add to Carts'
                        className='floating_btn transition w-75 mx-auto shadow-lg position-absolute z-3 start-50 translate-middle-x'
                    >
                        <i className="fa-solid fa-plus me-2"></i>
                        <span>Add to Carts</span>
                    </Button>
            }
            <Card.Img
                variant="top"
                src={image}
                className='mx-auto p-2'
                style={{ width: '180px', height: '220px' }}
                alt={title}
            />
            <Card.Body>
                <p className='mb-3 fw-bold'>{title.length > 17 ? title.slice(0, 17) + '...' : title}</p>
                <div className='price mb-2 d-flex align-items-center justify-content-between'>
                    <p>Price:</p>
                    <p>{price}$</p>
                </div>
                <div className='rating mb-2 d-flex align-items-center justify-content-between'>
                    <StarsList rate={rate} />
                    <span>( {rate} )</span>
                </div>
                <Link to={`/products/${id}`} className='link_details transition btn w-100'>Details</Link>
            </Card.Body>
        </Card>
    )
}

export default CardProduct
