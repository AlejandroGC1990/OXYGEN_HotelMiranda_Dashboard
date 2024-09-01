import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Guest from "./pages/Guest";
import GuestDetail from "./pages/GuestDetail";
import Contact from "./pages/Concierge";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/components/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="guest" element={<Guest />} />
          <Route path="guestDetail" element={<GuestDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
