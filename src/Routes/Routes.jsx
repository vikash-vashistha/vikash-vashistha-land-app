import { Routes, Route } from "react-router-dom";
import {Signup} from "../pages/Login-signup/Signup";
import {Login} from "../pages/Login-signup/Login"
import { Signout } from "../pages/Login-signup/Signout";
import { BalancePage } from "../pages/BalancePage/BalancePage";
import { BalanceDetailsPage } from "../pages/BalancePage/BalanceDetailsPage";
import { AdminPage } from "../pages/AdminPage"
import { Navbar } from "../Components/Navbar";
import { NotFoundPage } from "../pages/NotFoundPage";
import NewLand from "../Components/NewLandForm/NewLand";
import { ProductsPage } from "../pages/ProductPage/ProductPage"

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="signout" element={<Signout />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="/newland" element={<NewLand />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
