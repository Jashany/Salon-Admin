import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user as setUser } from "../../Slices/AuthSlice";
const Auth = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleSubmit = () => {
    fetch("https://api.salondekho.in/api/auth/loginAdmin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUser(data));
      });
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left}>
          <h1>Salon Dekho</h1>
          <h3>The best salon booking platform.</h3>
        </div>
        <div className={styles.login}>
          <h2>Log-in Admin</h2>
          <label>
            Enter Phone Number
            <input
              type="tel"
              placeholder="9584236528"
              name="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </label>
          <label>
            Enter Password
            <input
              type="password"
              placeholder="********"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Auth;
