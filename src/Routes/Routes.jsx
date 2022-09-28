import { Routes, Route } from "react-router-dom";
import { BalancePage } from "../Components/BalancePage/BalancePage";
import { AdminPage } from "../Components/AdminPage/AdminPage";
import { Navbar } from "../Components/Navbar";
import { BalanceDetailsPage } from "../Components/BalancePage/BalanceDetailsPage";
import { SignupPage } from "../Components/Login-Signup/SignupPage";
import { LoginPage } from "../Components/Login-Signup/LoginPage";
import { SignoutPage } from "../Components/Login-Signup/SignoutPage";
import { NotFoundPage } from "../Components/NotFoundPage";

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BalancePage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signout" element={<SignoutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
