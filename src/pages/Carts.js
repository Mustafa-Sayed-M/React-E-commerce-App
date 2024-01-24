import { Button, Container, Image, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { addToCarts, deleteFromCarts, deleteOne } from "../store/slices/cartsSlice";
import LinkBack from "../components/LinkBack";
import { Link } from "react-router-dom";

function Carts() {
    const cartsStore = useSelector(state => state.cartsStore);
    const dispatch = useDispatch();

    const totalPrice = cartsStore.reduce((acc, cart) => {
        return acc + (cart.price * cart.count);
    }, 0)

    return (
        <div className="carts_page py-5">
            <Container fluid className="position-relative">
                {
                    cartsStore.length !== 0 ?
                        <>
                            <LinkBack path='/' />
                            <h4 className="mb-4">Your Products:</h4>
                            <h6 className="mb-4">Total Price: {totalPrice.toFixed(3)}$ </h6>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Count</th>
                                        <th>Add More</th>
                                        <th>Information</th>
                                        <th>Delete One</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartsStore.map((cart, index) => {
                                            const { id, image, title, price, count } = cart;

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Image
                                                            src={image}
                                                            alt={title}
                                                            className="mx-auto d-block p-1"
                                                            style={{ width: '100px', height: '100px', }}
                                                        />
                                                    </td>
                                                    <td style={{ width: 250 }}>{title}</td>
                                                    <td>{price}$</td>
                                                    <td>{count}</td>
                                                    <td>
                                                        <Button onClick={() => { dispatch(addToCarts(cart)) }} variant="dark" className="w-100">
                                                            <i className="fa-solid fa-plus"></i>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Link to={`/products/${id}`} className="mx-auto d-block w-100 btn btn-dark text-white">Details</Link>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => { dispatch(deleteOne(cart)) }} variant="danger" className="w-100">
                                                            <i className="fa-solid fa-circle-minus"></i>
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => { dispatch(deleteFromCarts(cart)) }} variant="danger" className="w-100">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </>
                        :
                        <h5 className="text-center">No Products Here Yet.</h5>
                }
            </Container>
        </div>
    )
}

export default Carts;