import styles from './Login.module.css';

const Auth = () => {
    return ( 
        <>
        <div className={styles.main}>
            <div className={styles.left}>
                <h1>
                    Salon Hub
                </h1>
                <h3>
                    The best salon booking platform.
                </h3>
            </div>
            <div className={styles.login}>
                <form>
                    <h2>
                        Log-in Admin
                    </h2>
                    <label>Enter Email
                    <input type="email" placeholder="johndoe@gmail.com" />
                    </label>
                    <label>Enter Password
                    <input type="password" placeholder="********" />
                    </label>
                    <button>Login</button>
                </form>
            </div>
        </div>
        </>
     );
}
 
export default Auth;