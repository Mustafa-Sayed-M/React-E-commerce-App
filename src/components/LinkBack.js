import { Link } from "react-router-dom"

function LinkBack({ path }) {
    return (
        <Link to={path} className="position-absolute end-0 top-0 me-3 z-3">
            <span className="me-2">Continue shopping</span>
            <i className="fa-solid fa-arrow-right-long"></i>
        </Link>
    )
}

export default LinkBack;