import { useEffect } from "react";
import api from "../services/api";

function AppTest() {
    useEffect(() => {

        api.get("products/")
            .then((response) => {
                console.log("Products:", response.data);
            })
            .catch((error) => {
                console.log("Error:", error.response?.data);
            });

    }, []);

    return (
        <div className="container mt-5">
            <h1>Product Management System</h1>
        </div>
    );
}

export default AppTest;