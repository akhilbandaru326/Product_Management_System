import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        category:""
    });

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const [productResponse, categoryResponse] = 
                await Promise.all([
                    api.get(`products/${id}/`),
                    api.get("category")
                ])
                const product = productResponse.data;
                setFormData({
                    name:product.name,
                    description:product.description,
                    price:product.price,
                    stock:product.stock,
                    category:product.category
                })

                setCategories(categoryResponse.data.results || categoryResponse.data)
            }catch(error){
                console.log(error.response?.data)
                alert("Unable to load the Product details")
                navigate("/dashboard")
            }finally{
                setLoading(false)
            }

        }
        fetchData();
    },[id,navigate]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await api.patch(`products/${id}/`,{
                ...formData,
                price:Number(formData.price),
                stock:Number(formData.stock),
                category:Number(formData.category)
            })
            alert("Product updated successfully..")
            navigate("/dashboard")
        }catch(error){
            console.log(error.response?.data)
            alert("failed to update Product")
        }
    }
    
    if(loading){
        return <div className="container mt-5">loading...</div>
    }

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <div className="card shadow p-4">
                        <h2 className="mb-4">Edit Product</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Product Name</label>
                                <input type="text" name="name" value={formData.name} 
                                onChange={handleChange} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Description</label>
                                <br />
                                <textarea name="description" className="form-control"
                                value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Price</label>
                                <input type="number" name="price" value={formData.price}
                                onChange={handleChange} min={"0.01"} step={"0.01"} required
                                className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Stock</label>
                                <input type="number" name="stock" value={formData.stock}
                                min={"0"} className="form-control" required onChange={handleChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Category</label>
                                <select name="category" value={formData.category} id=""
                                className="form-control" onChange={handleChange} required>
                                    {categories.map((category)=>(
                                        <option value={category.id} key={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Update Product</button>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default EditProduct;