
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Rooms from "./pages/Rooms";
import Users from "./pages/Users";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
