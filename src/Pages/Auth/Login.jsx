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
                    <label>Enter Phone Number
                    <input type="Number" placeholder="+91 8957456321" />
                    </label>
                    <button>Get OTP</button>
                </form>
            </div>
        </div>
        </>
     );
}
 
export default Auth;