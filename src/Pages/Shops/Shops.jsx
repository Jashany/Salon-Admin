import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/Sidebar/Sidebar";
import styles from "./Shops.module.css";
import { useNavigate } from "react-router-dom";

const Shops = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  useEffect(() => {
    fetch("https://api.salondekho.in/api/salon/get-all-salons", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShops(data?.data);
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
      <div className={styles.shops}>
        <h2>Lists of Shops</h2>
        <div>
          <table border="1">
            <thead>
              <tr>
                <th>Salon Name</th>
                <th>Owner Name</th>
                <th>Owner Number</th>
                <th>Shop Number</th>
                <th>Business Type</th>
                <th>Service Type</th>
                <th>Services</th>
                <th>Ratings</th>
                <th>Working Days</th>
                <th>Work Timing</th>
                <th>Location</th>
                <th>No of Employees</th>
              </tr>
            </thead>
            <tbody>
              {shops?.map((shop) => {
                const averageRating =
                  shop?.Ratings?.reduce((acc, curr) => {
                    return acc + curr.rating;
                  }, 0) / shop?.Ratings?.length || 0;
                const uniqueServiceType = shop?.Services?.map(
                  (service) => service?.type
                );

                return (
                  <tr
                    key={shop?._id}
                    onClick={() => {
                      navigate(`/shop/${shop?._id}`, { state: shop });
                    }}
                  >
                    <td>{shop?.SalonName}</td>
                    <td>{shop?.OwnerName}</td>
                    <td>{shop?.userId?.phoneNumber}</td>
                    <td>{shop?.userId?.phoneNumber}</td>
                    <td>{shop?.BusinessType}</td>
                    <td>{uniqueServiceType.length}</td>
                    <td>{shop?.Services?.length} services</td>
                    {averageRating > 0 ? (
                      <td>{averageRating}</td>
                    ) : (
                      <td>Not Rated</td>
                    )}
                    <td>{shop?.workingDays.length} Days</td>
                    <td>
                      {new Date(shop?.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      to{" "}
                      {new Date(shop?.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>{shop?.address?.City}</td>
                    <td>{shop?.Artists?.length} Nos</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shops;
