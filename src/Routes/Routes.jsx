import { Routes, Route } from "react-router-dom";
import { Signup } from "../pages/Login-signup/Signup";
import { Login } from "../pages/Login-signup/Login";
import { Signout } from "../pages/Login-signup/Signout";
import { BalancePage } from "../pages/BalancePage/BalancePage";
import { SellerPage } from "../pages/SellerPage/SellerPage";
import { Navbar } from "../Components/Navbar/Navbar";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { ProductsPage } from "../pages/ProductPage/ProductPage";
import PrivateRoute from "./PrivateRoute";
import ChatApp from "../pages/ChatPage/CatApp";
import { Scheme } from "../pages/ProductPage/SchemePage";
import { Land } from "../pages/ProductPage/LandPage";
import { Plots } from "../pages/ProductPage/PlotsPage";
import { PlotDetails } from "../pages/ProductPage/PlotDetailsPage";
import { NewLand } from "../pages/SellerPage/NewLandForm/NewLand";
import {NewPlot} from "../pages/SellerPage/NewPlotForm/NewPlot"

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/scheme/:id" element={<Scheme />} />
        <Route path="/products/lands/:id" element={<Land />} />
        <Route path="/products/singleland/:id" element={<Plots />} />

       
        <Route path="/products/plotdetails/:id" element={<PlotDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="signout" element={<Signout />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/balance"
          element={
            <PrivateRoute>
              <BalancePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <SellerPage />
            </PrivateRoute>
          }
        />
        <Route path="/seller" element={<SellerPage />} />

        <Route path="/seller/newland" element={<NewLand />} />
        <Route path="/seller/newplot/:id" element={<NewPlot />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
