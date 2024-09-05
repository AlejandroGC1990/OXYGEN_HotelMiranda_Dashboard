import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Bookings from "./pages/Booking/Bookings";
import Rooms from "./pages/Rooms/Rooms";
import Guest from "./pages/Guest";
import Concierge from "./pages/Concierge/Concierge";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/components/Layout/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />}>
            <Route path=":id" element={<Bookings />} />
            <Route path="new" element={<Bookings />} />
            <Route path=":id/edit" element={<Bookings />} />
            <Route path=":id/delete" element={<Bookings />} />
          </Route>
          <Route path="concierge" element={<Concierge />}>
            <Route path=":id" element={<Concierge />} />
            <Route path="new" element={<Concierge />} />
            <Route path=":id/edit" element={<Concierge />} />
            <Route path=":id/delete" element={<Concierge />} />
          </Route>
          <Route path="rooms" element={<Rooms />}>
            <Route path=":id" element={<Rooms />} />
            <Route path="new" element={<Rooms />} />
            <Route path=":id/edit" element={<Rooms />} />
            <Route path=":id/delete" element={<Rooms />} />
          </Route>
          <Route path="guest" element={<Guest />}>
            <Route path=":id" element={<Guest />} />
            <Route path="new" element={<Guest />} />
            <Route path=":id/edit" element={<Guest />} />
            <Route path=":id/delete" element={<Guest />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
