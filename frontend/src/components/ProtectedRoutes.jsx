import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(){
    const accessToken = localStorage.getItem("access")

    if(!accessToken){
        return <Navigate to={'/login'} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoutes;