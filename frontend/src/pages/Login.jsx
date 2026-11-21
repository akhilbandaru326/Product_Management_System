import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login(){
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await api.post("token/",formData)
            localStorage.setItem("access",response.data.access)
            localStorage.setItem("refresh",response.data.refresh)
            setMessage("Login successfull..")
            navigate("/dashboard")
        }catch(error){
            console.log(error.response?.data)
            setMessage("invalid username or password")
        }
    }

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-3">Login</h2>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Username:</label>
                                <input type="text" name="username" value={formData.username}
                                onChange={handleChange} className="form-control" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Password</label>
                                <input type="password" name="password" value={formData.password}
                                className="form-control" required onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
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

export default Login;