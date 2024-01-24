import { useEffect } from "react"
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductSimilar } from "../store/slices/productsSlice";
import CardProduct from "./CardProduct";

function Similar({ category }) {

    const { product_id } = useParams();

    const dispatch = useDispatch();

    const productsStore = useSelector(state => state.productsStore);

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductSimilar(category));
        }
    }, [category, dispatch, product_id]);

    return (
        !productsStore.productDetails.similar.loading ?
            <div className="similar_products">
                <Row className='row-gap-4'>
                    {
                        productsStore.productDetails.similar.products.filter(category => category.id !== +product_id).map((product, index) => {
                            return (
                                <Col key={index} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                                    <CardProduct product={product} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
            :
            <BeatLoader className='text-center d-block p-3' color="#1d006f" />
    )
}

export default Similar;