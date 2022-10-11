import { Routes, Route } from "react-router-dom";
import Auth from "../Pages/Login-signup/Auth";
import { AdminPage } from "../Pages/AdminPage";
import { Navbar } from "../Components/Navbar";
import { SignoutPage } from "../Pages/Login-signup/SignoutPage";
import { NotFoundPage } from "../Pages/NotFoundPage";
import NewLand from "../Components/NewLandForm/NewLand";
import {ProductsPage} from "../Pages/ProductPage/ProductPage"
import { LoginPage } from "../Components/Login";
import { SignupPage } from "../Components/Signup";
import { BalancePage } from "../Pages/BalancePage/BalancePage";
import { BalanceDetailsPage } from "../Pages/BalancePage/BalanceDetailsPage";

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProductsPage/>} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/balance" element={<BalancePage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signout" element={<SignoutPage />} />
        <Route path="/newland" element={<NewLand />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
