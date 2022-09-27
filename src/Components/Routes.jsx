import { Routes, Route } from "react-router-dom";
import { BalancePage } from "./BalancePage";
import { HomePage } from "./HomePage";
import { Navbar } from "./Navbar";
import { BalanceDetailsPage } from "./BalanceDetailsPage";
import { NotFoundPage } from "./NotFoundPage";

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/balance" element={<BalancePage />} />
        <Route path="/balance/:id" element={<BalanceDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
