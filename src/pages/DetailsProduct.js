import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { fetchProductDetails } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCarts } from "../store/slices/cartsSlice";
import StarsList from "../components/StarsList";
import LinkBack from "../components/LinkBack";
import Similar from "../components/Similar";
import Spinner from "../components/Spinner";
import "../style/DetailsProduct.css";

function DetailsProduct() {

    const { product_id } = useParams();

    const productsStore = useSelector(state => state.productsStore);
    const cartsStore = useSelector(state => state.cartsStore);

    const dispatch = useDispatch();



    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductDetails(product_id));
        }
    }, [dispatch, product_id]);

    const { id, description, category, image, price, rating: { rate }, title } = productsStore.productDetails.product;

    return (
        !productsStore.productDetails.loading ?
            <div className="details_product_page py-5">
                <Container className="position-relative">
                    {/* Card Product */}
                    <LinkBack path='/' />
                    <h4 className="mb-3">Product: </h4>
                    <div className="card card_product mb-5">
                        <div className="row g-0">
                            <div className="col-md-4 text-center">
                                <img
                                    src={image}
                                    className="img-fluid rounded-start p-3"
                                    alt={title}
                                    style={{ height: '250px' }}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card_body p-2 text-center text-md-start">
                                    <h5 className="card_title">{title}</h5>
                                    <p className="card_text opacity-75 mb-0">{description}</p>
                                </div>
                                <div className="card_foot p-2 d-flex d-md-block align-items-center justify-content-between">
                                    <div className="d-flex align-items-center mb-md-3">
                                        <StarsList rate={rate} />
                                        <span>( {rate} )</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="mb-0 me-2">Price: </p>
                                        <span>{price}$</span>
                                    </div>
                                </div>
                                <div className="p-2 d-flex align-items-center justify-content-between">
                                    <button type='button' aria-label="add_to_carts" className="btn btn_buy_now">Buy Now</button>
                                    {
                                        cartsStore.find(cart => cart.id === id) ?
                                            <Link to='/carts' className="btn btn_add_to_carts">Show Carts</Link>
                                            :
                                            <button onClick={() => { dispatch(addToCarts(productsStore.productDetails.product)) }} type='button' aria-label="add_to_carts" className="btn btn_add_to_carts">Add to Carts</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="similar_products">
                        <h4 className="mb-3">Similar Products: </h4>
                        <Similar category={category} />
                    </div>
                </Container>
            </div>
            :
            <Spinner />
    )
}

export default DetailsProduct;