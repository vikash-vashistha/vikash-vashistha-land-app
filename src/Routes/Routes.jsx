import { Routes, Route } from "react-router-dom";
import { BalancePage } from "../Components/BalancePage/BalancePage";
import { AdminPage } from "../Components/AdminPage/AdminPage";
import { Navbar } from "../Components/Navbar";
import { BalanceDetailsPage } from "../Components/BalancePage/BalanceDetailsPage";
import { NotFoundPage } from "../Components/NotFoundPage";

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BalancePage />} />

        <Route path="/balance" element={<AdminPage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
