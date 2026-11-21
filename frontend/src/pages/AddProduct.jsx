import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function AddProduct(){
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        category:""
    });

    useEffect(()=>{
        api.get("category/")
            .then((response)=>{
                setCategories(response.data.results || response.data)
            })
            .catch((error)=>{
                console.log(error.response?.data)
            });
    },[]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await api.post("products/",{
                ...formData,
                price : Number(formData.price),
                stock: Number(formData.stock),
                category: Number(formData.category)
            }
         )
         alert("product added successfully..")
         navigate("/dashboard");

        }catch(error){
            console.log(error.response?.data)
            alert("Failed to add the product..")
        }
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">
                    <div className="card shadow p-4">
                        <h2 className="mb-3">Add Product</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Product Name</label>
                                <input type="text" className="form-control" name='name'
                                value={formData.name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Description</label>
                                <textarea name="description" value={formData.description}
                                onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Price</label>
                                <input type="number" name="price" className='form-control'
                                value={formData.price} onChange={handleChange} min="0.01" step={"0.01"} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Stock</label>
                                <input type="number" name="stock" value={formData.stock}
                                className='form-control' onChange={handleChange}
                                min={"0"}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Category</label>
                                <select name="category" value={formData.category}
                                className='form-control' required onChange={handleChange}>
                                    <option value="">Select category</option>
                                    {categories.map((category)=>(
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className='btn btn-primary w-100'>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;