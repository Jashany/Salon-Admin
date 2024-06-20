import { useSelector } from "react-redux";
import styles from "./Header.module.css";
const Header = () => {
    const user = useSelector((state) => state.auth.auth);

    return ( 
        <div className={styles.header}>
            <h1>Salon Dekho</h1>
            <h2>{user?.phoneNumber}</h2>
        </div>
     );
}
 
export default Header;