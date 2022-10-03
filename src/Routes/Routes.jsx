import { Routes, Route } from "react-router-dom";
import Auth from "../pages/Login-signup/Auth";
// import { BalancePage } from "../pages/BalancePage/BalancePage";
// import { AdminPage } from "../Pages/AdminPage";
// import { Navbar } from "../Components/Navbar";
// import { BalanceDetailsPage } from "../Pages/BalancePage/BalanceDetailsPage";
// import { SignupPage } from "../Pages/Login-signup/SignupPage";
// import { LoginPage } from "../Pages/Login-signup/LoginPage";
// import { SignoutPage } from "../Pages/Login-signup/SignoutPage";
// import { NotFoundPage } from "../Pages/NotFoundPage";
// import NewLand from "../Components/NewLandForm/NewLand";
// import {ProductsPage} from "../Pages/ProductPage/ProductPage"

export const Routess = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Auth/>} />

        {/* <Route path="/admin" element={<AdminPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signout" element={<SignoutPage />} />
        <Route path="/newland" element={<NewLand />} />

        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
};
