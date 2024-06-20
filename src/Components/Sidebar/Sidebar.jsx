import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Slices/AuthSlice";
const SideBar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <ul>
        <li>
          <Link to="/home">Performance</Link>
        </li>
        <li>
          <Link to="/shops">Shops</Link>
        </li>
        <li
          onClick={() => {
            fetch("https://api.salondekho.in/api/auth/logout", {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                dispatch(clearUser());
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
