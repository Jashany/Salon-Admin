import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import { clearUser } from "../../Slices/AuthSlice";
import { useDispatch } from "react-redux";
const Header = () => {
    const user = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(clearUser());
    };
    return ( 
        <div className={styles.header}>
            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>

            <h1>Salon Dekho</h1>
            <h2>{user?.phoneNumber}</h2>
            
            </div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
     );
}
 
export default Header;