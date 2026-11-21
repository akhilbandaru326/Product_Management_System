import { useState, useEffect, use } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
function Dashboard(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const totalProducts = products.length;

    const totalStock = products.reduce(
    (total, product) => total + product.stock,0);

    const totalCategories = categories.length;
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("category/");

                setCategories(
                response.data.results || response.data
                );
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchCategories();
    }, []);

    useEffect(()=>{
        const fetchProducts = async() => {
            setLoading(true);
            setError("");
            try{
                const response = await api.get("products/",{
                    params:{
                        search:search,
                        category:selectedCategory
                    }
                })
                setProducts(response.data.results)
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
            }catch(error){
                console.log(error.response?.data)
                setError("Unable to load products. Please try again.");
            }finally{
                setLoading(false);
            }
        }
        fetchProducts()
    },[search,selectedCategory]);

    const handleDelete = async(id)=>{
        const confirmDelete = window.confirm("Are you sure.You want to delete this product!")
        if(!confirmDelete){
            return;
        }
        try{
            await api.delete(`products/${id}/`)
            setProducts((prevProducts)=>prevProducts.filter((product)=>
            product.id !== id))
            alert("Product deleted successfully..")
        }catch(error){
            console.log(error.response?.data)
            alert("Failed to delete the product..")
        }
    }

    const handlePageChange = async (url) => {
      try {
        const response = await api.get(url);

        setProducts(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);

      } catch (error) {
        console.log(error.response?.data);
      }
    };

    return(
        <div className="container-fluid px-4 px-lg-5 py-4">
            <h2 className="fw-bold my-1">Product Dashboard</h2>
            <div className="row mb-3">
                <div className="col-md-4">
                    <div className="card shadow p-3">
                        <h5>Total Products</h5>
                        <h2 className="text-primary">{products.length}</h2>
                    </div>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-header">
                    <h5 className="mb-0">Product List</h5>
                </div>
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">Products on this page</h6>
                                <h2 className="fw-bold">{totalProducts}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">Stock on this page</h6>
                                <h2 className="fw-bold">{totalStock}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h6 className="text-muted">Total Categories</h6>
                                <h2 className="fw-bold">{totalCategories}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-4 ">
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                            placeholder="Search products.." value={search}
                            onChange={(e)=>setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <select
                         className="form-select"
                         value={selectedCategory}
                         onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">All Categories</option>

                          {categories.map((category) => (
                         <option key={category.id} value={category.id}>
                         {category.name}
                         </option>
                        ))}
                       </select>
                    </div>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}
                    {loading?(
                        <div className="text-center my-4">
                            <div className="spinner-border text-primary">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <p className="mt-2">Loading products...</p>
                        </div>
                    ):
                    products.length === 0?(<p>No Products Found..</p>):
                    (
                        <div className="table-responsive">
                            <table className="table table-bordered hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product)=>(
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.category_name}</td>
                                            <td>
                                                <Link to={`/edit-product/${product.id}`} 
                                                className="btn btn-warning btn-sm me-1">Edit</Link>
                                                <button className="btn btn-danger btn-sm"
                                                onClick={()=>handleDelete(product.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="d-flex justify-content-between mt-3">
                        <button
                        className="btn btn-primary"
                        disabled={!previousPage}
                        onClick={() => handlePageChange(previousPage)}
                        >
                          Previous
                        </button>

                        <button
                        className="btn btn-primary"
                        disabled={!nextPage}
                        onClick={() => handlePageChange(nextPage)}
                        >
                           Next
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;