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
import {ChatApp} from "../pages/ChatPage/ChatApp";
import { Scheme } from "../pages/ProductPage/SchemePage";
import { Land } from "../pages/ProductPage/LandPage";
import { Plots } from "../pages/ProductPage/PlotsPage";
import { PlotDetails } from "../pages/ProductPage/PlotDetailsPage";
import { NewLand } from "../pages/SellerPage/NewLandForm/NewLand";
import {NewPlot} from "../pages/SellerPage/NewPlotForm/NewPlot"
import { Footer } from "../Components/Footer";
import { BalanceDetail } from "../pages/BalancePage/BalanceDetail";
import { Profile } from "../Components/Navbar/Profile";
import { Cart } from "../pages/CartPage/Cart";
import { ChatAll } from "../pages/ChatPage/ChatAll";
import { SellerLandPage } from "../pages/SellerPage/SellerLandPage";
import { Admin } from "../pages/Admin/Admin";
import { Payment } from "../Components/Payment";

export const Routess = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="scheme/:id" element={<Scheme />} />
        <Route path="lands/:id" element={<Land />} />
        <Route path="singleland/:id" element={<Plots />} />

        <Route path="plotdetails/:id" element={<PlotDetails />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="signout" element={<Signout />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatAll />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:id"
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
          path="/details/:id"
          element={
            <PrivateRoute>
              <BalanceDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller"
          element={
            <PrivateRoute>
              <SellerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/lands/seller"
          element={
            <PrivateRoute>
              <SellerLandPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/newland/:id"
          element={
            <PrivateRoute>
              <NewLand />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/newplot/:id"
          element={
            <PrivateRoute>
              <NewPlot />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart/:id"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="lands/:id/payment" element={ <Payment price="60000"/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};
