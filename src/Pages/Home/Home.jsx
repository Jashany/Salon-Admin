import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";
import styles from "./Home.module.css";
const Home = () => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    fetch("https://api.salondekho.in/api/salon/salons-stats", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.main}>
      <Header />
      <SideBar />
      <div className={styles.perf}>
        <h2>Performance</h2>
        <div className={styles.box}>
          <div className={styles.stat}>
            <h2>Total Appointments:</h2>
            <h3>{stats?.data?.totalAppointments}</h3>
          </div>
          <div className={styles.stat}>
            <h2>Total Salons:</h2>
            <h3>{stats?.data?.totalSalons}</h3>
          </div>
          <div className={styles.stat}>
            <h2>Total Users:</h2>
            <h3>{stats?.data?.totalUsers}</h3>
          </div>
          <div className={styles.stat}>
            <h2>Weekly Appointments:</h2>
            <h3>{stats?.data?.weeklyAppointments}</h3>
          </div>
          <div className={styles.stat}>
            <h2>Weekly Users:</h2>
            <h3>{stats?.data?.weeklyUsers}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
