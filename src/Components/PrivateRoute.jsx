import { useSelector } from "react-redux";
import { Navigate ,Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const user = useSelector((state) => state.auth.auth);
    return user ? <Outlet /> : <Navigate to="/" replace />;
}
 
export default PrivateRoute;