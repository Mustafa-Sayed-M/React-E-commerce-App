import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import '../style/AppNavbar.css';

function AppNavbar() {
    const cartsStore = useSelector(state => state.cartsStore);
    const { pathname } = useLocation();

    const navbarLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact Us' },
    ];

    return (
        pathname === '/' | pathname === '/about' | pathname === '/contact' ?
            <Navbar expand="md">
                <Container fluid>
                    <Link to="/" className="navbar-brand">E-commerce</Link>
                    <Navbar.Collapse id="basic-navbar-nav" className="order-1 order-md-0">
                        <Nav className="mx-auto navbar_links">
                            {
                                navbarLinks.map((link, index) => <NavLink className='nav-link' key={index} to={link.href}>{link.label}</NavLink>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <div className="d-flex align-items-center">
                        <Link to='/carts' className="carts_link p-2 me-2 text-white position-relative">
                            <i className="fa-solid fa-cart-shopping fs-4"></i>
                            <div className="count_carts">{cartsStore.length}</div>
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none text-white fs-3 p-2">
                            <i className="fa-solid fa-bars"></i>
                        </Navbar.Toggle>
                    </div>
                </Container>
            </Navbar>
            : null
    );
}

export default AppNavbar;