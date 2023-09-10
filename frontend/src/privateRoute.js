import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(){
    let account_no = localStorage.getItem('account_no');
    return account_no ? <Outlet /> : <Navigate to="/authenticate" />;
}
export default PrivateRoute;