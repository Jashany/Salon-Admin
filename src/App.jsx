import Auth from "./Pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Provider } from "react-redux";
import store from "./Store";
import Shops from "./Pages/Shops/Shops";
import ShopDetails from "./Pages/ShopDetials/ShopDetails";
import PrivateRoute from "./Components/PrivateRoute";
import UploadServices from "./Pages/Services/Services";
function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/services/:id" element={<UploadServices />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
