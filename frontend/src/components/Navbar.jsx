import {Link, useNavigate} from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        navigate('/login')
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid px-4">
                <Link className='navbar-brand display-1' to={'/dashboard'}>Product Management</Link>
                <div className="navbar-nav ms-auto">
                    <Link className='nav-link' to={'/dashboard'}>Dashboard</Link>
                    <Link className='nav-link' to={'/addproduct'}>Add Product</Link>
                    <button className="btn btn-danger ms-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;