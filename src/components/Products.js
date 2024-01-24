import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Spinner from './Spinner';
import Categories from './Categories';
import CardProduct from './CardProduct';

function Products() {
    const productsStore = useSelector(state => state.productsStore);

    return (
        !productsStore.loading ?
            <div className='products py-5' >
                <Container>
                    <h4 className='mb-3'>Products</h4>
                    <Categories />
                    <Row className='row-gap-4'>
                        {
                            productsStore.products.map((product, index) => {
                                return (
                                    <Col key={index} className='col-12 col-sm-6 col-md-4 col-lg-3'>
                                        <CardProduct product={product} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </div>
            :
            <Spinner />
    )
}

export default Products
