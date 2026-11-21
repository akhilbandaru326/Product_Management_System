import { useState } from "react";
import api from "../services/api";

function Register(){
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await api.post("register/",formData);
            setMessage("Registration successfull..")
            console.log(response.data)
        }catch(error){
            console.log(error.response?.data)
            setMessage(JSON.stringify(error.response?.data || "Regstration failed.."))
        }
    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center mt-4">Create Account</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Username:</label>
                                <input type="text" className="form-control"
                                name="username" value={formData.username}
                                onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Email:</label>
                                <input type="email" name="email" className="form-control"
                                value={formData.email}
                                onChange={handleChange} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Password:</label>
                                <input type="password" className="form-control" 
                                name="password" value={formData.password} onChange={handleChange}
                                required/>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        {message && (
                            <div className="alert alert-info mt-3">
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;