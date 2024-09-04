import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Guest from "./pages/Guest";
import Concierge from "./pages/Concierge";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/components/Layout/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="concierge" element={<Concierge />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="guest" element={<Guest />}>
            <Route path=":id" element={<Guest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
